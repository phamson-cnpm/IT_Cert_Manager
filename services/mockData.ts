import { ClassInfo, AdminUser, DashboardStat, ChartDataPoint, CandidateResult } from '../types';

export const mockClasses: ClassInfo[] = [
  { id: '1', maLop: 'L001', tenLop: 'Lớp Ôn tập T10-A', giangVien: 'Nguyễn Văn A', siSo: '45/50', trangThai: 'Đã kết thúc' },
  { id: '2', maLop: 'L002', tenLop: 'Lớp Ôn tập T11-B', giangVien: 'Trần Thị B', siSo: '20/50', trangThai: 'Đang học' },
  { id: '3', maLop: 'L003', tenLop: 'Lớp Cấp tốc T12', giangVien: 'Lê Văn C', siSo: '12/40', trangThai: 'Đang mở' },
  { id: '4', maLop: 'L004', tenLop: 'Lớp Cuối tuần T12', giangVien: 'Phạm Thị D', siSo: '5/60', trangThai: 'Đang mở' },
];

export const mockAdmins: AdminUser[] = [
  { id: 'U1', hoTen: 'Nguyễn Văn Quản', email: 'quan.nv@school.edu.vn', role: 'SuperAdmin' },
  { id: 'U2', hoTen: 'Trần Thị Thu', email: 'thu.tt@school.edu.vn', role: 'Admin' },
  { id: 'U3', hoTen: 'Lê Hoàng', email: 'hoang.le@school.edu.vn', role: 'Staff' },
  { id: 'U4', hoTen: 'Phạm Minh', email: 'minh.p@school.edu.vn', role: 'Staff' },
  { id: 'U5', hoTen: 'Đỗ Hùng', email: 'hung.do@school.edu.vn', role: 'Admin' },
];

export const mockDashboardStats: DashboardStat[] = [
  { label: 'Tổng thí sinh', value: '1,245', change: 12.5, trend: 'up' },
  { label: 'Đăng ký tháng này', value: '180', change: 8.2, trend: 'up' },
  { label: 'Tỷ lệ Đạt', value: '85.4%', change: -2.1, trend: 'down' },
];

export const mockChartData: ChartDataPoint[] = [
  { month: 'T6', registrations: 120, passed: 98 },
  { month: 'T7', registrations: 132, passed: 110 },
  { month: 'T8', registrations: 101, passed: 90 },
  { month: 'T9', registrations: 154, passed: 130 },
  { month: 'T10', registrations: 190, passed: 160 },
  { month: 'T11', registrations: 230, passed: 210 },
];

export const mockCandidateResults: CandidateResult[] = [
  {
    id: 'S001',
    hoTen: 'Nguyễn Văn An',
    ngaySinh: '01/01/2002',
    email: 'an.nv@humg.edu.vn',
    maSinhVien: '1821050123',
    diemThi: 8.5,
    trangThai: 'Đạt',
    lanThi: 1,
    ngayThi: '15/10/2023'
  },
  {
    id: 'S002',
    hoTen: 'Trần Thị Bình',
    ngaySinh: '12/05/2001',
    email: 'binh.tran@gmail.com',
    maTraCuu: 'TC-2023-9988',
    diemThi: 4.0,
    trangThai: 'Không đạt',
    lanThi: 1,
    ngayThi: '15/10/2023'
  },
  {
    id: 'S003',
    hoTen: 'Lê Văn Cường',
    ngaySinh: '15/08/2000',
    email: 'cuong.lv@gmail.com',
    maTraCuu: 'TC-2023-7766',
    diemThi: 9.0,
    trangThai: 'Đạt',
    lanThi: 2,
    ngayThi: '20/11/2023'
  }
];

// Helper to simulate API call
export const searchResult = async (query: string, type: 'internal' | 'external'): Promise<CandidateResult | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = mockCandidateResults.find(r => {
        if (type === 'internal') {
           // Search by Email HUMG or Student ID (implied by "Trong trường")
           return r.email.toLowerCase() === query.toLowerCase() || r.maSinhVien === query;
        } else {
           // Search by Code
           return r.maTraCuu === query;
        }
      });
      resolve(result || null);
    }, 800);
  });
};
