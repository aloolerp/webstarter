

import SingleBlog from '@/components/views/SingleBlog';
import AloolPageView from '@/components/views/AloolPageView';
const modules = import.meta.glob('/src/pages/**/*.tsx', { eager: true });

export const getRoutes = () => {
  const routes = Object.entries(modules).map(([path, module]) => {
    const component = module.default;
    const routePath = path
      .replace('/src/pages', '')
      .replace(/\.tsx$/, '')
      .toLowerCase();
    return { path: routePath === '/index' ? '/web' : routePath, component };
  });

  routes.push({ path: '/blog/:name', component: SingleBlog });
  routes.push({ path: '/:path/:pageName', component: AloolPageView });

  return routes;
};
