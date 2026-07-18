import { BookingData } from "@/types/booking-request";
import axios from "axios";
axios.defaults.baseURL = "https://car-rental-api.goit.study";

export const createBookingRequest = async (
  carId: string,
  data: BookingData,
) => {
  const response = await axios.post(`/cars/${carId}/booking-requests`, data);
  return response.data;
};
