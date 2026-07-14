"use client";

import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import CamperCard from "@/components/CarCard/CarCard";
import css from "./Catalog.module.css";
import { fetchCampers } from "@/lib/api";
import Loader from "@/components/Loader/Loader";

export default function CatalogClient() {
  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["campers-list"],
      queryFn: ({ pageParam }) => fetchCampers({ pageParam }),
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

  return (
    <section className={css.catalogSection}>
      <ul className={css.catalogList}>
        {data.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.campers.map((camper) => (
              <li key={camper.id}>
                <CamperCard camper={camper} />
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
