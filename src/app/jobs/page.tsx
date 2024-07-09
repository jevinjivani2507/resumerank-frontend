"use client";

import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import JobContainer from "@/components/job-container";
import { useJob } from "@/hooks/jobs.swr";
import useLocalStorage from "@/hooks/useLocalStorage";

const Jobs = () => {
  const [userId, setUserId] = useLocalStorage<string>("user_id");

  const { userJobs, isUserJobsLoading, errorFetchingUserJobs } = useJob(userId);

  console.log(userJobs, isUserJobsLoading, errorFetchingUserJobs);

  return (
    <MaxWidthWrapper>
      <div>
        {/* <UploadResume /> */}
        <div className="flex flex-col gap-4 py-10">
          <div className="flex flex-col gap-1 text-center">
            <h1 className="text-3xl font-semibold">Top Picks for You Today</h1>
            <h3 className="font-medium">
              Tailored Job Recommendations to Fit Your Career Goals
            </h3>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
            {!isUserJobsLoading &&
              !errorFetchingUserJobs &&
              userJobs.map((job, index) => (
                <JobContainer key={index} {...job} />
              ))}
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Jobs;
