import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import CatalogClient from "./CatalogClient";
import Filters from "@/components/Filters/Filters";
import css from "./Catalog.module.css";
import { fetchCampers } from "@/lib/api";

export default async function CatalogPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["campers-list"],
    queryFn: ({ pageParam = 1 }) => fetchCampers({ pageParam }),
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
