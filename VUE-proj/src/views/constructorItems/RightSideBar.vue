<template>
  <div
    class="ms-auto collapse collapse-horizontal multi-collapse show"
    id="multiCollapseRightSidebar"
    :style="
      `z-index: 15; background-color: rgb(228, 235, 235); ` + MarginLeftStyle()
    "
  >
    <div
      class="construct-sidebar p-2 col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark h-100 min-vh-100"
      style="width: 300px"
    >
      <!--style="width: 250px"-->
      <RightMenu></RightMenu>
      <div class="tab-content" id="myTabContent">
        <StyleAndClass
          @SaveStaticTable="SaveStaticTable"
          @newName="NewName"
          @delete_element="delete_element"
          :list_index="list"
          :chosen_id="chosen_id"
          :inputs="UI.inputs"
        ></StyleAndClass>
        <ElementList
          @delete_element="delete_element"
          @select_component="select_component"
          @unselect="unselect"
          :UI="UI"
          :Code="Code"
          :loaded="loaded"
          :reload="reload"
          @InputInputs="InputInputs"
          @AddNewInput="AddNewInput"
          @AddNewUIinput="AddNewUIinput"
          @InputUIinputs="InputUIinputs"
          @RemoveInput="RemoveInput"
          @RemoveUIinput="RemoveUIinput"
          @AddNewRoundInput="AddNewRoundInput"
          @RemoveRoundInput="RemoveRoundInput"
          @InputRoundInputs="InputRoundInputs"
          @InputFunctions="InputFunctions"
          @InputFunctionWithoutButtons="InputFunctionWithoutButtons"
          @InputCommandButton="InputCommandButton"
          @InputClearInputs="InputClearInputs"
          @AddNewFunction="AddNewFunction"
          @RemoveNewFunction="RemoveNewFunction"
          @AddCommandToFunction="AddCommandToFunction"
          @RemoveCommandToFunction="RemoveCommandToFunction"
          @InputOutputs="InputOutputs"
          @AddNewOutput="AddNewOutput"
          @RemoveOutput="RemoveOutput"
          @InputRightTextAreas="InputRightTextAreas"
          @InputRightTextInput="InputRightTextInput"
          @InputRightCheckbox="InputRightCheckbox"
          @InputRightRadiobox="InputRightRadiobox"
          @InputRightGroupOfRadioboxes="InputRightGroupOfRadioboxes"
          @AddRadioboxToGroup="AddRadioboxToGroup"
          @CreateBlockInStaticTable="CreateBlockInStaticTable"
          @InputRightStaticTableInputs="InputRightStaticTableInputs"
          @SaveStaticTable="SaveStaticTable"
          @DeleteStaticTableBlock="DeleteStaticTableBlock"
          @InputBlocKStaticTable="InputBlocKStaticTable"
          @ChangeInputTypeInBlockStaticTable="ChangeInputTypeInBlockStaticTable"
          @CreateBlockInDynamicTable="CreateBlockInDynamicTable"
          @InputRightCard="InputRightCard"
          @Input2Dcomponent="Input2Dcomponent"
          @Input2D="Input2D"
          @Input2DLayout="Input2DLayout"
          @Input2DConfig="Input2DConfig"
        ></ElementList>
        <InputBar
          :UI="UI"
          :Code="Code"
          :loaded="loaded"
          :reload="reload"
          @InputInputs="InputInputs"
          @AddNewInput="AddNewInput"
          @AddNewUIinput="AddNewUIinput"
          @InputUIinputs="InputUIinputs"
          @RemoveInput="RemoveInput"
          @RemoveUIinput="RemoveUIinput"
          @AddNewRoundInput="AddNewRoundInput"
          @RemoveRoundInput="RemoveRoundInput"
          @InputRoundInputs="InputRoundInputs"
          @InputFunctions="InputFunctions"
          @InputFunctionWithoutButtons="InputFunctionWithoutButtons"
          @InputCommandButton="InputCommandButton"
          @InputClearInputs="InputClearInputs"
          @AddNewFunction="AddNewFunction"
          @RemoveNewFunction="RemoveNewFunction"
          @AddCommandToFunction="AddCommandToFunction"
          @RemoveCommandToFunction="RemoveCommandToFunction"
          @InputOutputs="InputOutputs"
          @AddNewOutput="AddNewOutput"
          @RemoveOutput="RemoveOutput"
          @Input2Dcomponent="Input2Dcomponent"
          @Input2D="Input2D"
          @Input2DLayout="Input2DLayout"
          @Input2DConfig="Input2DConfig"
        ></InputBar>
        <CanvasSettings :canvas="UI.canvas"></CanvasSettings>
        <!--
        <Tree
          @updateList="updateList"
          @unselect="unselect"
          :structure="UI.structure"
          @select_component="select_component"
        ></Tree>-->
      </div>
      <!--
      <div
        class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100"
      >
        <div
          class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <span class="fs-5 d-none d-sm-inline"
            >Элементы тренажёра "{{ UI.name }}"</span
          >
        </div>

        <div data-bs-spy="scroll" style="height: 36rem; overflow: auto">
          <div
            class="accordion accordion-flush"
            id="accordionPanelsStayOpenExample"
          >
            <crInputs
              v-if="loaded == true"
              :UI="UI"
              :key="reload"
              @inputInputs="InputInputs"
              @addNewInput="AddNewInput"
              @addNewUIinput="AddNewUIinput"
              @inputUIinputs="InputUIinputs"
              @removeInput="RemoveInput"
              @removeUIinput="RemoveUIinput"
            ></crInputs>
            <crRoundInputs
              v-if="loaded == true && UI.settings.roundSystem === true"
              @addNewRoundInput="AddNewRoundInput"
              @removeRoundInput="RemoveRoundInput"
              @inputInputs="InputRoundInputs"
              :UI="UI"
              :key="reload"
            >
            </crRoundInputs>
            <crFunctions
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
            ></crFunctions>
            <crOutputs
              v-if="loaded == true"
              :UI="UI"
              @inputOutputs="InputOutputs"
              @addNewOutput="AddNewOutput"
              @removeOutput="RemoveOutput"
            >
            </crOutputs>
          </div>

          <hr />

          <div
            class="accordion accordion-flush"
            id="accordionPanelsStayOpenExample"
          >
            <crButton
              v-if="loaded == true"
              :UI="UI"
              @inputRightButton="InputRightButton"
            ></crButton>
            <crTextarea
              v-if="loaded == true"
              :UI="UI"
              @inputRightTextAreas="InputRightTextArea"
            ></crTextarea>
            <crTextInput
              v-if="loaded == true"
              :UI="UI"
              @inputRightTextInput="InputRightTextInput"
            ></crTextInput>
            <crCheckbox
              v-if="loaded == true"
              :UI="UI"
              @inputRightCheckbox="InputRightCheckbox"
            ></crCheckbox>
            <crRadiobox
              v-if="loaded == true"
              :UI="UI"
              @inputRightRadiobox="InputRightRadiobox"
            ></crRadiobox>
            <crGroupOfRadioboxes
              v-if="loaded == true"
              :UI="UI"
              @inputRightGroupOfRadioboxes="InputRightGroupOfRadioboxes"
              @addRadioboxToGroup="AddRadioboxToGroup"
            >
            </crGroupOfRadioboxes>
            <crStaticTable
              v-if="loaded == true"
              :UI="UI"
              @createBlockInTable="CreateBlockInStaticTable"
              @inputRightTableInputs="InputRightStaticTableInputs"
              @saveTable="SaveStaticTable"
              @deleteTableBlock="DeleteStaticTableBlock"
              @inputBlocK="InputBlocKStaticTable"
              @changeInputTypeInBlock="ChangeInputTypeInBlockStaticTable"
            ></crStaticTable>
            <crDynamicTable
              v-if="loaded == true"
              :UI="UI"
              @createBlockInTable="CreateBlockInDynamicTable"
            >
            </crDynamicTable>
            <crCard
              v-if="loaded == true"
              :UI="UI"
              @inputRightCard="InputRightCard"
            ></crCard>

            <cr2Dcomponent
              v-if="loaded == true"
              :UI="UI"
              @Input2Dcomponent="Input2Dcomponent"
              @Input2D="Input2D"
              @Input2DLayout="Input2DLayout"
              @Input2DConfig="Input2DConfig"
            ></cr2Dcomponent>
          </div>
        </div>
        <hr />
      </div>
    -->
      <div
        class="toast-container position-fixed bottom-0 end-0 p-3"
        id="toastPlacement"
      >
        <!--fade show-->
        <div
          id="liveToast"
          class="toast fade hide"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div class="toast-header bg-danger">
            <strong class="me-auto text-white">Ошибка!</strong>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="toast"
              aria-label="Закрыть"
            ></button>
          </div>
          <div class="toast-body">Ой!</div>
        </div>
      </div>
      <!--
      <button
        type="button"
        class="btn btn-primary btn-lg"
        style="padding-top: auto"
        id="liveToastBtn"
        @click="SaveTrainer()"
      >
        <i class="bi bi-floppy-fill"></i>
      </button>-->
    </div>
  </div>
</template>

<script setup>
// Компоненты правого sidebara, которые отображаются в тренажёре
import RightMenu from "./RightSideBarMenu.vue";
import StyleAndClass from "./RightSideBarStyleAndClass.vue";
import ElementList from "./RightSideBarElementList.vue";
import InputBar from "./RightSideBarInputs.vue";
import CanvasSettings from "./RightSideBarCanvas.vue";
import Tree from "./RightSideBarTree.vue";
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
    chosen_id: { type: Object },
  },
  watch: {
    UI: {
      handler(newVal, oldVal) {
        this.width = newVal.canvas.w;
        this.MarginLeftStyle();
      },
      deep: true,
    },
  },
  data(props) {
    let width = props.UI.canvas.w;
    let list = 0;
    return {
      test: "test",
      windowWidth: window.innerWidth,
      width,
      list,
    };
  },
  mounted() {
    this.list = 0;
  },
  methods: {
    delete_element(element) {
      this.$emit("delete_element", element);
    },
    //#region Функции для инпутов, аутпутов и функций
    MarginLeftStyle() {
      if (this.width > this.windowWidth) {
        return (
          "margin-right: " + String(this.windowWidth - this.width - 380) + "px"
        );
      } else {
        return "";
      }
    },
    updateList(structure_new) {
      //console.log("wesd", structure_new)
      this.$emit("updateListDelete", structure_new);
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
    SaveTrainer() {
      this.$emit("SaveTrainer");
    },
    InputFunctionWithoutButtons(functions) {
      this.$emit("InputFunctionWithoutButtons", functions);
    },
    InputCommandButton(functions, i, command) {
      this.$emit("InputCommandButton", functions, i, command);
    },
    select_component(id) {
      this.$emit("select_component", id);
    },
    unselect() {
      this.$emit("unselect");
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
          this.list++;
          console.log(this.list)
        } else {
          found_element.attributes.name = name;
        }
      } else {
        let element_ = this.UI.structure.find((element) => element.id === id);
        element_.attributes.name = name;
      }
    },
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
</style>
