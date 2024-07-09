export const HeroSection = {
  punchLine: "Transform your resume into a keyword-rich tool",
  tagLine: "Receive daily job alerts tailored to you",
};

export interface IJob {
  job_id: string;
  job_url: string;
  job_url_direct: string;
  title: string;
  company: string;
  location: string;
  description: string;
  timestamp: string;
}

export const dummyJobs = [
  {
    job_id: "job001",
    job_url: "https://example.com/job001",
    job_url_direct: "https://jobs.example.com/openings/job001",
    title: "Software Engineer",
    company: "Tech Corp",
    location: "San Francisco, CA",
    description: "Develop and maintain web applications.",
    timestamp: "2023-10-01T12:00:00Z",
  },
  {
    job_id: "job002",
    job_url: "https://example.com/job002",
    job_url_direct: "https://jobs.example.com/openings/job002",
    title: "Data Scientist",
    company: "Data Insights",
    location: "New York, NY",
    description: "Analyze and interpret complex data sets.",
    timestamp: "2023-09-28T09:30:00Z",
  },
  {
    job_id: "job003",
    job_url: "https://example.com/job003",
    job_url_direct: "https://jobs.example.com/openings/job003",
    title: "Product Manager",
    company: "Innovate Solutions",
    location: "Austin, TX",
    description: "Lead the development and launch of new products.",
    timestamp: "2023-09-25T15:45:00Z",
  },
  {
    job_id: "job004",
    job_url: "https://example.com/job004",
    job_url_direct: "https://jobs.example.com/openings/job004",
    title: "UX Designer",
    company: "Creative Studio",
    location: "Remote",
    description: "Design user-friendly interfaces and experiences.",
    timestamp: "2023-09-20T08:00:00Z",
  },
  {
    job_id: "job005",
    job_url: "https://example.com/job005",
    job_url_direct: "https://jobs.example.com/openings/job005",
    title: "Backend Developer",
    company: "Cloud Services",
    location: "Seattle, WA",
    description: "Build and maintain server-side logic and infrastructure.",
    timestamp: "2023-09-18T13:15:00Z",
  },
];
