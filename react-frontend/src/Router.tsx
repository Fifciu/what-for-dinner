import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { ChefPage } from './pages/Chef.page';
import { DishesPage } from './pages/Dishes.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/chef',
    element: <ChefPage />,
  },
  {
    path: '/dishes',
    element: <DishesPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
