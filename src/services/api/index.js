import axios from 'axios';

const { REACT_APP_URL_API: urlApi } = process.env;

export const api = {
  getDebts: () => axios.get(`${urlApi}/debts`),
};
