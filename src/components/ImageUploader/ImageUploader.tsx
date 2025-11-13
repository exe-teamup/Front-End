import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import cloudinaryService, {
  type CloudinaryUploadOptions,
} from '@/services/cloudinaryService';
import imageUtils from '@/utils/imageUtils';

export interface ImageUploaderProps {
  /**
   * Callback when image is uploaded, receives the image URL
   */
  onChange?: (url: string | null) => void;
  /**
   * Default image URL to display
   */
  defaultImageUrl?: string | null;
  /**
   * Cloudinary folder to organize images (e.g., 'avatars', 'group-avatars')
   */
  folder?: string;
  /**
   * Tags for uploaded images
   */
  tags?: string[];
  /**
   * Maximum file size in MB (default: 5MB)
   */
  maxSizeMB?: number;
  /**
   * Whether to auto-optimize images before upload (default: true)
   */
  autoOptimize?: boolean;
  /**
   * Custom upload options
   */
  uploadOptions?: Omit<CloudinaryUploadOptions, 'folder' | 'tags'>;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Size variant for the uploader
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Disabled state
   */
  disabled?: boolean;
}

export function ImageUploader({
  onChange,
  defaultImageUrl = null,
  folder = 'avatars',
  tags = ['avatar'],
  maxSizeMB = 5,
  autoOptimize = true,
  uploadOptions = {},
  className = '',
  size = 'md',
  disabled = false,
}: ImageUploaderProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(defaultImageUrl);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!imageUtils.isImageFile(file)) {
      toast.error('Chỉ được upload file ảnh!');
      return;
    }

    // Validate file size
    if (!imageUtils.validateFileSize(file, maxSizeMB)) {
      toast.error(`Ảnh phải nhỏ hơn ${maxSizeMB}MB!`);
      return;
    }

    try {
      setUploading(true);
      setUploadProgress(0);

      // Auto-optimize image if enabled
      let fileToUpload = file;
      if (autoOptimize) {
        try {
          const optimizedFile = await imageUtils.autoOptimizeImage(file);
          fileToUpload = optimizedFile;

          if (optimizedFile.size < file.size) {
            const savedPercent = Math.round(
              ((file.size - optimizedFile.size) / file.size) * 100
            );
            toast.warning(`Image optimized: ${savedPercent}% smaller`);
            // console.log(`Image optimized: ${savedPercent}% smaller`);
          }
        } catch {
          toast.error('Failed to optimize image, using original');
          // Continue with original file if optimization fails
        }
      }

      // Upload to Cloudinary
      const url = await cloudinaryService.uploadImageToCloudinary(
        fileToUpload,
        {
          folder,
          tags,
          quality: 'auto:good',
          onProgress: percent => {
            setUploadProgress(percent);
          },
          ...uploadOptions,
        }
      );

      setImageUrl(url);
      onChange?.(url);
      toast.success('Upload ảnh thành công!');

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      toast.error('Upload ảnh thất bại!');
      const errorMessage =
        error instanceof Error ? error.message : 'Upload ảnh thất bại!';
      toast.error(errorMessage);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleRemove = () => {
    setImageUrl(null);
    onChange?.(null);
    toast.success('Đã xóa ảnh!');
  };

  const handleClick = () => {
    if (!disabled && !uploading) {
      fileInputRef.current?.click();
    }
  };

  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-32 h-32',
    lg: 'w-40 h-40',
  };

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      {/* Image Preview or Upload Area */}
      <div className='relative'>
        {imageUrl ? (
          <div
            className={`${sizeClasses[size]} relative rounded-full overflow-hidden border-4 border-white shadow-lg`}
          >
            <img
              src={imageUrl}
              alt='Uploaded'
              className='w-full h-full object-cover'
            />
            {!disabled && (
              <button
                type='button'
                onClick={handleRemove}
                className='absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
                aria-label='Xóa ảnh'
              >
                <X className='w-4 h-4' />
              </button>
            )}
          </div>
        ) : (
          <button
            type='button'
            onClick={handleClick}
            disabled={disabled || uploading}
            className={`${sizeClasses[size]} border-2 border-dashed border-gray-300 rounded-full flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
            aria-label='Upload ảnh'
          >
            {uploading ? (
              <div className='flex flex-col items-center gap-2'>
                <div className='animate-spin rounded-full border-2 border-primary border-t-transparent w-6 h-6'></div>
                <span className='text-xs text-gray-600'>{uploadProgress}%</span>
              </div>
            ) : (
              <>
                <ImageIcon className={`${iconSizes[size]} text-gray-400`} />
                <span className='text-xs text-gray-500 mt-1'>Upload</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        onChange={handleFileSelect}
        className='hidden'
        disabled={disabled || uploading}
      />

      {/* Upload Button (if image exists, show change button) */}
      {imageUrl && !disabled && (
        <Button
          type='button'
          variant='outline'
          size='sm'
          onClick={handleClick}
          disabled={uploading}
        >
          <Upload className='w-4 h-4' />
          {uploading ? 'Đang tải...' : 'Đổi ảnh'}
        </Button>
      )}

      {/* Info Text */}
      <p className='text-xs text-gray-500 text-center'>
        Kích thước tối đa: {maxSizeMB}MB • Định dạng: JPG, PNG, GIF
      </p>
    </div>
  );
}
