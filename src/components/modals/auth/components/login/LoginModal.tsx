import React from 'react';
import { Button, Form, Input } from 'antd';
import useWriting from '../../../../../copywriting/useWriting';
import { ILogin } from '../../../../../types/user.types';
import { rulesForm } from '../../../../../utils';
import { useLogin } from '../../../../serverStore/mutations';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './loginModal.module.css';

type LoginModalProps = {
  setAuth: React.Dispatch<
    React.SetStateAction<'login' | 'register' | 'forgotPassword'>
  >;
  handleClose?: () => void;
};

const LoginModal = ({ setAuth }: LoginModalProps) => {
  const [loginForm] = Form.useForm<ILogin>();
  const { mutate, isPending } = useLogin();
  const writing = useWriting();
  const rules = rulesForm();

  const onFinish = (values: any) => {
    mutate(values);
  };

  return (
    <Form
      layout={'vertical'}
      form={loginForm}
      onFinish={onFinish}
      name='loginForm'
    >
      <Form.Item name='email' rules={rules.email}>
        <Input
          prefix={<UserOutlined className='site-form-item-icon' />}
          placeholder={writing.user.inputs.email}
          style={{ height: 60 }}
        />
      </Form.Item>
      <Form.Item name='password' rules={rules.required} style={{ margin: 0 }}>
        <Input.Password
          prefix={<LockOutlined className='site-form-item-icon' />}
          type='password'
          placeholder={writing.user.inputs.password}
          style={{ height: 60 }}
        />
      </Form.Item>

      <span
        className={styles.forgotPassword}
        onClick={() => setAuth('forgotPassword')}
      >
        {writing.user.forgotPassword.title}
      </span>

      <Button
        loading={isPending}
        type='primary'
        htmlType='submit'
        style={{ width: '100%' }}
      >
        {writing.user.login.title}
      </Button>

      <span className={styles.createNew} onClick={() => setAuth('register')}>
        {writing.user.register.createNew}
      </span>
    </Form>
  );
};

export default LoginModal;
