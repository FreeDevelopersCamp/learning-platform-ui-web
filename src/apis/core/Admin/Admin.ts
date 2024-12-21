import { ContentType, HttpClient } from '../../http-client';

export default class Admin extends HttpClient {
  private static instance: Admin;

  private constructor() {
    super(); // Call the parent class constructor
  }

  public static getInstance(): Admin {
    if (!Admin.instance) {
      Admin.instance = new Admin();
    }
    return Admin.instance;
  }

  /**
   * No description
   *
   * @tags admin
   * @name List
   * @request GET:/admin
   * @secure
   * @response `default` List of admins
   */
  list(params = {}) {
    return this.request({
      path: `/admin`,
      method: 'GET',
      secure: true,
      ...params,
    });
  }

  /**
   * No description
   *
   * @tags admin
   * @name Update
   * @request PATCH:/admin
   * @secure
   * @response `default` admin updated information
   */
  update(data, params = {}) {
    return this.request({
      path: `/admin`,
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
   * @tags admin
   * @name GetById
   * @request GET:/admin/{id}
   * @secure
   * @response `default` admin information
   */
  getById(id, params = {}) {
    return this.request({
      path: `/admin/${id}`,
      method: 'GET',
      secure: true,
      ...params,
    });
  }

  /**
   * No description
   *
   * @tags admin
   * @name GetByUserId
   * @request GET:/admin/user/userId={id}
   * @secure
   * @response `default` admin information
   */
  getByUserId(id, params = {}) {
    return this.request({
      path: `/admin/user/${id}`,
      method: 'GET',
      secure: true,
      ...params,
    });
  }

  /**
   * No description
   *
   * @tags admin
   * @name Delete
   * @request DELETE:/admin/{id}
   * @secure
   * @response `default` Deleted result
   */
  delete(id, params = {}) {
    return this.request({
      path: `/admin/${id}`,
      method: 'DELETE',
      secure: true,
      ...params,
    });
  }

  /**
   * No description
   *
   * @tags admin
   * @name Approve
   * @request GET:/admin/approve/{id}
   * @secure
   * @response `default` Approve result
   */
  approve(id: string, params = {}) {
    return this.request({
      path: `/admin/approve/${id}`,
      method: 'GET',
      secure: true,
      ...params,
    });
  }

  /**
   * No description
   *
   * @tags admin
   * @name Reject
   * @request DELETE:/admin/reject/{id}
   * @secure
   * @response `default` Reject result
   */
  reject(id: string, params = {}) {
    return this.request({
      path: `/admin/reject/${id}`,
      method: 'DELETE',
      secure: true,
      ...params,
    });
  }

  /**
   * No description
   *
   * @tags admin
   * @name Reject
   * @request DELETE:/admin/reject/{id}
   * @secure
   * @response `default` Reject result
   */
  deactivate(id: string, params = {}) {
    return this.request({
      path: `/admin/deactivate/${id}`,
      method: 'DELETE',
      secure: true,
      ...params,
    });
  }
}
