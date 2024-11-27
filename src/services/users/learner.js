import { ContentType, HttpClient } from "../http-client";

export class Learner extends HttpClient {
  /**
   * No description
   *
   * @tags learner
   * @name List
   * @request GET:/learner
   * @secure
   * @response `default` List of learners
   */
  list(params = {}) {
    return this.request({
      path: `/learner`,
      method: "GET",
      secure: true,
      ...params,
    });
  }

  /**
   * No description
   *
   * @tags learner
   * @name Update
   * @request PATCH:/learner
   * @secure
   * @response `default` learner updated information
   */
  update(data, params = {}) {
    return this.request({
      path: `/learner`,
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
   * @tags learner
   * @name GetById
   * @request GET:/learner/{id}
   * @secure
   * @response `default` learner information
   */
  getById(id, params = {}) {
    return this.request({
      path: `/learner/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  }

  /**
   * No description
   *
   * @tags learner
   * @name Delete
   * @request DELETE:/learner/{id}
   * @secure
   * @response `default` Deleted result
   */
  delete(id, params = {}) {
    return this.request({
      path: `/learner/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  }
}
