import { ContentType, HttpClient } from "../http-client";

export class Instructor extends HttpClient {
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
      method: "GET",
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
   * @tags instructor
   * @name GetById
   * @request GET:/instructor/{id}
   * @secure
   * @response `default` instructor information
   */
  getById(id, params = {}) {
    return this.request({
      path: `/instructor/${id}`,
      method: "GET",
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
      method: "DELETE",
      secure: true,
      ...params,
    });
  }
}
