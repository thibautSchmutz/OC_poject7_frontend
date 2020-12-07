export interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserState {
  currentUser: User;
  admin: boolean;
}
