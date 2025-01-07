import { ContentType, HttpClient } from '../../http-client';
import { getDefaultHeaders } from '../../../utils/headers';

export class Profile extends HttpClient {
  /**
   * No description
   *
   * @tags profile
   * @name Update
   * @request PATCH:/profile
   * @secure
   * @response `default` Profile updated information
   */
  update(data, params = {}) {
    return this.request({
      path: `/profile`,
      method: 'PATCH',
      body: data,
      secure: true,
      headers: getDefaultHeaders(),
      type: ContentType.Json,
      ...params,
    });
  }

  /**
   * No description
   *
   * @tags profile
   * @name GetById
   * @request GET:/profile/{id}
   * @secure
   * @response `default` Profile information
   */
  getById(id: string, params = {}) {
    return this.request({
      path: `/profile/${id}`,
      method: 'GET',
      secure: true,
      headers: getDefaultHeaders(),

      ...params,
    });
  }

  /**
   * No description
   *
   * @tags user
   * @name GetByUserName
   * @request GET:/profile/userId/{userName}
   * @secure
   * @response `default` User information
   */
  getByUserName(userName: string, params = {}) {
    return this.request({
      path: `/profile/getByUserName/${userName}`,
      method: 'GET',
      headers: getDefaultHeaders(),
      secure: true,
      ...params,
    });
  }
}
