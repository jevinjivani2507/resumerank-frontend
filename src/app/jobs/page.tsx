"use client";

import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import JobContainer from "@/components/job-container";
import { useJob } from "@/hooks/jobs.swr";
import useLocalStorage from "@/hooks/useLocalStorage";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Jobs = () => {
  const router = useRouter();
  const [userId, setUserId] = useLocalStorage<string>("user_id");

  const { userJobs, isUserJobsLoading, errorFetchingUserJobs } = useJob(
    userId || ""
  );

  useEffect(() => {
    if (!userId) {
      router.push("/login");
    }
  }, [userId]);

  return (
    <MaxWidthWrapper>
      <div className="flex flex-col gap-4 py-10">
        <div className="flex flex-col gap-1 text-center">
          <h1 className="text-3xl font-semibold">Top Picks for You Today</h1>
          <h3 className="font-medium">
            Tailored Job Recommendations to Fit Your Career Goals
          </h3>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
          {!isUserJobsLoading && !errorFetchingUserJobs ? (
            userJobs.map((job, index) => <JobContainer key={index} {...job} />)
          ) : (
            <div>
              {errorFetchingUserJobs ? (
                <div className="h-[50vh] flex flex-col justify-center items-center">
                  <h1 className="text-2xl">Error Fetching Jobs</h1>
                  <p className="text-sm">
                    May be you have not uploaded your resume yet. Please upload{" "}
                    <Link href={"/upload-resume"}>
                      {" "}
                      <span className="font-bold underline"> here </span>{" "}
                    </Link>
                  </p>
                </div>
              ) : (
                <div className="h-[50vh] flex flex-col justify-center items-center">
                  <h1 className="text-2xl">Loading Jobs</h1>
                  <p className="text-sm">
                    Please wait while we fetch jobs for you
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Jobs;
