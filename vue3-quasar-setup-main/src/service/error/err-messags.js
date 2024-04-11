//import ERROR_CODE_JSON from './error-code.json';
import { Notify } from 'quasar';

export const getErrorMessage = ({ data, code }) => {
  return Notify.create({
    message: data?.message || `관리자에게 문의해주세요.(${code})`,
    type: 'warning',
    timeout: 500,
  });
};
