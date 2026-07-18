"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Image from "next/image";
import { fetchCarById } from "@/lib/cars-api";
import Loader from "@/components/Loader/Loader";
import css from "./CarDetails.module.css";
import { Car } from "@/types/car";
import BookingForm from "@/components/BookingForm/BookingForm";

export default function CarDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const {
    data: car,
    isLoading,
    error,
  } = useQuery<Car>({
    queryKey: ["car", id],
    queryFn: () => fetchCarById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <Loader />;
  if (error || !car) return <p>Car not found or something went wrong.</p>;

  const articleId = car.id.slice(-4).toUpperCase();

  return (
    <section className={css.container}>
      <div className={css.leftColumn}>
        <div className={css.wrapper}>
          <Image
            src={car.img}
            alt={`${car.brand} ${car.model}`}
            className={css.image}
            width={640}
            height={512}
          />
        </div>
        <BookingForm id={id} />
      </div>
      <div className={css.rightColumn}>
        <div className={css.headerInfo}>
          <h2 className={css.title}>
            {car.brand} {car.model}, {car.year}{" "}
          </h2>
          <p className={css.article}>Article: {articleId}</p>
          <p className={css.location}>
            <svg width="12" height="15">
              <use href="/sprite.svg#icon-location"></use>
            </svg>
            {car.location.city}, {car.location.country}
          </p>
          <p className={css.price}>${car.rentalPrice}</p>
        </div>

        <p className={css.description}>{car.description}</p>

        <div className={css.infoSection}>
          <h3 className={css.subtitle}>Rental Conditions:</h3>
          <ul className={css.list}>
            {car.rentalConditions.map((condition, index) => (
              <li className={css.item} key={index}>
                <svg width={16} height={16}>
                  <use href="/sprite.svg#icon-check"></use>
                </svg>{" "}
                <p>{condition}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className={css.infoSection}>
          <h3 className={css.subtitle}>Car Specifications:</h3>
          <ul className={css.list}>
            <li className={css.item}>
              <svg width={16} height={16}>
                <use href="/sprite.svg#icon-year"></use>
              </svg>{" "}
              <p>Year: {car.year}</p>
            </li>
            <li className={css.item}>
              <svg width={16} height={16}>
                <use href="/sprite.svg#icon-type"></use>
              </svg>{" "}
              <p>Type: {car.type}</p>
            </li>
            <li className={css.item}>
              <svg width={16} height={16}>
                <use href="/sprite.svg#icon-fuel"></use>
              </svg>{" "}
              <p>Fuel Consumption: {car.fuelConsumption}</p>
            </li>
            <li className={css.item}>
              <svg width={16} height={16}>
                <use href="/sprite.svg#icon-engine"></use>
              </svg>
              <p>Engine: {car.engine}</p>
            </li>
            {car.mileage != null && (
              <li className={css.item}>
                <svg width={16} height={16}>
                  <use href="/sprite.svg#icon-mileage"></use>
                </svg>
                <p>Mileage: {car.mileage}</p>
              </li>
            )}
          </ul>
        </div>

        <div className={css.infoSection}>
          <h3 className={css.subtitle}>Features:</h3>
          <ul className={css.list}>
            {car.features.map((feature, index) => (
              <li className={css.item} key={index}>
                <svg width={16} height={16}>
                  <use href="/sprite.svg#icon-check"></use>
                </svg>
                <p>{feature}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
