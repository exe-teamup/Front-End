# Cloudinary Setup Guide

Hướng dẫn setup Cloudinary cho dự án để upload avatar user và avatar group.

## 1. Tạo tài khoản Cloudinary

1. Đăng ký tài khoản tại [https://cloudinary.com](https://cloudinary.com)
2. Vào Dashboard để lấy thông tin cấu hình

## 2. Lấy thông tin cấu hình

Trong Cloudinary Dashboard, bạn cần lấy:

- **Cloud Name**: Tên cloud của bạn (ví dụ: `dxyz123abc`)
- **API Key**: API Key từ Settings > Security
- **Upload Preset**: Tạo một Upload Preset mới:
  - Vào Settings > Upload
  - Tạo Upload Preset mới
  - Chọn "Unsigned" mode (không cần signature)
  - Lưu preset name

## 3. Cấu hình Environment Variables

Tạo file `.env` trong thư mục root của dự án:

```env
# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
VITE_CLOUDINARY_API_KEY=your_api_key
```

**Lưu ý:**

- Vite yêu cầu prefix `VITE_` cho các biến môi trường
- Không commit file `.env` vào git (đã có trong `.gitignore`)
- API Secret không nên được expose ở frontend, chỉ dùng ở backend

## 4. Sử dụng ImageUploader Component

### Upload Avatar User

```tsx
import { ImageUploader } from '@/components/ImageUploader';

function UserProfileForm() {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  return (
    <ImageUploader
      onChange={url => setAvatarUrl(url)}
      defaultImageUrl={avatarUrl}
      folder='user-avatars'
      tags={['avatar', 'user']}
      maxSizeMB={5}
      autoOptimize={true}
    />
  );
}
```

### Upload Avatar Group

```tsx
import { ImageUploader } from '@/components/ImageUploader';

function GroupForm() {
  const [groupAvatarUrl, setGroupAvatarUrl] = useState<string | null>(null);

  return (
    <ImageUploader
      onChange={url => setGroupAvatarUrl(url)}
      defaultImageUrl={groupAvatarUrl}
      folder='group-avatars'
      tags={['avatar', 'group']}
      maxSizeMB={5}
      size='lg'
    />
  );
}
```

## 5. Sử dụng Cloudinary Service trực tiếp

Nếu cần upload ảnh programmatically:

```tsx
import cloudinaryService from '@/services/cloudinaryService';

async function handleUpload(file: File) {
  try {
    const url = await cloudinaryService.uploadImageToCloudinary(file, {
      folder: 'user-avatars',
      tags: ['avatar'],
      quality: 'auto:good',
      onProgress: percent => {
        console.log(`Upload progress: ${percent}%`);
      },
    });
    console.log('Uploaded image URL:', url);
  } catch (error) {
    console.error('Upload failed:', error);
  }
}
```

## 6. Tối ưu hóa ảnh

Component tự động tối ưu ảnh trước khi upload:

- Resize ảnh nếu quá lớn (mặc định max 1920x1920)
- Compress ảnh để giảm dung lượng
- Giữ nguyên chất lượng ảnh

Bạn có thể tắt auto-optimize bằng cách set `autoOptimize={false}`.

## 7. Lấy URL ảnh đã tối ưu

```tsx
import { getOptimizedImageUrl } from '@/services/cloudinaryService';

const optimizedUrl = getOptimizedImageUrl(originalUrl, {
  width: 200,
  height: 200,
  crop: 'fill',
  quality: 'auto:good',
  format: 'webp',
});
```

## 8. Xóa ảnh

**Lưu ý quan trọng:** Xóa ảnh nên được thực hiện qua backend API để bảo mật. Frontend không nên có API Secret.

```tsx
// Frontend: Gọi API backend để xóa
await api.delete(`/images/${publicId}`);

// Backend sẽ xử lý việc xóa từ Cloudinary
```

## 9. Cấu trúc thư mục trong Cloudinary

Khuyến nghị tổ chức ảnh theo folder:

```
cloudinary/
├── user-avatars/     # Avatar của user
├── group-avatars/    # Avatar của group
└── ...
```

## 10. Troubleshooting

### Lỗi: "Cloudinary configuration is missing"

- Kiểm tra file `.env` đã được tạo chưa
- Kiểm tra các biến môi trường có prefix `VITE_` chưa
- Restart dev server sau khi thêm biến môi trường

### Lỗi: "Failed to upload image"

- Kiểm tra Upload Preset đã được set "Unsigned" chưa
- Kiểm tra Cloud Name có đúng không
- Kiểm tra kết nối internet

### Ảnh upload nhưng không hiển thị

- Kiểm tra URL trả về có đúng format không
- Kiểm tra CORS settings trong Cloudinary Dashboard

## 11. Best Practices

1. **Luôn validate file trước khi upload:**
   - Kiểm tra file type (chỉ cho phép image)
   - Kiểm tra file size (giới hạn 5MB)

2. **Sử dụng auto-optimize:**
   - Giảm dung lượng ảnh
   - Tăng tốc độ load

3. **Tổ chức ảnh theo folder:**
   - Dễ quản lý
   - Dễ tìm kiếm

4. **Sử dụng tags:**
   - Dễ filter và search
   - Dễ quản lý

5. **Xóa ảnh qua backend:**
   - Bảo mật API Secret
   - Kiểm soát tốt hơn
