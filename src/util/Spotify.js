const CLIENT_ID = '35a5d79c82064198bc15e45314f78fb6';
const REDIRECT_URI = 'http://localhost:3000/';

let accessToken = "";

const parseCallback = (callback) => {
  return {
    access_token: callback.match(/access_token=([a-zA-Z0-9_-]+)/)?.[1],
    expires_in: callback.match(/expires_in=([0-9]+)/)?.[1],
  }
}

const Spotify = {
  getAcessToken() {
    if (accessToken) {
      return accessToken;
    } else {
      const callback = window.location.hash.substring(1);
      if (callback) {
        const settings = parseCallback(callback);
        if (settings.access_token && settings.expires_in) {
          accessToken = settings.access_token;
          window.setTimeout(() => accessToken = '', settings.expires_in * 1000);
          window.history.pushState('Access Token', null, '/');
          return accessToken;
        }
      }

      // otherwise redirect to Spotify
      const url = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
      window.location.href = url;
    }
  }
};

export default Spotify;
