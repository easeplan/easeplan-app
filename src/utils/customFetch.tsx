import axios from 'axios';

const customFetch = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
});

export default customFetch;
