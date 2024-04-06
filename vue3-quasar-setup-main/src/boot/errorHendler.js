import { boot } from "quasar/wrappers";
/**
 * Global Error Handler
 * app.config.errorHandler
 * @DOC : https://ko.vuejs.org/api/application.html#app-config-errorhandler
 */
export default boot(async ({ app }) => {
  app.config.errorHandler = (err, instance, info) => {
    console.log("### app.config.errorHandler ###");
    console.log("err: ", err);
    // getErrorMessage(err.code);
  };
});
