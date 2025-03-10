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
        <main className="mainNavigation">
            <h1 className="text-2xl font-bold mb-6">Welcome {user?.username}</h1>
            <div className="containerCardNavigation">
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
                            className="cardNavigation"
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
