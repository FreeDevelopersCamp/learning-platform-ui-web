import { ContentType, HttpClient } from '../../apis/http-client';

export default class Project extends HttpClient {
  private static project: Project;

  private constructor() {
    super(); // Call the parent class constructor
  }

  public static getProject(): Project {
    if (!Project.project) {
      Project.project = new Project();
    }
    return Project.project;
  }

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
  listByInstructor(id: string, params = {}) {
    return this.request({
      path: `/project/projectByInstructor/${id}`,
      method: 'GET',
      secure: true,
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
  getById(id: string, params = {}) {
    return this.request({
      path: `/project/${id}`,
      method: 'GET',
      secure: true,
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
  delete(id: string, params = {}) {
    return this.request({
      path: `/project/${id}`,
      method: 'DELETE',
      secure: true,
      ...params,
    });
  }
}
