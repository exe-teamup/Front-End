import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { mockGroupTemplates } from './mockData';

export function TemplateManagement() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold text-text-title'>
          Quản lý Template Nhóm
        </h1>
        <p className='text-text-body mt-2'>
          Cấu hình template cho các nhóm theo kỳ học
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Danh sách Template</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kỳ học</TableHead>
                  <TableHead>Số lượng SV</TableHead>
                  <TableHead>Số ngành tối thiểu</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockGroupTemplates.map(t => (
                  <TableRow key={t.id}>
                    <TableCell className='font-medium'>{t.semester}</TableCell>
                    <TableCell>
                      {t.minMembers} - {t.maxMembers} sinh viên
                    </TableCell>
                    <TableCell>{t.minMajors} ngành</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
