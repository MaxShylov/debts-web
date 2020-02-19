import React, { useContext } from 'react';
import Button from 'antd/lib/button';
import Tooltip from 'antd/lib/tooltip';

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
    <Tooltip placement='bottom' title='Click to reload data'>
      <Button icon='sync' loading={loading} onClick={handleClick} />
    </Tooltip>
  );
};
