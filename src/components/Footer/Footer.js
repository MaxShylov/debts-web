import React from 'react';
import Layout from 'antd/lib/layout';

import styles from './Footer.module.scss';

const { Footer: AntFooter } = Layout;

export const Footer = () => {
  //TODO add version to Footer
  return (
    <AntFooter className={styles.footer}>
      Debts v.1.1.0 ©2020 Created by Max Shylov
    </AntFooter>
  );
};
