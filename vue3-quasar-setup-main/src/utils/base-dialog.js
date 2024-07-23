import { Dialog } from 'quasar';

// https://quasar.dev/quasar-plugins/dialog#introduction
export function baseConfirm(message) {
  Dialog.create({
    message,
    cancel: true,
    persistent: false,
    html: true,
    position: 'top',
    ok: {
      textColor: 'blue',
      color: 'white',
      size: 'sm',
      unelevated: true,
      flat: true,
    },
    cancel: {
      textColor: 'red',
      color: 'white',
      size: 'sm',
      unelevated: true,
      flat: true,
    },
  });
  // .ok(() => {})
  // .onCancle(() => {})
  // .onDimiss(() => {});
}
