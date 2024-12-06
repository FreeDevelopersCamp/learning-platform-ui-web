import { ContentType, HttpClient } from '../http-client';

export default class Course extends HttpClient {
  private static course: Course;

  private constructor() {
    super(); // Call the parent class constructor
  }

  public static getCourse(): Course {
    if (!Course.course) {
      Course.course = new Course();
    }
    return Course.course;
  }

  /**
   * Fetch a list of courses with optional pagination.
   *
   * @tags Course
   * @name List
   * @request GET:/course
   * @secure
   * @response `default` List of Courses
   */
  list(params = {}) {
    return this.request({
      path: `/course`,
      method: 'GET',
      secure: true,
      ...params,
    });
  }

  /**
   * Fetch a list of courses by instructor ID with optional pagination.
   *
   * @tags Course
   * @name ListByInstructor
   * @request GET:/course/courseByInstructor/{id}
   * @secure
   * @response `default` List of Courses
   */
  listByInstructor(id: string, params = {}) {
    return this.request({
      path: `/course/courseByInstructor/${id}`,
      method: 'GET',
      secure: true,
      ...params,
    });
  }

  /**
   * Fetch course details by ID.
   *
   * @tags Course
   * @name GetById
   * @request GET:/course/{id}
   * @secure
   * @response `default` Course information
   */
  getById(id: string, params = {}) {
    return this.request({
      path: `/course/${id}`,
      method: 'GET',
      secure: true,
      ...params,
    });
  }

  /**
   * Create a new course.
   *
   * @tags Course
   * @name Create
   * @request POST:/course
   * @secure
   * @response `default` Course created information
   */
  create(data: Record<string, any>, params = {}) {
    return this.request({
      path: `/course`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  }

  /**
   * Update an existing course.
   *
   * @tags Course
   * @name Update
   * @request PATCH:/course
   * @secure
   * @response `default` Course updated information
   */
  update(data: Record<string, any>, params = {}) {
    return this.request({
      path: `/course`,
      method: 'PATCH',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  }

  /**
   * Delete a course by ID.
   *
   * @tags Course
   * @name Delete
   * @request DELETE:/course/{id}
   * @secure
   * @response `default` Deleted result
   */
  delete(id: string, params = {}) {
    return this.request({
      path: `/course/${id}`,
      method: 'DELETE',
      secure: true,
      ...params,
    });
  }
}
