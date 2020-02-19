import React, { useContext } from 'react';
import { actions, context } from 'services';
import Button from 'antd/lib/button';
import Tooltip from 'antd/lib/tooltip';

import styles from './ButtonSaveFilters.module.scss';

export const ButtonSaveFilters = () => {
  const {
    state: { saveFilters, tableFilters },
    dispatch,
  } = useContext(context);

  const toggleSaveFilters = () => {
    localStorage[saveFilters ? 'removeItem' : 'setItem'](
      'tableFilters',
      JSON.stringify(tableFilters),
    );
    dispatch({ type: actions.toggleSaveFilters });
  };

  const tooltipTitle = `Turn ${
    saveFilters ? 'off' : 'on'
  } saving filters to local storage`;
  const buttonType = saveFilters ? 'primary' : 'default';

  return (
    <Tooltip placement='bottom' title={tooltipTitle}>
      <Button
        type={buttonType}
        icon='save'
        onClick={toggleSaveFilters}
        className={styles.btn}
      >
        {saveFilters ? 'Save filters' : "Don't save filters"}
      </Button>
    </Tooltip>
  );
};
