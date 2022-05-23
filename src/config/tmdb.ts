import dotenv from 'dotenv';

dotenv.config();

export const apiBaseURL = 'https://api.themoviedb.org/3'
export const apikey = process.env.TMDB_API_KEY || (() => {
    console.error("No API key...");
    process.exit(1);
})()

export const requiredRows = 210;
export const perpage = 20;