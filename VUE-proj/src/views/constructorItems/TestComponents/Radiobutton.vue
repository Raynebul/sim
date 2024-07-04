<template>
  <div
    :style="style_"
    @click="ChooseElement"
    :class="
      ' ' + SelectedComponent(element.id) + ' ' + chosen_id_class + ' ' + class_
    "
    v-for="i in element.attributes.count"
    :key="i"
  >
    <input
      class="form-check-input"
      type="radio"
      :name="`exampleRadios`"
      :id="`exampleRadios`"
    />
    <label class="form-check-label active" :for="`exampleRadios`"> </label>
  </div>
</template>

<script>
export default {
  props: {
    element: {
      type: Object,
      required: true,
    },
    selected_id: {
      type: Number,
    },
    chosen_id_: {
      type: Number,
    },
    style_: {
      type: String,
      required: true,
      default: "",
    },
    chosen_id_class: {
      type: String,
    },
    class_: {
      type: String,
      required: true,
      default: "",
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
    ChooseElement() {
      //if (this.status == "develop") {
      //this.$emit(`choose_element`, this.element);
      //}
      this.$emit(`choose_element`, this.element);
    },
    SelectedComponent(id) {
      if (this.selected_id === id) {
        return "selected_component";
      } else {
        return " ";
      }
    },
  },
};
</script>
