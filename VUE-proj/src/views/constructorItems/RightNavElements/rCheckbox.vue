<template>
  <input
    v-model="name"
    @focusout="NewName()"
    v-on:keyup.enter="NewName()"
    class="form-control form-control-sm text-gray"
    type="text"
  />
  <div class="text-danger form-label" v-if="error_ === true">
    * {{ error_name }} - такое имя контрола уже есть!
  </div>
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
        if (this.list_index !== 0  && this.list_index !== undefined) {
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
