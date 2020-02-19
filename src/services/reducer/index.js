import isEmpty from 'lodash/isEmpty';

const tableFilters = JSON.parse(localStorage.tableFilters || '{}');

export const initialState = {
  data: [],
  loading: false,
  error: null,
  tableFilters,
  saveFilters: !isEmpty(tableFilters),
};

export const actions = {
  getDebtsRequest: 'getDebtsRequest',
  getDebtsSuccess: 'getDebtsSuccess',
  getDebtsFailure: 'getDebtsFailure',
  setTableFilters: 'setTableFilters',
  toggleSaveFilters: 'toggleSaveFilters',
};

export const reducer = (state, action) => {
  const { type, payload: { data, error, tableFilters } = {} } = action;

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


    default:
      return state;
  }
};
