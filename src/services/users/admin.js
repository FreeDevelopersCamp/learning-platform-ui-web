import { ContentType, HttpClient } from "../http-client";

export class Admin extends HttpClient {
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
      method: "GET",
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
   * @tags admin
   * @name GetById
   * @request GET:/admin/{id}
   * @secure
   * @response `default` admin information
   */
  getById(id, params = {}) {
    return this.request({
      path: `/admin/${id}`,
      method: "GET",
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
      method: "DELETE",
      secure: true,
      ...params,
    });
  }
}
