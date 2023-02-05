# Jammming
> A static site interface that interacts with the Spotify API to help users create playlists

## Demo

Try out a demo of the app at [b-xb-jammming.surge.sh](https://b-xb-jammming.surge.sh/)

## Requirements

- [Node](https://nodejs.org/) (tested using v19.1.0)
- [Surge](https://surge.sh/help/getting-started-with-surge) (optional, for deployment)

## Setup

### 1. Install Dependencies

```
npm install
```

### 2. Set Up Environment Variables

#### .env file

To get this application to work you will need to set up one or more environment variables

A simple way to do this is to add a .env file at the base of the project

See [.env-example](.env-example) for a template you can use.

#### Spotify API Key (required)

To run this app you need to set up a new application at https://developer.spotify.com/dashboard/

You will then need to set the following environment variable

```
REACT_APP_SPOTIFY_CLIENT_ID = 'ADD_SPOTIFY_CLIENT_ID_HERE'
```

(Replace ADD_SPOTIFY_CLIENT_ID_HERE with the "Client ID" listed for your newly created Spotify application)


#### Test and Deployment Path Environment Variables (optional)

`REACT_APP_TEST_URI` - set this variable to the base path of your test environment ( defaults to "http://localhost:3000/" )

`REACT_APP_DEPLOYMENT_URI` - set this variable to the base path of your deployment environment ( defaults to the test path )


## Deployment

### Build App

Before deploying, make sure to build the app by running the following

```
npm run build
```

### Deployment to Surge.sh

#### Install Surge Terminal App

[Surge.sh](https://surge.sh) provide unlimited free hosting for static sites.

To deploy to Surge.sh, you first need to install their terminal app.

```
npm install --global surge
```

#### Run Deployment script

The following command will automatically run the surge terminal app from the projects build directory

```
npm run deploy
```

#### Reply to terminal prompts

You will now be greeted with some prompts in the terminal:

- User Authentication

  Type in an email address and password to create a new account, or use the details of an existing account.

- Confirm build path

  Press return if the build path shown is correct or type in an alternative path.

- Choose a domain name

  Type in your choice of domain name to deploy your site to or use the default one provided.

  Your site will automatically work with any subdomain of surge.sh (e.g. `subdomain.surge.sh` ) 

  You can also set the domain to be any personalised domain name that you own.

  See the [Adding a custom domain](https://surge.sh/help/adding-a-custom-domain) guide on their website, for more details.

  Adding your chosen domain to `public/CNAME` will bypass this prompt.

  See [CNAME-example](public/CNAME-example) for a template you can use.


## Project Status

The main application is _complete_ and fully functional. I aim to add a few additions to provide users with more feedback, though.


## TODO

### bugs
- add an alert to notify users of localStorage being used and to check for permission
- 403 Status "Failed to load resource" when attempting to post a playlist

### refactoring
- replace all instances of the string "New Playlist" with a variable that can be set in .env
- refactor how the localStorage interaction is handled

### potential features
- add a clear button to playlist and search results
- automatically keep all state information stored between sessions (i.e. as soon as a piece of data is altered)
  - don't store user_token
- Instead of redirecting users to spotify, provide a button for them to connect their accounts
- user alerts
  - provide feedback for when something goes wrong (connection issues, empty playlist, empty playlist name etc.)
  - provide users with a link to their playlist after it has been created


## Acknowledgements

### Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).