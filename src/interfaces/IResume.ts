export interface IResume {
  user_id: string;
  name: string;
  email: string;
  resume_path: string;
  resume_text: string;
  jobs: string[];
  resume_embeddings: number[];
  keywords: string | null;
  id: string;
}
