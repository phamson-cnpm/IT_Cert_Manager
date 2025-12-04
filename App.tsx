import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout, AdminLayout, Card, Button, Input } from './components/Shared';

// Public Pages
import HomePage from './pages/public/HomePage';
import RegistrationPage from './pages/public/RegistrationPage';
import LookupPage from './pages/public/LookupPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ClassManagement from './pages/admin/ClassManagement';
import ImportResult from './pages/admin/ImportResult';
import UserManagement from './pages/admin/UserManagement';

// Placeholder for Forgot Password
const ForgotPasswordPage = () => (
  <div className="max-w-md mx-auto py-12 px-4">
    <Card title="Quên mã tra cứu" className="p-6">
      <p className="text-slate-600 mb-4">Nhập email bạn đã sử dụng để đăng ký. Chúng tôi sẽ gửi lại mã tra cứu cho bạn.</p>
      <form onSubmit={(e) => e.preventDefault()}>
        <Input label="Email" type="email" placeholder="email@example.com" required />
        <Button variant="primary" className="w-full mt-2">Gửi mã xác nhận</Button>
      </form>
    </Card>
  </div>
);

const App = () => {
  return (
    <HashRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
        <Route path="/register" element={<PublicLayout><RegistrationPage /></PublicLayout>} />
        <Route path="/lookup" element={<PublicLayout><LookupPage /></PublicLayout>} />
        <Route path="/forgot-code" element={<PublicLayout><ForgotPasswordPage /></PublicLayout>} />

        {/* Admin Routes */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
        <Route path="/admin/classes" element={<AdminLayout><ClassManagement /></AdminLayout>} />
        <Route path="/admin/import" element={<AdminLayout><ImportResult /></AdminLayout>} />
        <Route path="/admin/users" element={<AdminLayout><UserManagement /></AdminLayout>} />
      </Routes>
    </HashRouter>
  );
};

export default App;