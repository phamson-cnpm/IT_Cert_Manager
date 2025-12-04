import React, { useState } from 'react';
import { Card, Input, Button } from '../../components/Shared';
import { CheckCircle2, ChevronLeft, GraduationCap, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const RegistrationPage = () => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [studentType, setStudentType] = useState<'internal' | 'external'>('internal');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API submission
    setTimeout(() => {
      setStep('success');
      window.scrollTo(0,0);
    }, 500);
  };

  if (step === 'success') {
    return (
      <div className="max-w-md mx-auto py-12 px-4">
        <Card className="text-center p-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Đăng ký thành công!</h2>
          <p className="text-slate-600 mb-8">
            Vui lòng kiểm tra email để nhận mã tra cứu.
          </p>
          <div className="space-y-3">
            <Link to="/">
              <Button variant="primary" className="w-full">Về trang chủ</Button>
            </Link>
            <Button variant="ghost" className="w-full" onClick={() => setStep('form')}>Đăng ký thêm hồ sơ</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <Link to="/" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-6">
        <ChevronLeft className="w-4 h-4 mr-1" />
        Quay lại
      </Link>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Đăng ký Dự thi</h1>
        <p className="text-slate-600">Điền thông tin cá nhân để đăng ký kỳ thi Chứng chỉ Ứng dụng CNTT Cơ bản.</p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Student Type Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">Đối tượng đăng ký</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className={`p-4 rounded-xl border flex flex-col items-center justify-center transition-all ${studentType === 'internal' ? 'border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-500' : 'border-slate-200 hover:border-slate-300'}`}
                onClick={() => setStudentType('internal')}
              >
                <GraduationCap className={`w-6 h-6 mb-2 ${studentType === 'internal' ? 'text-blue-600' : 'text-slate-400'}`} />
                <div className="font-semibold">Trong trường</div>
                <div className="text-xs opacity-75 mt-1">Có Email HUMG</div>
              </button>
              <button
                type="button"
                className={`p-4 rounded-xl border flex flex-col items-center justify-center transition-all ${studentType === 'external' ? 'border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-500' : 'border-slate-200 hover:border-slate-300'}`}
                onClick={() => setStudentType('external')}
              >
                <User className={`w-6 h-6 mb-2 ${studentType === 'external' ? 'text-blue-600' : 'text-slate-400'}`} />
                <div className="font-semibold">Ngoài trường</div>
                <div className="text-xs opacity-75 mt-1">Thí sinh tự do</div>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Họ và tên" placeholder="Nguyễn Văn A" required />
            <Input label="Ngày sinh" type="date" required />
            
            {studentType === 'internal' && (
              <div className="md:col-span-2 animate-fade-in-up">
                <Input label="Mã sinh viên" placeholder="Nhập mã sinh viên..." required />
              </div>
            )}
            
            <Input label="Số điện thoại" placeholder="09xxxxxxx" type="tel" required />
            <Input label="Email" placeholder="email@example.com" type="email" required />
            
            <Input label="Số CCCD/CMND" placeholder="00109xxxxxxx" required className="md:col-span-2" />
          </div>

          <div className="border-t border-slate-100 pt-6">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input type="checkbox" className="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" required />
              <span className="text-sm text-slate-600 group-hover:text-slate-800">
                Tôi cam kết các thông tin khai báo là chính xác.
              </span>
            </label>
          </div>

          <div className="pt-2">
            <Button variant="primary" className="w-full text-lg py-3">Gửi Đăng ký</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default RegistrationPage;
