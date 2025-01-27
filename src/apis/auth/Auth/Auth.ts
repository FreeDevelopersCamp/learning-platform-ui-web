import { ChangePassword, CreateUserDto, Login, Session, Token } from './types';
import { ContentType, HttpClient, RequestParams } from '../../http-client';
import { getDefaultHeaders } from './../../../utils/headers';

export class Auth<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Authentication
   * @name Register
   * @request POST:/Auth/register
   * @secure
   * @response `default` `Token` Register token
   */
  register = (data: CreateUserDto, params: RequestParams = {}) =>
    this.request<any, Token>({
      path: `/Auth/register`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });

  /**
   * No description
   *
   * @tags Authentication
   * @name Login
   * @request POST:/Auth/login
   * @secure
   * @response `default` `Token` login token
   */
  login = (data: Login, params: RequestParams = {}) =>
    this.request<any, Token>({
      path: `/Auth/login`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });

  /**
   * No description
   *
   * @tags Authentication
   * @name ChangePassword
   * @request POST:/Auth/changePassword
   * @secure
   * @response `default` `Token` Change password token
   */
  changePassword = (data: ChangePassword, params: RequestParams = {}) =>
    this.request<any, Token>({
      path: `/Auth/changePassword`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });

  /**
   * No description
   *
   * @tags Authentication
   * @name logout
   * @request POST:/Auth/logout
   * @secure
   * @response `default` `boolean` logout
   */
  logout = (params: RequestParams = {}) =>
    this.request<any, boolean>({
      path: `/Auth/logout`,
      method: 'POST',
      secure: true,
      ...params,
      headers: getDefaultHeaders(),
    });

  /**
   * No description
   *
   * @tags Authentication
   * @name getSession
   * @request GET:/Auth/session
   * @secure
   * @response `default` `` getSession
   */
  getSession = (params: RequestParams = {}) =>
    this.request<any, Session>({
      path: `/Auth/session`,
      method: 'GET',
      secure: true,
      ...params,
    });

  /**
   * No description
   *
   * @tags Authentication
   * @name listSession
   * @request GET:/Auth/sessions
   * @secure
   * @response `default` `` getSession
   */
  listSession = (params: RequestParams = {}) =>
    this.request<any, Session[]>({
      path: `/Auth/sessions`,
      method: 'GET',
      secure: true,
      ...params,
      headers: getDefaultHeaders(),
    });
}
