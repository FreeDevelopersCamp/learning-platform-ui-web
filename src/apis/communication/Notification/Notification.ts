import { ContentType, HttpClient } from '../../http-client';
import { getDefaultHeaders } from '../../../utils/headers.js';

export default class Notification extends HttpClient {
  private static instance: Notification;

  private constructor() {
    super(); // Call the parent class constructor
  }

  public static getInstance(): Notification {
    if (!Notification.instance) {
      Notification.instance = new Notification();
    }
    return Notification.instance;
  }

  /**
   * Fetch notifications for a user
   *
   * @tags notifications
   * @name ListByUserId
   * @request GET:/notifications/user/{userId}
   * @secure
   * @response `default` List of notifications
   */
  listByUserId(userId: string, params = {}) {
    return this.request({
      path: `/notification/user/${userId}`,
      method: 'GET',
      secure: true,
      ...params,
      headers: getDefaultHeaders(),
    });
  }

  /**
   * Mark a notification as seen
   *
   * @tags
   * @name update
   * @request PATCH:/notifications/{id}
   * @secure
   * @response `default` Updated notification
   */
  update(id: string, status: string, params = {}) {
    return this.request({
      path: `/notification/${id}`,
      method: 'PATCH',
      body: JSON.stringify({ status }), // 🔥 Fix here
      secure: true,
      type: ContentType.Json,
      ...params,
      headers: {
        ...getDefaultHeaders(),
        'Content-Type': 'application/json', // 🔥 Explicitly set Content-Type
      },
    });
  }

  /**
   * Delete a notification
   *
   * @tags notifications
   * @name Delete
   * @request DELETE:/notifications/{id}
   * @secure
   * @response `default` Deleted notification
   */
  delete(id: string, params = {}) {
    return this.request({
      path: `/notification/${id}`,
      method: 'DELETE',
      secure: true,
      ...params,
      headers: getDefaultHeaders(),
    });
  }
}
