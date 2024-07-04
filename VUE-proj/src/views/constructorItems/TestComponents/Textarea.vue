<template>
  <div
    @click="ChooseElement"
    style="width: 100%; height: 100%;"
    :class="
      'd-flex flex-row justify-content-start ' +
      SelectClass() +
      SelectedComponent(element.id) +
      ' ' +
      chosen_id_class
    "
  >
    <textarea
      :style="style_"
      :class="' ' + SelectedComponent(element.id) + ' ' + class_"
      id="exampleFormControlTextarea1"
      v-model="attributes.value"
      style="max-width: 100%"
    ></textarea>
  </div>
</template>

<script setup>

</script>

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
    status: {
      type: String,
    },
    style_: {
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
        this.SelectedComponentColor(newVal);
      },
      deep: true,
    },
  },
  data(props, context) {
    let attributes = props.element.attributes;
    //console.log("textareas -", inputValue);
    return {
      attributes,
    };
  },
  methods: {
    ChooseElement() {
      //if (this.status == "develop") {
      //this.$emit(`choose_element`, this.element);
      //}
      this.$emit(`choose_element`, this.element);
    },
    inputAttributes() {
      this.$emit("inputAttributes", this.attrbiutes, this.element.id);
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
        return "my-2 me-1 ";
      } else {
        return " ";
      }
    },
  },
};
</script>
