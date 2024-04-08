import ERROR_CODE_JSON from './error-code.json';
import { Notify } from 'quasar';

export const getErrorMessage = (code) => {
  return Notify.create({
    message: ERROR_CODE_JSON[code] || `관리자에게 문의해주세요.(${code})`,
    type: 'warning',
    timeout: 500,
  });
};
