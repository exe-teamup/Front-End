import { z } from 'zod';

export const courseSchema = z.object({
  courseId: z.number().optional(),
  semesterId: z
    .number('Học kỳ không được để trống')
    .min(1, 'Học kỳ không được để trống')
    .int('Học kỳ phải là số nguyên'),

  lecturerId: z
    .number('Chọn giảng viên cho lớp học')
    .int('Chọn giảng viên cho lớp học')
    .optional()
    .nullable(),

  courseCode: z
    .string()
    .min(1, 'Mã lớp học không được để trống')
    .max(20, 'Mã lớp học không được quá 20 ký tự')
    .regex(/^[A-Za-z0-9_-]+$/, 'Mã lớp học phải có định dạng bao gốm chữ và số')
    .transform(val => val.toUpperCase()),

  courseName: z
    .string()
    .min(0, 'Tên lớp học không được để trống')
    .max(200, 'Tên lớp học không được quá 200 ký tự')
    .optional()
    .nullable(),

  maxGroup: z
    .number('Số nhóm tối đa không được để trống')
    .min(3, 'Số nhóm tối đa phải ít nhất 3')
    .max(20, 'Số nhóm tối đa không được quá 20')
    .int('Số nhóm tối đa phải là số nguyên'),

  groupCount: z
    .number()
    .min(0, 'Số nhóm hiện tại không được âm')
    .int('Số nhóm hiện tại phải là số nguyên')
    .optional(),
});

export const createCourseSchema = courseSchema.omit({
  courseId: true,
  groupCount: true,
});

export const updateCourseSchema = courseSchema.partial().omit({
  courseId: true,
});

export const courseQuerySchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  semesterId: z.number().optional(),
  search: z.string().optional(),
});

export type Course = z.infer<typeof courseSchema>;
export type CreateCourseFormData = z.infer<typeof createCourseSchema>;
export type UpdateCourseFormData = z.infer<typeof updateCourseSchema>;
export type CourseQueryParams = z.infer<typeof courseQuerySchema>;
