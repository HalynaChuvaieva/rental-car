import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import CatalogClient from "./CatalogClient";
import Filters from "@/components/Filters/Filters";
import css from "./Catalog.module.css";
import { fetchCars } from "@/lib/cars-api";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catalog | Choose Your Car",
  description:
    "Browse our extensive catalog of premium and economy cars available for rent.",
  openGraph: {
    title: "Catalog | Choose Your Car",
    description:
      "Browse our extensive catalog of premium and economy cars available for rent.",
    url: "https://rental-car-sable.vercel.app",
    siteName: "Car Booking Service",
    images: [
      {
        url: "https://imgcdn.zigwheels.vn/medium/gallery/exterior/9/958/honda-hr-v-18808.jpg",
        width: 1200,
        height: 630,
        alt: "Car Catalog list",
      },
    ],
    type: "website",
  },
};
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
