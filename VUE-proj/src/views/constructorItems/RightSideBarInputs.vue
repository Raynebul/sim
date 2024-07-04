<template>
  <div
    class="tab-pane fade"
    id="inputs"
    role="tabpanel"
    aria-labelledby="inputs-tab"
  >
    <div
      class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white"
    >
      <div
        class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <span class="fs-5 d-none d-sm-inline">Функции и данные к ним</span>
      </div>
      <div
        data-bs-spy="scroll"
        class="scrollbar-rightsidebar min-vh-100"
        style="height: 36rem; overflow: auto; padding-right: 10px"
      >
        <!--height: 36rem-->
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
            :key="reload"
          >
          </rOutputs>
        </div>

        <hr />
      </div>
    </div>
  </div>
</template>

<script setup>
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
    let plotlyObjects = [];
    for (let i = 0; i < props.UI.structure.length; i++) {
      if (props.UI.structure[i].type === "2Dcomponent") {
        plotlyObjects.push(props.UI.structure[i]);
      }
    }
    return {
      plotlyObjects,
      test: "test",
    };
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
