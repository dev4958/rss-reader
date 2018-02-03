# RSS Reader

Cross-platform RSS reader for local device use.  Front-end uses React/Redux, back-end uses Node.js/Express.  FeedParser is used for feed parsing.  Deployment uses Electron (in-progress).  Development version runs the client locally with Webpack and server with Nodemon and Debug.

Nearing MVP, needs refactoring and integration with Electron.

### Usage

Click the "Update Feeds" button in the top right corner to get current feed data for feeds saved in "./server/user-config.json".  For the time being, this must be done manually when the reader is opened (nothing displays by default).  To edit the feeds in the user's configuration, click "Edit Feeds" and fill out the add feed input fields at the bottom of the list.  To view a feed click it's title in the list of feeds.  This will direct you to a `/feed/:feedUrl` endpoint, where `feedUrl` is a value based on the name of the feed.  Article titles link to the full article.  To return to the feeds list click the "Feeds" button in the top left corner.

### Adding a Feed

Navigate to `/edit-feeds` using the "Edit Feeds" button in the top right.  Put the URL of the feed into the Feed URL field.  Add categories for the feed using commas to separate categories.

Example: [XKCD](https://www.xkcd.com)

URL -> "https://www.xkcd.com/rss.xml"

Categories -> "Romance, Sarcasm, Math, Language"

### Development Web Version Setup

To run RSS Reader in development mode, install NVM with Node.js version 8.x (other may work too, hasn't been tested with everything).  Then, in the root directory of this cloned project, enter the following:

`npm i`

to install necessary dependencies.  Then run:

`npm run dev-client`

to start the client, it runs on `localhost:3000` by default.  Next in a new tab of your console, run:

`npm run dev-server`

to start the feed CRUD API server that manages the user's configuration and fetches feed data.  To close the development web version run:

`npm stop`

but be careful, this will stop **all** the Node and Webpack processes on your machine.

### Development Electron Version Setup

This is still being developed, but the command to do so is:

`npm run dev-dist`

the compiled application files are found in the "./app" directory, "./app/main.js" contains the Electron setup.  To restart Electron quickly without rebuilding the application files just run:

`npm start`
