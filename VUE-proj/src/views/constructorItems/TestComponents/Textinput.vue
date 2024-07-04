<template>
  <div
    @click="ChooseElement"
    :style="style_ "
    :class="
      'd-flex flex-row ' +
      SelectClass() +
      SelectedComponent(element.id) +
      ' ' +
      chosen_id_class
    "
  >
    <div :class="SelectedComponentColor(element.id)">
      <label
        style="margin: 0px"
        for="exampleFormControlInput1"
        class="form-label"
        >{{ attributes.textname }}</label
      >
      <input
        v-model="attributes.value"
        style="width: 100%; height: 100%;"
        type="text"
        class="form-control"
        id="exampleFormControlInput1"
      />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: {
    element: {
      type: Object,
      required: true,
    },
    selected_id: {
      type: Number,
    },
    status: {
      type: String,
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
        return "my-2 me-1 ";
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
  //emits: ["newValue"],
};
</script>
