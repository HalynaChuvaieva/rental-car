"use client";

import React from "react";
import { useInfiniteQuery, keepPreviousData } from "@tanstack/react-query";
import CarCard from "@/components/CarCard/CarCard";
import css from "./Catalog.module.css";
import { fetchCars } from "@/lib/api";
import Loader from "@/components/Loader/Loader";
import LoadingModal from "@/components/LoadingModal/LoadingModal";
import { useSearchParams } from "next/navigation";
import NotFoundCars from "@/components/NotFoundCars/NotFoundCars";

export default function CatalogClient() {
  const searchParams = useSearchParams();

  const filters = {
    brand: searchParams.get("brand") || undefined,
    price: searchParams.get("price")
      ? Number(searchParams.get("price"))
      : undefined,
    minMileage: searchParams.get("minMileage")
      ? Number(searchParams.get("minMileage"))
      : undefined,
    maxMileage: searchParams.get("maxMileage")
      ? Number(searchParams.get("maxMileage"))
      : undefined,
  };

  const {
    data,
    status,
    fetchNextPage,
    isFetching,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["cars-list", filters],
    queryFn: ({ pageParam }) => fetchCars({ pageParam, ...filters }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });

  if (status === "pending") return <Loader />;
  if (status === "error") return <p>Error loading data.</p>;

  if (!data?.pages[0]?.cars?.length) {
    return <NotFoundCars />;
  }

  return (
    <section className={css.catalogSection}>
      {isFetching && !isFetchingNextPage && <LoadingModal />}

      <ul className={css.catalogList}>
        {data.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.cars.map((car) => (
              <li key={car.id} className={css.carItem}>
                <CarCard car={car} />
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>

      {hasNextPage &&
        (isFetchingNextPage ? (
          <Loader />
        ) : (
          <button className={css.loadMoreBtn} onClick={() => fetchNextPage()}>
            Load more
          </button>
        ))}
    </section>
  );
}
