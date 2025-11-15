import Header from "./components/Header";
import Hero from "./components/Hero";

export default function App() {
  return (
    <>
      <Header />

      <main className="px-6">
        <Hero />

        <div className="mt-10">
          Page content
        </div>
      </main>
    </>
  );
}

