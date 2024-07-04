<template>
  <div
    @click="ChooseElement"
    style="width: 100%; height: 100%"
    :class="
      ' ' +
      SelectedComponent(element.id) +
      ' ' +
      SelectClass() +
      ' ' +
      chosen_id_class
    "
  >
    <button
      :style="style_ + ` width: 100%; height: 100%`"
      :class="'' + SelectedComponentColor(element.id) + ' ' + class_"
      @click="RunCode(element.attributes.functionNumber, element.id)"
    >
      {{ attributes.name }}
    </button>
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
    RunCode(functionNumber, buttonNumber) {
      if (this.status == "preview") {
        this.$emit(`runCode`, functionNumber, buttonNumber);
      }
    },
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
      //if (this.status == "develop") {
      //this.$emit(`choose_element`, this.element);
      //}
      this.$emit(`choose_element`, this.element);
    },
  },
};
</script>
