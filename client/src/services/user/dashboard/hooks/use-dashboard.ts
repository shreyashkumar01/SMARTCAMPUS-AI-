import { useSuspenseQuery } from "@tanstack/react-query";
import { getCurrentUserId} from "@/lib/auth-utils";
import { unauthorized } from "next/navigation";

const fetchDashboard = async () => {
  const userId = getCurrentUserId();
  if (!userId) {
    unauthorized();
  }
  const res = await fetch("/api/user/dashboard", {
    cache: "no-store",
    headers: {
      "X-User-Id": userId,
    },
  });
  
  if (!res.ok) {
    if (res.status === 401) {
     unauthorized();
    }
    throw new Error("Failed to fetch dashboard data");
  }
  return res.json();
};


export const useDashboardData = () => {
  return useSuspenseQuery({
    queryKey: ["user/dashboard"],
    queryFn: fetchDashboard,
    staleTime: 5 * 60 * 1000, 
  });
};

export const useSummary = () => {
  const { data,isLoading,isError } = useDashboardData();
  return {summary:data.summary,isLoading,isError};
};

export const useChartData = () => {
    const { data,isLoading,isError } = useDashboardData();
    return {chartData:data.chartData,isLoading,isError};
};

export const useRecents = () => {
    const { data,isLoading,isError } = useDashboardData();
  return {recents:data.recents,isLoading,isError};
};
