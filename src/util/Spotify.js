import { IS_LOCAL } from '../settings'

const CLIENT_ID = '35a5d79c82064198bc15e45314f78fb6';
const REDIRECT_URI = IS_LOCAL ? 'http://localhost:3000/': 'https://b-xb-jammming.surge.sh/';

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
      const url = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-private&redirect_uri=${REDIRECT_URI}`;
      window.location.href = url;
    }
  },

  async search(searchTerm) {
    if (searchTerm) {
      const endPoint = `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`;
      try{
        const token = Spotify.getAcessToken();
        if (token){
          const response = await fetch(endPoint, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });
          if(response.ok){
            const jsonResponse = await response.json();
            const tracks = jsonResponse.tracks.items.map((track)=>({
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              uri: track.uri,
            }));
            return tracks;
          }
        }
      }
      catch(error){
        console.log(error)
      }
    } else {
      return [];
    }
  },

  async savePlaylist(playlistName="",trackURIs=[]) {

    if(playlistName && trackURIs.length>0) {

      try {
        let userId = "";
        const token = Spotify.getAcessToken();
        const authHeader = `Bearer ${token}`;

        if (token) {

          const userEndPoint = 'https://api.spotify.com/v1/me';
          const userProfileResponse = await fetch(userEndPoint, {
            headers: {
              Authorization: authHeader,
            }
          });

          if(userProfileResponse.ok){

            const userInfo = await userProfileResponse.json();
            console.log(userInfo);
            userId = userInfo.id;

            const newPlaylistEndPoint = `https://api.spotify.com/v1/users/${userId}/playlists`;

            const newPlaylistResponse = await fetch(newPlaylistEndPoint, {
              method: 'POST',
              headers: {
                Authorization: authHeader,
                'Content-type': 'application/json',
              },
              body: JSON.stringify({
                name: playlistName,
                description: "",
                public: false,
              })
            });

            if(newPlaylistResponse.ok){

              const newPlaylist = await newPlaylistResponse.json()
              console.log(newPlaylist);
              const playlistId = newPlaylist.id;

              const fillPlaylistEndPoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
              const fillPlaylistResponse = await fetch(fillPlaylistEndPoint, {
                method: 'POST',
                headers: {
                  Authorization: authHeader,
                  'Content-type': 'application/json',
                },
                body: JSON.stringify({
                  uris: trackURIs,
                  position: 0,
                })
              });

              if(fillPlaylistResponse.ok){
                const filledPlaylist = await fillPlaylistResponse.json()
                console.log(filledPlaylist);
                const snapshotId = filledPlaylist.snapshot_id;
                return {
                  userId,
                  playlistId,
                  snapshotId
                }
              }
            }

          }
        }

      } catch(error){
        console.log(error)
      }

    } else {
      //TODO: add user feedback
    }

    return null;
  }

};



export default Spotify;
