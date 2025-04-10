export const responseHelper = {
  success: (
    data: any,
    message: string = 'Success',
    statusCode: number = 200,
  ) => {
    return {
      statusCode,
      message,
      data,
    };
  },
  error: (err: any) => {
    return {
      statusCode: err?.status ?? 500,
      message: err.message,
      data: null,
    };
  },
};
