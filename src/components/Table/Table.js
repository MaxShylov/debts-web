import React, { useContext, useEffect } from 'react';
import AntTable from 'antd/lib/table';

import { api, actions, context } from 'services';

import styles from './Table.module.scss';
import { generateColumns, generateDataSource } from './helpers';

export const Table = () => {
  const {
    state: { loading, data, tableFilters },
    dispatch,
  } = useContext(context);
  const columns = generateColumns(data, tableFilters);
  const dataSource = generateDataSource(data);

  const handleChange = (_, filters) => {
    dispatch({
      type: actions.setTableFilters,
      payload: { tableFilters: filters },
    });
  };

  useEffect(() => {
    // TODO make common fn
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
      filters={tableFilters}
      bordered
      pagination={false}
      columns={columns}
      dataSource={dataSource}
      onChange={handleChange}
      scroll={{ x: true }}
    />
  );
};
