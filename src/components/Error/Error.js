import React from 'react';
import PropTypes from 'prop-types';

import styles from './Error.module.scss';

export const Error = ({ message }) => {
  return <div className={styles.error}>{message}</div>;
};

Error.propTypes = {
  message: PropTypes.string,
};

Error.defaultProps = {
  message: 'Some Error',
};
