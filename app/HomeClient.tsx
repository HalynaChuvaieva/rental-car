"use client";

import { useRouter } from "next/navigation";
import css from "./Home.module.css";

export default function HomeClient() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/catalog");
  };

  return (
    <main className={css.homepage}>
      <h1 className={css.title}>Find your perfect rental car</h1>
      <h2 className={css.subtitle}>
        Reliable and budget-friendly rentals for any journey
      </h2>
      <button onClick={handleClick} className={css.button}>
        View Catalog
      </button>
    </main>
  );
}
