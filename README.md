# RSS Reader

Cross-platform RSS reader for local device use.  The following are the primary libraries used to build the application.

Nearing MVP, needs some refactoring and integration work with Electron.

* Front-End Libraries
  * React (version 16, +Router)
  * Redux (+Thunk & Logger)
  * Modernizr
  * SuperAgent

* Back-End Libraries
  * Node.js
  * Express (+Helmet)
  * Request
  * Moment
  * DOMPurify
  * FeedParser
  * Debug

* Development Tools
  * Webpack
  * Nodemon
  * Babel
  * Electron

Webpack is configured to enable ES6+ syntax, SASS styling with pre-processing, image and JSON file loading (PNG, JPG, GIF, and SVG), image optimization (imagemin and svgo), HTML/CSS/JS optimization (common procedures -minification, etc.), and production file compression (gzip).  Able to run as a development server with hot-reloading too.


### Usage

Open the application, any saved feeds in the user configuration file located in "./server/user-config.json" will be updated and loaded.  To update the saved feeds again, click "Update Feeds" in the top right corner (please note this button does not appear if there are no saved feeds).  To edit your feed list click "Edit Feeds" in the top right corner and fill out the add feed input fields.  To return to your feeds from the edit page (and others) click "Feeds" in the top left corner.  To view a category of feeds you've defined click the name of the category above the feed list.  To view a feed's articles click it's title in the feed list.  Article titles link to the full article.

### Adding a Feed

Navigate to `/edit-feeds` using the "Edit Feeds" button in the top right.  Put the URL of the feed into the Feed URL field.  Add categories for the feed using commas to separate categories.

Example: [XKCD](https://www.xkcd.com)

URL -> "https://www.xkcd.com/rss.xml"

Categories -> "Romance, Sarcasm, Math, Language"

### Development Web Version Setup

To run RSS Reader in development mode, install NVM with Node.js version 8.x (others may work too, hasn't been tested with everything).  Then, in the root directory of this cloned project, enter the following:

`npm i`

to install necessary dependencies.  Then run:

`npm run dev-client`

to start the client, it runs on `localhost:3000` by default.  Next in a new tab of your console, run:

`npm run dev-server`

to start the feed CRUD API server that manages the user's configuration and fetches feed data.  To close the development web version run:

`npm stop`

but be careful, this will stop **ALL** the Node and Webpack processes on your machine.

### Development Electron Version Setup

This is still being developed, but the command to do so is:

`npm run dev-dist`

the compiled application files are found in the "./app" directory, "./app/main.js" contains the Electron setup.  To restart the Electron wrapper without rebuilding the application files run:

`npm start`
