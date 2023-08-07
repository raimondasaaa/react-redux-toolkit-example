import { api } from "./api";

export type DrawingSearchResponse = {
  id: string;
  title: string;
  revision: string;
  isPrimaPower: boolean;
  isPainted: boolean;
  paintType: "PAINTED" | "NOT_PAINTED" | "PAINTED_IN_NEXT_ASSEMBLY";
};

type DrawingSearchPayload = {
  name?: string;

  revision?: string;
};

export type DrawingResponse = {
  id: string;
  groupName: string;

  updater: {
    email: string;
  };

  pdf: {
    data: string;
    updatedAt: string;
  };
};

type DrawingPayload = {
  name: string;
  revision?: string;
};

type RelatedPayload = {
  name: string;
};

export const drawingApi = api.injectEndpoints({
  endpoints: (builder) => ({
    search: builder.query<DrawingSearchResponse[], DrawingSearchPayload>({
      query: (payload) => {
        let url = `drawing/get-search/${payload.name}`;

        if (payload.revision) {
          url += `/${payload.revision}`;
        }

        return {
          url,
          method: "GET",
        };
      },
    }),
    getDrawing: builder.query<DrawingResponse, DrawingPayload>({
      query: (payload) => {
        let url = `drawing/get-one/${payload.name}`;

        if (payload.revision) {
          url += `/${payload.revision}`;
        }

        return {
          url,
          method: "GET",
        };
      },
    }),

    getRelated: builder.query<any, RelatedPayload>({
      query(payload) {
        const url = `drawing/get-related-drawings/${payload.name}`;

        return {
          url,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useSearchQuery, useGetDrawingQuery, useGetRelatedQuery } =
  drawingApi;
