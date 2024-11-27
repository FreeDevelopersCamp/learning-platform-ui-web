import { ContentType, HttpClient } from "../http-client";

export class ContentManager extends HttpClient {
  /**
   * No description
   *
   * @tags contentManager
   * @name List
   * @request GET:/contentManager
   * @secure
   * @response `default` List of contentManagers
   */
  list(params = {}) {
    return this.request({
      path: `/contentManager`,
      method: "GET",
      secure: true,
      ...params,
    });
  }

  /**
   * No description
   *
   * @tags contentManager
   * @name Update
   * @request PATCH:/contentManager
   * @secure
   * @response `default` contentManager updated information
   */
  update(data, params = {}) {
    return this.request({
      path: `/contentManager`,
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
   * @tags contentManager
   * @name GetById
   * @request GET:/contentManager/{id}
   * @secure
   * @response `default` contentManager information
   */
  getById(id, params = {}) {
    return this.request({
      path: `/contentManager/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  }

  /**
   * No description
   *
   * @tags contentManager
   * @name Delete
   * @request DELETE:/contentManager/{id}
   * @secure
   * @response `default` Deleted result
   */
  delete(id, params = {}) {
    return this.request({
      path: `/contentManager/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  }
}
