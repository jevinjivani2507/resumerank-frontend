export interface ISkill {
  label: string;
  isHave: boolean;
}

export interface IJob {
  experience: string;
  title: string;
  company: string;
  role: string;
  location: string;
  salary: string;
  skills: ISkill[];
}
