import React, { useReducer } from 'react';
import Layout from 'antd/lib/layout';

import { Error, Footer, Header, Login, Table } from 'components';
import { initialState, reducer, context as Context } from 'services';

import styles from './App.module.scss';

const { Content } = Layout;

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Layout className={styles.wrap}>
      <Context.Provider value={{ state, dispatch }}>
        {!state.loggedIn ? (
          <Login />
        ) : (
          <>
            <Header />

            <Content className={styles.contentWrap}>
              <Layout className={styles.contentLayout}>
                <Content>
                  <Table />
                </Content>
              </Layout>
            </Content>

            <Footer />

            <Error />
          </>
        )}
      </Context.Provider>
    </Layout>
  );
};

export default App;
