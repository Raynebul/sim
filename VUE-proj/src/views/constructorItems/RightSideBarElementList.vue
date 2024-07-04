<template>
  <div
    class="tab-pane fade"
    id="list"
    role="tabpanel"
    aria-labelledby="list-tab"
  >
    <div
      class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white"
    >
      <div
        class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <span class="fs-5 d-none d-sm-inline"
          >Элементы тренажёра "{{ UI.name }}"</span
        >
      </div>

      <div
        data-bs-spy="scroll"
        class="scrollbar-rightsidebar min-vh-100"
        style="height: 36rem; overflow: auto; padding-right: 10px"
      >
        <!--height: 36rem-->
        <!--
        <div
          class="accordion accordion-flush"
          id="accordionPanelsStayOpenExample"
        >
          <rInputs
            v-if="loaded == true"
            :UI="UI"
            :key="reload"
            @inputInputs="InputInputs"
            @addNewInput="AddNewInput"
            @addNewUIinput="AddNewUIinput"
            @inputUIinputs="InputUIinputs"
            @removeInput="RemoveInput"
            @removeUIinput="RemoveUIinput"
          ></rInputs>
          <rRoundInputs
            v-if="loaded == true && UI.settings.roundSystem === true"
            @addNewRoundInput="AddNewRoundInput"
            @removeRoundInput="RemoveRoundInput"
            @inputInputs="InputRoundInputs"
            :UI="UI"
            :key="reload"
          >
          </rRoundInputs>
          <rFunctions
            v-if="loaded == true"
            :UI="UI"
            :Code="Code"
            @inputFunctions="InputFunctions"
            @chooseClearInputs="InputClearInputs"
            @addNewFunction="AddNewFunction"
            @inputFunctionWithoutButtons="InputFunctionWithoutButtons"
            @inputCommandButton="InputCommandButton"
            @addCommandToFunction="AddCommandToFunction"
            @removeCommandToFunction="RemoveCommandToFunction"
          ></rFunctions>
          <rOutputs
            v-if="loaded == true"
            :UI="UI"
            @inputOutputs="InputOutputs"
            @addNewOutput="AddNewOutput"
            @removeOutput="RemoveOutput"
          >
          </rOutputs>
        </div>
-->
        <hr />

        <div
          class="accordion accordion-flush"
          id="accordionPanelsStayOpenExample"
          @mouseleave="unselect"
        >
          <RightComponent
            v-for="element_id in UI.structure.length"
            @delete_element="delete_element"
            @select_component="select_component"
            @SaveStaticTable="SaveStaticTable"
            @newName="NewName"
            :list_index="list[element_id - 1]"
            :key="element_id"
            :inputs="UI.inputs"
            :element="UI.structure[element_id - 1]"
          ></RightComponent>
        </div>
      </div>
      <hr />
    </div>
  </div>
</template>

<script setup>
import RightComponent from "./RightNavElements/RightComponent.vue";
/*

// Компоненты правого sidebara, которые отображаются в тренажёре
import rTextarea from "./RightNavElements/crTextarea.vue";
import rButton from "./RightNavElements/cButton.vue";
import rStaticTable from "./RightNavElements/cStaticTable.vue";
import rDynamicTable from "./RightNavElements/cDynamicTable.vue";
import rCard from "./RightNavElements/cCard.vue";
import rCheckbox from "./RightNavElements/cCheckbox.vue";
import rRadiobox from "./RightNavElements/cRadiobox.vue";
import rGroupOfRadioboxes from "./RightNavElements/cGroupOfRadioboxes.vue";
import rTextInput from "./RightNavElements/cInput.vue";
import r2Dcomponent from "./RightNavElements/c2Dcomponent.vue";
*/
// Компоненты кода правого sidebara (Переменные, функции)
import rInputs from "./RightNavElements/CodeElements/cInputs.vue";
import rRoundInputs from "./RightNavElements/CodeElements/cRoundInputs.vue";
import rOutputs from "./RightNavElements/CodeElements/cOutputs.vue";
import rFunctions from "./RightNavElements/CodeElements/cFunctions.vue";
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
    reload: { type: Object, required: true },
  },
  data(props) {
    let list = [];
    for (let i = 0; i < props.UI.structure.length; i++) {
      list.push(0);
    }
    return {
      test: "test",
      list,
    };
  },
  mounted() {
    this.list = [];
    for (let i = 0; i < this.UI.structure.length; i++) {
      this.list.push(0);
    }
  },
  methods: {
    delete_element(element) {
      this.$emit("delete_element", element);
    },
    //#region Функции для инпутов, аутпутов и функций
    select_component(id) {
      this.$emit("select_component", id);
    },
    unselect() {
      this.$emit("unselect");
    },
    AddCommandToFunction(i) {
      this.$emit("AddCommandToFunction", i);
    },
    RemoveCommandToFunction(i) {
      this.$emit("RemoveCommandToFunction", i);
    },
    InputInputs(inputs) {
      this.$emit("InputInputs", inputs);
    },
    AddNewInput() {
      this.$emit("AddNewInput");
    },
    AddNewUIinput() {
      this.$emit("AddNewUIinput");
    },
    InputUIinputs(inputs) {
      this.$emit("InputUIinputs", inputs);
    },
    RemoveInput() {
      this.$emit("RemoveInput");
    },
    RemoveUIinput() {
      this.$emit("RemoveUIinput");
    },
    AddNewRoundInput() {
      this.$emit("AddNewRoundInput");
    },
    RemoveRoundInput() {
      this.$emit("RemoveRoundInput");
    },
    InputRoundInputs(inputs) {
      this.$emit("InputRoundInputs", inputs);
    },
    InputFunctions(functions, control) {
      this.$emit("InputFunctions", functions, control);
    },
    InputClearInputs(inputs) {
      this.$emit("InputClearInputs", inputs);
    },
    AddNewFunction() {
      this.$emit("AddNewFunction");
    },
    InputOutputs(outputs) {
      this.$emit("InputOutputs", outputs);
    },
    AddNewOutput() {
      this.$emit("AddNewOutput");
    },
    RemoveOutput() {
      this.$emit("RemoveOutput");
    },
    //#endregion

    //#region Функции с добавление простых контролов (по типу кнопки, текстового поля)
    InputRightButton(input) {
      this.$emit("InputRightButton", input);
    },
    InputRightTextArea(input) {
      this.$emit("InputRightTextArea", input);
    },
    InputRightTextInput(input) {
      this.$emit("InputRightTextInput", input);
    },
    InputRightCheckbox(input) {
      this.$emit("InputRightCheckbox", input);
    },
    InputRightCard(input) {
      this.$emit("InputRightCard", input);
    },
    //#endregion

    //#region Функции с радиокнопками
    InputRightRadiobox(input) {
      this.$emit("InputRightRadiobox", input);
    },
    InputRightGroupOfRadioboxes(input) {
      this.$emit("InputRightGroupOfRadioboxes", input);
    },
    AddRadioboxToGroup(i) {
      this.$emit("AddRadioboxToGroup", i);
    },
    //#endregion

    //#region Функции со статистическими таблицами
    CreateBlockInStaticTable(i, x_start, y_start, x_end, y_end, table_type) {
      this.$emit(
        "CreateBlockInStaticTable",
        i,
        x_start,
        y_start,
        x_end,
        y_end,
        table_type
      );
    },
    InputRightStaticTableInputs(tables) {
      this.$emit("InputRightStaticTableInputs", tables);
    },
    SaveStaticTable(i, rows, columns) {
      this.$emit("SaveStaticTable", i, rows, columns);
    },
    DeleteStaticTableBlock(i, j) {
      this.$emit("DeleteStaticTableBlock", i, j);
    },
    InputBlocKStaticTable() {
      this.$emit("InputBlocKStaticTable");
    },
    ChangeInputTypeInBlockStaticTable() {
      this.$emit("ChangeInputTypeInBlockStaticTable");
    },
    //#endregion

    //#region Функции с динамическими таблицами
    CreateBlockInDynamicTable(i, x, y, table_type) {
      this.$emit("CreateBlockInDynamicTable", i, x, y, table_type);
    },
    //#endregion

    Input2Dcomponent(object, index, i) {
      this.$emit("Input2Dcomponent", object, index, i);
    },
    Input2D(object, i) {
      this.$emit("Input2D", object, i);
    },
    Input2DLayout(object, i) {
      this.$emit("Input2DLayout", object, i);
    },
    Input2DConfig(config, i) {
      this.$emit("Input2DConfig", config, i);
    },
    InputFunctionWithoutButtons(functions) {
      this.$emit("InputFunctionWithoutButtons", functions);
    },
    InputCommandButton(functions, i, command) {
      this.$emit("InputCommandButton", functions, i, command);
    },
    NewName(name, id) {
      console.log("o what");
      let found_element = this.UI.structure.find(
        (element) => element.attributes.name === name
      );
      if (found_element !== undefined) {
        console.log(found_element);
        if (found_element.id !== id) {
          console.log("duplicate");
          let index = this.UI.structure.findIndex(
            (element) => element.id === id
          );
          console.log("wlewewe", index, id);
          if (this.UI.structure.length !== this.list.length) {
            console.log("azazazaza")
            this.list = [];
            for (let i = 0; i < this.UI.structure.length; i++) {
              this.list.push(0);
            }
          }
          this.list[index]++;
          console.log(this.list)
        } else {
          found_element.attributes.name = name;
        }
      } else {
        let element_ = this.UI.structure.find((element) => element.id === id);
        element_.attributes.name = name;
      }
      /*
      for(let i = 0; i < this.list.length; i++) {
        if()
      } */
    },
  },
};
</script>

<style scoped>
.accordion-body {
  padding-left: 10px !important;
}

.accordion {
  --bs-accordion-bg: none;
}

.scrollbar-rightsidebar::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 0px;
  background-color: #1a1a1b;
}

.scrollbar-rightsidebar::-webkit-scrollbar {
  width: 6px;
  background-color: #1a1a1b;
}

.scrollbar-rightsidebar::-webkit-scrollbar-thumb {
  border-radius: 0px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #00ffff;
}
</style>
