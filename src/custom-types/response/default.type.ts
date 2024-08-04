export type DefaultResponse = {
  isSuccess: boolean;
  message: string;
  data: any;
};

export type ErrorResponse = DefaultResponse & {
  data: string | null;
};
