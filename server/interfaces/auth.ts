import { Document, Model } from "mongoose";
export interface IAuthPayload {
  email: string;
  password: string;
}

export interface IUserDocument extends Document {
  email: string;
  password: string;
  createdOn: Date;
}

export interface IUserModel extends Model<Document> {
  login(email: string, password: string): Promise<Document>;
}
