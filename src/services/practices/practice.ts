import { ContentType, HttpClient } from '../../apis/http-client';

export default class Practice extends HttpClient {
  private static practice: Practice;

  private constructor() {
    super(); // Call the parent class constructor
  }

  public static getPractice(): Practice {
    if (!Practice.practice) {
      Practice.practice = new Practice();
    }
    return Practice.practice;
  }

  /**
   * Fetch a list of practices with optional pagination.
   *
   * @tags Practice
   * @name List
   * @request GET:/practice
   * @secure
   * @response `default` List of Practices
   */
  list(params = {}) {
    return this.request({
      path: `/practice`,
      method: 'GET',
      secure: true,
      ...params,
    });
  }

  /**
   * Fetch a list of practices by instructor ID with optional pagination.
   *
   * @tags Practice
   * @name ListByInstructor
   * @request GET:/practice/practiceByInstructor/{id}
   * @secure
   * @response `default` List of Practices
   */
  listByInstructor(id: string, params = {}) {
    return this.request({
      path: `/practice/practiceByInstructor/${id}`,
      method: 'GET',
      secure: true,
      ...params,
    });
  }

  /**
   * Fetch practice details by ID.
   *
   * @tags Practice
   * @name GetById
   * @request GET:/practice/{id}
   * @secure
   * @response `default` Practice information
   */
  getById(id: string, params = {}) {
    return this.request({
      path: `/practice/${id}`,
      method: 'GET',
      secure: true,
      ...params,
    });
  }

  /**
   * Create a new practice.
   *
   * @tags Practice
   * @name Create
   * @request POST:/practice
   * @secure
   * @response `default` Practice created information
   */
  create(data: Record<string, any>, params = {}) {
    return this.request({
      path: `/practice`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  }

  /**
   * Update an existing practice.
   *
   * @tags Practice
   * @name Update
   * @request PATCH:/practice
   * @secure
   * @response `default` Practice updated information
   */
  update(data: Record<string, any>, params = {}) {
    return this.request({
      path: `/practice`,
      method: 'PATCH',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  }

  /**
   * Delete a practice by ID.
   *
   * @tags Practice
   * @name Delete
   * @request DELETE:/practice/{id}
   * @secure
   * @response `default` Deleted result
   */
  delete(id: string, params = {}) {
    return this.request({
      path: `/practice/${id}`,
      method: 'DELETE',
      secure: true,
      ...params,
    });
  }
}
