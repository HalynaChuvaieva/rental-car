"use client";
import css from "./Home.module.css";
import { useRouter } from "next/navigation";

export default function App() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/catalog/filter/all");
  };

  return (
    <main className={css.homepage}>
      <h1 className={css.title}>Campers of your dreams</h1>
      <h2 className={css.subtitle}>
        You can find everything you want in our catalog
      </h2>
      <button onClick={handleClick} className={css.button}>
        View Now
      </button>
    </main>
  );
}
