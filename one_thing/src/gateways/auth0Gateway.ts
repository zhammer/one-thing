import { Auth0Gateway as Auth0GatewayInterface, UserInfo } from '../types';
import request from 'superagent';
import { Auth0Error } from '../exceptions';

export default class Auth0Gateway implements Auth0GatewayInterface {
  private readonly base: string = 'https://zhammer.auth0.com';
  private readonly clientId: string;
  private readonly clientSecret: string;

  constructor(clientId: string, clientSecret: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  private async fetchAccessToken(): Promise<string> {
    const response = await request.post(`${this.base}/oauth/token`).send({
      grant_type: 'client_credentials',
      client_id: this.clientId,
      client_secret: this.clientSecret,
      audience: 'https://zhammer.auth0.com/api/v2/'
    });
    return response.body.access_token;
  }

  async fetchUserInfo(auth0UserId: string): Promise<UserInfo> {
    const accessToken = await this.fetchAccessToken();
    const response = await request
      .get(`${this.base}/api/v2/users/${auth0UserId}`)
      .set('Authorization', `Bearer ${accessToken}`);
    if (response.status !== 200) {
      throw new Auth0Error();
    }
    return pluckUserInfo(response.body);
  }
}

function pluckUserInfo(body: any): UserInfo {
  return {
    email: body.email,
    firstName: body.given_name,
    lastName: body.family_name
  };
}
