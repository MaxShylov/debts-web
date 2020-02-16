import React, { useContext, useEffect } from 'react';
import AntTable from 'antd/lib/table';

import { api, actions, context } from 'services';

import styles from './Table.module.scss';
import { generateColumns, generateDataSource } from './helpers';

function onChange(pagination, filters, sorter, extra) {
  // TODO will save to localStorage
  console.log('params', pagination, filters, sorter, extra);
}

export const Table = () => {
  const {
    state: { loading, data },
    dispatch,
  } = useContext(context);
  const columns = generateColumns(data);
  const dataSource = generateDataSource(data);

  useEffect(() => {
    dispatch({ type: actions.getDebtsRequest });

    const fetchData = async () => {
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

    fetchData();
  }, [dispatch]);

  return (
    <AntTable
      className={styles.table}
      rowKey='_id'
      size='small'
      loading={loading}
      bordered
      pagination={false}
      columns={columns}
      dataSource={dataSource}
      onChange={onChange}
      scroll={{ x: true }}
    />
  );
};
