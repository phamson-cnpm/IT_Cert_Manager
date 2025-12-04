export type CandidateType = 'internal' | 'external';
export type ResultStatus = 'Đạt' | 'Không đạt';

export interface CandidateResult {
  id: string;
  hoTen: string;
  ngaySinh: string;
  email: string;
  maSinhVien?: string; // null if external
  maTraCuu?: string;   // null if internal
  diemThi: number;
  trangThai: ResultStatus;
  lanThi: number;
  ngayThi: string;
}

export interface ClassInfo {
  id: string;
  maLop: string;
  tenLop: string;
  giangVien: string;
  siSo: string; // e.g., "45/50"
  trangThai: string;
}

export interface AdminUser {
  id: string;
  hoTen: string;
  email: string;
  role: 'SuperAdmin' | 'Admin' | 'Staff';
}

export interface DashboardStat {
  label: string;
  value: string | number;
  change: number; // Percentage change
  trend: 'up' | 'down';
}

export interface ChartDataPoint {
  month: string;
  registrations: number;
  passed: number;
}
