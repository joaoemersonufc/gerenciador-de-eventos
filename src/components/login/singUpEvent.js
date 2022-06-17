import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  name: yup.string().required('PLEASE_FILL_FIELD'),
  email: yup.string().required('PLEASE_FILL_FIELD'),
  password: yup.string().required('PLEASE_FILL_FIELD'),
  repeatPassword: yup.string().required('PLEASE_FILL_FIELD'),
  cpf: yup.string().required('PLEASE_FILL_FIELD'),
  telephone: yup.string().required('PLEASE_FILL_FIELD'),
  birthDate: yup.string().required('PLEASE_FILL_FIELD'),
  sexo: yup.string().required('PLEASE_FILL_FIELD')
});
