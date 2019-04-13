import auth0, { Auth0DecodedHash } from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'zhammer.auth0.com',
    clientID: 'N0Hu8ge6XVTo4VEnIDWpcVqlOyz5VQ7D',
    redirectUri: `${window.location.origin}/callback`,
    responseType: 'token id_token',
    scope: 'openid',
    audience: 'https://zhammer.auth0.com/api/v2/'
  });

  login() {
    this.auth0.authorize();
  }

  async parseAccessToken(): Promise<string> {
    const authResult = await new Promise<Auth0DecodedHash>((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) {
          reject(err);
        } else if (authResult === null) {
          reject('Missing auth result');
        } else {
          resolve(authResult);
        }
      });
    });
    if (!authResult.accessToken) {
      throw new Error('Missing access token');
    }
    return authResult.accessToken;
  }
}
