import React from 'react';
import { Button, Form, Input } from 'antd';
import useWriting from '../../../../../copywriting/useWriting';
import { UserAttributes } from '../../../../../types/user.types';
import {
  handleErrorReponse,
  rulesForm,
  validatePassword,
} from '../../../../../utils';
import useClientStore from '../../../../clientStore/useClientStore';
import { useRegister } from '../../../../serverStore/mutations';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './registerModal.module.css';

type RegisterModalProps = {
  setAuth: React.Dispatch<
    React.SetStateAction<'login' | 'register' | 'forgotPassword'>
  >;
  handleClose?: () => void;
};

const RegisterModal = ({ setAuth, handleClose }: RegisterModalProps) => {
  const [registerForm] = Form.useForm<UserAttributes>();
  const { mutate, isPending } = useRegister();
  const writing = useWriting();
  const { dispatch } = useClientStore();
  const rules = rulesForm();

  const onFinish = (values: any) => {
    mutate(values, {
      onSuccess: () => {
        handleClose?.();
        dispatch({
          type: 'SET_NOTIFICATION',
          payload: {
            status: 'success',
            message: writing.user.register.successMessage,
          },
        });
      },
      onError: (e) => {
        const error = handleErrorReponse(e);
        let textErr: string | undefined = undefined;
        if (typeof error === 'string') {
          textErr = error;
        }
        dispatch({
          type: 'SET_NOTIFICATION',
          payload: {
            message: writing.user.register.errorMessage,
            description: textErr,
            status: 'error',
          },
        });
      },
    });
  };

  return (
    <Form
      layout={'vertical'}
      form={registerForm}
      onFinish={onFinish}
      name='registerForm'
    >
      <div className={styles.fullname}>
        <Form.Item
          name='name'
          rules={rules.required}
          label={writing.user.inputs.name}
          style={{ width: '100%' }}
        >
          <Input
            placeholder={writing.user.inputs.name}
            style={{ height: 50 }}
          />
        </Form.Item>
        <Form.Item
          name='lastname'
          rules={rules.required}
          label={writing.user.inputs.lastname}
          style={{ width: '100%' }}
        >
          <Input
            placeholder={writing.user.inputs.lastname}
            style={{ height: 50 }}
          />
        </Form.Item>
      </div>
      <Form.Item
        name='email'
        rules={rules.email}
        label={writing.user.inputs.email}
      >
        <Input
          prefix={<UserOutlined className='site-form-item-icon' />}
          placeholder={writing.user.inputs.email}
          style={{ height: 50 }}
        />
      </Form.Item>

      <Form.Item
        name='password'
        rules={[
          ...rules.required,
          () => ({
            validator(_, value) {
              const errorPassword = validatePassword(value, writing);
              if (!errorPassword) {
                return Promise.resolve();
              }
              return Promise.reject(new Error(errorPassword));
            },
          }),
        ]}
        label={writing.user.inputs.password}
      >
        <Input.Password
          prefix={<LockOutlined className='site-form-item-icon' />}
          type='password'
          placeholder={writing.user.inputs.password}
          style={{ height: 50 }}
        />
      </Form.Item>

      <Form.Item
        name='confirmPassword'
        rules={rules.confirmPassword}
        label={writing.user.inputs.confirmPassword}
      >
        <Input.Password
          prefix={<LockOutlined className='site-form-item-icon' />}
          type='confirmPassword'
          placeholder={writing.user.inputs.confirmPassword}
          style={{ height: 50 }}
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
        {writing.user.register.title}
      </Button>

      <span className={styles.createNew} onClick={() => setAuth('login')}>
        {writing.user.login.title}
      </span>
    </Form>
  );
};

export default RegisterModal;
