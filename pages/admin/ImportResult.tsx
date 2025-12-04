import React, { useState } from 'react';
import { Card, Button } from '../../components/Shared';
import { UploadCloud, FileSpreadsheet, Check, AlertTriangle, ArrowRight, Download } from 'lucide-react';

const ImportResult = () => {
  const [step, setStep] = useState(1);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => setStep(2), 500);
        }
      }, 100);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Import Kết quả thi</h1>
        <p className="text-slate-500">Tải lên file Excel để nhập điểm hàng loạt.</p>
      </div>

      {/* Steps Indicator */}
      <div className="flex items-center justify-between relative px-10">
        <div className="absolute left-0 top-1/2 w-full h-1 bg-slate-200 -z-10" />
        {[1, 2, 3].map((s) => (
          <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 transition-colors bg-white ${step >= s ? 'border-blue-600 text-blue-600' : 'border-slate-300 text-slate-400'}`}>
            {step > s ? <Check className="w-6 h-6" /> : s}
          </div>
        ))}
      </div>

      <Card className="min-h-[400px] flex flex-col justify-center">
        {step === 1 && (
          <div className="text-center p-10">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-500">
              <UploadCloud className="w-12 h-12" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Tải file dữ liệu</h3>
            <p className="text-slate-500 mb-8 max-w-sm mx-auto">Chấp nhận file .xlsx, .csv. Kích thước tối đa 10MB.</p>
            
            <div className="relative max-w-xs mx-auto">
              <input 
                type="file" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileUpload}
              />
              <Button className="w-full">Chọn File</Button>
            </div>

            {uploadProgress > 0 && (
              <div className="max-w-xs mx-auto mt-6">
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 transition-all duration-200" style={{ width: `${uploadProgress}%` }}></div>
                </div>
                <p className="text-xs text-slate-500 mt-2 text-right">{uploadProgress}%</p>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-green-600" />
                Mapping Dữ liệu
              </h3>
              <Button variant="ghost" onClick={() => setStep(1)} className="text-sm">Chọn lại file</Button>
            </div>
            
            <div className="border rounded-lg overflow-hidden mb-6">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="p-3 w-1/4">
                       <div className="text-slate-500 text-xs uppercase font-semibold mb-2">Cột trong File</div>
                       <div className="font-mono text-slate-800">HoVaTen</div>
                    </th>
                    <th className="p-3 w-1/4">
                       <div className="text-slate-500 text-xs uppercase font-semibold mb-2">Cột trong File</div>
                       <div className="font-mono text-slate-800">Email</div>
                    </th>
                    <th className="p-3 w-1/4">
                       <div className="text-slate-500 text-xs uppercase font-semibold mb-2">Cột trong File</div>
                       <div className="font-mono text-slate-800">DiemThi</div>
                    </th>
                    <th className="p-3 w-1/4">
                       <div className="text-slate-500 text-xs uppercase font-semibold mb-2">Cột trong File</div>
                       <div className="font-mono text-slate-800">NgayThi</div>
                    </th>
                  </tr>
                  {/* Select boxes row */}
                  <tr className="bg-blue-50/50">
                     <td className="p-3">
                        <select className="w-full border-slate-300 rounded text-sm"><option>Họ và tên</option></select>
                     </td>
                     <td className="p-3">
                        <select className="w-full border-slate-300 rounded text-sm"><option>Email</option></select>
                     </td>
                     <td className="p-3">
                        <select className="w-full border-slate-300 rounded text-sm"><option>Điểm thi</option></select>
                     </td>
                     <td className="p-3">
                        <select className="w-full border-slate-300 rounded text-sm"><option>Ngày thi</option></select>
                     </td>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i}>
                      <td className="p-3 text-slate-600">Nguyễn Văn Mẫu {i}</td>
                      <td className="p-3 text-slate-600">mau.nv{i}@humg.edu.vn</td>
                      <td className="p-3 text-slate-600">{7 + i * 0.5}</td>
                      <td className="p-3 text-slate-600">15/10/2023</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setStep(3)}>
                Tiếp tục <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
              <Check className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Import Hoàn tất</h2>
            <p className="text-slate-600 mb-8">Đã xử lý file <strong>ket_qua_thi_T10.xlsx</strong></p>

            <div className="grid grid-cols-2 gap-6 max-w-lg mx-auto mb-10">
              <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                <p className="text-green-800 text-sm font-bold uppercase tracking-wide">Thành công</p>
                <p className="text-4xl font-bold text-green-600 mt-2">985</p>
              </div>
              <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                <p className="text-red-800 text-sm font-bold uppercase tracking-wide">Lỗi</p>
                <p className="text-4xl font-bold text-red-600 mt-2">15</p>
              </div>
            </div>

            <div className="flex justify-center gap-4">
               <Button variant="secondary" className="border-red-200 text-red-600 hover:bg-red-50">
                 <Download className="w-4 h-4" /> Tải Báo cáo lỗi (CSV)
               </Button>
               <Button onClick={() => setStep(1)}>Import file khác</Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ImportResult;
