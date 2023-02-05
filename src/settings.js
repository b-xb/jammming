export const IS_LOCAL = ( process.env.NODE_ENV === 'development');
export const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const TEST_PATH =  process.env.REACT_APP_TEST_URI ?? 'http://localhost:3000/';
const DEPLOY_PATH =  process.env.REACT_APP_DEPLOYMENT_URI ?? TEST_PATH;
export const REDIRECT_URI = IS_LOCAL ? TEST_PATH: DEPLOY_PATH;