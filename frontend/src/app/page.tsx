"use client";
import { useAuth } from "@/hooks/AuthContext";
import { useRouter } from "next/navigation";
import { navItems } from "@/utils/navItems";

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
            <div className="grid grid-cols-3 gap-8">
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
