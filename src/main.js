// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import firebase from "firebase/app";

import router from "./router";
import { store } from "./store";
import AlertCmp from "./components/Shared/Alert.vue";
import Delay from "vue-delay";
import pdf from "vue-pdf";
//import Test from "./components/Browse/Test.vue";

import {
  Vuetify,
  VStepper,
  VApp,
  VTabs,
  VDivider,
  VParallax,
  VNavigationDrawer,
  VTimeline,
  VProgressLinear,
  VFooter,
  VList,
  VDialog,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  VCard,
  VTextField,
  VAlert,
  VMenu,
  VBreadcrumbs,
  transitions,
  VTooltip,
  VImg,
  VSelect,
  VSnackbar,
  VRadioGroup
} from "vuetify";
import "../node_modules/vuetify/src/stylus/app.styl";

//Vue.component('test-comp',Test);

Vue.component("app-alert", AlertCmp);

Vue.use(Delay);
Vue.component("pdf", pdf);

Vue.use(Vuetify, {
  components: {
    VApp,
    VTabs,
    VStepper,
    VDivider,
    VParallax,
    VNavigationDrawer,
    VTimeline,
    VProgressLinear,
    VFooter,
    VList,
    VDialog,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VCard,
    VTextField,
    VAlert,
    VMenu,
    VBreadcrumbs,
    transitions,
    VTooltip,
    VImg,
    VSelect,
    VSnackbar,
    VRadioGroup
  }
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>",
  created() {
    //firebase credentials
    // firebase.initializeApp({
    //   apiKey: "AIzaSyA4igqIWmkMbickuxVXKjHrC0TCTfdpgm8",
    //   authDomain: "ptuxv1.firebaseapp.com",
    //   databaseURL: "https://ptuxv1.firebaseio.com",
    //   projectId: "ptuxv1",
    //   storageBucket: "ptuxv1.appspot.com",
    //   messagingSenderId: "255570136681"
    // });
    firebase.initializeApp({
      apiKey: "AIzaSyDOb6EpsFjgj3QC9ganJsBVHXSgDvdbY1g",
      authDomain: "ptuxtest.firebaseapp.com",
      databaseURL: "https://ptuxtest.firebaseio.com",
      projectId: "ptuxtest",
      storageBucket: "",
      messagingSenderId: "222873250478"
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch("autoSignIn", user);
        // this.$store.dispatch("fetchUserData");
      }
    });
  }
});
