import type { RouteRecord } from 'vite-react-ssg';
import App from './App';
import Index from './pages/Index';

// Default-exported page components are adapted to react-router's lazy shape.
const lazyDefault = (loader: () => Promise<{ default: React.ComponentType }>) => () =>
  loader().then((m) => ({ Component: m.default }));

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <App />,
    entry: 'src/App.tsx',
    children: [
      { index: true, Component: Index, entry: 'src/pages/Index.tsx' },
      { path: 'faq', lazy: lazyDefault(() => import('./pages/FAQ')) },
      {
        path: 'automation-roi-calculator',
        lazy: lazyDefault(() => import('./pages/Calculator')),
      },
      { path: 'privacy', lazy: lazyDefault(() => import('./pages/Privacy')) },
      { path: 'terms', lazy: lazyDefault(() => import('./pages/Terms')) },
      { path: '*', lazy: lazyDefault(() => import('./pages/NotFound')) },
    ],
  },
];
