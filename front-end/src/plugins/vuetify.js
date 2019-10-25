import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import es from 'vuetify/es5/locale/es';
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

Vue.use(Vuetify);

export default new Vuetify({
    lang: {
      locales: { es },
      current: 'es',
    },
  icons: {
    iconfont: 'mdi',
  },
});
