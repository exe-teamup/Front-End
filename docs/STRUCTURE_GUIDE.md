# HƯỚNG DẪN CẤU TRÚC DỰ ÁN EXE TEAM-UP

## 1. Giới thiệu

Dự án **EXE-teamup Front-End** được xây dựng trên nền tảng **Vite 7 + React 19 + TypeScript**, sử dụng **TailwindCSS 4** cho styling.

## 2. Công nghệ chính

| Nhóm             | Công nghệ                                           | Ghi chú                                           |
| ---------------- | --------------------------------------------------- | ------------------------------------------------- |
| Bundler          | Vite 7                                              | Hỗ trợ HMR nhanh, cấu hình tối giản               |
| UI Runtime       | React 19 (ESM)                                      | Sử dụng StrictMode mặc định                       |
| Ngôn ngữ         | TypeScript 5.8                                      | `strict: true`, bật kiểm tra unused code          |
| Styling          | TailwindCSS 4                                       | Sử dụng `@tailwindcss/vite` và `@theme` token màu |
| State Management | Zustand (dự kiến)                                   | Folder `src/store/` đã chuẩn bị để khai báo store |
| UI Kit           | shadcn/ui (tùy chọn)                                | Có thể tích hợp vào `src/components/ui/`          |
| Testing          | Jest + Testing Library                              | Cấu hình trong `jest.config.ts`                   |
| Code Quality     | ESLint (Flat config) + Prettier + Husky/lint-staged | Triggers pre-commit                               |

## 3. Scripts quan trọng

```bash
npm run dev         # Khởi động môi trường phát triển
npm run build       # Build production (tsc --build + vite build)
npm run test        # Chạy toàn bộ test với Jest
npm run lint        # Kiểm tra lint cho toàn repo
npm run format      # Format code với Prettier
npm run type-check  # Kiểm tra type TS nhưng không emit
```

Pre-commit hook sẽ tự động chạy `eslint --fix` + `prettier` trên file staged nhờ Husky & lint-staged.

## 4. Cấu trúc thư mục tổng quan

```
/
├── package.json
├── tsconfig*.json
├── vite.config.ts
├── eslint.config.mjs
├── jest.config.ts
├── .husky/
├── public/
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── index.css
    ├── assets/
    ├── components/
    │   └── Button/
    ├── constants/
    ├── hooks/
    ├── layouts/
    ├── pages/
    │   └── auth/
    ├── routes/
    ├── services/
    ├── store/
    ├── types/
    └── utils/
```

### 4.1 Thư mục gốc

- `package.json`: Khai báo dependency, scripts và cấu hình lint-staged. `prepare` chỉ chạy Husky ở môi trường local (`CI` được bỏ qua).
- `vite.config.ts`: Cấu hình plugin React + Tailwind (`@tailwindcss/vite`). Hạn chế chỉnh sửa trực tiếp, thay đổi nên thông qua thảo luận.
- `tsconfig.*.json`: Tách riêng cấu hình app, node, jest. `tsconfig.app.json` bật strict mode, không cho phép unused locals/parameters.
- `.husky/`: Hook `pre-commit` chạy lint-staged.

### 4.2 Thư mục `public/`

Chứa tài nguyên tĩnh (favicon). Nên đặt hình ảnh, font bổ sung ở đây. Không import TypeScript từ `public`.

### 4.3 Thư mục `src/`

Đây là khu vực chính của ứng dụng.

#### `App.tsx`

- Component root cho toàn app.
- Mọi test về màu sắc/theme nên giữ trong storybook riêng (sẽ bổ sung sau) thay vì `App.tsx`.

#### `main.tsx`

- Mount React vào DOM, import `index.css`.
- Nếu dùng state global (Zustand provider) hoặc router, inject tại đây.

#### `index.css`

- Import Tailwind v4 bằng `@import 'tailwindcss';`.
- Khai báo bộ màu thương hiệu trong block `@theme`. Đây là nguồn duy nhất cho token màu (`bg-primary`, `text-text-title`, ...). Khi bổ sung màu mới, cập nhật tại đây để đồng bộ.

#### `assets/`

- Lưu icon, hình ảnh nội bộ.
- Chia nhỏ theo domain (ví dụ `assets/illustrations/`, `assets/icons/`). Không commit file > 1 MB.

#### `components/`

- Các component tái sử dụng.
- Quy ước thư mục dạng PascalCase (ví dụ `Button/`) với file `index.ts` re-export.
- Sub-folder:
  - `components/ui/`: component cơ bản (tương tác trực tiếp Tailwind hoặc shadcn/ui).
  - `components/common/`: layout nhỏ lẻ (EmptyState, Loader...).
  - `components/forms/`: input, validation.
- Ví dụ hiện tại `Button/Button.tsx` sử dụng util `cn` để merge class. Khi tích hợp shadcn, import component vào `components/ui/` và wrap lại nếu cần tuỳ biến theme.

#### `constants/`

- Định nghĩa hằng số (route name, config API, default value...). Khi thêm file nên nhóm theo domain: `constants/app.ts`, `constants/auth.ts`.

#### `hooks/`

- Custom hooks (prefixed `use`).
- Dùng cho logic dùng lại: `useAuthStore`, ...
- Hook phải được sử dụng trong component client (React) nên cần đảm bảo file consumer có môi trường thích hợp.

#### `layouts/`

- Chứa layout cấp trang (AppShell, AuthLayout...).
- Layout nên quản lý khối cố định như header, sidebar, breadcrumb.

#### `pages/`

- Tạm thời sử dụng pattern truyền thống. Mỗi folder tương ứng một route logical (ví dụ `pages/auth/Login.tsx`).
- Khi tích hợp router (React Router hoặc file-based), đặt entry points ở đây; `pages` chỉ nên export component thuần, router sẽ import.
- **Quy tắc**: Component hiển thị trang phải khai báo rõ dữ liệu, side effects trong hook riêng để dễ test.

#### `routes/`

- Dự phòng cho cấu hình router (React Router / TanStack Router). Có thể tạo `routes/index.tsx` làm central route map.

#### `services/`

- Nơi viết API client (REST/GraphQL). Tách theo domain `services/auth.ts`, `services/projects.ts`.
- Khuyến khích sử dụng fetch wrapper hoặc axios instance chung, xử lý interceptor, error.

#### `store/`

- Chứa store Zustand.
- Kiến trúc đề xuất:
  - `store/index.ts`: export hooks chính (`useAuthStore`, `useProjectStore`...).
  - `store/slices/`: tách logic domain.
  - Dùng `create` từ Zustand, kết hợp middleware (`devtools`, `persist`).

#### `types/`

- Định nghĩa interface/type dùng chung.
- Quy tắc: một domain = một file (`types/auth.ts`, `types/project.ts`).
- Export lại trong `types/index.ts` để import gọn (`import { User } from '@/types'`).

#### `utils/`

- Hàm tiện ích dùng chung. Hiện có `cn.ts` để merge class Tailwind.
- Vui lòng viết test cho util bằng Jest (`src/utils/__tests__`).

#### Các thư mục khác

`None`

## 5. Quy tắc code

1. **TypeScript**
   - Luôn khai báo type cho props/hàm trả về. Sử dụng `interface` cho object, `type` cho union.
   - Không disable `eslint` nếu không thật sự cần thiết. Nếu có, bổ sung comment giải thích.
2. **Component**
   - Đặt tên file và component trùng nhau (PascalCase).
   - Logic phức tạp tách thành hook trong `hooks/`.
   - Đối với component client, nếu cần dùng state/effect, đảm bảo file nằm trong React tree (Vite không yêu cầu `"use client"` như Next.js, tuy nhiên cần phân biệt giữa component thuần và hook-heavy để tái sử dụng).
3. **Styling**
   - Ưu tiên Tailwind utility class.
   - Với pattern phức tạp, tạo component UI mới hoặc dùng `cn()` để compose class.
   - Màu sắc phải dùng token (`bg-primary`, `text-text-title`, ...). Không hard-code hex trừ khi cập nhật theme.
4. **State management**
   - Sử dụng Zustand cho state chia sẻ. Store nên độc lập, không phụ thuộc trực tiếp vào component UI.
   - Duy trì selector để tránh re-render.
5. **Import**
   - Mặc định dùng đường dẫn tương đối. Khi cấu hình alias (`@/`), cập nhật `tsconfig.app.json` và `vite.config.ts` đồng thời.
   - Thứ tự import: React > thư viện bên thứ ba > alias nội bộ (components/hooks/utils) > asset/css.

## 6. Kiểm thử và chất lượng

- Test unit đặt cạnh module (`__tests__/module.test.ts`) hoặc trong folder `__tests__` tương ứng.
- CI chạy `npm ci --dry-run` và build. Husky skip trong CI (nhờ script `test -n "$CI" || husky`).
- Vi phạm lint (ví dụ unused variable) sẽ chặn commit. Khắc phục trước khi push.

## 7. Quy trình phát triển đề xuất

1. **Tạo nhánh**: `feat/<feature-name>` hoặc `fix/<issue>`.
2. **Cài đặt**: `npm install` (chỉ làm lần đầu) → `npm run dev`.
3. **Phát triển**: đặt file vào đúng thư mục domain.
4. **Kiểm tra**:
   - `npm run lint`
   - `npm run type-check`
   - `npm run test`
5. **Commit**: tuân thủ Conventional Commit (`feat: ...`, `fix: ...`). Husky sẽ tự động format.
6. **Pull Request**: mô tả thay đổi, đính kèm ảnh (nếu UI) và checklist test.

## 8. Lỗi thường gặp & cách xử lý

| Lỗi                          | Nguyên nhân                             | Cách khắc phục                                                    |
| ---------------------------- | --------------------------------------- | ----------------------------------------------------------------- |
| `Cannot find module '@/...'` | Chưa cấu hình alias trong tsconfig/vite | Cập nhật `compilerOptions.paths` và `resolve.alias`               |
| `Unused variable`            | Bỏ quên biến/hàm                        | Xoá hoặc prefix `_` nếu cố ý (ví dụ `_unused`)                    |
| Tailwind class không áp dụng | Sai token hoặc chưa import `index.css`  | Kiểm tra `@theme` và đảm bảo component nằm trong tree có Tailwind |
| Commit bị chặn bởi Husky     | ESLint/Prettier lỗi                     | Chạy `npm run lint` hoặc `npm run format` để sửa                  |

## 9. Mở rộng tương lai

- **Router**: tích hợp React Router/TanStack Router trong `src/routes/`.
- **State**: thêm Zustand store (`src/store/auth.store.ts`...), kết hợp middleware `persist`.
- **UI Kit**: import shadcn/ui component vào `src/components/ui/`, đồng bộ theme với Tailwind token.

## 10. Tài liệu tham khảo

- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/guide)
- [TailwindCSS v4 Docs](https://tailwindcss.com/docs)
- [Zustand Docs](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [shadcn/ui Docs](https://ui.shadcn.com)

---

Tài liệu này sẽ được cập nhật khi kiến trúc dự án thay đổi.
