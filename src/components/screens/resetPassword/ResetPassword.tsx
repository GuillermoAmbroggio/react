import { Button, Form, Input } from 'antd';
import React from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import useWriting from '../../../copywriting/useWriting';
import BannerSection from '../../../utils/layout/components/bannerSection/BannerSection';
import { LockOutlined } from '@ant-design/icons';
import { handleErrorReponse, rulesForm } from '../../../utils';
import { IResetPassword } from '../../../types/user.types';
import { useResetPassword } from '../../serverStore/mutations';
import useClientStore from '../../clientStore/useClientStore';
import styles from './resetForm.module.css';
import { Column } from '../../../utils/layout';

const ResetPassword: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get('token');
  const { mutate, isPending, error } = useResetPassword();
  const { dispatch } = useClientStore();
  const writing = useWriting();
  const rules = rulesForm();
  const [resetPasswordForm] = Form.useForm<IResetPassword>();
  const navigate = useNavigate();

  // Si no se proporciona un token, redirige al usuario a la ruta principal
  if (!token) {
    return <Navigate to='/' replace={true} />;
  }

  const onFinish = (values: IResetPassword) => {
    mutate(
      { ...values, token },
      {
        onSuccess: () => {
          dispatch({
            type: 'SET_NOTIFICATION',
            payload: {
              status: 'success',
              message: writing.resetPassword.successMessage,
            },
          });
          navigate('/');
        },
        onError: () => {
          dispatch({
            type: 'SET_NOTIFICATION',
            payload: {
              message: writing.resetPassword.errorMessage,
              description: writing.errorTryLater,
              status: 'error',
            },
          });
        },
      },
    );
  };
  const errorResponse = handleErrorReponse(error);
  const isExpiredToken = errorResponse?.name === 'TokenExpiredError';

  return (
    <Column style={{ flex: 1 }}>
      <BannerSection
        nameSection={writing.resetPassword.title}
        classNameText={styles.title}
      />

      <Column className={styles.container}>
        {isExpiredToken ? (
          <span className={styles.responseErrorText}>
            {writing.resetPassword.expiredToken}
          </span>
        ) : (
          <Form
            layout={'vertical'}
            form={resetPasswordForm}
            onFinish={onFinish}
            name='resetPasswordForm'
            className={styles.form}
          >
            <Form.Item name='password' rules={rules.required}>
              <Input.Password
                prefix={<LockOutlined className='site-form-item-icon' />}
                type='password'
                placeholder='Nueva contraseña'
                className={styles.input}
              />
            </Form.Item>

            <Form.Item name='confirmPassword' rules={rules.required}>
              <Input.Password
                prefix={<LockOutlined className='site-form-item-icon' />}
                type='password'
                placeholder='Confirmar contraseña'
                className={styles.input}
              />
            </Form.Item>

            <Button
              loading={isPending}
              type='primary'
              htmlType='submit'
              style={{ width: '100%' }}
              className={styles.button}
            >
              {writing.resetPassword.title}
            </Button>
          </Form>
        )}
      </Column>
    </Column>
  );
};

export default ResetPassword;
