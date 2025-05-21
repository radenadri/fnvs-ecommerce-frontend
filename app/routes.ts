import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';

export default [
  layout('routes/layouts/main-layout.tsx', [
    index('routes/home.tsx'),
    route('about', 'routes/about.tsx'),
    route('signin', 'routes/signin.tsx'),
    route('products/:slug', 'routes/details.tsx'),
  ])
] satisfies RouteConfig;
