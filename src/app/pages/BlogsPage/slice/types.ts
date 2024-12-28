export interface BlogState {
  blogs: Blog[];
  blog: Blog;
  isLoading: boolean;
  requestSuccess: boolean;
}

export interface Blog {
  user_id: string;
  Id: number;
  Title: string;
  Description: string;
}

export interface user {
  user_id: string;
  jwt: string;
}

export interface userState {
  user: user;
  isLoading: boolean;
  RequestSuccess: boolean;
}
