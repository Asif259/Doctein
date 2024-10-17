import axios from "@/config/axios";

export const getDashboardMetrics = async () => {
  try {
    const res = await axios.get("/dashboard/metrics");
    return res.data;
  } catch (error) {
    console.error("Error fetching dashboard metrics:", error);
    return null;
  }
};
