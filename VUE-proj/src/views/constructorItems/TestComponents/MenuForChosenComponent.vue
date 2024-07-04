<template>
  <ul
    class="position-absolute chosen-menu nav nav-tabs fw-bold"
    id="myTab"
    role="tablist"
    style=""
  >
  <!--
    <li
      class="nav-item"
      v-if="type === `file`"
      role="presentation"
      style="width: 50px !important"
    >
      <button class="nav-link rounded-0" id="file-tab">
        <i class="bi bi-folder-fill"></i>
        <input @change="LoadFile" type="file" />
      </button>
    </li>-->
    <li class="nav-item" role="presentation" style="width: 50px !important">
      <button
        @click="DeleteElement()"
        class="nav-link rounded-0"
        id="description-tab"
      >
        <i class="bi bi-trash-fill"></i>
      </button>
    </li>

    <li class="nav-item" role="presentation" style="width: 50px !important">
      <button
        @click="CloseChosenMenu()"
        class="nav-link rounded-0"
        id="profile-tab"
      >
        <i class="bi bi-x"></i>
      </button>
    </li>
  </ul>
</template>

<style>
.chosen-menu {
  z-index: 999;
  margin-top: -50px;
  max-width: 200px;
  background-color: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
  text-decoration: none;
  height: 40px;
  width: 100px;
  font-size: 1rem;
  border: 0;
}

.chosen-menu .nav-link {
  color: rgb(0, 0, 0);
}

.chosen-menu .nav-link:hover {
  background-color: rgb(198, 208, 226);
  color: rgb(255, 255, 255);
}

input[type="file"] {
  position: absolute;
  top: 0;
  right: 0;
  /*
  min-width: 100%;
  min-height: 100%; */
  width: 50px !important;
  /*font-size: 100px;*/
  text-align: right;
  filter: alpha(opacity=0);
  opacity: 0;
  outline: none;
  cursor: inherit;
  display: block;
}
</style>

<script setup>
import axios from "axios";
</script>

<script>
export default {
  props: {
    type: {
      type: String,
    },
  },
  data() {
    return {
      menu_: false,
    };
  },
  methods: {
    CloseChosenMenu() {
      this.$emit(`close_menu`);
    },
    DeleteElement() {
      this.$emit("delete_element");
    },
    onFileSelected(event) {
      //console.log(event);
      this.chosen_file = event.target.files[0];
      //this.AddFile();
    },
    onFileChange(event) {
      this.chosen_file = event.target.files[0];
      //this.createImage(file);
    },
  },
};
</script>
