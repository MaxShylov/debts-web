import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from 'antd/lib/layout';

import styles from './App.module.scss';
import { Error, Table } from 'components';

const { Header, Footer, Content } = Layout;

const App = () => {
  const [response, setResponse] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('http://138.68.101.110:8080/debts');
      setResponse(data);
    };
    fetchData();
  }, []);

  if (response.status === 'error') {
    return <Error message={response.error} />;
  }

  //TODO add version to Footer

  return (
    <Layout className={styles.wrap}>
      <Header className={styles.header}>
        Debts
      </Header>
      <Content className={styles.contentWrap}>
        <Layout className={styles.contentLayout}>
          <Content>
            <Table data={response.data} />
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Debts v.0.1.0 ©2020 Created by Max Shylov
      </Footer>
    </Layout>
  );
};

export default App;
