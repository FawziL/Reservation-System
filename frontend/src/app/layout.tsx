import './globals.css';
import Navbar from '@/components/NavBar';
import { AuthProvider } from '@/hooks/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
    title: 'My App',
    description: 'Descripción de la aplicación',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className='min-h-screen bg-slate-600 flex h-full flex-col items-center justify-center p-16'>
                <AuthProvider>
                    <Navbar />
                    {children}
                </AuthProvider>
                <ToastContainer />
            </body>
        </html>
    );
}