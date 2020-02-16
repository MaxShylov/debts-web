import React from 'react';
import uniqBy from 'lodash/uniqBy';
import sum from 'lodash/sum';

import { CellNumber } from '../components';

export const generateColumns = data => {
  const columnData = [...data];
  const filtersName = columnData.map(item => ({
    text: item.name,
    value: item.name,
  }));
  const filtersLogin = columnData.map(item => ({
    text: item.login,
    value: item.login,
  }));
  const filtersTotal = uniqBy(
    columnData.map(item => ({
      text: item.total ? 'Owed' : 'Free',
      value: !item.total,
    })),
    'value',
  );

  const otherColumns = columnData.map(item => ({
    _id: item._id,
    title: item.name,
    dataIndex: `debts.${item.login}`,
    align: 'center',
    render: text => <CellNumber num={text} />,
  }));

  return [
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
};

export const generateDataSource = data => {
  const dataSource = [...data];
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

  return dataSource;
};
