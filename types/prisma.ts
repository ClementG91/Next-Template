// Manual Prisma enum types (used when Prisma Client generation is incomplete)
export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
}

// User types for Prisma queries
export interface UserData {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  role: Role;
  createdAt: Date;
}

export interface UserWithDateFields {
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  role: Role;
  createdAt: Date;
}

export interface UserGrowthData {
  date: Date;
  count: number;
}

export interface UserGrowthResult {
  date: string;
  count: number;
}

export interface UserSearchResult {
  id: string;
  name: string | null;
  email: string;
  role: Role;
}
