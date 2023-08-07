import { api } from "./api";

export type UserResponse = {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  blockedAt: string | null;
  profile: {
    id: string;
    firstname: string;
    lastname: string;
    bio: string | null;
    createdAt: string;
    updatedAt: string;
  };
  role: {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    permissions: {
      id: string;
      name: string;
      description: string;
      createdAt: string;
      updatedAt: string;
    }[];
  };
  token: string;
};

type LoginPayload = {
  username: string;
  password: string;
};

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginPayload>({
      query: (body) => {
        return {
          url: "auth/login",
          method: "POST",
          body,
        };
      },
    }),
    validateToken: builder.mutation<UserResponse, undefined>({
      query() {
        return {
          url: "auth/validate-token",
          method: "POST",
        };
      },
    }),
  }),
});

export const { useLoginMutation, useValidateTokenMutation } = authApi;
