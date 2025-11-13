import axios from 'axios';
import { toast } from 'sonner';

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY;
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

export interface CloudinaryUploadOptions {
  folder?: string;
  tags?: string[];
  quality?: string | number;
  onProgress?: (percent: number) => void;
}

export interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
}

/**
 * Upload single image to Cloudinary
 * @param file - Image file to upload
 * @param options - Additional upload options
 * @returns URL of uploaded image
 */
export const uploadImageToCloudinary = async (
  file: File,
  options: CloudinaryUploadOptions = {}
): Promise<string> => {
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
    throw new Error(
      'Cloudinary configuration is missing. Please check your environment variables.'
    );
  }

  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    if (CLOUDINARY_API_KEY) {
      formData.append('api_key', CLOUDINARY_API_KEY);
    }

    // Optional: Add folder organization
    if (options.folder) {
      formData.append('folder', options.folder);
    }

    // Optional: Add tags for better organization
    if (options.tags && options.tags.length > 0) {
      formData.append('tags', options.tags.join(','));
    }

    // Optional: Set quality
    if (options.quality) {
      formData.append('quality', String(options.quality));
    }

    const response = await axios.post<CloudinaryResponse>(
      CLOUDINARY_URL,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: progressEvent => {
          if (options.onProgress && progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            options.onProgress(percentCompleted);
          }
        },
      }
    );

    return response.data.secure_url;
  } catch (error) {
    toast.error('Upload ảnh thất bại!');
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.error?.message || 'Failed to upload image'
      );
    }
    throw new Error('Failed to upload image');
  }
};

/**
 * Upload multiple images to Cloudinary
 * @param files - Array of image files
 * @param options - Additional upload options
 * @returns Array of uploaded image URLs
 */
export const uploadMultipleImages = async (
  files: File[],
  options: CloudinaryUploadOptions = {}
): Promise<string[]> => {
  try {
    const uploadPromises = files.map(file =>
      uploadImageToCloudinary(file, {
        ...options,
        onProgress: percent => {
          if (options.onProgress) {
            // For multiple uploads, you might want to track progress per file
            // This is a simplified version
            options.onProgress(percent);
          }
        },
      })
    );

    const urls = await Promise.all(uploadPromises);
    return urls;
  } catch (error) {
    toast.error('Upload ảnh thất bại!');
    throw error;
  }
};

/**
 * Extract public ID from Cloudinary URL
 * @param url - Cloudinary URL
 * @returns Public ID or null if invalid
 */
export const extractPublicId = (url: string): string | null => {
  try {
    if (!url || !url.includes('cloudinary.com')) {
      return null;
    }

    const parts = url.split('/');
    const filename = parts[parts.length - 1];
    const publicId = filename.split('.')[0];

    // Extract folder path if exists
    const uploadIndex = url.indexOf('/upload/');
    if (uploadIndex !== -1) {
      const afterUpload = url.substring(uploadIndex + 8);
      const transformIndex = afterUpload.indexOf('/');
      if (transformIndex !== -1) {
        const pathPart = afterUpload.substring(transformIndex + 1);
        const pathWithoutExt = pathPart.split('.')[0];
        return pathWithoutExt;
      }
    }

    return publicId;
  } catch {
    toast.error('Lỗi khi trích xuất public ID!');
    return null;
  }
};

/**
 * Generate optimized URL with transformations
 * @param url - Original Cloudinary URL
 * @param transformations - Transformation options
 * @returns Optimized URL
 */
export interface ImageTransformations {
  width?: number;
  height?: number;
  crop?: 'fill' | 'fit' | 'scale' | 'thumb' | 'crop';
  quality?: 'auto' | 'auto:good' | 'auto:best' | number;
  format?: 'auto' | 'jpg' | 'png' | 'webp' | 'gif';
}

export const getOptimizedImageUrl = (
  url: string,
  transformations: ImageTransformations = {}
): string => {
  const {
    width,
    height,
    crop = 'fill',
    quality = 'auto',
    format = 'auto',
  } = transformations;

  if (!url || !url.includes('cloudinary.com')) {
    return url;
  }

  const parts = url.split('/upload/');
  if (parts.length !== 2) return url;

  const transforms: string[] = [];

  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  transforms.push(`c_${crop}`);
  transforms.push(`q_${quality}`);
  transforms.push(`f_${format}`);

  return `${parts[0]}/upload/${transforms.join(',')}/${parts[1]}`;
};

/**
 * Delete image from Cloudinary
 * Note: This should be done through backend API for security
 * @param publicId - Public ID of image to delete
 */
export const deleteImageFromCloudinary = async (): Promise<void> => {
  // console.warn(
  //   'Image deletion should be handled by backend for security. Please implement this through your backend API.'
  // );
  throw new Error(
    'Please implement image deletion through your backend API for security reasons.'
  );
};

const cloudinaryService = {
  uploadImageToCloudinary,
  uploadMultipleImages,
  deleteImageFromCloudinary,
  extractPublicId,
  getOptimizedImageUrl,
};

export default cloudinaryService;
