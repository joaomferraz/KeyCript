import { ObjectId } from 'npm:mongodb';

export interface Credential {
  _id?: ObjectId | string;
  userId: string;
  title: string;
  username: string;
  password: string;
  folder?: string;
}
