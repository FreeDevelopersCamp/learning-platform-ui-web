import { ContentType, HttpClient } from '../../http-client';
import { getDefaultHeaders } from '../../../utils/headers.js';

export default class Progress extends HttpClient {
  /**
   * Fetch a list of progresses.
   *
   * @tags Progress
   * @name List
   * @request GET:/progress
   * @secure
   * @response `default` List of Progresses
   */
  list(params = {}) {
    return this.request({
      path: `/progress`,
      method: 'GET',
      secure: true,
      headers: getDefaultHeaders(),
      ...params,
    });
  }

  /**
   * Fetch progress details by ID.
   *
   * @tags Progress
   * @name GetById
   * @request GET:/progress/{id}
   * @secure
   * @response `default` Progress information
   */
  getById(id: string, params = {}) {
    return this.request({
      path: `/progress/${id}`,
      method: 'GET',
      secure: true,
      headers: getDefaultHeaders(),

      ...params,
    });
  }

  /**
   * Fetch progress details by User ID.
   *
   * @tags Progress
   * @name GetByUserId
   * @request GET:/progress/userId/{userId}
   * @secure
   * @response `default` Progress information by User ID
   */
  getByUserId(userId: string, params = {}) {
    return this.request({
      path: `/progress/userId/${userId}`,
      method: 'GET',
      secure: true,
      headers: getDefaultHeaders(),

      ...params,
    });
  }

  /**
   * Create a new progress.
   *
   * @tags Progress
   * @name Create
   * @request POST:/progress
   * @secure
   * @response `default` Progress created information
   */
  create(data: Record<string, any>, params = {}) {
    return this.request({
      path: `/progress`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      headers: getDefaultHeaders(),

      ...params,
    });
  }

  /**
   * Update an existing progress.
   *
   * @tags Progress
   * @name Update
   * @request PATCH:/progress
   * @secure
   * @response `default` Progress updated information
   */
  update(data: Record<string, any>, params = {}) {
    return this.request({
      path: `/progress`,
      method: 'PATCH',
      body: data,
      secure: true,
      type: ContentType.Json,
      headers: getDefaultHeaders(),

      ...params,
    });
  }

  /**
   * Delete a progress by ID.
   *
   * @tags Progress
   * @name Delete
   * @request DELETE:/progress/{id}
   * @secure
   * @response `default` Deleted result
   */
  delete(id: string, params = {}) {
    return this.request({
      path: `/progress/${id}`,
      method: 'DELETE',
      secure: true,
      headers: getDefaultHeaders(),

      ...params,
    });
  }
}
