<template>
  <div class="input-group input-group-sm mb-3" v-if="type_ === `tree`">
    <span class="input-group-text text-gray" id="basic-addon1">Имя</span>
    <input
      v-model="name"
      @focusout="NewName()"
      v-on:keyup.enter="NewName()"
      class="form-control form-control-sm text-gray"
      type="text"
    />
  </div>
  <div class="text-danger form-label" v-if="error_ === true">
    * {{ error_name }} - такое имя контрола уже есть!
  </div>
  <!--
          <select
            v-model="attributes.class"
            class="form-select form-select-sm text-gray"
            aria-label="Default select example"
          >
            <option value="" selected>Выберете</option>
            <option value="disabled">disabled</option>
          </select>
          <select
            v-model="attributes.style"
            class="form-select form-select-sm text-gray"
            aria-label="Default select example"
          >
            <option value="" selected>Выберете</option>
            <option value="background-color: black">
              background-color: black
            </option>
            <option value="background-color: red">background-color: red</option>
            <option value="background-color: green">
              background-color: green
            </option>
            <option value="background-color: blue">
              background-color: blue
            </option>
            <option value="background-color: yellow">
              background-color: yellow
            </option>
          </select>-->
  <!--
  <DeleteElementComponent
    :element="element"
    @delete_element="DeleteElement"
  ></DeleteElementComponent>-->
</template>

<script setup>
import DeleteElementComponent from "./DeleteElement.vue";
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
        if (this.list_index !== 0 && this.list_index !== undefined) {
          console.log("12344")
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
      this.$emit("delete_element", this.element);
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
