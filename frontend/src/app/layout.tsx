import './globals.css'; // Asegúrate de importar los estilos globales
import Navbar from '../components/NavBar';
import { AuthProvider } from '../hooks/AuthContext';

export const metadata = {
    title: 'My App',
    description: 'Descripción de la aplicación',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className='h-screen bg-slate-600 flex h-full flex-col items-center justify-center p-24'>
                <AuthProvider>
                    <Navbar />
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}