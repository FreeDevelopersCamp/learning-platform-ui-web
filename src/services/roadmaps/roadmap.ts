import { ContentType, HttpClient } from '../../apis/http-client';

export default class Roadmap extends HttpClient {
  private static roadmap: Roadmap;

  private constructor() {
    super(); // Call the parent class constructor
  }

  public static getroadmap(): Roadmap {
    if (!Roadmap.roadmap) {
      Roadmap.roadmap = new Roadmap();
    }
    return Roadmap.roadmap;
  }

  /**
   * Fetch a list of roadmaps with optional pagination.
   *
   * @tags Roadmap
   * @name List
   * @request GET:/roadmap
   * @secure
   * @response `default` List of Roadmaps
   */
  list(params = {}) {
    return this.request({
      path: `/roadmap`,
      method: 'GET',
      secure: true,
      ...params,
    });
  }

  /**
   * Fetch a list of roadmaps by instructor ID with optional pagination.
   *
   * @tags Roadmap
   * @name ListByInstructor
   * @request GET:/roadmap/roadmapByInstructor/{id}
   * @secure
   * @response `default` List of Roadmaps
   */
  listByInstructor(id: string, params = {}) {
    return this.request({
      path: `/roadmap/roadmapByInstructor/${id}`,
      method: 'GET',
      secure: true,
      ...params,
    });
  }

  /**
   * Fetch roadmap details by ID.
   *
   * @tags Roadmap
   * @name GetById
   * @request GET:/roadmap/{id}
   * @secure
   * @response `default` Roadmap information
   */
  getById(id: string, params = {}) {
    return this.request({
      path: `/roadmap/${id}`,
      method: 'GET',
      secure: true,
      ...params,
    });
  }

  /**
   * Create a new roadmap.
   *
   * @tags Roadmap
   * @name Create
   * @request POST:/roadmap
   * @secure
   * @response `default` Roadmap created information
   */
  create(data: Record<string, any>, params = {}) {
    return this.request({
      path: `/roadmap`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  }

  /**
   * Update an existing roadmap.
   *
   * @tags Roadmap
   * @name Update
   * @request PATCH:/roadmap
   * @secure
   * @response `default` Roadmap updated information
   */
  update(data: Record<string, any>, params = {}) {
    return this.request({
      path: `/roadmap`,
      method: 'PATCH',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  }

  /**
   * Delete a roadmap by ID.
   *
   * @tags Roadmap
   * @name Delete
   * @request DELETE:/roadmap/{id}
   * @secure
   * @response `default` Deleted result
   */
  delete(id: string, params = {}) {
    return this.request({
      path: `/roadmap/${id}`,
      method: 'DELETE',
      secure: true,
      ...params,
    });
  }
}
