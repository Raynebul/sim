<template>
  <div class="input-group input-group-sm mb-3">
    <span
      class="input-group-text text-gray"
      style="color: darkgray !important"
      id="basic-addon1"
      >Имя_файла</span
    >
    <input
      v-model="attributes.originalname"
      class="form-control form-control-sm text-gray"
      style="color: darkgray !important"
      type="text"
      disabled
    />
  </div>
  <div class="input-group input-group-sm mb-3">
    <span
      class="input-group-text text-gray"
      style="color: darkgray !important"
      id="basic-addon1"
      >Путь</span
    >
    <input
      v-model="attributes.destination"
      class="form-control form-control-sm text-gray"
      style="color: darkgray !important"
      type="text"
      disabled
    />
  </div>
  <DeleteElementComponent
    :element="element"
    @delete_element="DeleteElement"
  ></DeleteElementComponent>
</template>

<script setup>
import DeleteElementComponent from "./DeleteElement.vue";
import axios from "axios";
</script>

<script>
export default {
  props: {
    element: {
      type: Object,
      required: true,
    },
    type_: {
      type: String,
      default: "tree",
    },
    list_index: {
      type: Number,
    },
  },
  watch: {
    list_index: {
      handler(newVal, oldVal) {
        if (this.list_index !== 0) {
          this.error_name = this.name;
          this.error_ = true;
        }
        this.name = this.element.attributes.name;
      },
      deep: true,
    },
  },
  data(props, context) {
    let attributes = props.element.attributes;
    let name = attributes.name;
    let error_ = false;
    let error_name = "";
    /*
        for (let i = 0; i < input.length; i++) {
          input[i]["style"] = "";
        } */
    return {
      attributes,
      name,
      error_,
      error_name,
    };
  },
  methods: {
    DeleteElement() {
      //this.$emit()
      axios({
        method: "delete",
        url: this.base_url + `/edit/` + this.$route.params.id + "/file",
        data: {
           attributes: this.attributes,
        },
        headers: {
          "Access-Control-Allow-Origin": this.access_origin,
          "Access-Control-Allow-Credentials": true,
        },
        validateStatus: (status) => {
          return true; // I'm always returning true, you may want to do it depending on the status received
        },
      })
        .then((response) => {
          this.$emit("delete_element", this.element);
        })
        .catch(function (error) {
          //this.haveAccess = true;
          //console.log(error);
        });

      //this.$emit("delete_element", this.element);
    },
    Test(test) {
      console.log(test);
    },
    NewName() {
      this.$emit("newName", this.name);
      this.error_ = false;
    },
  },
  //emits: ["newValue"],
};
</script>

<style scoped>
.accordion-body {
  padding-top: 10px !important;
  padding-bottom: 10px !important;
  padding-right: 10px !important;
  padding-left: 10px !important;
}
</style>
