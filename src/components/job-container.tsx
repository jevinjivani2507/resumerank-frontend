import { JobIcon, LocationIcon, RupeeIcon, LinkedInIcon } from "@/assets";
import { Button } from "@/components/ui/button";
import { ISkill, IJob } from "@/lib/interfaces";

const processSkills = (
  skills: ISkill[]
): { topSkills: ISkill[]; remainingCount: number } => {
  const sortedSkills = skills?.sort(
    (a, b) => (b.isHave ? 1 : 0) - (a.isHave ? 1 : 0)
  );

  const topSkills = sortedSkills?.slice(0, 6);
  const remainingCount = sortedSkills?.length - topSkills?.length;

  return {
    topSkills,
    remainingCount,
  };
};

const SkillTag = ({ skill, isHave }: { skill: string; isHave?: boolean }) => (
  <div
    className={`px-2 py-1 w-fit rounded-lg ${
      isHave ? "bg-[#D7FFD8]" : "bg-[#E2E6EE]"
    }`}
  >
    {skill}
  </div>
);

const JobContainer = (job: IJob) => {
  const { topSkills, remainingCount } = processSkills(job.skills);

  return (
    <div className="flex flex-col p-6 gap-3 border rounded-3xl border-primary">
      <div className="bg-[#D7FFD8] px-2 py-1 w-fit rounded-lg text-xs ">
        {job.experience}
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-5">
          <div className="flex gap-3">
            <div className="p-3 bg-[#D6D7FF] w-fit rounded-xl">
              <JobIcon />
            </div>
            <div className="flex flex-col justify-between">
              <div className="flex gap-2 items-center">
                <h4 className="text-2xl font-bold">{job.company}</h4>
                <LinkedInIcon />
              </div>
              <h6 className="text-base font-medium">{job.role}</h6>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <div className="p-2 bg-[#E2E6EE] rounded-full w-8 h-8 flex justify-center items-center">
                <RupeeIcon />
              </div>
              <span className="text-lg font-medium">{job.salary}</span>
            </div>
            <div className="flex gap-2 items-center">
              <div className="p-2 bg-[#E2E6EE] rounded-full w-8 h-8 flex justify-center items-center">
                <LocationIcon />
              </div>
              <span className="text-lg font-medium">{job.location}</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {topSkills?.map((skill, index) => (
              <SkillTag key={index} skill={skill.label} isHave={skill.isHave} />
            ))}
            {remainingCount > 0 && (
              <div className="px-2 py-1 w-fit rounded-lg bg-[#E2E6EE]">
                +{remainingCount} more
              </div>
            )}
          </div>
        </div>
        <Button className="w-fit">Apply Now</Button>
      </div>
    </div>
  );
};

export default JobContainer;
