import fetch from 'node-fetch';
import { Movie } from '../entity/movie.entity';
import { apiBaseURL, apikey, perpage, requiredRows } from '../config/tmdb';
import { IPerson } from '../models/i_persone';
import { AppDataSource } from '../config/postgre';
import { ITMDBMovie } from '../models/tmdb_movie';

export async function updateMovies(): Promise<void> {
    const numberOfPages = Math.ceil(requiredRows / perpage);
    const keys = [...Array(numberOfPages).keys()]

    const pages = await Promise.all(keys.map((page) => new Promise<ITMDBMovie[]>((reslove, reject) => {
        fetch(`${apiBaseURL}/movie/top_rated?api_key=${apikey}&language=en-US&page=${page + 1}`)
            .then((response) => {
                response.json().then((data) => {
                    reslove(data.results);
                });
            });
    })));

    await AppDataSource.initialize()
    // here you can start to work with your database
    let result: ITMDBMovie[] = pages.flatMap(page => page);
    let movieRepo = AppDataSource.getRepository(Movie);

    await Promise.all([...Array(requiredRows).keys()].map(async (index: number) => {
        const i = index + 1;
        let imdbMovie: ITMDBMovie = result[i - 1];
        let movie: Movie = await movieRepo.findOneBy({ id: i }) || new Movie;
        movie.id = i;
        movie.tmdbId = imdbMovie.id;
        movie.overview = imdbMovie.overview;
        movie.title = imdbMovie.title;
        movie.posterUrl = imdbMovie.poster_path;
        movie.tmdbUrl = `https://www.themoviedb.org/movie/${movie.id}`;

        const getDetails = async () => {
            try {
                movie = await getMovieCreditsForMovie(movie);
            } catch (error) {
                console.error(`Failed to get details for ${movie.title}:`, error)
                console.log('Retring...');
                await getDetails();
            }
        }

        await getDetails();

        console.log(`Saving ${movie.id}. ${movie.title}...`);
        movieRepo.save(movie);
    }));

    return;
};


export async function getMovieCreditsForMovie(movie: Movie): Promise<Movie> {

    let movieResponse = await fetch(`${apiBaseURL}/movie/${movie.tmdbId}?api_key=${apikey}&language=en-US`);
    let { release_date, genres, vote_average, vote_count }: { release_date: string, genres: { id: number, name: string }[], vote_average: number, vote_count: number } = await movieResponse.json();

    movie.releaseDate = new Date(release_date);
    movie.geners = genres.map(g => g.name).join(', ');
    movie.tmdbVoteAverage = vote_average;
    movie.tmdbVoteCount = vote_count;

    let creditsResponse = await fetch(`${apiBaseURL}/movie/${movie.tmdbId}/credits?api_key=${apikey}&language=en-US`)
    let { crew }: { crew: [any] } = await creditsResponse.json();
    let director = crew.find(c => c.job === 'Director');

    if (director) {
        movie.direcorsName = director.name;
        movie.directorsTMDBId = director.id;
        let personResponse = await fetch(`${apiBaseURL}/person/${director.id}?api_key=${apikey}&language=en-US`)
        let person: IPerson = await personResponse.json();

        movie.directorsDateOfBirth = new Date(person.birthday);
    }

    return movie;
}