import React from 'react';
import { Alert, Button, Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import useWriting from '../../../../../copywriting/useWriting';
import useClientStore from '../../../../clientStore/useClientStore';
import { handleErrorReponse, rulesForm } from '../../../../../utils';
import { useForgotPassword } from '../../../../serverStore/mutations';
import styles from './forgotPassword.module.css';

type LoginModalProps = {
  setAuth: React.Dispatch<
    React.SetStateAction<'login' | 'register' | 'forgotPassword'>
  >;
};

const ForgetPassword = ({ setAuth }: LoginModalProps) => {
  const [forgetPasswordForm] = Form.useForm<{ email: string }>();
  const { mutate, isSuccess, error, isPending } = useForgotPassword();
  const writing = useWriting();

  const { dispatch } = useClientStore();
  const rules = rulesForm();

  const onFinish = (values: any) => {
    mutate(values, {
      onError: (e) => {
        const error = handleErrorReponse(e);
        let errorText: string | undefined = undefined;
        if (error == 7) {
          errorText = 'Correo invalido';
        }
        dispatch({
          type: 'SET_NOTIFICATION',
          payload: {
            message: writing.user.forgotPassword.errorMessage,
            description: errorText,
            status: 'error',
          },
        });
      },
    });
  };

  return (
    <Form
      layout={'vertical'}
      form={forgetPasswordForm}
      onFinish={onFinish}
      name='forgetPasswordForm'
    >
      {!isSuccess ? <p>{writing.user.forgotPassword.description}</p> : null}

      {!isSuccess ? (
        <Form.Item
          name='email'
          rules={rules.email}
          style={{ marginBottom: error ? 0 : undefined, marginTop: 24 }}
        >
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder={writing.user.inputs.email}
            style={{ height: 60 }}
          />
        </Form.Item>
      ) : null}

      {isSuccess ? (
        <Alert
          message={writing.user.forgotPassword.successMessage}
          type='success'
          showIcon
        />
      ) : null}

      {error ? (
        <p className={styles.responseErrorText}>
          {writing.user.forgotPassword.errorMessage}
        </p>
      ) : null}

      {!isSuccess ? (
        <Button
          loading={isPending}
          type='primary'
          htmlType='submit'
          style={{ width: '100%' }}
        >
          {writing.user.forgotPassword.submit}
        </Button>
      ) : null}

      <span className={styles.goBack} onClick={() => setAuth('login')}>
        {writing.goBackText}
      </span>
    </Form>
  );
};

export default ForgetPassword;
