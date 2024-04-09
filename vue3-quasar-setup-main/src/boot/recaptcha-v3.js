import { boot } from 'quasar/wrappers';
import { VueReCaptcha } from 'vue-recaptcha-v3';

export default boot(({ app }) => {
  app.use(VueReCaptcha, {
    siteKey: '6LciT7UpAAAAANSu16zb0AP7CIN_-ME28OrfhtkE',
  });
});
