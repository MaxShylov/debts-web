export const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const actions = {
  getDebtsRequest: 'getDebtsRequest',
  getDebtsSuccess: 'getDebtsSuccess',
  getDebtsFailure: 'getDebtsFailure',
};

export const reducer = (state, action) => {
  const { type, payload: { data, error } = {} } = action;

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


    default:
      return state;
  }
};
