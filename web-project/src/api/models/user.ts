import { UserRoles } from './userRoles';

export type User = {
  id: number;
  name: string;
  lastName: string;
  dateOfBirth: Date;
  info: string;
  email: string;
  photoAttachmentId: number;
  role: UserRoles;
};
