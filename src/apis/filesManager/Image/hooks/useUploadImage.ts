import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { Image } from '../Image';

export function useUploadImage() {
  const imageService = new Image();

  const { mutate: uploadImage, isLoading: isUploading } = useMutation(
    async ({ file, userId }: { file: File; userId: string }) => {
      const formData = new FormData();
      formData.append('file', file);
      return imageService.uploadImage(formData, userId);
    },
    {
      onSuccess: (data) => {
        toast.success('Image uploaded successfully!');
      },
      onError: (error: any) => {
        console.error(
          'Upload failed in hook:',
          error.response || error.message,
        );
        toast.error(
          error.response?.data?.message || 'Failed to upload the image',
        );
      },
    },
  );

  return { uploadImage, isUploading };
}
