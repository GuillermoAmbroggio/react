const handleErrorReponse = (err: any) => {
  const error = err?.response?.data ?? err;

  return error;
};

export default handleErrorReponse;
