import ERROR_CODE_JSON from './error-code.json';
import { Notify } from 'quasar';

export const getErrorMessage = ({ status }) => {
  return Notify.create({
    message: ERROR_CODE_JSON[status] || `관리자에게 문의해주세요`,
    type: 'warning',
    timeout: 500,
  });
};
