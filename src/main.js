import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

// firebaseConfig auto generated in project settings
firebase.initializeApp({
  apiKey: "AIzaSyDVsRhuCWgNAqKubJtulYHV2xWViqIPk68",
  authDomain: "class-express-faq-test.firebaseapp.com",
  databaseURL: "https://class-express-faq-test.firebaseio.com",
  projectId: "class-express-faq-test",
  storageBucket: "class-express-faq-test.appspot.com",
  messagingSenderId: "450540745987",
  appId: "1:450540745987:web:50751366bbebf172f7e536",
  measurementId: "G-QK9S90EQQN"
});

export const db = firebase.database();

Vue.config.productionTip = false;

// App variable to store reference to the vue App object
let app;

/**
 * @notice Why new vue is wrapped in this.
 * Wait for firebase to finish initialization before creating the app.
 * So that the router navigation wont break due to invalid auth
 */
const unsubscribe = firebase.auth().onAuthStateChanged(() => {
  // Prevent app initialization from running more than once
  if (!app)
    // Create new vue app
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount("#app");

  // Use the firebase.Unsubscribe function returned from adding auth state change listner to unsubscribe
  // To prevent new Vue from running more than once
  unsubscribe();
});
