import { usePathname, useRouter } from "next/navigation";
import css from "./NotFoundCars.module.css";
import Image from "next/image";
export default function NotFoundCars() {
  const router = useRouter();
  const pathname = usePathname();

  const handleReset = () => {
    router.push(pathname);
  };

  return (
    <div className={css.container}>
      <Image
        src="/not-found.png"
        alt="No cars found"
        width={414}
        height={388}
        className={css.image}
      />
      <h2 className={css.title}>No cars found</h2>
      <p className={css.description}>
        We couldn`t find any cars that match your current filters. Try changing
        your search criteria or reset the filters.
      </p>
      <button onClick={handleReset} className={css.resetBtn}>
        Reset filters
      </button>
    </div>
  );
}
