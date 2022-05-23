# MindTechApps

This project was developed using a Docker devcontainer. If you use VisualStudio Code install `ms-vscode-remote.remote-containers` extension.

To run the app create a `.env` file which contains your *TMDB API key*. For example:

```env
TMDB_API_KEY=abcdefghijklmnopqrstvw1234567890
```

To run the application use `npm start`. The application will update the movies table every day at *01:00 AM*. To change that modify the `main.ts`:

```ts

// ┌────────────── second (optional)
// │ ┌──────────── minute
// │ │ ┌────────── hour
// │ │ │ ┌──────── day of month
// │ │ │ │ ┌────── month
// │ │ │ │ │ ┌──── day of week
// │ │ │ │ │ │
// │ │ │ │ │ │
// * * * * * *
// For more info see: https://www.npmjs.com/package/node-cron.


console.debug(cron.schedule('0 1 * * *', callback, {
    scheduled: true,
    timezone: "Europe/Budapest"
}));
```
