<template>
  <div
    class="collapse collapse-horizontal multi-collapse scrollbar-style show"
    id="multiCollapseLeftSidebar"
  >
    <div
      class="construct-sidebar p-2 col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark h-100"
      style="width: 200px"
    >
      <div
        class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100"
      >
        <div
          class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <span class="fs-5 d-none d-sm-inline">Элементы конструктора</span>
        </div>

        <div
          data-bs-spy="scroll"
          class="scrollbar-leftsidebar"
          style="height: 36rem; overflow: auto"
        >
          <ComponentPanel
            :last_id="last_id"
            @addingFile="AddingFile"
            @updateList="updateList"
            @updateListTwoRows="updateListTwoRows"
            @updateListThreeRows="updateListThreeRows"
          ></ComponentPanel>
          <hr style="margin: 10px 0 10px 0" />
          <div
            class="accordion accordion-flush"
            id="accordionPanelsStayOpenExample"
          >
            <ccSettings
              v-if="loaded == true"
              :UI="UI"
              @changePosition="ChangePosition"
              @inputSettings="InputSettings"
              @inputSystems="InputSystems"
            ></ccSettings>
          </div>
        </div>

        <hr />
      </div>
      <!--
      <div class="d-flex">
        <button
          class="btn btn-outline-info btn-lg"
          style="border-color: transparent; background-color: transparent"
          @click="DeleteAllSaves()"
        >
          <i class="bi bi-arrow-counterclockwise" style="font-size: 2rem"></i>
        </button>
        <button
          class="btn btn-outline-danger btn-lg"
          style="border-color: transparent; background-color: transparent"
          @click="DeleteTrainer()"
        >
          <i class="bi bi-trash-fill" style="font-size: 2rem"></i>
        </button>
      </div>-->
    </div>
  </div>
</template>

<script setup>
// Элементы левого sidebara
import ccSettings from "./LeftNavElements/cSettings.vue";
import ComponentPanel from "./LeftSideBarComponentPanel.vue";
</script>

<script>
export default {
  props: {
    UI: {
      type: Object,
      required: true,
    },
    Code: {
      type: Object,
      required: true,
    },
    loaded: {
      type: Object,
      required: true,
    },
    last_id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      test: "test",
    };
  },
  methods: {
    //#region Управление тренажером
    AddingFile() {
      this.$emit("addingFile")
    },
    updateList(newElement, new_id) {
      this.$emit("updateList", newElement, new_id);
    },
    updateListTwoRows(newElement1, newElement2, new_id) {
      this.$emit("updateListTwoRows", newElement1, newElement2, new_id);
    },
    updateListThreeRows(newElement1, newElement2, newElement3, new_id) {
      this.$emit(
        "updateListThreeRows",
        newElement1,
        newElement2,
        newElement3,
        new_id
      );
    },
    DeleteAllSaves() {
      this.$emit("DeleteAllSaves");
    },
    DeleteTrainer() {
      this.$emit("DeleteTrainer");
    },
    //#endregion

    //#region Textarea
    AddTextArea() {
      this.$emit("AddTextArea");
    },
    RemoveTextArea() {
      this.$emit("RemoveTextArea");
    },
    //#endregion

    //#region Textinput
    AddTextInput() {
      this.$emit("AddTextInput");
    },
    RemoveTextInput() {
      this.$emit("RemoveTextInput");
    },
    //#endregion

    //#region Button
    AddButton() {
      this.$emit("AddButton");
    },
    RemoveButton() {
      this.$emit("RemoveButton");
    },
    //#endregion

    //#region Card
    AddCard() {
      this.$emit("AddCard");
    },
    RemoveCard() {
      this.$emit("RemoveCard");
    },
    //#endregion

    //#region Static table
    AddStaticTable() {
      this.$emit("AddStaticTable");
    },
    RemoveStaticTable() {
      this.$emit("RemoveStaticTable");
    },
    //#endregion

    //#region Dynamic table

    AddDynamicTable() {
      this.$emit("AddDynamicTable");
    },
    RemoveDynamicTable() {
      this.$emit("RemoveDynamicTable");
    },

    //#endregion

    //#region 2Dcomponent

    Add2Dcomponent() {
      this.$emit("Add2Dcomponent");
    },
    Remove2Dcomponent() {
      this.$emit("Remove2Dcomponent");
    },

    //#endregion

    //#region Radiobox
    AddRadiobox() {
      this.$emit("AddRadiobox");
    },
    RemoveRadiobox() {
      this.$emit("RemoveRadiobox");
    },
    AddGroupOfRadioboxes() {
      this.$emit("AddGroupOfRadioboxes");
    },
    RemoveGroupOfRadioboxes() {
      this.$emit("RemoveGroupOfRadioboxes");
    },
    //#endregion

    //#region Checkbox
    AddCheckbox() {
      this.$emit("AddCheckbox");
    },
    RemoveCheckbox() {
      this.$emit("RemoveCheckbox");
    },

    //#endregion

    //#region Systems
    InputSystems(systems) {
      this.$emit("InputSystems", systems);
    },
    //#endregion

    //#region Настройки
    InputSettings(inputSettings) {
      this.$emit("InputSettings", inputSettings);
    },
    ChangePosition(switch1, switch2) {
      this.$emit("ChangePosition", switch1, switch2);
    },
    //#endregion
  },
};
</script>

<style>
.collapsed {
  color: rgb(178, 178, 178) !important;
}

.collapsed:hover {
  color: rgb(255, 255, 255) !important;
}

.btn-outline-info:hover {
  color: white;
}
</style>

<style scoped>
.scrollbar-leftsidebar::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 0px;
  background-color: #1a1a1b;
}

.scrollbar-leftsidebar::-webkit-scrollbar {
  width: 6px;
  background-color: #1a1a1b;
}

.scrollbar-leftsidebar::-webkit-scrollbar-thumb {
  border-radius: 0px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #00ffff;
}

/*
.scrollbar-leftsidebar {
  overflow-y: scroll;
  scrollbar-color: #00ffff #1a1a1b;
  scrollbar-width: 6px;
} */
</style>
