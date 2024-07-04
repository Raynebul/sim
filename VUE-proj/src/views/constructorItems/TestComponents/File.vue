<template>
  <div
    @click="ChooseElement"
    style="width: 100%; height: 100%"
    :class="' ' + SelectedComponent(element.id) + ' ' + SelectClass() + ' ' +chosen_id_class"
  >
    <div class="ms-2"><i class="bi bi-file-earmark-text-fill"></i> Файл</div>
  </div>
</template>

<script>
export default {
  props: {
    element: {
      type: Object,
      required: true,
    },
    style_: {
      type: String,
      required: true,
      default: "",
    },
    class_: {
      type: String,
      required: true,
      default: "",
    },
    selected_id: {
      type: Number,
    },
    status: {
      type: String,
    },
    chosen_id_class: {
      type: String,
    },
  },
  watch: {
    selected_id: {
      handler(newVal, oldVal) {
        this.SelectedComponent(newVal);
        this.SelectedComponentColor(newVal);
      },
      deep: true,
    },
  },
  data(props) {
    let attributes = props.element.attributes;
    return {
      attributes,
    };
  },
  methods: {
    SelectedComponent(id) {
      if (this.selected_id === id) {
        return "selected_component";
      } else {
        return " ";
      }
    },
    SelectedComponentColor(id) {
      if (this.selected_id === id) {
        return "selected_component_color";
      } else {
        return " ";
      }
    },
    SelectClass() {
      if (this.status === "preview") {
        return "my-2 me-2 ";
      } else {
        return " ";
      }
    },
    ChooseElement() {
      this.$emit(`choose_element`, this.element);
    },
  },
};
</script>

<style>

</style>
