import { HttpClient } from '../../http-client';
import { getDefaultHeaders } from '../../../utils/headers.js';

export class Image<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * Uploads an image file for a specific user.
   * @param data The FormData containing the file.
   * @param userId The ID of the user uploading the image.
   * @param params Additional request parameters.
   */
  uploadImage = async (formData: FormData, userId: string) => {
    return this.request<any, { imageUrl: string }>({
      path: `/image/upload/${userId}`, // Append userId correctly
      method: 'POST',
      body: formData, // Send FormData directly
      headers: getDefaultHeaders(),
    });
  };
}
