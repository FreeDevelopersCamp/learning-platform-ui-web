import { ContentType, HttpClient } from '../../http-client';
import { getDefaultHeaders } from '../../../utils/headers.js';

export default class Roadmap extends HttpClient {
  private static instance: Roadmap;

  private constructor() {
    super();
  }

  public static getInstance(): Roadmap {
    if (!Roadmap.instance) {
      Roadmap.instance = new Roadmap();
    }
    return Roadmap.instance;
  }

  /**
   * @tags roadmap
   * @name List
   * @request GET:/roadmap
   * @secure
   * @response `default` List of roadmaps
   */
  list(params = {}) {
    return this.request({
      path: `/roadmap`,
      method: 'GET',
      secure: true,
      ...params,
      headers: getDefaultHeaders(),
    });
  }

  /**
   * @tags roadmap
   * @name ListByInstructor
   * @request GET:/roadmap/roadmapByInstructor/{id}
   * @secure
   * @response `default` List of roadmaps by instructor
   */
  listByInstructor(instructorId, params = {}) {
    return this.request({
      path: `/roadmap/roadmapByInstructor/${instructorId}`,
      method: 'GET',
      secure: true,
      ...params,
      headers: getDefaultHeaders(),
    });
  }

  /**
   * @tags roadmap
   * @name GetById
   * @request GET:/roadmap/{id}
   * @secure
   * @response `default` Roadmap details
   */
  getById(id, params = {}) {
    return this.request({
      path: `/roadmap/${id}`,
      method: 'GET',
      secure: true,
      ...params,
      headers: getDefaultHeaders(),
    });
  }

  /**
   * @tags roadmap
   * @name Create
   * @request POST:/roadmap
   * @secure
   * @response `default` Roadmap created successfully
   */
  create(data, params = {}) {
    return this.request({
      path: `/roadmap`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
      headers: getDefaultHeaders(),
    });
  }

  /**
   * @tags roadmap
   * @name Update
   * @request PATCH:/roadmap/{id}
   * @secure
   * @response `default` Roadmap updated successfully
   */
  update(data, params = {}) {
    return this.request({
      path: `/roadmap`,
      method: 'PATCH',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
      headers: getDefaultHeaders(),
    });
  }

  /**
   * @tags roadmap
   * @name Delete
   * @request DELETE:/roadmap/{id}
   * @secure
   * @response `default` Roadmap deleted successfully
   */
  delete(id, params = {}) {
    return this.request({
      path: `/roadmap/${id}`,
      method: 'DELETE',
      secure: true,
      ...params,
      headers: getDefaultHeaders(),
    });
  }
}
