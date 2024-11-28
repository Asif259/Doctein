import axios from "@/config/axios";
import { AxiosError } from "axios";

export const getDashboardMetrics = async () => {
    try {
        const res = await axios.get("/dashboard/metrics");
        return res.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError) return error.response?.data;
    }
};
