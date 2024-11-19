"use client";
import { useAuth } from "../hooks/AuthContext";
const Home = () => {
  const { user } = useAuth();
  return (
    <>
      <main className="flex flex-col items-center justify-center p-24">
        <h1>Welcome {user?.username}</h1>
      </main>
    </>
  );
}
export default Home;
