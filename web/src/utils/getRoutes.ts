
// import BlogDetail from '~/components/views/BlogDetail';
import SingleBlog from '@/components/views/SingleBlog';

const modules = import.meta.glob('/src/pages/**/*.tsx', { eager: true });

export const getRoutes = () => {
  const routes = Object.keys(modules).map((path) => {
    const component = modules[path].default;
    const routePath = path
      .replace('/src/pages', '/')
      .replace(/\.tsx$/, '')
      .toLowerCase();
    return {
      path: routePath === '/index' ? '/' : routePath,
      component,
    };
    
  });

  
  routes.push({
    path: '/blog/:name',
    component: SingleBlog,
  });
 
 

  return routes;
};
