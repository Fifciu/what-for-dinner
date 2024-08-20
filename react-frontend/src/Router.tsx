import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { ChefPage } from './pages/Chef.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/chef',
    element: <ChefPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
