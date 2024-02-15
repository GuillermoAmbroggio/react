import { Rule } from 'antd/es/form';

const requiredField = {
  required: true,
  message: 'Este campo es requerido',
};

type RulesForm = () => {
  email: Rule[];
  required: Rule[];
  confirmPassword: Rule[];
};

const rulesForm: RulesForm = () => {
  return {
    email: [
      {
        type: 'email',
        message: 'El formato es incorrecto',
      },
      requiredField,
    ],
    required: [
      {
        required: true,
        message: 'Este campo es requerido',
      },
    ],
    confirmPassword: [
      {
        required: true,
        message: 'Este campo es requerido',
      },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || getFieldValue('password') === value) {
            return Promise.resolve();
          }
          return Promise.reject(new Error('Las contraseñas no coinciden'));
        },
      }),
    ],
  };
};

export default rulesForm;
