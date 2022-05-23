import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm'

@Entity()
export class Movie {
    // @PrimaryGeneratedColumn()
    @PrimaryColumn()
    id: number;
    @Column()
    title: string = '';
    @Column()
    geners: string = '';
    @Column({ name: 'release_date' })
    releaseDate: Date;
    @Column()
    overview: string = '';
    @Column({ name: 'poster_url' })
    posterUrl: string = '';
    @Column({ name: 'tmdb_id' })
    tmdbId: number = -1;
    @Column({ name: 'tmdb_vote_average', type: 'double precision' })
    tmdbVoteAverage: number = 0.0;
    @Column({ name: 'tmdb_vote_count' })
    tmdbVoteCount: number = 0;
    @Column({ name: 'tmdb_url' })
    tmdbUrl: string = '';
    @Column({ name: 'directors_name' })
    direcorsName: string = '';
    @Column({ name: 'directors_tmdb_id' })
    directorsTMDBId: string = '';
    @Column({ name: 'directors_date_of_birth' })
    directorsDateOfBirth: Date;
}