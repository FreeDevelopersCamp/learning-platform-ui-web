import { ContentType, HttpClient } from '../../http-client';

export default class Instructor extends HttpClient {
  private static instance: Instructor;

  private constructor() {
    super(); // Call the parent class constructor
  }

  public static getInstance(): Instructor {
    if (!Instructor.instance) {
      Instructor.instance = new Instructor();
    }
    return Instructor.instance;
  }

  /**
   * No description
   *
   * @tags instructor
   * @name List
   * @request GET:/instructor
   * @secure
   * @response `default` List of instructors
   */
  list(params = {}) {
    return this.request({
      path: `/instructor`,
      method: 'GET',
      secure: true,
      ...params,
    });
  }

  /**
   * No description
   *
   * @tags instructor
   * @name Update
   * @request PATCH:/instructor
   * @secure
   * @response `default` instructor updated information
   */
  update(data, params = {}) {
    return this.request({
      path: `/instructor`,
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
   * @tags instructor
   * @name GetById
   * @request GET:/instructor/{id}
   * @secure
   * @response `default` instructor information
   */
  getById(id, params = {}) {
    return this.request({
      path: `/instructor/${id}`,
      method: 'GET',
      secure: true,
      ...params,
    });
  }

  /**
   * No description
   *
   * @tags instructor
   * @name GetByUserId
   * @request GET:/instructor/user/userId={id}
   * @secure
   * @response `default` instructor information
   */
  getByUserId(id, params = {}) {
    return this.request({
      path: `/instructor/user/${id}`,
      method: 'GET',
      secure: true,
      ...params,
    });
  }

  /**
   * No description
   *
   * @tags instructor
   * @name Delete
   * @request DELETE:/instructor/{id}
   * @secure
   * @response `default` Deleted result
   */
  delete(id, params = {}) {
    return this.request({
      path: `/instructor/${id}`,
      method: 'DELETE',
      secure: true,
      ...params,
    });
  }

  /**
   * No description
   *
   * @tags instructor
   * @name Approve
   * @request GET:/instructor/approve/{id}
   * @secure
   * @response `default` Approve result
   */
  approve(id: string, params = {}) {
    return this.request({
      path: `/instructor/approve/${id}`,
      method: 'GET',
      secure: true,
      ...params,
    });
  }

  /**
   * No description
   *
   * @tags instructor
   * @name Reject
   * @request DELETE:/instructor/reject/{id}
   * @secure
   * @response `default` Reject result
   */
  reject(id: string, params = {}) {
    return this.request({
      path: `/instructor/reject/${id}`,
      method: 'DELETE',
      secure: true,
      ...params,
    });
  }

  /**
   * No description
   *
   * @tags instructor
   * @name Reject
   * @request DELETE:/instructor/reject/{id}
   * @secure
   * @response `default` Reject result
   */
  deactivate(id: string, params = {}) {
    return this.request({
      path: `/instructor/deactivate/${id}`,
      method: 'DELETE',
      secure: true,
      ...params,
    });
  }
}
