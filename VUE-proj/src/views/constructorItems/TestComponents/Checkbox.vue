<template>
  <div
    :style="style_"
    @click="ChooseElement"
    :class="
      '' + SelectedComponent(element.id) + ' ' + chosen_id_class + ' ' + class_
    "
  >
    <input class="form-check-input" type="checkbox" id="flexCheckDefault" />
    <label class="form-check-label" for="flexCheckDefault">Test </label>
  </div>
</template>

<script>
export default {
  props: {
    element: {
      type: Object,
      required: true,
    },
    class_: {
      type: String,
      required: true,
      default: "",
    },
    style_: {
      type: String,
      required: true,
      default: "",
    },
    selected_id: {
      type: Number,
    },
    chosen_id_: {
      type: Number,
    },
    chosen_id_class: {
      type: String,
    },
  },
  watch: {
    selected_id: {
      handler(newVal, oldVal) {
        this.SelectedComponent(newVal);
      },
      deep: true,
    },
  },
  methods: {
    SelectedComponent(id) {
      if (this.selected_id === id) {
        return "selected_component";
      } else {
        return " ";
      }
    },
    ChooseElement() {
      //if (this.status == "develop") {
      //this.$emit(`choose_element`, this.element);
      //}
      this.$emit(`choose_element`, this.element);
    },
  },
};
</script>
