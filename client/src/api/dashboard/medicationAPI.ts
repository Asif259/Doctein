import axios from "@/config/axios";

export const getMedication = async (search: string) => {
  try {
    const response = await axios.get(`/medication/search?search=${search}`);
    return response.data;
  } catch (error) {
    console.error(error);
    // return error;
  }
};
