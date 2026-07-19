import { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Rental Car | Find your perfect rental car",
  description: "Reliable and budget-friendly rentals for any journey",
  openGraph: {
    title: "Rental Car  | Find Your Perfect Ride",
    description:
      "Rent the best cars at affordable prices. Fast, reliable, and easy booking process.",
    url: "https://rental-car-sable.vercel.app",
    siteName: "Car Booking Service",
    images: [
      {
        url: "https://imgcdn.zigwheels.vn/medium/gallery/exterior/9/958/honda-hr-v-18808.jpg",
        width: 1200,
        height: 630,
        alt: "Car Booking Home",
      },
    ],
    type: "website",
  },
};

export default function App() {
  return <HomeClient />;
}
