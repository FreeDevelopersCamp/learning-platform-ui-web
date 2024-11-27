import { ContentType, HttpClient } from "../http-client";

export default class Learner extends HttpClient {
  private static instance: Learner;

  private constructor() {
    super(); // Call the parent class constructor
  }

  public static getInstance(): Learner {
    if (!Learner.instance) {
      Learner.instance = new Learner();
    }
    return Learner.instance;
  }

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
   * @name GetByUserId
   * @request GET:/learner/user/userId={id}
   * @secure
   * @response `default` learner information
   */
  getByUserId(id, params = {}) {
    return this.request({
      path: `/learner/user/${id}`,
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

  /**
   * No description
   *
   * @tags learner
   * @name Approve
   * @request GET:/learner/approve/{id}
   * @secure
   * @response `default` Approve result
   */
  approve(id: string, params = {}) {
    return this.request({
      path: `/learner/approve/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  }
}
