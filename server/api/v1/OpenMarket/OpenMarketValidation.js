/* eslint-disable no-underscore-dangle */
import * as yup from 'yup';
import i18n from 'i18n';

export default function validate() {
  return {
    create: yup.object().shape({
      district: yup
        .string()
        .required(i18n.__('validation.create.required', { field: 'district' })),
      region5: yup
        .string()
        .required(i18n.__('validation.create.required', { field: 'region5' })),
      name: yup
        .string()
        .required(i18n.__('validation.create.required', { field: 'name' })),
      neighborhood: yup
        .string()
        .required(i18n.__('validation.create.required', { field: 'neighborhood' })),
    }),
    update: yup.object().shape({
      id: yup
        .string()
        .required(i18n.__('validation.create.required', { field: 'id' })),
      district: yup
        .string()
        .required(i18n.__('validation.create.required', { field: 'district' })),
      region5: yup
        .string()
        .required(i18n.__('validation.create.required', { field: 'region5' })),
      name: yup
        .string()
        .required(i18n.__('validation.create.required', { field: 'name' })),
      neighborhood: yup
        .string()
        .required(i18n.__('validation.create.required', { field: 'neighborhood' })),
    }),
    delete: yup.object().shape({
      id: yup
        .string()
        .required(i18n.__('validation.create.required', { field: 'id' })),
    }),
  };
}
