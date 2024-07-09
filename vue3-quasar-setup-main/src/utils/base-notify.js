import { Notify } from 'quasar';

/**
 * @param { string } message notify 메시지 ( 필수값 )
 * @param { object } [options=null] 그 외 옵션, 기본값 : null
 * @param { function() } callback **익명함수**  () => { 함수1, 함수2 }, 기본값 : null
 * @param { boolean } actions notify actions 사용 유무, 기본값 : false
 */
export function baseNotify(
  message,
  options = null,
  callback = null,
  actions = false,
) {
  return new Promise((resolve) => {
    let option = {};

    // if (options) option = { ...options };

    if (actions) {
      option = {
        type: 'info',
        timeout: 2000,
        progress: true,
        ...options,
        actions: [
          {
            label: '취소',
            color: 'red',
            handler: () => {
              resolve(false);
            },
          },
          {
            label: '확인',
            handler: () => {
              if (callback) callback();
              resolve(true);
            },
          },
        ],
      };
    }
    Notify.create({
      message,
      html: true,
      ...options,
      timeout: option?.timeout || 500,
      actions: option?.actions || '',
    });
  });
}

/**
 *    type: 'warning',
 *
 *
 */
