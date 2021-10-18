import axios from 'axios';

const instance = axios.create({
  baseURL: `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMBDB_API_KEY}`,
});

const api = {
  getData: params =>
    instance({
      params: {
        ...params,
      },
    }),
};

export default api;
