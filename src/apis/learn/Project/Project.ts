import { ContentType, HttpClient } from '../../http-client';
import { getDefaultHeaders } from '../../../utils/headers.js';

export default class Project extends HttpClient {
  private static instance: Project;

  private constructor() {
    super();
  }

  public static getInstance(): Project {
    if (!Project.instance) {
      Project.instance = new Project();
    }
    return Project.instance;
  }

  /**
   * @tags project
   * @name List
   * @request GET:/project
   * @secure
   * @response `default` List of projects
   */
  list(params = {}) {
    return this.request({
      path: `/project`,
      method: 'GET',
      secure: true,
      ...params,
      headers: getDefaultHeaders(),
    });
  }

  /**
   * @tags project
   * @name ListByInstructor
   * @request GET:/project/projectByInstructor/{id}
   * @secure
   * @response `default` List of projects by instructor
   */
  listByInstructor(id, params = {}) {
    return this.request({
      path: `/project/projectByInstructor/${id}`,
      method: 'GET',
      secure: true,
      ...params,
      headers: getDefaultHeaders(),
    });
  }

  /**
   * @tags project
   * @name GetById
   * @request GET:/project/{id}
   * @secure
   * @response `default` Project information
   */
  getById(id, params = {}) {
    return this.request({
      path: `/project/${id}`,
      method: 'GET',
      secure: true,
      ...params,
      headers: getDefaultHeaders(),
    });
  }

  /**
   * @tags project
   * @name Create
   * @request POST:/project
   * @secure
   * @response `default` Project created information
   */
  create(data, params = {}) {
    return this.request({
      path: `/project`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
      headers: getDefaultHeaders(),
    });
  }

  /**
   * @tags project
   * @name Update
   * @request PATCH:/project/{id}
   * @secure
   * @response `default` Project updated information
   */
  update(data, params = {}) {
    return this.request({
      path: `/project`,
      method: 'PATCH',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
      headers: getDefaultHeaders(),
    });
  }

  /**
   * @tags project
   * @name Delete
   * @request DELETE:/project/{id}
   * @secure
   * @response `default` Deleted result
   */
  delete(id, params = {}) {
    return this.request({
      path: `/project/${id}`,
      method: 'DELETE',
      secure: true,
      ...params,
      headers: getDefaultHeaders(),
    });
  }
}
