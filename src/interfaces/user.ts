export interface User {
  _id: string;
  email: string;
  password: string;
  role: string;
  bio?: string;
  firstName: string;
  age?: number;
  gender?: string;
  address?: string;
  lastName: string;
  fullName: string;
  lastAppointment?: Date;
  profileImage?: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: User;
  updatedBy?: User;
}