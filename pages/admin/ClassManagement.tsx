import React, { useState } from 'react';
import { Card, Button, Badge, Modal, Input } from '../../components/Shared';
import { mockClasses } from '../../services/mockData';
import { Plus, Edit2, Trash2, UserPlus, Search, Save } from 'lucide-react';

const ClassManagement = () => {
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [editingClass, setEditingClass] = useState<any>(null);

  const handleAssignClick = (cls: any) => {
    setSelectedClass(cls);
    setAssignModalOpen(true);
  };

  const handleEditClick = (cls: any) => {
    setEditingClass({ ...cls });
    setEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    // In a real app, this would call an API
    console.log("Saving class updates:", editingClass);
    setEditModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Quản lý Lớp ôn tập</h1>
          <p className="text-slate-500">Tạo và quản lý các lớp ôn thi chứng chỉ.</p>
        </div>
        <Button>
          <Plus className="w-5 h-5" /> Thêm Lớp mới
        </Button>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Mã Lớp</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Tên Lớp</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Giảng viên</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Sĩ số</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Trạng thái</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockClasses.map((cls) => (
                <tr key={cls.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{cls.maLop}</td>
                  <td className="px-6 py-4 text-sm text-slate-800">{cls.tenLop}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{cls.giangVien}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{cls.siSo}</td>
                  <td className="px-6 py-4">
                    <Badge color={cls.trangThai === 'Đang mở' ? 'green' : cls.trangThai === 'Đang học' ? 'blue' : 'gray'}>
                      {cls.trangThai}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" 
                        title="Gán thí sinh"
                        onClick={() => handleAssignClick(cls)}
                      >
                        <UserPlus className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" 
                        title="Sửa"
                        onClick={() => handleEditClick(cls)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Xóa">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Assign Student Modal */}
      <Modal 
        isOpen={assignModalOpen} 
        onClose={() => setAssignModalOpen(false)}
        title={`Gán Thí sinh vào ${selectedClass?.tenLop}`}
      >
        <div className="space-y-4">
          <div className="relative">
             <input 
               className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
               placeholder="Tìm theo Email hoặc Mã SV..." 
             />
             <Search className="w-5 h-5 text-slate-400 absolute left-3 top-2.5" />
          </div>
          
          <div className="max-h-60 overflow-y-auto border rounded-lg divide-y divide-slate-100">
             {[1, 2, 3].map(i => (
               <div key={i} className="p-3 hover:bg-slate-50 flex justify-between items-center cursor-pointer">
                 <div>
                   <div className="font-medium text-sm text-slate-800">Nguyễn Văn Sinh Viên {i}</div>
                   <div className="text-xs text-slate-500">sv{i}@humg.edu.vn</div>
                 </div>
                 <Button variant="ghost" className="text-xs h-8">Chọn</Button>
               </div>
             ))}
          </div>

          <div className="flex justify-end gap-2 pt-2">
             <Button variant="secondary" onClick={() => setAssignModalOpen(false)}>Hủy</Button>
             <Button>Lưu thay đổi</Button>
          </div>
        </div>
      </Modal>

      {/* Edit Class Modal */}
      <Modal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Chỉnh sửa Thông tin Lớp"
      >
        {editingClass && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input 
                label="Mã Lớp" 
                value={editingClass.maLop} 
                onChange={(e: any) => setEditingClass({...editingClass, maLop: e.target.value})} 
              />
              <Input 
                label="Tên Lớp" 
                value={editingClass.tenLop} 
                onChange={(e: any) => setEditingClass({...editingClass, tenLop: e.target.value})} 
              />
            </div>
            <Input 
              label="Giảng viên" 
              value={editingClass.giangVien} 
              onChange={(e: any) => setEditingClass({...editingClass, giangVien: e.target.value})} 
            />
            <div className="grid grid-cols-2 gap-4">
              <Input 
                label="Sĩ số (Hiện tại/Tối đa)" 
                value={editingClass.siSo} 
                onChange={(e: any) => setEditingClass({...editingClass, siSo: e.target.value})} 
              />
              <div className="mb-4 w-full">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Trạng thái</label>
                <select 
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all bg-white"
                  value={editingClass.trangThai}
                  onChange={(e) => setEditingClass({...editingClass, trangThai: e.target.value})}
                >
                  <option value="Đang mở">Đang mở</option>
                  <option value="Đang học">Đang học</option>
                  <option value="Đã kết thúc">Đã kết thúc</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 mt-2">
              <Button variant="secondary" onClick={() => setEditModalOpen(false)}>Hủy bỏ</Button>
              <Button onClick={handleSaveEdit}>
                <Save className="w-4 h-4" /> Lưu thay đổi
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ClassManagement;
