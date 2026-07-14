import Image from "next/image";
import css from "./CarCard.module.css";
import { Camper } from "@/types/camper";

interface CamperCardProps {
  camper: Camper;
}

export default function CamperCard({ camper }: CamperCardProps) {
  const formatBadge = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).replace("_", " ");
  };

  return (
    <div className={css.card}>
      <div className={css.thumb}>
        <Image
          src={camper.coverImage}
          alt={camper.name}
          className={css.image}
          width={219}
          height={240}
        />
      </div>

      <div className={css.content}>
        <div className={css.titleWrapper}>
          <h2 className={css.name}>{camper.name}</h2>
          <p className={css.price}>€{camper.price.toFixed(2)}</p>
        </div>

        <div className={css.meta}>
          <div className={css.rating}>
            <svg width="16" height="16" className={css.starIcon}>
              <use href="/sprite.svg#star"></use>
            </svg>
            <p className={css.ratingText}>
              {camper.rating}({camper.totalReviews} Reviews)
            </p>
          </div>

          <div className={css.location}>
            <svg width="16" height="16" className={css.mapIcon}>
              <use href="/sprite.svg#map"></use>
            </svg>
            <p className={css.locText}>{camper.location}</p>
          </div>
        </div>

        <p className={css.description}>{camper.description}</p>

        <ul className={css.badges}>
          <li className={css.badge}>
            <svg width="20" height="20">
              <use href="/sprite.svg#petrol"></use>
            </svg>
            <p className={css.badgeTitle}>{formatBadge(camper.engine)}</p>
          </li>
          <li className={css.badge}>
            <svg width="20" height="20">
              <use href="/sprite.svg#automatic"></use>
            </svg>
            <p className={css.badgeTitle}>{formatBadge(camper.transmission)}</p>
          </li>
          <li className={css.badge}>
            <svg width="20" height="20">
              <use href="/sprite.svg#camper"></use>
            </svg>
            <p className={css.badgeTitle}>{formatBadge(camper.form)}</p>
          </li>
        </ul>

        <button className={css.showMoreBtn}>Show more</button>
      </div>
    </div>
  );
}
