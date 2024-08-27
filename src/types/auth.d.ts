export type AuthPayload = {
  token: string;
  userToken?: string | null;
  name: string;
} | null;

export type AuthState = {
  name: string;
  userToken: string | null;
  loading: boolean;
};
