import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import CatalogClient from "./CatalogClient";
import Filters from "@/components/Filters/Filters";
import css from "./Catalog.module.css";
import { fetchCars } from "@/lib/cars-api";

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const queryClient = new QueryClient();

  const filters = {
    brand: searchParams.brand || undefined,
    price: searchParams.price ? Number(searchParams.price) : undefined,
    minMileage: searchParams.minMileage
      ? Number(searchParams.minMileage)
      : undefined,
    maxMileage: searchParams.maxMileage
      ? Number(searchParams.maxMileage)
      : undefined,
  };

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["cars-list", filters],
    queryFn: ({ pageParam = 1 }) => fetchCars({ pageParam, ...filters }),
    initialPageParam: 1,
  });

  return (
    <main className={css.container}>
      <Filters />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <CatalogClient />
      </HydrationBoundary>
    </main>
  );
}
