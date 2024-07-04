<template>
  <div
    @click="ChooseElement"
    :style="style_ + ' width: 100%; height: 100%;'"
    :class="
      '' +
      SelectClass() +
      SelectedComponent(element.id) +
      ' ' +
      chosen_id_class +
      ' ' +
      class_
    "
  >
    <!--style="margin-top: auto; margin-bottom: auto"-->
    <div class="card-body" v-html="element.attributes.value"></div>
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
    status: {
      type: String,
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
  data(props) {
    /*
      setTimeout(() => {
        console.log("ПРОВЕРКА -", props.UI)
      }, 1000);; */
  },
  methods: {
    SelectedComponent(id) {
      if (this.selected_id === id) {
        return "selected_component ";
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
};
</script>

<style>
.card-preview {
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>
