import { ContentType, HttpClient } from "../http-client";

export default class Owner extends HttpClient {
  private static instance: Owner;

  private constructor() {
    super(); // Call the parent class constructor
  }

  public static getInstance(): Owner {
    if (!Owner.instance) {
      Owner.instance = new Owner();
    }
    return Owner.instance;
  }

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
   * @name GetByUserId
   * @request GET:/owner/user/userId={id}
   * @secure
   * @response `default` owner information
   */
  getByUserId(id, params = {}) {
    return this.request({
      path: `/owner/user/${id}`,
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
