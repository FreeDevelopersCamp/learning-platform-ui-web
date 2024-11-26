/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { ContentType, HttpClient } from "../http-client";

export class User extends HttpClient {
  /**
   * No description
   *
   * @tags user
   * @name List
   * @request GET:/user
   * @secure
   * @response `default` List of users
   */
  list(params = {}) {
    return this.request({
      path: `/user`,
      method: "GET",
      secure: true,
      ...params,
    });
  }

  /**
   * No description
   *
   * @tags user
   * @name Update
   * @request PATCH:/user
   * @secure
   * @response `default` User updated information
   */
  update(data, params = {}) {
    return this.request({
      path: `/user`,
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
   * @tags user
   * @name GetById
   * @request GET:/user/{id}
   * @secure
   * @response `default` User information
   */
  getById(id, params = {}) {
    return this.request({
      path: `/user/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  }

  /**
   * No description
   *
   * @tags user
   * @name Delete
   * @request DELETE:/user/{id}
   * @secure
   * @response `default` Deleted result
   */
  delete(id, params = {}) {
    return this.request({
      path: `/user/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  }
}
