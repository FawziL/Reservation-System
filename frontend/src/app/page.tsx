"use client";
import { useAuth } from "@/hooks/AuthContext";
import { useRouter } from "next/navigation";

const navItems = [
    { path: "/", name: "Home", icon: "🏠" },
    { path: "/auth/register", name: "Register", icon: "✍️", auth: false },
    { path: "/auth/login", name: "Login", icon: "🔑", auth: false },
    { path: "/reservations", name: "Reservations User", icon: "📅", auth: true },
    { path: "/reservations/create", name: "Create Reservation", icon: "➕", auth: true },
    { path: "/admin/reservations", name: "Reservations Admin", icon: "📋", auth: "admin" },
    { path: "/admin/users", name: "Users", icon: "👥", auth: "admin" },
    { path: "/admin/tables", name: "Tables", icon: "🪑", auth: "admin" },
    { path: "/admin/tables/create", name: "Create Table", icon: "🆕", auth: "admin" },
    { path: "/logout", name: "Logout", icon: "🚪", auth: true, isLogout: true },
];


const Home = () => {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleNavigation = (item:any) => {
        if (item.isLogout) {
            logout();
            router.push("/auth/login");
        } else {
            router.push(item.path);
        }
    };

    return (
        <main className="flex flex-col items-center justify-center p-12">
            <h1 className="text-2xl font-bold mb-6">Welcome {user?.username}</h1>
            <div className="grid grid-cols-4 gap-8">
                {navItems
                    .filter(item => 
                        item.auth === undefined || 
                        (item.auth === true && user) || 
                        (user?.admin) || 
                        (item.auth === false && !user)
                    )
                    .map((item) => (
                        <button
                            key={item.path}
                            onClick={() => handleNavigation(item)}
                            className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow hover:bg-gray-200 transition"
                        >
                            <span className="text-3xl">{item.icon}</span>
                            <span className="mt-2 text-sm font-medium text-black">{item.name}</span>
                        </button>
                    ))}
            </div>
        </main>
    );
};

export default Home;
