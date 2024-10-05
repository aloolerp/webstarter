import { FrappeProvider } from 'frappe-react-sdk';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import "./index.css";
import { getRoutes } from "./utils/getRoutes";
import { ThemeProvider } from './utils/ThemeProvider';
import NotFound from './pages/NotFound';
import DynamicPage from './pages/DynamicPage';
import Layout from './components/layout/Layout';



function App() {
  const routes = getRoutes();

  return (
  
    <FrappeProvider
      siteName={import.meta.env.VITE_SITE_NAME} socketPort={import.meta.env.VITE_SOCKET_PORT}>

      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <BrowserRouter basename={import.meta.env.VTE_BASE_PATH}>
      <Layout>
        <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={<route.component />} />))}
         
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="*" element={<NotFound />} />

          <Route path="/:pageName" element={<DynamicPage />} />
          
          
          
          
        </Routes>
        </Layout>
      </BrowserRouter>
      </ThemeProvider>
    </FrappeProvider>
  
  );
}

export default App;
