import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  startDate: yup.string().required('PLEASE_FILL_FIELD'),
  description: yup.string().required('PLEASE_FILL_FIELD'),
  eventType: yup.string().required('PLEASE_FILL_FIELD'),
});
