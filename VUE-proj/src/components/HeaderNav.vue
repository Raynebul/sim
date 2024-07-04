<script setup>
import { RouterLink, useRoute } from "vue-router";
import axios from "axios";
//import VueCookies from 'vue-cookies'

//const $cookies = inject<VueCookies>('$cookies');
//import LogIn from "./LogIn.vue";
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid" style="margin-left: 10px">
      <RouterLink to="/" class="navbar-brand" href="#"
        ><img
          src="../assets/s-logo.png"
          alt=""
          width="20"
          height="20"
          style="margin-left: -10px"
      /></RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarTogglerDemo03"
        aria-controls="navbarTogglerDemo03"
        aria-expanded="false"
        aria-label="Toggle navigation"
        style="margin-right: 10px"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <!--
          <li class="nav-item">
            <RouterLink to="/" class="nav-link active" aria-current="page"
              >Главная</RouterLink
            >
          </li>
          <li class="nav-item" v-if="user !== undefined">
            <RouterLink to="/course" class="nav-link" href="/course"
              >Курсы</RouterLink
            >
          </li>
          <li class="nav-item" v-if="user !== undefined">
            <RouterLink to="/sandbox" class="nav-link" tabindex="-1"
              >Проекты</RouterLink
            >
          </li>-->
        </ul>
        <hr class="hr text-light" style="margin: 0 10px 0 0" />
        <ul class="navbar-nav ms-auto">
          <li
            class="nav-item"
            v-if="user === undefined && VITE_TOKEN_MODE === 'token'"
          >
            <a
              :href="base_frontend_url + `/login`"
              class="nav-link"
              tabindex="-1"
              >Вход</a
            >
          </li>
          <li
            class="nav-item dropdown"
            v-if="user !== undefined && VITE_TOKEN_MODE === 'token'"
          >
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ user.username }}
            </a>
            <ul
              class="dropdown-menu dropdown-menu-dark"
              aria-labelledby="navbarDropdown"
              style="right: 0; left: auto; /* added */"
            >
              <li>
                <a :href="base_frontend_url + `/cabinet`" class="dropdown-item"
                  >Профиль</a
                >
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li>
                <a class="dropdown-item text-danger" @click="LogOut()">Выйти</a>
              </li>
            </ul>
          </li>
          <li
            class="nav-item"
            v-if="user === undefined && VITE_TOKEN_MODE === 'token'"
          >
            <a :href="base_frontend_url + `/register`" class="nav-link"
              >Регистрация</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!--
  <LogIn />-->
</template>

<style></style>

<script>
export default {
  data() {
    return {
      id: "",
      user: undefined,
      route: undefined,
      VITE_TOKEN_MODE: import.meta.env.VITE_TOKEN_MODE,
    };
  },
  async created() {
    if (import.meta.env.VITE_TOKEN_MODE === "token") {
      let l = 0;
      let jwt = this.getCookie("jwt");
      const response = await axios.get(this.base_backend_url + "/user", {
        headers: {
          Authorization: jwt,
          "Access-Control-Allow-Origin": this.access_origin,
          "Access-Control-Allow-Credentials": true,
        },
        withCredentials: true,
      });
      console.log(response.data.user);
      if (
        !(
          response.data.user["username"] === undefined ||
          response.data.user["username"] == null
        )
      ) {
        this.user = response.data.user;
        if (this.user == null) {
          this.user = undefined;
        }
      }
    }
  },

  mounted() {
    this.route = useRoute();
    console.log(this.user === undefined && import.meta.env.VITE_TOKEN_MODE === 'token')
  },
  methods: {
    LogOut() {
      this.eraseCookie("jwt");
      console.log("Имя роута", this.route.path);
      localStorage.removeItem("jwt");
      localStorage.removeItem("user");

      //console.log(document.cookie);
      console.log("dead", this);
      window.location.href = this.base_frontend_url;
      /*
      console.log("Имя роута", this.route.path);
      localStorage.removeItem("user");
      axios
        .get(this.base_backend_url + "/user/delete_cookies", {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
          window.location.href = this.base_frontend_url; 
          
          if (this.route.path == "/") {
            console.log(1);
            window.location.reload();
          } else {
            console.log(1);
            this.$router.push("/");
          } 
        }); */
    },
    eraseCookie(name) {
      console.log(document.cookie);
      let now = new Date();
      console.log(this.getCookie("jwt"));
      console.log(
        "jwt" +
          "=" +
          "hahahaha" +
          ";" +
          "expires=Thu, 01 Jan 1970 00:00:00 GMT;"
        // + this.domain_clio
      );
      /*expires=Thu, 01 Jan 1970 00:00:00 GMT; */

      document.cookie =
        "jwt=;" + "expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      // + this.domain_clio;
      //console.log(this)
      //this.$cookie.set("jwt", "hahaha", "Thu, 01 Jan 1970 00:00:00 GMT")
      console.log(document.cookie);
    },
    getCookie(cname) {
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
    },
  },
};
</script>
