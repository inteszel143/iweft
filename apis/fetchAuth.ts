import axios from "axios";
/**
 * Get User Data ---------------------------------------------------------
 */
export const getUserData = async () => {
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjNiNjdkYWViZGI4MWFmNTMwNGRjZGMiLCJpYXQiOjE3MTUxNjk5MDcsImV4cCI6MTcxNTI1NjMwNywidHlwZSI6ImFjY2VzcyJ9.6tfB0t9rnzdehr8LGHnnSAuTV2iuToBXAoHIeIu0GXQ";
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/user/profile`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          //   "Content-Type": "multipart/form-data",
        },
      }
    );
    return response?.data?.user;
  } catch (error) {
    return Promise.reject(error);
  }
};
