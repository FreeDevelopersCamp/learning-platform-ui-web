import { ContentType, HttpClient } from '../../http-client';
import { getDefaultHeaders } from '../../../utils/headers.js';

export default class Course extends HttpClient {
  private static instance: Course;

  private constructor() {
    super();
  }

  public static getInstance(): Course {
    if (!Course.instance) {
      Course.instance = new Course();
    }
    return Course.instance;
  }

  /**
   * @tags course
   * @name List
   * @request GET:/course
   * @secure
   * @response `default` List of courses
   */
  list(params = {}) {
    return this.request({
      path: `/course`,
      method: 'GET',
      secure: true,
      ...params,
      headers: getDefaultHeaders(),
    });
  }

  /**
   * @tags course
   * @name ListByInstructor
   * @request GET:/course/courseByInstructor/{id}
   * @secure
   * @response `default` List of courses by instructor
   */
  listByInstructor(id, params = {}) {
    return this.request({
      path: `/course/courseByInstructor/${id}`,
      method: 'GET',
      secure: true,
      ...params,
      headers: getDefaultHeaders(),
    });
  }

  /**
   * @tags course
   * @name GetById
   * @request GET:/course/{id}
   * @secure
   * @response `default` Course information
   */
  getById(id, params = {}) {
    return this.request({
      path: `/course/${id}`,
      method: 'GET',
      secure: true,
      ...params,
      headers: getDefaultHeaders(),
    });
  }

  /**
   * @tags course
   * @name Create
   * @request POST:/course
   * @secure
   * @response `default` Course created information
   */
  create(data, params = {}) {
    return this.request({
      path: `/course`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
      headers: getDefaultHeaders(),
    });
  }

  /**
   * @tags course
   * @name Update
   * @request PATCH:/course
   * @secure
   * @response `default` Course updated information
   */
  update(data, params = {}) {
    return this.request({
      path: `/course`,
      method: 'PATCH',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
      headers: getDefaultHeaders(),
    });
  }

  /**
   * @tags course
   * @name Delete
   * @request DELETE:/course/{id}
   * @secure
   * @response `default` Deleted result
   */
  delete(id, params = {}) {
    return this.request({
      path: `/course/${id}`,
      method: 'DELETE',
      secure: true,
      ...params,
      headers: getDefaultHeaders(),
    });
  }
}
