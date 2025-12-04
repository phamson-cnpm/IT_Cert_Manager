import React, { useState } from 'react';
import { Card, Input, Button, Badge } from '../../components/Shared';
import { Search, Loader2, Download, AlertCircle, CheckCircle, XCircle, RefreshCw, GraduationCap, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { searchResult } from '../../services/mockData';
import { CandidateResult } from '../../types';

const LookupPage = () => {
  const [method, setMethod] = useState<'internal' | 'external'>('internal');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CandidateResult | null | undefined>(undefined); // undefined = no search yet

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setResult(undefined);
    try {
      const data = await searchResult(query, method);
      setResult(data || null); // null means searched but not found
    } catch (error) {
      console.error(error);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Tra cứu Kết quả</h1>
        <p className="text-slate-600">Nhập thông tin để xem điểm thi và trạng thái chứng chỉ.</p>
      </div>

      <Card className="p-1">
        <div className="grid grid-cols-2 p-1 gap-1 bg-slate-100 rounded-lg mb-6">
          <button
            onClick={() => { setMethod('internal'); setQuery(''); setResult(undefined); }}
            className={`py-2.5 text-sm font-medium rounded-md transition-all flex items-center justify-center gap-2 ${
              method === 'internal' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            Trong trường
          </button>
          <button
            onClick={() => { setMethod('external'); setQuery(''); setResult(undefined); }}
            className={`py-2.5 text-sm font-medium rounded-md transition-all flex items-center justify-center gap-2 ${
              method === 'external' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <User className="w-4 h-4" />
            Ngoài trường
          </button>
        </div>

        <form onSubmit={handleSearch} className="px-6 pb-6">
          <div className="mb-4">
             <Input
                label={method === 'internal' ? 'Email HUMG hoặc Mã Sinh viên' : 'Mã tra cứu'}
                placeholder={method === 'internal' ? 'example@humg.edu.vn' : 'TC-xxxx-xxxx'}
                value={query}
                onChange={(e: any) => setQuery(e.target.value)}
                required
             />
             
             {/* Resend Code Link */}
             {method === 'external' && (
                <div className="flex justify-end -mt-2 mb-2">
                   <Link 
                     to="/forgot-code" 
                     className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                   >
                     <RefreshCw className="w-3 h-3" /> Quên/Gửi lại mã tra cứu?
                   </Link>
                </div>
             )}
          </div>

          <Button 
            variant="primary" 
            className="w-full py-3 text-lg" 
            disabled={loading}
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            {loading ? 'Đang tra cứu...' : 'Tra cứu ngay'}
          </Button>
        </form>
      </Card>

      {/* Result Section */}
      {result !== undefined && (
        <div className="animate-fade-in-up">
          {result === null ? (
            <div className="bg-red-50 border border-red-100 rounded-xl p-6 text-center text-red-600">
              <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-80" />
              <h3 className="text-lg font-bold mb-1">Không tìm thấy kết quả</h3>
              <p className="text-sm opacity-90">Vui lòng kiểm tra lại thông tin và thử lại.</p>
            </div>
          ) : (
            <Card className="overflow-hidden border-t-4 border-t-blue-500">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-800 text-lg">Kết quả thi</h3>
                <Badge color={result.trangThai === 'Đạt' ? 'green' : 'red'}>
                  {result.trangThai.toUpperCase()}
                </Badge>
              </div>
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6 items-center md:items-start mb-8">
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center flex-shrink-0 ${result.trangThai === 'Đạt' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {result.trangThai === 'Đạt' ? <CheckCircle className="w-12 h-12" /> : <XCircle className="w-12 h-12" />}
                  </div>
                  <div className="flex-1 space-y-4 w-full text-center md:text-left">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">{result.hoTen}</h2>
                      <p className="text-slate-500">{result.email}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <span className="block text-slate-500 text-xs mb-1 uppercase">Ngày sinh</span>
                        <span className="font-medium text-slate-800">{result.ngaySinh}</span>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <span className="block text-slate-500 text-xs mb-1 uppercase">Ngày thi</span>
                        <span className="font-medium text-slate-800">{result.ngayThi}</span>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <span className="block text-slate-500 text-xs mb-1 uppercase">Lần thi</span>
                        <span className="font-medium text-slate-800">{result.lanThi}</span>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <span className="block text-slate-500 text-xs mb-1 uppercase">Điểm số</span>
                        <span className={`font-bold text-lg ${result.diemThi >= 5 ? 'text-green-600' : 'text-red-600'}`}>{result.diemThi}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Download Button for Passed Candidates */}
                {result.trangThai === 'Đạt' && (
                  <div className="border-t border-slate-100 pt-6 mt-2">
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white shadow-green-200 py-3 text-lg flex items-center justify-center gap-2">
                      <Download className="w-5 h-5" />
                      Tải về Chứng chỉ (PDF)
                    </Button>
                    <p className="text-center text-xs text-slate-400 mt-3">
                      *Chứng chỉ bản mềm có giá trị tương đương bản cứng.
                    </p>
                  </div>
                )}
                
                {result.trangThai === 'Không đạt' && (
                  <div className="border-t border-slate-100 pt-6 mt-2 text-center">
                    <p className="text-slate-600 mb-4">Bạn chưa đủ điều kiện nhận chứng chỉ.</p>
                    <Link to="/register">
                      <Button variant="ghost" className="text-blue-600 hover:bg-blue-50">Đăng ký thi lại</Button>
                    </Link>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default LookupPage;