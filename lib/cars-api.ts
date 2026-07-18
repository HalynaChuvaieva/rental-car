import { Car } from "@/types/car";
import axios from "axios";
axios.defaults.baseURL = "https://car-rental-api.goit.study";

export interface FetchCarsArgs {
  pageParam?: number;
  brand?: string;
  price?: number | string;
  minMileage?: number | string;
  maxMileage?: number | string;
}

export interface CarsResponse {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
}

export async function fetchCars({
  pageParam = 1,
  brand,
  price,
  minMileage,
  maxMileage,
}: FetchCarsArgs): Promise<CarsResponse> {
  const params = {
    page: pageParam,
    perPage: 12,
    ...(brand && { brand }),
    ...(price && { price }),
    ...(minMileage && { minMileage }),
    ...(maxMileage && { maxMileage }),
  };

  const res = await axios.get<CarsResponse>("/cars", {
    params,
  });

  return res.data;
}

export async function fetchCarById(id: string) {
  const res = await axios.get<Car>(`/cars/${id}`);
  return res.data;
}

interface FilterOptions {
  brands: string[];
  price: {
    min: number;
    max: number;
  };
}

export const fetchFiltersData = async (): Promise<FilterOptions> => {
  const { data } = await axios.get<FilterOptions>("/cars/filters");
  return data;
};
