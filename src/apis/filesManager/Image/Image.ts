import { ContentType, HttpClient, RequestParams } from '../../http-client';
import { Token } from '../../auth/Auth/types';

export class Image<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @name uploadImage
   * @request POST:/image/upload
   * @response `default` `ResourceImageDto` Upload file
   */
  uploadImage = (
    data: {
      /** @format binary */
      file?: File;
    },
    params: RequestParams = {},
  ) =>
    this.request<any, Token>({
      path: `/image/upload`,
      method: 'POST',
      body: data,
      type: ContentType.FormData,
      ...params,
    });
}
