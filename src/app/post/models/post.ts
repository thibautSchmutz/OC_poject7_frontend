import { Like } from './like';
import { Creator } from './creator';
export interface Post {
  id: number;
  content: string;
  imageUrl?: any;
  createdAt: Date;
  updatedAt: Date;
  parent_post_id?: any;
  user_id: number;
  comments?: any[];
  likes?: Like[];
  creator: Creator;
}
