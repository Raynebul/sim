<template>
  <div v-for="j in structure.length" :key="j">
    <div class="treeComponent d-flex" @mouseover="SelectComponent(structure[j - 1].id)">
      <form class="d-flex" >
        <div v-for="i in level" :key="i" >&#160&#160</div>
        <div>
          {{ level }} {{ structure[j - 1].type }}
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
    <TreeComponent
      v-if="structure[j - 1].structure != undefined"
      :structure="structure[j - 1].structure"
      :elementid="structure[j - 1].id"
      :level="level + 1"
      @updateList="updateList"
      @select_component="select_component"
    ></TreeComponent>
  </div>
</template>

<script>
export default {
  name: "TreeComponent",
  props: {
    structure: {
      type: Object,
      required: true,
    },
    elementid: {},
    level: {},
  },
  data(props) {
    return {
      structure_new: props.structure,
    };
  },
  methods: {
    DeleteElement(i) {
      this.structure_new.splice(i, 1);
      this.$emit("updateList", this.structure_new, this.elementid);
    },

    updateList(structure_new, elementid) {
      //let structure1 = this.FindStructure(this.structure, elementid)
      //console.log("новый",structure1)
      this.$emit("updateList", structure_new, elementid);
    },

    FindStructure(structure, elementid) {
      for (let i = 0; i < structure.length; i++) {
        if (structure[i].id == elementid) {
          return structure, i;
        }
        if (structure[i]["structure"] != undefined) {
          let newstructure,
            j = this.FindStructure(structure[i].structure, elementid);
          structure[i].structure[j] = newstructure;
          //console.log("abcdefg", newstructure)
          if (newstructure != 0) {
            return structure;
          }
        }
      }
      return 0, 0;
    },
    GetClass(j) {
      if (this.structure[j].strcucture === undefined) return "treeComponent";
      else return "none";
    },
    SelectComponent(id) {
      this.$emit("select_component", id)
    },
    select_component(id) {
      this.$emit("select_component", id)
    }
  },
};
</script>

<style>
.treeComponent:hover {
  background-color: gray;
}
</style>
