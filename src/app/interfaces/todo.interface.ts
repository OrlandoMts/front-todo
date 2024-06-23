import { AuthItf } from './auth.interface';

export interface TodoItf {
  _id: string;
  title: string;
  description?: string;
  limitDate?: Date;
  complete: boolean;
  author: AuthItf;
}
