import React, { useContext } from 'react';
import cn from 'classnames';

import { context } from 'services';

import styles from './Error.module.scss';

export const Error = () => {
  const {
    state: { error },
  } = useContext(context);

  return <div className={cn(styles.error, {[styles.display]: error})}>
    <p>{error}</p>
    <p>Please, report to administrator.</p>
  </div>;
};
