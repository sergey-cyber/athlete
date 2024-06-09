export type UserType = {
  id: number;
  firstName: string;
  secondName: string;
  middleName: string;
  email: string;
  phone: number;
  address: string;
  userType: string;
  locality: string;
  role: string;
  login: string;
};

export type UserDetails = {
  id: number;
  firstName?: string;
  secondName?: string;
  middleName?: string;
  email?: string;
  phone?: number;
  address?: string;
  city?: string;
};
