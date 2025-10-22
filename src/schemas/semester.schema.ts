import { z } from 'zod';

export const semesterSchema = z
  .object({
    semesterCode: z
      .string()
      .min(1, 'Mã kỳ học không được để trống')
      .max(50, 'Mã kỳ học không được quá 50 ký tự')
      .regex(
        /^[A-Za-z0-9_-]+$/,
        'Mã kỳ học chỉ được chứa chữ cái, số, dấu gạch ngang và gạch dưới'
      )
      .transform(val => val.toUpperCase()),

    semesterName: z
      .string()
      .min(1, 'Tên kỳ học không được để trống')
      .max(200, 'Tên kỳ học không được quá 200 ký tự')
      .optional(),

    startDate: z
      .string()
      .min(1, 'Ngày bắt đầu không được để trống')
      .refine(
        date => {
          const parsedDate = new Date(date);
          return !isNaN(parsedDate.getTime());
        },
        { message: 'Ngày bắt đầu không hợp lệ' }
      ),

    endDate: z
      .string()
      .min(1, 'Ngày kết thúc không được để trống')
      .refine(
        date => {
          const parsedDate = new Date(date);
          return !isNaN(parsedDate.getTime());
        },
        { message: 'Ngày kết thúc không hợp lệ' }
      ),

    semesterStatus: z.enum(['ACTIVE', 'INACTIVE', 'COMPLETED'], {
      message: 'Trạng thái không hợp lệ',
    }),
  })
  .refine(
    data => {
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      return end > start;
    },
    {
      message: 'Ngày kết thúc phải sau ngày bắt đầu',
      path: ['endDate'],
    }
  )
  .refine(
    data => {
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      // Kỳ học ít nhất 21 ngày (cho block 3 tuần), tối đa 180 ngày (6 tháng)
      return diffDays >= 21 && diffDays <= 180;
    },
    {
      message: 'Kỳ học phải từ 21 ngày đến 180 ngày',
      path: ['endDate'],
    }
  );

export const createSemesterSchema = semesterSchema
  .omit({ semesterStatus: true })
  .extend({
    semesterStatus: z
      .enum(['ACTIVE', 'INACTIVE', 'COMPLETED'])
      .default('INACTIVE'),
  });

export const updateSemesterSchema = semesterSchema.partial();

export type SemesterFormData = z.infer<typeof semesterSchema>;
export type CreateSemesterFormData = z.infer<typeof createSemesterSchema>;
export type UpdateSemesterFormData = z.infer<typeof updateSemesterSchema>;
