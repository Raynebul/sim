<template>
  <div class="accordion-item">
    <h2
      class="accordion-header"
      :id="'panelsStayOpenCard-heading' + element.id"
    >
      <button
        @mouseover="SelectComponent(element.id)"
        class="accordion-button collapsed bg-dark text-white"
        type="button"
        data-bs-toggle="collapse"
        :data-bs-target="'#panelsStayOpenCard-collapse' + element.id"
        aria-expanded="false"
        :aria-controls="'panelsStayOpenCard-collapse' + element.id"
      >
        Column ""
      </button>
    </h2>
    <div
      :id="'panelsStayOpenCard-collapse' + element.id"
      class="accordion-collapse collapse bg-dark"
      :aria-labelledby="'panelsStayOpenCard-heading' + element.id"
    >
      <div class="accordion-body text-white">
        <RightComponent
          v-for="component in element.structure"
          @delete_element="delete_element"
          @select_component="select_component"
          @SaveStaticTable="SaveStaticTable"
          :inputs="inputs"
          :key="component.id"
          :element="component"
        ></RightComponent>
        <DeleteElementComponent
          :element="element"
          @delete_element="DeleteElement"
        ></DeleteElementComponent>
      </div>
    </div>
  </div>
  <!--
  <RightComponent
    v-for="component in element.structure"
    @select_component="select_component"
    :key="component.id"
    :element="component"
  ></RightComponent>-->
</template>

<script setup>
import RightComponent from "./RightComponent.vue";
import DeleteElementComponent from "./DeleteElement.vue";
</script>

<script>
export default {
  props: {
    element: {
      type: Array,
      required: true,
    },
    inputs: {
      type: Array,
      required: true,
    },
  },
  display: "Nested",
  data(props) {},
  methods: {
    DeleteElement() {
      this.$emit("delete_element", this.element)
    },
    delete_element(element) {
      this.$emit("delete_element", element)
    },
    SelectComponent(id) {
      this.$emit("select_component", id);
    },
    select_component(id) {
      this.$emit("select_component", id);
    },
    SaveStaticTable(i, rows, columns) {
      this.$emit("SaveStaticTable", i, rows, columns);
    },
  },
};
</script>

<style scoped>
.accordion-body {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  padding-right: 0 !important;
  padding-left: 10px !important;
}
</style>
