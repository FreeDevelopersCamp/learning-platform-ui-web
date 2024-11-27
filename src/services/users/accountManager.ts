import { ContentType, HttpClient } from "../http-client";

export default class AccountManager extends HttpClient {
  private static instance: AccountManager;

  private constructor() {
    super(); // Call the parent class constructor
  }

  public static getInstance(): AccountManager {
    if (!AccountManager.instance) {
      AccountManager.instance = new AccountManager();
    }
    return AccountManager.instance;
  }

  /**
   * No description
   *
   * @tags AccountManager
   * @name List
   * @request GET:/AccountManager
   * @secure
   * @response `default` List of AccountManagers
   */
  list(params = {}) {
    return this.request({
      path: `/AccountManager`,
      method: "GET",
      secure: true,
      ...params,
    });
  }

  /**
   * No description
   *
   * @tags AccountManager
   * @name Update
   * @request PATCH:/AccountManager
   * @secure
   * @response `default` AccountManager updated information
   */
  update(data, params = {}) {
    return this.request({
      path: `/AccountManager`,
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
   * @tags AccountManager
   * @name GetById
   * @request GET:/AccountManager/{id}
   * @secure
   * @response `default` AccountManager information
   */
  getById(id, params = {}) {
    return this.request({
      path: `/AccountManager/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  }

  /**
   * No description
   *
   * @tags AccountManager
   * @name GetByUserId
   * @request GET:/AccountManager/user/userId={id}
   * @secure
   * @response `default` AccountManager information
   */
  getByUserId(id, params = {}) {
    return this.request({
      path: `/AccountManager/user/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  }

  /**
   * No description
   *
   * @tags AccountManager
   * @name Delete
   * @request DELETE:/AccountManager/{id}
   * @secure
   * @response `default` Deleted result
   */
  delete(id, params = {}) {
    return this.request({
      path: `/AccountManager/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  }
}
