const errorRes = (error: any) => {
  const message =
    error?.response?.data?.message ??
    error?.message ??
    error?.toString() ??
    error;

  return message;
};

export default errorRes;
