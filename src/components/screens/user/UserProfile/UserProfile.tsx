import { Button, Form, Input } from 'antd';
import React, { useEffect } from 'react';
import useWriting from '../../../../copywriting/useWriting';
import { UserAttributes } from '../../../../types/user.types';
import { rulesForm, validatePassword } from '../../../../utils';
import { Column } from '../../../../utils/layout';
import BannerSection from '../../../../utils/layout/components/bannerSection/BannerSection';
import { LockOutlined } from '@ant-design/icons';
import styles from './userProfile.module.css';
import { useEditPassword, useEditUser } from '../../../serverStore/mutations';
import useClientStore from '../../../clientStore/useClientStore';

const UserProfile: React.FC = () => {
  const writing = useWriting();
  const rules = rulesForm();
  const { dispatch, loggedUser } = useClientStore();
  const {
    mutate: mutateEditUser,
    isPending: loadingEditUser,
    isSuccess: successEditUser,
    error: errorEditUser,
  } = useEditUser();
  const {
    mutate: mutateEditPassword,
    isPending: loadingEditPasswrod,
    isSuccess: successEditPassword,
    error: errorEditPassword,
  } = useEditPassword();
  const isLoading = loadingEditUser || loadingEditPasswrod;

  const [editUserForm] = Form.useForm<UserAttributes>();
  const nameValue = Form.useWatch('name', editUserForm);
  const lastnameValue = Form.useWatch('lastname', editUserForm);
  const hasPassword = loggedUser?.hasPassword;

  const disabledEditUser =
    nameValue === loggedUser?.name && lastnameValue === loggedUser?.lastname;

  const onFinish = (values: any) => {
    if (!disabledEditUser) {
      mutateEditUser(values);
    }
    if (values.password && !hasPassword) {
      mutateEditPassword({
        newPassword: values.password,
        confirmNewPassword: values.confirmNewPassword,
      });
    }
  };

  useEffect(() => {
    if (successEditPassword || successEditUser) {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: {
          status: 'success',
          message: writing.userProfile.success,
        },
      });
    }
    if (errorEditPassword || errorEditUser) {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: {
          message: writing.userProfile.error,
          status: 'error',
        },
      });
    }
  }, [
    successEditPassword,
    successEditUser,
    errorEditPassword,
    errorEditPassword,
  ]);

  return (
    <Column style={{ flex: 1 }}>
      <BannerSection nameSection={writing.userProfile.title} />
      <Column
        alignItems='center'
        justifyContent={'center'}
        className={styles.container}
      >
        <Form
          layout={'vertical'}
          form={editUserForm}
          onFinish={onFinish}
          name='editUserForm'
          initialValues={loggedUser}
        >
          <div className={styles.fullname}>
            <Form.Item
              name='name'
              rules={rules.required}
              label={
                <span style={{ color: 'white' }}>
                  {writing.user.inputs.name}
                </span>
              }
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
              label={
                <span style={{ color: 'white' }}>
                  {writing.user.inputs.lastname}
                </span>
              }
              style={{ width: '100%' }}
            >
              <Input
                placeholder={writing.user.inputs.lastname}
                style={{ height: 50 }}
              />
            </Form.Item>
          </div>

          {!hasPassword ? (
            <Column>
              <p className={styles.createPasswordText}>Crear contraseña</p>
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
                label={
                  <span style={{ color: 'white' }}>
                    {writing.user.inputs.password}
                  </span>
                }
              >
                <Input.Password
                  prefix={<LockOutlined className='site-form-item-icon' />}
                  type='password'
                  placeholder={writing.user.inputs.password}
                  style={{ height: 50 }}
                />
              </Form.Item>

              <Form.Item
                name='confirmNewPassword'
                rules={rules.confirmPassword}
                label={
                  <span style={{ color: 'white' }}>
                    {writing.user.inputs.confirmPassword}
                  </span>
                }
              >
                <Input.Password
                  prefix={<LockOutlined className='site-form-item-icon' />}
                  type='confirmNewPassword'
                  placeholder={writing.user.inputs.confirmPassword}
                  style={{ height: 50 }}
                />
              </Form.Item>
            </Column>
          ) : null}

          <Button
            loading={isLoading}
            type='primary'
            htmlType='submit'
            style={{ width: '100%', marginTop: 24, height: 50 }}
            disabled={hasPassword ? disabledEditUser : false}
          >
            {writing.userProfile.button}
          </Button>
        </Form>
      </Column>
    </Column>
  );
};

export default UserProfile;
