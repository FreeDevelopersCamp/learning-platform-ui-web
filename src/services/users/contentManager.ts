import { ContentType, HttpClient } from "../http-client";

export default class ContentManager extends HttpClient {
  private static instance: ContentManager;

  private constructor() {
    super(); // Call the parent class constructor
  }

  public static getInstance(): ContentManager {
    if (!ContentManager.instance) {
      ContentManager.instance = new ContentManager();
    }
    return ContentManager.instance;
  }

  /**
   * No description
   *
   * @tags ContentManager
   * @name List
   * @request GET:/ContentManager
   * @secure
   * @response `default` List of ContentManagers
   */
  list(params = {}) {
    return this.request({
      path: `/ContentManager`,
      method: "GET",
      secure: true,
      ...params,
    });
  }

  /**
   * No description
   *
   * @tags ContentManager
   * @name Update
   * @request PATCH:/ContentManager
   * @secure
   * @response `default` ContentManager updated information
   */
  update(data, params = {}) {
    return this.request({
      path: `/ContentManager`,
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
   * @tags ContentManager
   * @name GetById
   * @request GET:/ContentManager/{id}
   * @secure
   * @response `default` ContentManager information
   */
  getById(id, params = {}) {
    return this.request({
      path: `/ContentManager/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  }

  /**
   * No description
   *
   * @tags ContentManager
   * @name GetByUserId
   * @request GET:/ContentManager/user/userId={id}
   * @secure
   * @response `default` ContentManager information
   */
  getByUserId(id, params = {}) {
    return this.request({
      path: `/ContentManager/user/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  }

  /**
   * No description
   *
   * @tags ContentManager
   * @name Delete
   * @request DELETE:/ContentManager/{id}
   * @secure
   * @response `default` Deleted result
   */
  delete(id, params = {}) {
    return this.request({
      path: `/ContentManager/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  }
}
