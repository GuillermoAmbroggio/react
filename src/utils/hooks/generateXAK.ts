const { REACT_APP_SECRET_DAILY_API_KEY } = process.env;

const generateXAK = async (string: string) => {
  const combinedString = `${string}${REACT_APP_SECRET_DAILY_API_KEY}`;

  const encoder = new TextEncoder();
  const data = encoder.encode(combinedString);

  const api = await crypto.subtle.digest('SHA-256', data).then((hashBuffer) => {
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const apiKey = hashArray
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');

    return apiKey;
  });

  return api;
};

export default generateXAK;
