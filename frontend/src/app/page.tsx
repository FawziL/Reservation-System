import Navbar from '../components/NavBar.js';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold">Welcome to our App</h1>
      </main>
    </>
  );
}
