import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import CarDetailsClient from "./CarDetails.client";
import { Metadata } from "next";
import { fetchCarById } from "@/lib/cars-api";

type CarDetailsProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: CarDetailsProps): Promise<Metadata> {
  const { id } = await params;
  const car = await fetchCarById(id);

  return {
    title: `${car.brand} ${car.model}, ${car.year} - Rent now`,
    description: car.description,
    openGraph: {
      title: `${car.brand} ${car.model} for rent`,
      description: car.description,
      images: [
        {
          url: car.img,
          width: 800,
          height: 600,
          alt: `${car.brand} ${car.model}`,
        },
      ],
    },
  };
}

export default async function CarDetailsPage({ params }: CarDetailsProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["car", id],
    queryFn: () => fetchCarById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CarDetailsClient />
    </HydrationBoundary>
  );
}
