import { ContentType, HttpClient } from '../../http-client';
import { getDefaultHeaders } from '../../../utils/headers';

export class User extends HttpClient {
  /**
   * No description
   *
   * @tags user
   * @name List
   * @request GET:/user
   * @secure
   * @response `default` List of users
   */
  list(params = {}) {
    return this.request({
      path: `/user`,
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
   * @name Update
   * @request PATCH:/user
   * @secure
   * @response `default` User updated information
   */
  update(data, params = {}) {
    return this.request({
      path: `/user`,
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
   * @tags user
   * @name GetByUserName
   * @request GET:/user/userId/{userName}
   * @secure
   * @response `default` User information
   */
  getByUserName(userName: string, params = {}) {
    return this.request({
      path: `/user/getByUserName/${userName}`,
      method: 'GET',
      headers: getDefaultHeaders(),
      secure: true,
      ...params,
    });
  }

  /**
   * No description
   *
   * @tags user
   * @name GetById
   * @request GET:/user/{id}
   * @secure
   * @response `default` User information
   */
  getById(id: string, params = {}) {
    return this.request({
      path: `/user/${id}`,
      method: 'GET',
      headers: getDefaultHeaders(),
      secure: true,
      ...params,
    });
  }

  /**
   * No description
   *
   * @tags user
   * @name Delete
   * @request DELETE:/user/{id}
   * @secure
   * @response `default` Deleted result
   */
  delete(id: string, params = {}) {
    return this.request({
      path: `/user/${id}`,
      method: 'DELETE',
      headers: getDefaultHeaders(),
      secure: true,
      ...params,
    });
  }
}
