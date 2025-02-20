
export type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
};

export const createApiResponse = <T>(
  success: boolean,
  data?: T,
  error?: string
): ApiResponse<T> => ({
  success,
  ...(data && { data }),
  ...(error && { error }),
});
