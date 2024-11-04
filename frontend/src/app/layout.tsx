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
            <body>
                <AuthProvider>
                    <Navbar />
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}