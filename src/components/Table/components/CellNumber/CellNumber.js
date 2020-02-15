import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { formattedNumber } from 'helpers';

import styles from './CellNumber.module.scss';

export const CellNumber = ({ num }) => {
  if (!num) return '-';

  const number = formattedNumber(num);

  return (
    <div
      className={cn(styles.cell, {
        [styles.small]: num < 1000,
        [styles.medium]: num < 3000 && num >= 1000,
        [styles.large]: num > 3000,
      })}
    >
      {number}
    </div>
  );
};

CellNumber.propTypes = {
  num: PropTypes.number,
};

CellNumber.defaultProps = {
  num: null,
};
