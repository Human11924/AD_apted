export type Role = "admin" | "employer" | "teacher" | "student";

export interface User {
  id: number;
  full_name: string;
  email: string;
  role: Role;
  is_active?: boolean;
  created_at?: string;
}

export interface AuthState {
  token: string | null;
  user: User | null;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterByCodeDto {
  access_code: string;
  full_name: string;
  email: string;
  password: string;
  department?: string;
  position?: string;
  english_level?: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}
