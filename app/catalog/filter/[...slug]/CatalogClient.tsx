"use client";

import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import CarCard from "@/components/CarCard/CarCard";
import css from "./Catalog.module.css";
import { fetchCars } from "@/lib/api";
import Loader from "@/components/Loader/Loader";

interface CatalogClientProps {
  filters: {
    brand?: string;
    price?: number;
    minMileage?: number;
    maxMileage?: number;
  };
}

export default function CatalogClient({ filters }: CatalogClientProps) {
  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
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
    });

  if (status === "pending") return <Loader />;
  if (status === "error") return <p>Error loading data.</p>;

  if (!data?.pages[0]?.cars?.length) {
    return (
      <p className={css.noResults}>No cars found matching your filters.</p>
    );
  }

  return (
    <section className={css.catalogSection}>
      <ul className={css.catalogList}>
        {data.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.cars.map((car) => (
              <li key={car.id}>
                <CarCard car={car} />
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>

      {hasNextPage && (
        <button
          className={css.loadMoreBtn}
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? <Loader /> : "Load more"}
        </button>
      )}
    </section>
  );
}
