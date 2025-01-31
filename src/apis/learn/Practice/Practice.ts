import { ContentType, HttpClient } from '../../http-client';
import { getDefaultHeaders } from '../../../utils/headers.js';

export default class Practice extends HttpClient {
  private static instance: Practice;

  private constructor() {
    super();
  }

  public static getInstance(): Practice {
    if (!Practice.instance) {
      Practice.instance = new Practice();
    }
    return Practice.instance;
  }

  /**
   * @tags practice
   * @name List
   * @request GET:/practice
   * @secure
   * @response `default` List of practices
   */
  list(params = {}) {
    return this.request({
      path: `/practice`,
      method: 'GET',
      secure: true,
      ...params,
      headers: getDefaultHeaders(),
    });
  }

  /**
   * @tags practice
   * @name ListByInstructor
   * @request GET:/practice/practiceByInstructor/{id}
   * @secure
   * @response `default` List of practices by instructor
   */
  listByInstructor(id, params = {}) {
    return this.request({
      path: `/practice/practiceByInstructor/${id}`,
      method: 'GET',
      secure: true,
      ...params,
      headers: getDefaultHeaders(),
    });
  }

  /**
   * @tags practice
   * @name GetById
   * @request GET:/practice/{id}
   * @secure
   * @response `default` Practice information
   */
  getById(id, params = {}) {
    return this.request({
      path: `/practice/${id}`,
      method: 'GET',
      secure: true,
      ...params,
      headers: getDefaultHeaders(),
    });
  }

  /**
   * @tags practice
   * @name Create
   * @request POST:/practice
   * @secure
   * @response `default` Practice created information
   */
  create(data, params = {}) {
    return this.request({
      path: `/practice`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
      headers: getDefaultHeaders(),
    });
  }

  /**
   * @tags practice
   * @name Update
   * @request PATCH:/practice
   * @secure
   * @response `default` Practice updated information
   */
  update(data, params = {}) {
    return this.request({
      path: `/practice`,
      method: 'PATCH',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
      headers: getDefaultHeaders(),
    });
  }

  /**
   * @tags practice
   * @name Delete
   * @request DELETE:/practice/{id}
   * @secure
   * @response `default` Deleted result
   */
  delete(id, params = {}) {
    return this.request({
      path: `/practice/${id}`,
      method: 'DELETE',
      secure: true,
      ...params,
      headers: getDefaultHeaders(),
    });
  }
}
