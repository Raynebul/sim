import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

// Import all of Bootstrap's JS
//import * as bootstrap from "bootstrap";
//import "../assets/main.css";
import "./scss/styles.scss";
//import "popper.min.js"
import * as bootstrap from "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import VueDraggableResizable from "vue-draggable-resizable";
import { basicSetup } from "codemirror";
import VueCodemirror from "vue-codemirror";

var viewData = {
  employees: [{ name: "Sergey" }],
};

//console.log(import.meta.env.VITE_TOKEN_MODE)

let base_url = "";
let base_frontend_url = "";
let base_backend_url = "";
let sim_frontend_url = "";
let sim_backend_url = "";
let clio = [];
let access_origin = "";
let domain_clio = " ";

console.log(import.meta.env);

if (import.meta.env.VITE_PROJECT_MODE === "production") {
  base_url = "http://79.174.80.207:3000";
  base_frontend_url = "http://clio.ws";
  base_backend_url = "http://79.174.80.207:8000";
  sim_frontend_url = "http://clio.ws/simulator";
  sim_backend_url = "http://79.174.80.207:3000";
  access_origin = "http://clio.ws";
  domain_clio = "domain=clio.ws";
  clio = ["http://clio.ws", "http://79.174.80.207"];
} else {
  base_url = "http://localhost:3000";
  base_frontend_url = "http://localhost:5000";
  base_backend_url = "http://localhost:8000";
  sim_frontend_url = "http://localhost:5173";
  sim_backend_url = "http://localhost:3000";
  clio = ["http://clio.ws", "http://79.174.80.207"];
  access_origin = "*";
  domain_clio = " ";
}

if (
  import.meta.env.VITE_PROJECT_MODE === "no-token" &&
  import.meta.env.VITE_PROJECT_MODE === "production"
) {
  base_url = "http://79.174.80.207:3000";
  base_frontend_url = "http://clio.ws";
  base_backend_url = "http://79.174.80.207:8000";
  sim_frontend_url = "http://clio.ws/simulator";
  sim_backend_url = "http://79.174.80.207:3000";
  access_origin = "http://clio.ws";
  domain_clio = "domain=clio.ws";
  clio = ["http://clio.ws", "http://79.174.80.207"];
}

/*
if (
  import.meta.env.VITE_PROJECT_MODE === "no-token" &&
  import.meta.env.VITE_PROJECT_MODE === "development"
) {
  base_url = "http://79.174.80.207:3000";
  base_frontend_url = "http://clio.ws";
  base_backend_url = "http://79.174.80.207:8000";
  sim_frontend_url = "http://clio.ws/simulator";
  sim_backend_url = "http://79.174.80.207:3000";
  access_origin = "http://clio.ws";
  domain_clio = "domain=clio.ws";
  clio = ["http://clio.ws", "http://79.174.80.207"];
}
*/

var myGlobalVariable = {
  data() {
    return {
      base_url: base_url,
      base_frontend_url: base_frontend_url,
      base_backend_url: base_backend_url,
      sim_frontend_url: sim_frontend_url,
      sim_backend_url: sim_backend_url,
      clio: clio,
      access_origin: access_origin,
      domain_clio: domain_clio,
    };
  },
};

const app = createApp(App);
//app.use("/static", express.static('./src/'));
//app.use(createPinia());
app.use(router);
app.mixin(myGlobalVariable);
app.component("vue-draggable-resizable", VueDraggableResizable);
app.use(VueCodemirror, {
  // optional default global options
  autofocus: true,
  disabled: false,
  indentWithTab: true,
  tabSize: 2,
  placeholder: "Code goes here...",
  extensions: [basicSetup],
  // ...
});

//app.use(store);

app.mount("#app");
