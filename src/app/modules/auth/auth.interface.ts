import { Article } from "../../../generated/prisma";

export interface User {
  id: string;
  email: string;
  password: string;
  articles?: Article[];
}
