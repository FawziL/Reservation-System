export const navItems = [
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