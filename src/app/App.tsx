import { RouterProvider } from 'react-router';
import { Toaster } from 'sonner';
import { router } from './routes';
import { NotesProvider } from './context/NotesContext';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';

export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <NotesProvider>
          <RouterProvider router={router} />
          <Toaster position="top-right" />
        </NotesProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}