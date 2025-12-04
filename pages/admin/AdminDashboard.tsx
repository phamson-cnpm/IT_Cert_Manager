import React from 'react';
import { Card } from '../../components/Shared';
import { mockDashboardStats, mockChartData } from '../../services/mockData';
import { Users, TrendingUp, Award, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-800">Tổng quan hệ thống</h1>
        <div className="text-sm text-slate-500 bg-white px-4 py-2 rounded-lg border border-slate-200">
          Cập nhật: {new Date().toLocaleDateString('vi-VN')}
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockDashboardStats.map((stat, idx) => {
          const isUp = stat.trend === 'up';
          return (
            <Card key={idx} className="relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
                  <h3 className="text-3xl font-bold text-slate-800">{stat.value}</h3>
                </div>
                <div className={`p-2 rounded-lg ${idx === 0 ? 'bg-blue-100 text-blue-600' : idx === 1 ? 'bg-purple-100 text-purple-600' : 'bg-green-100 text-green-600'}`}>
                  {idx === 0 ? <Users className="w-6 h-6" /> : idx === 1 ? <TrendingUp className="w-6 h-6" /> : <Award className="w-6 h-6" />}
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className={`flex items-center font-medium ${isUp ? 'text-green-600' : 'text-red-600'}`}>
                  {isUp ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                  {Math.abs(stat.change)}%
                </span>
                <span className="text-slate-400 ml-2">so với tháng trước</span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Thống kê Đăng ký & Tốt nghiệp (6 Tháng)" className="lg:col-span-2">
          <div className="h-80 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#1e293b' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="registrations" name="Đăng ký mới" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={24} />
                <Bar dataKey="passed" name="Đã cấp chứng chỉ" fill="#10b981" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Quick Actions / Notifications */}
        <Card title="Hoạt động gần đây">
          <div className="space-y-4 mt-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start gap-3 pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
                <div>
                  <p className="text-sm text-slate-800 font-medium">Nguyễn Văn A vừa đăng ký thi</p>
                  <p className="text-xs text-slate-500">2 phút trước</p>
                </div>
              </div>
            ))}
            <button className="w-full py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg mt-2 transition-colors">
              Xem tất cả thông báo
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
