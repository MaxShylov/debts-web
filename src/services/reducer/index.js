import isEmpty from 'lodash/isEmpty';

const { chatId, tableFilters: tFilters = '{}' } = localStorage;
const tableFilters = JSON.parse(tFilters);

export const initialState = {
  data: [],
  loading: false,
  error: null,
  tableFilters,
  saveFilters: !isEmpty(tableFilters),
  loggedIn: !!chatId,
};

export const actions = {
  getDebtsRequest: 'getDebtsRequest',
  getDebtsSuccess: 'getDebtsSuccess',
  getDebtsFailure: 'getDebtsFailure',
  setTableFilters: 'setTableFilters',
  toggleSaveFilters: 'toggleSaveFilters',
  setLogInStatus: 'setLogInStatus',
};

export const reducer = (state, action) => {
  const {
    type,
    payload: { data, error, tableFilters, logInStatus } = {},
  } = action;

  switch (type) {
    case actions.getDebtsRequest:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actions.getDebtsSuccess:
      return {
        ...state,
        loading: false,
        data,
      };

    case actions.getDebtsFailure:
      return {
        ...state,
        loading: false,
        error,
      };

    case actions.setTableFilters:
      return {
        ...state,
        tableFilters,
      };

    case actions.toggleSaveFilters:
      return {
        ...state,
        saveFilters: !state.saveFilters,
      };

    case actions.setLogInStatus:
      return {
        ...state,
        loggedIn: logInStatus,
      };

    default:
      return state;
  }
};
