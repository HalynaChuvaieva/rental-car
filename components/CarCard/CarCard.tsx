import Image from "next/image";
import css from "./CarCard.module.css";
import { Car } from "@/types/car"; // Шлях до ваших типів

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const formattedMileage = car.mileage.toLocaleString("uk-UA");

  return (
    <div className={css.card}>
      <Image
        src={car.img}
        alt={`${car.brand} ${car.model}`}
        className={css.image}
        width={244}
        height={268}
      />

      <div className={css.content}>
        <div className={css.header}>
          <h2 className={css.title}>
            {car.brand} <span className={css.model}>{car.model}</span>,
            {car.year}
          </h2>
          <p className={css.price}>${car.rentalPrice}</p>
        </div>

        <ul className={css.detailsList}>
          <li className={css.detailItem}>{car.location.city}</li>
          <li className={css.detailItem}>{car.location.country}</li>
          <li className={css.detailItem}>{car.rentalCompany}</li>
          <li className={css.detailItem}>
            {car.type.charAt(0).toUpperCase() + car.type.slice(1).toLowerCase()}
          </li>
          <li className={css.detailItem}>{formattedMileage} km</li>
        </ul>

        <button className={css.readMoreBtn}>Read more</button>
      </div>
    </div>
  );
}
