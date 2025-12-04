import React from 'react';
import { Link } from 'react-router-dom';
import { Search, FileSignature, BookOpen, Award } from 'lucide-react';
import { Button } from '../../components/Shared';

const HomePage = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Hệ thống Quản lý Chứng chỉ <br/> Ứng dụng CNTT Cơ bản
          </h1>
          <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Cổng thông tin chính thức hỗ trợ đăng ký dự thi, tra cứu kết quả và quản lý chứng chỉ nhanh chóng, chính xác.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button className="bg-white text-blue-700 hover:bg-blue-50 w-full sm:w-auto text-lg px-8 py-4 shadow-lg">
                <FileSignature className="w-5 h-5" />
                Đăng ký Dự thi ngay
              </Button>
            </Link>
            <Link to="/lookup">
              <Button className="bg-blue-500 hover:bg-blue-400 text-white border border-blue-400 w-full sm:w-auto text-lg px-8 py-4 shadow-lg">
                <Search className="w-5 h-5" />
                Tra cứu Kết quả
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-16 max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 -mt-10">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
            <FileSignature className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-3">Đăng ký Trực tuyến</h3>
          <p className="text-slate-600">Thủ tục đơn giản, xét duyệt hồ sơ nhanh chóng. Hỗ trợ sinh viên trong và ngoài trường.</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-6">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-3">Tra cứu Nhanh chóng</h3>
          <p className="text-slate-600">Kiểm tra kết quả thi và trạng thái chứng chỉ mọi lúc mọi nơi chỉ với Email hoặc Mã dự thi.</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-3">Lớp ôn tập</h3>
          <p className="text-slate-600">Cập nhật lịch khai giảng các lớp ôn tập kiến thức, thi thử sát với đề thi thực tế.</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;