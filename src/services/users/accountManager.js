import { ContentType, HttpClient } from "../http-client";

export class AccountManager extends HttpClient {
  /**
   * No description
   *
   * @tags accountManager
   * @name List
   * @request GET:/accountManager
   * @secure
   * @response `default` List of accountManagers
   */
  list(params = {}) {
    return this.request({
      path: `/accountManager`,
      method: "GET",
      secure: true,
      ...params,
    });
  }

  /**
   * No description
   *
   * @tags accountManager
   * @name Update
   * @request PATCH:/accountManager
   * @secure
   * @response `default` accountManager updated information
   */
  update(data, params = {}) {
    return this.request({
      path: `/accountManager`,
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
   * @tags accountManager
   * @name GetById
   * @request GET:/accountManager/{id}
   * @secure
   * @response `default` accountManager information
   */
  getById(id, params = {}) {
    return this.request({
      path: `/accountManager/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  }

  /**
   * No description
   *
   * @tags accountManager
   * @name Delete
   * @request DELETE:/accountManager/{id}
   * @secure
   * @response `default` Deleted result
   */
  delete(id, params = {}) {
    return this.request({
      path: `/accountManager/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  }
}
