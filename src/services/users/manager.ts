import { ContentType, HttpClient } from "../http-client";

export default class Manager extends HttpClient {
  private static instance: Manager;

  private constructor() {
    super(); // Call the parent class constructor
  }

  public static getInstance(): Manager {
    if (!Manager.instance) {
      Manager.instance = new Manager();
    }
    return Manager.instance;
  }

  /**
   * No description
   *
   * @tags manager
   * @name List
   * @request GET:/manager
   * @secure
   * @response `default` List of managers
   */
  list(params = {}) {
    return this.request({
      path: `/manager`,
      method: "GET",
      secure: true,
      ...params,
    });
  }

  /**
   * No description
   *
   * @tags manager
   * @name Update
   * @request PATCH:/manager
   * @secure
   * @response `default` manager updated information
   */
  update(data, params = {}) {
    return this.request({
      path: `/manager`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  }

  /**
   * No description
   *
   * @tags manager
   * @name GetById
   * @request GET:/manager/{id}
   * @secure
   * @response `default` manager information
   */
  getById(id, params = {}) {
    return this.request({
      path: `/manager/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  }

  /**
   * No description
   *
   * @tags manager
   * @name GetByUserId
   * @request GET:/manager/user/userId={id}
   * @secure
   * @response `default` manager information
   */
  getByUserId(id, params = {}) {
    return this.request({
      path: `/manager/user/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  }

  /**
   * No description
   *
   * @tags manager
   * @name Delete
   * @request DELETE:/manager/{id}
   * @secure
   * @response `default` Deleted result
   */
  delete(id, params = {}) {
    return this.request({
      path: `/manager/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  }

  /**
   * No description
   *
   * @tags manager
   * @name Approve
   * @request GET:/manager/approve/{id}
   * @secure
   * @response `default` Approve result
   */
  approve(id: string, params = {}) {
    return this.request({
      path: `/manager/approve/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  }

  /**
   * No description
   *
   * @tags manager
   * @name Reject
   * @request DELETE:/manager/reject/{id}
   * @secure
   * @response `default` Reject result
   */
  reject(id: string, params = {}) {
    return this.request({
      path: `/manager/reject/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  }

  /**
   * No description
   *
   * @tags manager
   * @name Reject
   * @request DELETE:/manager/reject/{id}
   * @secure
   * @response `default` Reject result
   */
  deactivate(id: string, params = {}) {
    return this.request({
      path: `/manager/deactivate/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  }
}
