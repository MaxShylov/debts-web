import React, { useContext } from 'react';
import Button from 'antd/lib/button';

import { actions, api, context } from 'services';

export const ButtonReload = () => {
  const {
    state: { loading },
    dispatch,
  } = useContext(context);

  const handleClick = async () => {
    dispatch({ type: actions.getDebtsRequest });

    const { data } = await api.getDebts();

    if (data.status === 'error') {
      dispatch({
        type: actions.getDebtsFailure,
        payload: { error: data.error },
      });
    }

    dispatch({
      type: actions.getDebtsSuccess,
      payload: { data: data.data },
    });
  };

  return (
    <Button
      shape='circle'
      icon='sync'
      loading={loading}
      onClick={handleClick}
    />
  );
};
