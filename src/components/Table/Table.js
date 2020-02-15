import React from 'react';
import PropTypes from 'prop-types';
import AntTable from 'antd/lib/table';
import uniqBy from 'lodash/uniqBy';
import sum from 'lodash/sum';

import styles from './Table.module.scss';
import { CellNumber } from './components';

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

export const Table = ({ data }) => {
  const dataSource = data;
  const filtersName = data.map(({ name }) => ({ text: name, value: name }));
  const filtersLogin = data.map(({ login }) => ({ text: login, value: login }));
  const filtersTotal = uniqBy(
    data.map(({ total }) => ({
      text: total ? 'Owed' : 'Free',
      value: !total,
    })),
    'value',
  );

  const otherColumns = data.map(item => ({
    title: item.name,
    dataIndex: `debts.${item.login}`,
    align: 'center',
    render: text => <CellNumber num={text} />,
  }));

  const countDebts = {};

  for (let i = 0; i < data.length; i++) {
    const { login } = data[i];

    countDebts[login] = sum(data.map(item => item.debts[login]));
  }

  dataSource.push({
    _id: 'count',
    name: 'Count',
    login: null,
    total: sum(data.map(item => item.total)),
    debts: countDebts,
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      filters: filtersName,
      fixed: 'left',
      width: 80,
      onFilter: (value, record) => record.name === value,
    },
    {
      title: 'Login',
      dataIndex: 'login',
      filters: filtersLogin,
      fixed: 'left',
      width: 100,
      onFilter: (value, record) => record.login === value,
    },
    ...otherColumns,
    {
      title: 'Total',
      dataIndex: 'total',
      filters: filtersTotal,
      fixed: 'right',
      width: 75,
      align: 'center',
      render: text => <CellNumber num={text} />,
      onFilter: (value, record) => !record.total === value,
    },
  ];

  return (
    <AntTable
      className={styles.table}
      rowKey="_id"
      size='small'
      bordered
      pagination={false}
      columns={columns}
      dataSource={dataSource}
      onChange={onChange}
      scroll={{ x: true}}
    />
  );
};

Table.propTypes = {
  data: PropTypes.array,
};

Table.defaultProps = {
  data: [],
};
