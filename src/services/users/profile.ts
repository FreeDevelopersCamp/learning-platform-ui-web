import { ContentType, HttpClient } from '../http-client';

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
      ...params,
    });
  }
}
