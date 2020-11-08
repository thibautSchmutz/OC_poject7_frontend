export interface Post {
  id: string;
  content: string;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  user_id: string;
  parent_post_id: string | null;
}
