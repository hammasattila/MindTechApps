import { Movie } from "../entity/movie.entity";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    synchronize: true,
    logging: true,
    entities: [Movie],
    subscribers: [],
    migrations: [],
    logger: 'file'
})