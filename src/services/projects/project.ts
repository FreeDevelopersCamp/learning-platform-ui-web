import { ContentType, HttpClient } from '../../apis/http-client';
import { getDefaultHeaders } from '../../utils/headers.js';

export default class Project extends HttpClient {
  /**
   * Fetch a list of projects with optional pagination.
   *
   * @tags Project
   * @name List
   * @request GET:/project
   * @secure
   * @response `default` List of Projects
   */
  list(params = {}) {
    return this.request({
      path: `/project`,
      method: 'GET',
      secure: true,
      headers: getDefaultHeaders(),
      ...params,
    });
  }

  /**
   * Fetch a list of projects by instructor ID with optional pagination.
   *
   * @tags Project
   * @name ListByInstructor
   * @request GET:/project/projectByInstructor/{id}
   * @secure
   * @response `default` List of Projects
   */
  listByInstructor(instructorId: string, params = {}) {
    return this.request({
      path: `/project/projectByInstructor/${instructorId}`,
      method: 'GET',
      secure: true,
      headers: getDefaultHeaders(),
      ...params,
    });
  }

  /**
   * Fetch project details by ID.
   *
   * @tags Project
   * @name GetById
   * @request GET:/project/{id}
   * @secure
   * @response `default` Project information
   */
  getById(projectId: string, params = {}) {
    return this.request({
      path: `/project/${projectId}`,
      method: 'GET',
      secure: true,
      headers: getDefaultHeaders(),
      ...params,
    });
  }

  /**
   * Create a new project.
   *
   * @tags Project
   * @name Create
   * @request POST:/project
   * @secure
   * @response `default` Project created information
   */
  create(data: Record<string, any>, params = {}) {
    return this.request({
      path: `/project`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      headers: getDefaultHeaders(),
      ...params,
    });
  }

  /**
   * Update an existing project.
   *
   * @tags Project
   * @name Update
   * @request PATCH:/project
   * @secure
   * @response `default` Project updated information
   */
  update(data: Record<string, any>, params = {}) {
    return this.request({
      path: `/project`,
      method: 'PATCH',
      body: data,
      secure: true,
      type: ContentType.Json,
      headers: getDefaultHeaders(),
      ...params,
    });
  }

  /**
   * Delete a project by ID.
   *
   * @tags Project
   * @name Delete
   * @request DELETE:/project/{id}
   * @secure
   * @response `default` Deleted result
   */
  delete(projectId: string, params = {}) {
    return this.request({
      path: `/project/${projectId}`,
      method: 'DELETE',
      secure: true,
      headers: getDefaultHeaders(),
      ...params,
    });
  }
}
