export interface BlogState {
  isLoading: boolean;
  blogs: Blog[];
  currentBlog: Blog | null;
  failureResponse: string | null;
  updateSuccess: boolean;
  createSuccess: boolean;
}

export interface Blog {
  user_id: string;
  Id: number;
  Title: string;
  Description: string;
}
