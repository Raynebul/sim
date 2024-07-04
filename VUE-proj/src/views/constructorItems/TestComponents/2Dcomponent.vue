<template>
  <div
    @click="ChooseElement"
    :style="style_"
    :class="
      SelectedComponent(element.id) + SelectClass() + ' ' + chosen_id_class
    "
    style=""
  >
    <!-- <div v-bind:id="plotlyIDs[i - 1]"></div>-->
    <div
      :class="SelectedComponentColor(element.id)"
      v-bind:id="element.attributes.plotlyId + status"
    ></div>
  </div>
</template>

<script setup>
import { newPlot } from "plotly.js/lib/index-basic.js";
</script>

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
    status: {
      type: String,
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
        this.SelectedComponentColor(newVal);
      },
      deep: true,
    },
  },
  data(props) {
    let plotlyCounter = 0;
    let config = {};
    for (let key in props.element.attributes.config) {
      config[key] = props.element.attributes.config[key];
    }
    if (props.status === "develop") {
      config["staticPlot"] = true;
    }
    this.$nextTick(() => {
      newPlot(
        props.element.attributes.plotlyId + props.status,
        props.element.attributes.data,
        props.element.attributes.layout,
        config
      );
    });
    return {
      config,
      //plotlyObject2D,
      //plotlyCounter,
    };
  },
  mounted() {
    for (let key in this.element.attributes.config) {
      this.config[key] = this.element.attributes.config[key];
    }
    if (this.status === "develop") {
      this.config["staticPlot"] = true;
    }
    this.$nextTick(() => {
      newPlot(
        this.element.attributes.plotlyId + this.status,
        this.element.attributes.data,
        this.element.attributes.layout,
        this.config
      );
    });
  },
  computed: {},
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
      //if (this.status == "develop") {
      //this.$emit(`choose_element`, this.element);
      //}
      this.$emit(`choose_element`, this.element);
    },
  },
};
</script>
