import { Auth0Gateway as Auth0GatewayInterface, UserInfo } from '../types';
import request from 'superagent';
import { Auth0Error } from '../exceptions';

export default class Auth0Gateway implements Auth0GatewayInterface {
  private url: string = 'https://zhammer.auth0.com/api/v2';
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  async fetchUserInfo(auth0UserId: string): Promise<UserInfo> {
    const response = await request
      .get(`${this.url}/users/${auth0UserId}`)
      .set('Authorization', `Bearer ${this.accessToken}`);
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
