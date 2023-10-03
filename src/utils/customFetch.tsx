import axios from 'axios';

const customFetch = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API1_URL}`,
});

export default customFetch;
