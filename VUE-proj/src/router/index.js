import {
  createRouter,
  createWebHistory,
  createMemoryHistory,
} from "vue-router";
import MainPage from "../views/MainPage.vue";
import MainPageNoToken from "../views/MainPageNoToken.vue";

let route_main = {};

if (import.meta.env.VITE_TOKEN_MODE === "token") {
  route_main = {
    path: "/",
    name: "home",
    component: MainPage,
  };
}
if (import.meta.env.VITE_TOKEN_MODE === "no-token") {
  route_main = {
    path: "/",
    name: "home",
    component: MainPageNoToken,
  };
}

import axios from "axios";
//import axios from "../axios/axios.js"
//import db from "../databases/database.js";

const baseUrl = import.meta.env.BASE_URL;
const history = import.meta.env.SSR
  ? createMemoryHistory(baseUrl)
  : createWebHistory(baseUrl);

const routes = [
  route_main,
  /*
  {
    path: "/course",
    name: "course",
    component: () => import("../views/MenuCourse.vue"),
    meta: {
      requiresAuth: true,
      active: true,
    },
  },
  {
    path: "/sandbox",
    name: "sandbox",
    component: () => import("../views/CreateProject.vue"),

    meta: {
      requiresAuth: true,
      active: true,
    },
  }, */
  /*
  {
    path: "/createtrainercourse",
    name: "creatrainercourse",
    component: () => import("../views/CreateTrainerCourse.vue"),
    meta: {
      requiresAuth: true,
      active: true,
    },
  },
  {
    path: "/createtrainercourse/:id",
    name: "updaterainercourse",
    component: () => import("../views/UpdateTrainerCourse.vue"),
    meta: {
      requiresAuth: true,
      active: true,
    },
  },
  {
    path: "/trainercourse/:id",
    name: "trainercourse",
    component: () => import("../views/TrainerCourseMainPage.vue"),
    meta: {
      requiresAuth: true,
      active: true,
      course: true,
    },
  },
  {
    path: "/trainercourse/:id/:task",
    name: "trainercourse_task",
    component: () => import("../views/TrainerCourseTask.vue"),
    meta: {
      requiresAuth: true,
      active: true,
      course: true,
    },
  },
*/
  {
    path: "/constructor",
    name: "construct",
    component: () => import("../views/Constructor.vue"),
    meta: {
      requiresAuth: true,
      active: true,
    },
  },
  {
    path: "/edit/:id",
    name: "constructing",
    component: () => import("../views/Constructing.vue"),
    meta: {
      requiresAuth: true,
      active: true,
    },
  },
  {
    path: "/run/:id",
    name: "Trainer",
    component: () => import("../views/Trainer.vue"),
    meta: {
      requiresAuth: true,
      active: true,
      trainer: true,
    },
  },
  {
    path: "/documentation",
    name: "documentation",
    component: () => import("../views/Documentation.vue"),
    meta: {
      requiresAuth: true,
      active: true,
    },
  },
  /*
  {
    path: "/script",
    name: "script",
    component: () => import("../views/ScriptPage.vue"),
    meta: {
      requiresAuth: true,
      active: true,
    },
  }, */
  {
    path: "/notauth",
    name: "Notauth",
    component: () => import("../views/NotAuth/NotAuthorized.vue"),
  },
  {
    path: "/notactive",
    name: "Notactive",
    component: () => import("../views/NotAuth/NotActive.vue"),
  },
  {
    path: "/:notFound",
    name: "pagenotfound",
    component: () => import("../views/PageNotFound.vue"),
  },
  {
    path: "/user_domain",
    name: "user_domain",
    beforeEnter: () => {
      window.location.href = base_frontend_url + "login";
    },
  },
];

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

//console.log(getCookie('jwt'))

let jwt = getCookie("jwt");

let base_backend_url = "http://localhost:8000/";
let base_frontend_url = "http://localhost:5000/";
let access_origin = "*";

if (import.meta.env.VITE_PROJECT_MODE === "production") {
  base_backend_url = "http://79.174.80.207:8000/";
  base_frontend_url = "http://clio.ws/";
  access_origin = "http://clio.ws";
}

const router = createRouter({
  history,
  routes,
});

if (import.meta.env.VITE_TOKEN_MODE === "token") {
  router.beforeEach((to, from, next) => {
    let user = "";
    let role = {};
    jwt = getCookie("jwt");
    axios
      .get(base_backend_url + "user", {
        headers: {
          Authorization: jwt,
          "Access-Control-Allow-Origin": access_origin,
          "Access-Control-Allow-Credentials": true,
        },
      })
      .then((response) => {
        console.log("что-то", response);
        user = response.data.user;
        role = response.data.role;
        console.log("user", user);
        if (to.matched.some((record) => record.meta.requiresAuth)) {
          if (
            user == null ||
            user == undefined ||
            user.username === null ||
            user.username === undefined
          ) {
            /*
            next({
              path: "/user_domain",
            }); */
            window.location.href = base_frontend_url +"login";
            /*
            next({
              path: "/login",
              params: { nextUrl: to.fullPath },
            }); */
          } else {
            if (to.matched.some((record) => record.meta.active)) {
              if (user.active == true) {
                if (to.matched.some((record) => record.meta.admin)) {
                  if (role.admin === true) {
                    next();
                  } else {
                    next({ path: "/notFound" });
                  }
                } else if (to.matched.some((record) => record.meta.trainer)) {
                  if (role.trainer == true) {
                    next();
                  } else {
                    next({ path: "/notFound" });
                  }
                } else if (to.matched.some((record) => record.meta.course)) {
                  if (role.course === true) {
                    next();
                  } else {
                    next({ path: "/notFound" });
                  }
                } else {
                  next();
                }
                //next();
              } else {
                next({ name: "Notactive" });
              }
            } else {
              next();
            }
          }
        } else {
          next();
        }
      });
  });
} else {
  router.beforeEach((to, from, next) => {
    next();
  });
}

export default router;
