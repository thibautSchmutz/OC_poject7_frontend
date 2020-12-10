export interface LikeInfo {
  like_post_id: number;
  like_user_id: number;
}

export interface Like {
  firstName: string;
  lastName: string;
  like: LikeInfo;
}

export interface Creator {
  firstName: string;
  lastName: string;
  imageUrl: string;
}

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
