export interface LoginRequest {
  email: string;
  password: string;
  responseToken?: string;
}
export interface UserDto {
  id: number;
  username: string;
  email: string;
  createdAt: Date | string;
}

export interface User {
  authProvider?: any;
  createdAt: Date | string;
  email: string;
  confirmPass?: string;
  username: string;
  id?: number;
  password: string | null;
  userRole?: any;
}

export interface PostUser {
  _id?: string;
  username: string;
}

export interface Post {
  _id: string;
  content: string;
  filename: string;
  type: string;
  author: PostUser;
  thumbnailurl?: string;
  liketype?: boolean;
  likecnt?: number | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}
export interface CommentUser {
  _id?: string;
  username: string;
}
export interface Comment {
  _id: string;
  commentary: string;
  postId: string;
  user: CommentUser;
  postName: string;
  userId: string;
  createdAt: string;
}
export interface newPost {
  post: Post;
  comments: Comment[];
}
export interface Pagination {
  id: number;
  name: string;
}
