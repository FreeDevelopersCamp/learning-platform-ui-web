import { ContentType, HttpClient } from "../http-client";

export class Owner extends HttpClient {
  /**
   * No description
   *
   * @tags owner
   * @name List
   * @request GET:/owner
   * @secure
   * @response `default` List of owners
   */
  list(params = {}) {
    return this.request({
      path: `/owner`,
      method: "GET",
      secure: true,
      ...params,
    });
  }

  /**
   * No description
   *
   * @tags owner
   * @name Update
   * @request PATCH:/owner
   * @secure
   * @response `default` owner updated information
   */
  update(data, params = {}) {
    return this.request({
      path: `/owner`,
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
   * @tags owner
   * @name GetById
   * @request GET:/owner/{id}
   * @secure
   * @response `default` owner information
   */
  getById(id, params = {}) {
    return this.request({
      path: `/owner/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  }

  /**
   * No description
   *
   * @tags owner
   * @name Delete
   * @request DELETE:/owner/{id}
   * @secure
   * @response `default` Deleted result
   */
  delete(id, params = {}) {
    return this.request({
      path: `/owner/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  }
}
