<script setup>
//import { RouterView } from "vue-router";
//import "./scss/theme.scss"
import HeaderNav from "./components/HeaderNav.vue";
import FooterNav from "./components/FooterNav.vue";
//import HelloWorld from './components/HelloWorld.vue' RouterLink
</script>

<template>
  <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->
  <!--
  <div
    class="container-fluid"
    style="background-color: rgb(228, 235, 235); max-width: 5000px"
  >-->
  <div class="container-fluid min-vh-100 d-flex flex-column" style="background-color: rgb(228, 235, 235)">
    <!--max-width: 5000px-->
    <div class="row me-0">
      <div class="col pe-0"><HeaderNav :key="$route.fullPath" /></div>
    </div>
    <div class="row me-0">
      <div class="col pe-0"><RouterView :key="$route.fullPath" /></div>
    </div>
    <div class="row me-0 mt-auto">
      <div class="col pe-0">
        <FooterNav
          class="mt-auto"
          style="
            position: relative;
            bottom: 0;
            left: 0;
            right: 0;
          "
        />
      </div>
    </div>
  </div>
  <!--
    <HeaderNav :key="$route.fullPath" />
    <RouterView :key="$route.fullPath" />
    <FooterNav
      class="mt-auto"
      style="
        position: relative;
        bottom: 0;
        left: 0;

        right: 0;
      "
    />-->
  <!--</div>-->
</template>

<style>
/*
::-webkit-scrollbar {
  background-color: #f5f5f5;
} */

::-webkit-scrollbar {
  width: 6px;
  background-color: #f5f5f5;
}

::-webkit-scrollbar-thumb {
  /*border-radius: 10px; */
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #0fa7e3;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

.scrollbar-primary {
  scrollbar-color: #0fa7e3 #f5f5f5;
}

/*
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
*/
</style>
