import axios from 'axios';

const { REACT_APP_URL_API: urlApi } = process.env;

const { chatId } = localStorage;

const baseApi = axios.create({
  baseURL: urlApi,
});

export const api = {
  getDebts: () => baseApi.get(`/debts?chatId=${chatId}`),
};
