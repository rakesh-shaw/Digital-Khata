import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import AppLayout from "./components/layouts/AppLayout";
import CustomerListPage from "./pages/customers/CustomerListPage";
import CustomerDetailPage from "./pages/customers/CustomerDetailPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/" element={<AppLayout />}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="customerList" element={<CustomerListPage />} />
        <Route path="/customers/:name" element={<CustomerDetailPage />} />
      </Route>
    </Routes>
  );
}
