import { Button, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';
import useWriting from '../../../../../copywriting/useWriting';
import { rulesForm } from '../../../../../utils';
import { Flex } from '../../../../../utils/layout';
import { useSupportMessage } from '../../../../serverStore/mutations';

export type SupportForm = {
  name: string;
  email: string;
  message: string;
};

const SupportForm: React.FC = () => {
  const [supportForm] = Form.useForm<SupportForm>();
  const { mutate, isPending, isSuccess } = useSupportMessage();
  const writing = useWriting();
  const rules = rulesForm();
  const onFinish = (values: SupportForm) => {
    mutate(values);
  };

  return (
    <Form
      layout={'vertical'}
      form={supportForm}
      onFinish={onFinish}
      name='loginForm'
    >
      <Flex gap={16} style={{ marginBottom: 16 }}>
        <Form.Item
          name='name'
          rules={rules.required}
          style={{ margin: 0, flex: 1 }}
        >
          <Input placeholder={'Nombre'} style={{ height: 60 }} />
        </Form.Item>
        <Form.Item
          name='email'
          rules={rules.email}
          style={{ margin: 0, flex: 1 }}
        >
          <Input
            placeholder={writing.user.inputs.email}
            style={{ height: 60 }}
          />
        </Form.Item>
      </Flex>
      <Form.Item name='message' rules={rules.required}>
        <TextArea rows={4} placeholder='Mensaje' />
      </Form.Item>

      <Button
        loading={isPending}
        type='primary'
        htmlType='submit'
        style={{ width: '100%', height: 50 }}
        disabled={isSuccess}
      >
        Enviar mensaje
      </Button>
    </Form>
  );
};

export default SupportForm;
