import { FrappeProvider } from 'frappe-react-sdk';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import "./index.css";
import { getRoutes } from "./utils/getRoutes";
import { ThemeProvider } from './utils/ThemeProvider';
import NotFound from './pages/NotFound';
import DynamicPage from './pages/DynamicPage';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import { CurrentUserProvider } from './components/auth/CurrentUser';

function App() {
  const routes = getRoutes();

  return (
    <FrappeProvider siteName={import.meta.env.VITE_SITE_NAME} socketPort={import.meta.env.VITE_SOCKET_PORT}>
      <CurrentUserProvider> 
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <BrowserRouter basename={import.meta.env.VTE_BASE_PATH}>
          <Routes>
            <Route path="/dashboard/*" element={<Dashboard />} />
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={<Layout><route.component /></Layout>} />
            ))}
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="*" element={<Layout><NotFound /></Layout>} />
            <Route path="/:pageName" element={<Layout><DynamicPage /></Layout>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
      </CurrentUserProvider>
    </FrappeProvider>
  );
}

export default App;
