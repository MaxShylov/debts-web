import React from 'react';
import Layout from 'antd/lib/layout';

import { ButtonReload, ButtonSaveFilters } from 'components';

import styles from './Header.module.scss';

const { Header: AntHeader } = Layout;

export const Header = () => {
  return (
    <AntHeader className={styles.header}>
      <h1>Debts</h1>

      <div className={styles.action}>
        <ButtonSaveFilters />
        <ButtonReload />
      </div>
    </AntHeader>
  );
};
