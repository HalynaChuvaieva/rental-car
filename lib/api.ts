import { Camper } from "@/types/car";
import axios from "axios";

axios.defaults.baseURL = "https://car-rental-api.goit.study";

interface FetchCampersArgs {
  pageParam?: number;
  query?: string;
}
export interface CarsResponse {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  cars: Camper[];
}

export async function fetchCars({
  pageParam = 1,
  query = "",
}: FetchCampersArgs): Promise<CarsResponse> {
  const params = {
    search: query,
    page: pageParam,
    perPage: 4,
  };

  const res = await axios.get<CarsResponse>("/campers", {
    params,
  });
  return res.data;
}

// export async function fetchCamperById(id: string) {
//   const res = await axios.get<Camper>(`/notes/${id}`);
//   return res.data;
// }

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
