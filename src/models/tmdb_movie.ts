import internal from "stream";


export interface ITMDBMovie {
    id: number;
    title: string;
    genre_ids: number[];
    release_date: string;
    overview: string;
    poster_path: string | null;
    vote_average: number;
    vote_count: number;
}