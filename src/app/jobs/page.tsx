import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import JobContainer from "@/components/job-container";
import { dummyJobs } from "@/constants/locales";
const Jobs = () => {
  return (
    <MaxWidthWrapper>
      <h1>Top Picks for You Today</h1>
      <h3>Tailored Job Recommendations to Fit Your Career Goals</h3>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
        {dummyJobs.map((job, index) => (
          <JobContainer key={index} {...job} />
        ))}
      </div>
    </MaxWidthWrapper>
  );
};

export default Jobs;
