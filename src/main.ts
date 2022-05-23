import cron from 'node-cron'
import { updateMovies } from './controllers/movie'

const callback = async () => {
    console.log('Updateing movies');
    try {
        await updateMovies();
        console.log('Update finished...');
    } catch (error) {
        console.error('An error occurred:', error)
        console.log('Retring...');
        callback();
    }
}

console.debug(cron.schedule('55 12 * * *', callback, {
    scheduled: true,
    timezone: "Europe/Budapest"
}));

console.log('Cron job started.');