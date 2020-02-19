import React, { useContext } from 'react';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import isEmpty from 'lodash/isEmpty';
import isNaN from 'lodash/isNaN';

import styles from './Login.module.scss';
import { actions, api, context } from 'services';

export const LoginComponent = ({ form }) => {
  const { dispatch } = useContext(context);

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields(async (err, { chatId }) => {
      const setErrorNotExist = () =>
        form.setFields({
          chatId: {
            value: chatId,
            errors: [{ message: 'Chat ID is not exist' }],
          },
        });

      if (isNaN(+chatId)) setErrorNotExist();

      const data = await api.getDebts(chatId);

      if (isEmpty(data.data.data)) {
        setErrorNotExist();
      } else {
        localStorage.setItem('chatId', chatId);
        window.location.reload();
        // dispatch({
        //   type: actions.setLogInStatus,
        //   payload: { logInStatus: true },
        // });
      }
    });
  };

  const { getFieldDecorator } = form;

  return (
    <div className={styles.wrap}>
      <Form onSubmit={handleSubmit} className={styles.form}>
        <Form.Item>
          {getFieldDecorator('chatId', {
            rules: [{ required: true, message: 'Please input chat ID!' }],
          })(<Input placeholder='Chat ID' />)}
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' className={styles.btn}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export const Login = Form.create()(LoginComponent);
