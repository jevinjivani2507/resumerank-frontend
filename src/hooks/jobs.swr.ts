import useSWR from "swr";
import API_CONSTANTS from "@/utils/apiConstants";
import { genericAPIFetcher } from "@/utils/helpers/swr.helpers";
import { IJob } from "@/interfaces/IJob";

export function useJob(id: string) {
  const { data, error, isLoading } = useSWR(
    [API_CONSTANTS.GET_JOBS(id), "get"],
    genericAPIFetcher
  );

  return {
    userJobs: data?.data as IJob[],
    isUserJobsLoading: isLoading as boolean,
    errorFetchingUserJobs: error,
  };
}
