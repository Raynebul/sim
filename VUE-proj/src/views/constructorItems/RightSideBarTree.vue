<template>
  <div
    class="tab-pane fade text-white"
    id="tree"
    role="tabpanel"
    aria-labelledby="tree-tab"
  >
    <form @mouseleave="Unselect">
      <div v-for="j in structure.length" :key="j">
        <div
          class="treeComponent d-flex"
          @mouseover="SelectComponent(structure[j - 1].id)"
        >
          <form class="d-flex">
            <div>
              1 {{ structure[j - 1].type }}
              <p v-if="structure[j - 1].attributes.name != undefined">
                {{ structure[j - 1].attributes.name }}
              </p>
            </div>
          </form>
          <button
            @click="DeleteElement(j - 1)"
            style="
              font-size: 0.7rem;
              margin-left: 15px;
              border-color: transparent !important;
              background-color: transparent;
            "
            class="bi bi-trash-fill btn btn-outline-danger"
          ></button>
        </div>
        <div></div>
        <TreeComponent
          v-if="structure[j - 1].structure != undefined"
          @updateList="updateList"
          @select_component="select_component"
          :structure="structure[j - 1].structure"
          :elementid="structure[j - 1].id"
          :level="2"
        ></TreeComponent>
      </div>
    </form>
  </div>
</template>

<script setup>
import TreeComponent from "./TreeComponent.vue";
</script>

<script>
export default {
  props: {
    structure: {
      type: Object,
      required: true,
    },
  },
  data(props) {
    return {
      structure_new: props.structure,
    };
  },
  methods: {
    DeleteElement(i) {
      this.structure_new.splice(i, 1);
      this.$emit("updateList", this.structure_new, 0);
    },
    updateList(structure_new, elementid) {
      this.$emit("updateList", structure_new);
    },
    GetClass(j) {
      if (this.structure[j].strcucture === undefined) return "treeComponent";
      else return "none";
    },
    SelectComponent(id) {
      this.$emit("select_component", id);
    },
    select_component(id) {
      this.$emit("select_component", id);
    },
    Unselect() {
      this.$emit("unselect")
    },
  },
};
</script>

<style>
.treeComponent:hover {
  background-color: gray;
}
</style>
