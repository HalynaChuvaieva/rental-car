import { Camper } from "@/types/camper";
import axios from "axios";

axios.defaults.baseURL = "https://campers-api.goit.study";

interface FetchCampersArgs {
  pageParam?: number;
  query?: string;
}
export interface CampersResponse {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  campers: Camper[];
}

export async function fetchCampers({
  pageParam = 1,
  query = "",
}: FetchCampersArgs): Promise<CampersResponse> {
  const params = {
    search: query,
    page: pageParam,
    perPage: 4,
  };

  const res = await axios.get<CampersResponse>("/campers", {
    params,
  });
  return res.data;
}

// export async function fetchCamperById(id: string) {
//   const res = await axios.get<Camper>(`/notes/${id}`);
//   return res.data;
// }

interface FilterOptions {
  forms: string[];
  engines: string[];
  transmissions: string[];
}

export const fetchFilters = async (): Promise<FilterOptions> => {
  const { data } = await axios.get("/campers/filters");
  return data;
};
