<script setup>
import CodeCards from "./constructorItems/CodeCards.vue";
import TrainerDescription from "./constructorItems/TrainerDescription.vue";
//import ReadyUI from "./constructorItems/ReadyTrainer.vue";

import LeftSidebar from "./constructorItems/LeftSideBar.vue";
import RightSidebar from "./constructorItems/RightSideBar.vue";

import MenuForConstructing from "./constructorItems/MenuForConstructing.vue";
import MenuForSidebars from "./constructorItems/MenuForSidebars.vue";

import Toast from "./constructorItems/Toast.vue";
import axios from "axios";
//import TrainerSchema from "./constructorItems/TrainerFunctions/cTrainerSchema.js";

import cAPI from "./constructorItems/TrainerFunctions/simAPI.vue";
import cLeftSidebarsFunctions from "./constructorItems/TrainerFunctions/LeftSidebarsFunctions.vue";
import cRightSidebarsFunctions from "./constructorItems/TrainerFunctions/RightSidebarsFunctions.vue";
import cInputOutputFunctions from "./constructorItems/TrainerFunctions/InputOutputFunctions.vue";

import Canvas from "./constructorItems/Canvas.vue";
import { ref } from "vue";

import CodeSchema from "../components/json/Code-schema.json";
import MetadataSchema from "../components/json/Metadata-schema.json";
import { UI_Schema } from "../components/json/UI-schema.js";

import MetadataEdit from "../components/MetadataEdit.vue";

import Ajv from "ajv";
import { Tooltip } from "bootstrap";

const cApi = ref(null);
</script>

<template>
  <div class="row me-0">
    <div class="col pe-0">
      <MenuForConstructing
        v-if="haveAccess === true"
        @delete_saves="DeleteAllSaves"
        @delete_trainer="DeleteTrainer"
        @openTesting="OpenTesting"
        @openConstructor="OpenConstructor"
        @save="SaveTrainer"
        style="z-index: 15"
      ></MenuForConstructing>
    </div>
  </div>
  <div class="row me-0">
    <div class="col pe-0">
      <div v-if="haveAccess === true" class="tab-content" id="myTabContent">
        <!--Страница с редактирование тренажёра-->
        <div
          class="tab-pane fade show active"
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          <div class="row me-0">
            <div class="col pe-0">
              <MenuForSidebars style="z-index: 15"></MenuForSidebars>
            </div>
          </div>

          <div class="row me-0">
            <div class="col pe-0">
              <div
                class="container-fluid d-flex"
                @mousedown.self="close_menu()"
              >
                <LeftSidebar
                  :UI="UI"
                  :loaded="loaded"
                  :last_id="UI.last_id"
                  @addingFile="AddingFile"
                  @AddTextArea="
                    reload = false;
                    $refs.cLeftSidebar.AddTextArea(UI.controls);
                  "
                  @RemoveTextArea="
                    $refs.cLeftSidebar.RemoveTextArea(UI.controls)
                  "
                  @AddTextInput="$refs.cLeftSidebar.AddTextInput(UI.controls)"
                  @RemoveTextInput="
                    $refs.cLeftSidebar.RemoveTextInput(UI.controls)
                  "
                  @AddButton="$refs.cLeftSidebar.AddButton(UI.controls)"
                  @RemoveButton="$refs.cLeftSidebar.RemoveButton(UI.controls)"
                  @AddCard="$refs.cLeftSidebar.AddCard(UI.controls)"
                  @RemoveCard="$refs.cLeftSidebar.RemoveCard(UI.controls)"
                  @AddStaticTable="
                    reload = false;
                    $refs.cLeftSidebar.AddStaticTable(UI.controls);
                  "
                  @RemoveStaticTable="
                    reload = false;
                    $refs.cLeftSidebar.RemoveStaticTable(UI.controls);
                  "
                  @AddDynamicTable="
                    reload = false;
                    $refs.cLeftSidebar.AddDynamicTable(UI.controls);
                  "
                  @RemoveDynamicTable="
                    reload = false;
                    $refs.cLeftSidebar.RemoveDynamicTable(UI.controls);
                  "
                  @AddRadiobox="AddRadiobox"
                  @RemoveRadiobox="RemoveRadiobox"
                  @AddCheckbox="$refs.cLeftSidebar.AddCheckbox(UI.controls)"
                  @RemoveCheckbox="
                    $refs.cLeftSidebar.RemoveCheckbox(UI.controls)
                  "
                  @Add2Dcomponent="
                    reload = false;
                    $refs.cLeftSidebar.Add2Dcomponent(UI.controls);
                  "
                  @Remove2Dcomponent="
                    reload = false;
                    $refs.cLeftSidebar.Remove2Dcomponent(UI.controls);
                  "
                  @AddGroupOfRadioboxes="
                    $refs.cLeftSidebar.AddGroupOfRadioboxes(UI.controls)
                  "
                  @RemoveGroupOfRadioboxes="
                    $refs.cLeftSidebar.RemoveGroupOfRadioboxest(UI.controls)
                  "
                  @ChangePosition="ChangePosition"
                  @InputSettings="InputSettings"
                  @InputSystems="InputSystems"
                  @DeleteTrainer="DeleteTrainer"
                  @DeleteAllSaves="DeleteAllSaves"
                  @updateList="updateList"
                  @updateListTwoRows="updateListTwoRows"
                  @updateListThreeRows="updateListThreeRows"
                  style="z-index: 15"
                >
                </LeftSidebar>
                <div class="p-2 d-flex mw-100" @mousedown.self="close_menu()">
                  <div
                    class="siteArea"
                    @mousedown.self="close_menu()"
                    style="background-color: rgb(228, 235, 235)"
                  >
                    <Canvas
                      @delete_element="delete_element"
                      @updateListPlace="updateListPlace"
                      @inputAttributes="inputAttributes"
                      @readInputsFromNextRound="ReadInputsFromNextRound"
                      @runCode="LaunchAPI"
                      @close_menu="close_menu"
                      :canvas="UI.canvas"
                      :reloads="reloads"
                      :addingFile="addingFile"
                      :selected_id="selected_id"
                      :key="reload"
                      :reloadPlotly="reloadPlotly"
                      :round="round"
                      :roundFlag="roundFlag"
                      :UI="UI.structure"
                      :settings="UI.settings"
                      :reload="reload"
                      :status="`develop`"
                      :chosen_id_="chosen_id_"
                      @choose_element="choose_element"
                    ></Canvas>
                  </div>
                </div>
                <RightSidebar
                  :UI="UI"
                  :Code="Code"
                  :loaded="loaded"
                  :reload="reload"
                  :chosen_id="chosen_id"
                  @delete_element="delete_element"
                  @updateListDelete="updateListDelete"
                  @InputInputs="
                    (inputs) => $refs.cFunctions.InputInputs(UI.inputs, inputs)
                  "
                  @AddNewInput="$refs.cFunctions.AddNewInput(UI.inputs)"
                  @AddNewUIinput="$refs.cFunctions.AddNewUIinput(UI.UIinputs)"
                  @InputUIinputs="
                    (inputs) =>
                      $refs.cFunctions.InputUIinputs(UI.UIinputs, inputs)
                  "
                  @RemoveInput="$refs.cFunctions.RemoveInput(UI.inputs)"
                  @RemoveUIinput="$refs.cFunctions.RemoveUIinput(UI.UIinputs)"
                  @AddNewRoundInput="
                    $refs.cFunctions.AddNewRoundInput(UI.settings.rounds)
                  "
                  @RemoveRoundInput="
                    $refs.cFunctions.RemoveRoundInput(UI.settings.rounds)
                  "
                  @InputRoundInputs="InputRoundInputs"
                  @InputFunctions="
                    (functions, control) => {
                      $refs.cFunctions.InputFunctions(
                        Code.functions,
                        UI.controls.buttons,
                        functions,
                        control
                      );
                    }
                  "
                  @InputFunctionWithoutButtons="
                    (functions) =>
                      $refs.cFunctions.InputFunctionWithoutButtons(
                        Code.functions,
                        functions
                      )
                  "
                  @InputCommandButton="
                    (functions, i, command) =>
                      $refs.cFunctions.InputCommandButton(
                        Code.functions,
                        functions,
                        i,
                        command,
                        UI.controls.buttons
                      )
                  "
                  @InputClearInputs="InputClearInputs"
                  @AddNewFunction="
                    $refs.cFunctions.AddNewFunction(Code.functions)
                  "
                  @RemoveNewFunction="
                    $refs.cFunctions.RemoveNewFunction(Code.functions)
                  "
                  @AddCommandToFunction="
                    (i) =>
                      $refs.cFunctions.AddCommandToFunction(Code.functions, i)
                  "
                  @RemoveCommandToFunction="
                    (i) =>
                      $refs.cFunctions.RemoveCommandToFunction(Code.functions)
                  "
                  @InputOutputs="
                    (outputs) =>
                      $refs.cFunctions.InputOutputs(UI.outputs, outputs)
                  "
                  @AddNewOutput="$refs.cFunctions.AddNewOutput(UI.outputs)"
                  @RemoveOutput="$refs.cFunctions.RemoveOutput(UI.outputs)"
                  @InputRightTextAreas="
                    (input) =>
                      $refs.cRightSidebar.InputRightTextAreas(
                        UI.controls,
                        input
                      )
                  "
                  @InputRightTextInput="
                    (input) =>
                      $refs.cRightSidebar.InputRightTextInput(
                        UI.controls,
                        input
                      )
                  "
                  @InputRightCheckbox="
                    (input) =>
                      $refs.cRightSidebar.InputRightCheckbox(UI.controls, input)
                  "
                  @InputRightRadiobox="
                    (input) =>
                      $refs.cRightSidebar.InputRightRadiobox(UI.controls, input)
                  "
                  @InputRightGroupOfRadioboxes="
                    (input) =>
                      $refs.cRightSidebar.RightGroupOfRadioboxes(
                        UI.controls,
                        input
                      )
                  "
                  @AddRadioboxToGroup="
                    (i) =>
                      $refs.cRightSidebar.AddRadioboxToGroup(UI.controls, input)
                  "
                  @CreateBlockInStaticTable="CreateBlockInStaticTable"
                  @InputRightStaticTableInputs="
                    (input) =>
                      $refs.cRightSidebar.InputRightStaticTableInputs(
                        UI.controls,
                        input
                      )
                  "
                  @SaveStaticTable="SaveStaticTable"
                  @DeleteStaticTableBlock="DeleteStaticTableBlock"
                  @InputBlocKStaticTable="InputBlocKStaticTable"
                  @ChangeInputTypeInBlockStaticTable="
                    ChangeInputTypeInBlockStaticTable
                  "
                  @CreateBlockInDynamicTable="CreateBlockInDynamicTable"
                  @InputRightCard="
                    (input) =>
                      $refs.cRightSidebar.InputRightCard(UI.controls, input)
                  "
                  @SaveTrainer="SaveTrainer"
                  @Input2Dcomponent="Input2Dcomponent"
                  @Input2D="Input2D"
                  @Input2DLayout="Input2DLayout"
                  @Input2DConfig="Input2DConfig"
                  @select_component="select_component"
                  @unselect="unselect"
                ></RightSidebar>
              </div>
            </div>
          </div>

          <!--

          <MenuForSidebars style="z-index: 15"></MenuForSidebars>
          <div class="container-fluid d-flex">
            <LeftSidebar
              :UI="UI"
              :loaded="loaded"
              :last_id="UI.last_id"
              @AddTextArea="
                reload = false;
                $refs.cLeftSidebar.AddTextArea(UI.controls);
              "
              @RemoveTextArea="$refs.cLeftSidebar.RemoveTextArea(UI.controls)"
              @AddTextInput="$refs.cLeftSidebar.AddTextInput(UI.controls)"
              @RemoveTextInput="$refs.cLeftSidebar.RemoveTextInput(UI.controls)"
              @AddButton="$refs.cLeftSidebar.AddButton(UI.controls)"
              @RemoveButton="$refs.cLeftSidebar.RemoveButton(UI.controls)"
              @AddCard="$refs.cLeftSidebar.AddCard(UI.controls)"
              @RemoveCard="$refs.cLeftSidebar.RemoveCard(UI.controls)"
              @AddStaticTable="
                reload = false;
                $refs.cLeftSidebar.AddStaticTable(UI.controls);
              "
              @RemoveStaticTable="
                reload = false;
                $refs.cLeftSidebar.RemoveStaticTable(UI.controls);
              "
              @AddDynamicTable="
                reload = false;
                $refs.cLeftSidebar.AddDynamicTable(UI.controls);
              "
              @RemoveDynamicTable="
                reload = false;
                $refs.cLeftSidebar.RemoveDynamicTable(UI.controls);
              "
              @AddRadiobox="AddRadiobox"
              @RemoveRadiobox="RemoveRadiobox"
              @AddCheckbox="$refs.cLeftSidebar.AddCheckbox(UI.controls)"
              @RemoveCheckbox="$refs.cLeftSidebar.RemoveCheckbox(UI.controls)"
              @Add2Dcomponent="
                reload = false;
                $refs.cLeftSidebar.Add2Dcomponent(UI.controls);
              "
              @Remove2Dcomponent="
                reload = false;
                $refs.cLeftSidebar.Remove2Dcomponent(UI.controls);
              "
              @AddGroupOfRadioboxes="
                $refs.cLeftSidebar.AddGroupOfRadioboxes(UI.controls)
              "
              @RemoveGroupOfRadioboxes="
                $refs.cLeftSidebar.RemoveGroupOfRadioboxest(UI.controls)
              "
              @ChangePosition="ChangePosition"
              @InputSettings="InputSettings"
              @InputSystems="InputSystems"
              @DeleteTrainer="DeleteTrainer"
              @DeleteAllSaves="DeleteAllSaves"
              @updateList="updateList"
              @updateListTwoRows="updateListTwoRows"
              @updateListThreeRows="updateListThreeRows"
              style="z-index: 15"
            >
            </LeftSidebar>
            <div class="p-2 d-flex mw-100">
              <div class="siteArea">
                <Canvas
                  @delete_element="delete_element"
                  @updateListPlace="updateListPlace"
                  @inputAttributes="inputAttributes"
                  @readInputsFromNextRound="ReadInputsFromNextRound"
                  @runCode="LaunchAPI"
                  @close_menu="close_menu"
                  :canvas="UI.canvas"
                  :selected_id="selected_id"
                  :key="reload"
                  :round="round"
                  :roundFlag="roundFlag"
                  :UI="UI.structure"
                  :settings="UI.settings"
                  :reload="reload"
                  :status="`develop`"
                  :chosen_id_="chosen_id_"
                  @choose_element="choose_element"
                ></Canvas>
              </div>
            </div>
            <RightSidebar
              style="z-index: 15"
              :UI="UI"
              :Code="Code"
              :loaded="loaded"
              :reload="reload"
              :chosen_id="chosen_id"
              @delete_element="delete_element"
              @updateListDelete="updateListDelete"
              @InputInputs="
                (inputs) => $refs.cFunctions.InputInputs(UI.inputs, inputs)
              "
              @AddNewInput="$refs.cFunctions.AddNewInput(UI.inputs)"
              @AddNewUIinput="$refs.cFunctions.AddNewUIinput(UI.UIinputs)"
              @InputUIinputs="
                (inputs) => $refs.cFunctions.InputUIinputs(UI.UIinputs, inputs)
              "
              @RemoveInput="$refs.cFunctions.RemoveInput(UI.inputs)"
              @RemoveUIinput="$refs.cFunctions.RemoveUIinput(UI.UIinputs)"
              @AddNewRoundInput="
                $refs.cFunctions.AddNewRoundInput(UI.settings.rounds)
              "
              @RemoveRoundInput="
                $refs.cFunctions.RemoveRoundInput(UI.settings.rounds)
              "
              @InputRoundInputs="InputRoundInputs"
              @InputFunctions="
                (functions, control) => {
                  $refs.cFunctions.InputFunctions(
                    Code.functions,
                    UI.controls.buttons,
                    functions,
                    control
                  );
                }
              "
              @InputFunctionWithoutButtons="
                (functions) =>
                  $refs.cFunctions.InputFunctionWithoutButtons(
                    Code.functions,
                    functions
                  )
              "
              @InputCommandButton="
                (functions, i, command) =>
                  $refs.cFunctions.InputCommandButton(
                    Code.functions,
                    functions,
                    i,
                    command,
                    UI.controls.buttons
                  )
              "
              @InputClearInputs="InputClearInputs"
              @AddNewFunction="$refs.cFunctions.AddNewFunction(Code.functions)"
              @RemoveNewFunction="
                $refs.cFunctions.RemoveNewFunction(Code.functions)
              "
              @AddCommandToFunction="
                (i) => $refs.cFunctions.AddCommandToFunction(Code.functions, i)
              "
              @RemoveCommandToFunction="
                (i) => $refs.cFunctions.RemoveCommandToFunction(Code.functions)
              "
              @InputOutputs="
                (outputs) => $refs.cFunctions.InputOutputs(UI.outputs, outputs)
              "
              @AddNewOutput="$refs.cFunctions.AddNewOutput(UI.outputs)"
              @RemoveOutput="$refs.cFunctions.RemoveOutput(UI.outputs)"
              @InputRightTextAreas="
                (input) =>
                  $refs.cRightSidebar.InputRightTextAreas(UI.controls, input)
              "
              @InputRightTextInput="
                (input) =>
                  $refs.cRightSidebar.InputRightTextInput(UI.controls, input)
              "
              @InputRightCheckbox="
                (input) =>
                  $refs.cRightSidebar.InputRightCheckbox(UI.controls, input)
              "
              @InputRightRadiobox="
                (input) =>
                  $refs.cRightSidebar.InputRightRadiobox(UI.controls, input)
              "
              @InputRightGroupOfRadioboxes="
                (input) =>
                  $refs.cRightSidebar.RightGroupOfRadioboxes(UI.controls, input)
              "
              @AddRadioboxToGroup="
                (i) =>
                  $refs.cRightSidebar.AddRadioboxToGroup(UI.controls, input)
              "
              @CreateBlockInStaticTable="CreateBlockInStaticTable"
              @InputRightStaticTableInputs="
                (input) =>
                  $refs.cRightSidebar.InputRightStaticTableInputs(
                    UI.controls,
                    input
                  )
              "
              @SaveStaticTable="SaveStaticTable"
              @DeleteStaticTableBlock="DeleteStaticTableBlock"
              @InputBlocKStaticTable="InputBlocKStaticTable"
              @ChangeInputTypeInBlockStaticTable="
                ChangeInputTypeInBlockStaticTable
              "
              @CreateBlockInDynamicTable="CreateBlockInDynamicTable"
              @InputRightCard="
                (input) =>
                  $refs.cRightSidebar.InputRightCard(UI.controls, input)
              "
              @SaveTrainer="SaveTrainer"
              @Input2Dcomponent="Input2Dcomponent"
              @Input2D="Input2D"
              @Input2DLayout="Input2DLayout"
              @Input2DConfig="Input2DConfig"
              @select_component="select_component"
              @unselect="unselect"
            ></RightSidebar>
          </div>-->
        </div>
        <!--Страница с готовым тренажёром-->

        <div
          class="tab-pane fade"
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          <div class="mw-100 min-vh-100">
            <div class="siteArea">
              <a
                :href="`/run/` + $route.params.id"
                class="btn btn-primary"
                type="button"
                style="height: 40px"
              >
                Страница с готовым тренажёром
              </a>
              <Canvas
                @updateListPlace="updateListPlace"
                @inputAttributes="inputAttributes"
                @readInputsFromNextRound="ReadInputsFromNextRound"
                @runCode="LaunchAPI"
                :key="reload_preview"
                :reloadPlotly="reloadPlotly"
                :canvas="UI.canvas"
                :reloads="reloads"
                :round="round"
                :roundFlag="roundFlag"
                :UI="UI.structure"
                :settings="UI.settings"
                :reload="reload"
                :status="`preview`"
                :selected_id="selected_id"
              ></Canvas>
            </div>
          </div>
        </div>
        <!--Часть с кодом-->
        <div
          class="tab-pane fade"
          id="contact"
          role="tabpanel"
          aria-labelledby="contact-tab"
        >
          <CodeCards
            v-if="loaded == true"
            style="background-color: #141515"
            :UI="UI"
            :Code="Code"
            @inputCode="InputCode"
          >
          </CodeCards>
        </div>
        <!--Часть с описанием тренажёра-->
        <div
          class="tab-pane fade"
          id="description"
          role="tabpanel"
          aria-labelledby="description-tab"
        >
          <TrainerDescription
            v-if="loaded == true"
            :Metadata="Metadata"
            @inputTrainerInfo="InputTrainerInfo"
            @saveChanges="SaveTrainerChanges"
          ></TrainerDescription>
        </div>
        <Toast
          :notificationText="toastString"
          :color="`green`"
          :hideToast="hideToast"
          v-if="error === false"
          @hideToast="HideToast()"
        ></Toast>
        <Toast
          :notificationText="toastString"
          :color="`red`"
          :hideToast="hideToast"
          v-if="error === true"
          @hideToast="HideToast()"
        ></Toast>
      </div>
    </div>
  </div>

  <cAPI
    v-if="loaded == true"
    ref="cApi"
    :launch_api="triggerAPI"
    :typeOf="`/edit`"
    :UI="UI"
    :Code="Code"
    :base_url="base_url"
    :loaded="loaded"
    :reload="reload"
    :inputs="inputs"
    :round="round"
    :roundFlag="roundFlag"
    :rightAnswer="rightAnswer"
    :paramsId="$route.params.id"
    @receiveAPI="ReceiveAPI"
    @receiveTest="ReceiveTest"
  ></cAPI>
  <cLeftSidebarsFunctions
    v-if="loaded == true"
    ref="cLeftSidebar"
    @receiveControls="receiveControls"
  >
  </cLeftSidebarsFunctions>
  <cRightSidebarsFunctions
    v-if="loaded == true"
    ref="cRightSidebar"
    @receiveControls="receiveControls"
  >
  </cRightSidebarsFunctions>
  <cInputOutputFunctions
    ref="cFunctions"
    @receiveInputs="receiveInputs"
    @receiveUIinputs="receiveUIinputs"
    @receiveOutputs="receiveOutputs"
    @receiveFunctionsButtons="receiveFunctionsButtons"
    @receiveFunctions="receiveFunctions"
    @receiveRounds="receiveRounds"
  ></cInputOutputFunctions>
  <MetadataEdit
    :Metadata="Metadata"
    :user="user"
    :id="metadata_id"
    @saveMetadata="SaveMetadata"
  ></MetadataEdit>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      UI: {
        id: "",
        name: "",
        structure: [],
        canvas: {
          w: 1000,
          h: 1000,
        },
        last_id: 1,
        UIinputs: [],
        inputs: [],
        outputs: [],
        settings: {
          buttonReverse: false,
          checkboxInline: false,
          radioboxInline: false,
          roundSystem: false,
          rounds: [],
        },
      },
      Code: {
        functions: [],
      },
      Metadata: {
        id: "",
        name: "",
        author: "",
        description: "",
        created: "",
        status: "",
      },
      TestUI: [
        {
          id: 1,
          type: "row",
          attributes: {},
          structure: [
            { id: 4, type: "column", attributes: {}, structure: [], level: 2 },
            { id: 5, type: "column", attributes: {}, structure: [], level: 2 },
            { id: 6, type: "column", attributes: {}, structure: [], level: 2 },
          ],
          level: 1,
        },
        {
          id: 2,
          type: "button",
          attributes: { text: "Hello-world!", class: "btn btn-primary" },
          level: 1,
        },
        {
          id: 3,
          type: "button",
          aattributes: { text: "Hello-new-world!", class: "btn btn-success" },
          level: 1,
        },
      ],
      reloads: [],
      status,
      metadata_id: 1,
      selected_id: 0,
      chosen_id: 0,
      chosen_id_: 0,
      toastString: "Тренажер сохранён!",
      TrashCan: {},
      triggerAPI: 0,
      error: false,
      errorString: [],
      round: 0,
      roundFlag: 0, // 0 - нет раунда;
      rightAnswer: false,
      loaded: false,
      reload: 0,
      reload_preview: 0,
      run_code: false,
      isConstructing: true,
      reloadPlotly: 0,
      timerIds: [],
      inputs: [],
      hideToast: true,
      editPuts: false,
      x_start: 1,
      y_start: 1,
      x_end: 1,
      y_end: 1,
      columns: 0,
      rows: 0,
      isSaved: false,
      haveAccess: false,
      fields: ["first_name", "last_name", "age"],
      items1: [
        {
          isActive: true,
          age: 40,
          first_name: "Dickerson",
          last_name: "Macdonald",
        },
        { isActive: false, age: 21, first_name: "Larsen", last_name: "Shaw" },
        { isActive: false, age: 89, first_name: "Geneva", last_name: "Wilson" },
        { isActive: true, age: 38, first_name: "Jami", last_name: "Carney" },
      ],
      switchObject1: "",
      switchObject2: "",
      user: {},
      addingFile: false,
      tables: [],
      validJSON: true,
      interval: "",
      constructorError: false,
    };
  },
  components: {
    cAPI,
    cLeftSidebarsFunctions,
    cRightSidebarsFunctions,
    cInputOutputFunctions,
  },
  async created() {
    if (import.meta.env.VITE_TOKEN_MODE === `token`) {
      let jwt = this.getCookie("jwt");
      const response = await axios.get(this.base_backend_url + "/user", {
        headers: {
          Authorization: jwt,
          "Access-Control-Allow-Origin": this.access_origin,
          "Access-Control-Allow-Credentials": true,
        },
        withCredentials: true,
      });
      this.user = response.data.user;
    }
  },
  mounted() {
    new Tooltip(document.body, {
      selector: "[data-bs-toggle='tooltip']",
    });
    /* this.base_url + /edit/ + this.$route.params.id */
    axios({
      method: "get",
      url: this.base_url + `/edit/` + this.$route.params.id,
      headers: {
        "Access-Control-Allow-Origin": this.access_origin,
        "Access-Control-Allow-Credentials": true,
      },
      validateStatus: (status) => {
        return true; // I'm always returning true, you may want to do it depending on the status received
      },
    })
      .then((response) => {
        if (
          response.data.dataUI["functions"] != undefined ||
          response.data.dataUI != ""
        ) {
          this.UI = response.data.dataUI;
          this.delete_files_components();
          for (let i = 0; i < this.UI.structure.length; i++) {
            this.reloads.push(0);
          }
          this.Code = response.data.code;
          this.get_Metadata();
          //this.UI.structure[0].attributes["functionNumber"] = 0
          this.ValidationJSON();
        } else {
          this.get_Metadata();
          this.UI.name = response.data.name;
        }
        this.UI.id = this.$route.params.id;
        this.inputs = this.UI.inputs;
        if (this.UI.settings.roundSystem === true) {
          this.ReadInputsFromNextRound(this.round);
        }
        this.loaded = true;
      })
      .catch(function (error) {
        this.haveAccess = true;
        console.log(error);
      });

    //var inputs;
  },

  /*
  created() {
    this.interval = setInterval(() => {this.reload++, this.reloadPlotly++}, 2000);
  }, */

  methods: {
    AddingFile() {
      this.addingFile = true;
    },
    delete_element(element) {
      //this.$emit("delete_element", element)
      let structure = this.UI.structure;
      let d = this.DeletingElement(structure, element);

      if (element.type === "file") {
        this.chosen_id_ = 0;
        this.chosen_id = 0;
        this.reload++;
      }
    },
    delete_files_components() {
      for (let i = 0; i < this.UI.structure.length; i++) {
        //console.log(i);
        if (this.UI.structure[i].type === `file`) {
          axios({
            method: "put",
            url: this.base_url + `/edit/` + this.$route.params.id + "/file",
            data: {
              attributes: this.UI.structure[i].attributes,
            },
            headers: {
              "Access-Control-Allow-Origin": this.access_origin,
              "Access-Control-Allow-Credentials": true,
            },
            validateStatus: (status) => {
              return true; // I'm always returning true, you may want to do it depending on the status received
            },
          })
            .then((response) => {
              if (response.data.error === true) {
                this.UI.structure.splice(i, 1);
              }
            })
            .catch(function (error) {
              //this.haveAccess = true;
              //console.log(error);
            });
        }
      }
    },
    DeletingElement(structure, element) {
      for (let i = 0; i < structure.length; i++) {
        if (structure[i].id === element.id) {
          structure.splice(i, 1);
          return true;
        }
        if (
          structure[i].structure != [] &&
          structure[i].structure != undefined
        ) {
          let structure_new = structure[i].structure;
          let d = this.DeletingElement(structure_new, element);
          if (d === true) return true;
        }
      }
      return false;
    },
    select_component(id) {
      this.selected_id = id;
    },
    unselect() {
      this.selected_id = 0;
    },
    choose_element(element) {
      this.chosen_id = element;
      this.chosen_id_ = element.id;
    },
    close_menu() {
      //console.log("MENU IS CLOSED!!!");
      if (this.chosen_id !== 0) {
        this.chosen_id_ = 0;
        this.chosen_id = 0;
        //this.reload++;
      }
      //this.reload++;
    },
    addFunction() {
      this.$refs.cFunctions.AddNewFunction(this.Code.functions);
    },
    getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },

    async get_Metadata() {
      let jwt = this.getCookie("jwt");
      if (import.meta.env.VITE_TOKEN_MODE === `token`) {
        const response = await axios.get(this.base_backend_url + "/user", {
          headers: {
            Authorization: jwt,
            "Access-Control-Allow-Origin": this.access_origin,
            "Access-Control-Allow-Credentials": true,
          },
        });
        this.user = response.data.user;
        axios({
          method: "get",
          url: this.base_backend_url + `/metadata/` + this.$route.params.id,
          headers: {
            "Access-Control-Allow-Origin": this.access_origin,
            "Access-Control-Allow-Credentials": true,
          },
          validateStatus: (status) => {
            return true; // I'm always returning true, you may want to do it depending on the status received
          },
        }).then((response) => {
          this.Metadata = JSON.parse(response.data.metadata);
          this.metadata_id = response.data.new_id;
          this.haveAccess = true;

          this.haveAccess = this.user.username === this.Metadata.author;
          if (this.haveAccess === false) {
            this.$router.push("/pageNotFound");
          }
        });
      }
      if (import.meta.env.VITE_TOKEN_MODE === `no-token`) {
        this.haveAccess = true;
      }
      /* this.base_backend_url + `/metadata/` + this.$route.params.id */
    },
    SaveMetadata(metadata, name) {
      for (let key in metadata) {
        this.Metadata[key] = metadata[key];
      }
      this.toastString = "Метаданные сохранены!";
      this.error = false;
      this.isSaved = true;
      this.hideToast = false;
      //this.materials[index-1].name = name;
    },
    inputAttributes(attributes, element_id) {
      console.log(attributes, element_id);
    },
    updateListDelete(newStructure) {
      this.reload++;
    },
    updateList(newElement, new_id) {
      this.UI.structure.push(newElement);
      this.reloads.push(0);
      this.addingFile=false;
      this.UI.last_id = new_id + 1;
      this.reload++;
    },
    updateListTwoRows(newElement1, newElement2, new_id) {
      this.UI.structure.push(newElement1);
      this.UI.structure.push(newElement2);
      this.UI.last_id = new_id + 1;
      this.reload++;
    },
    updateListThreeRows(newElement1, newElement2, newElement3, new_id) {
      this.UI.structure.push(newElement1);
      this.UI.structure.push(newElement2);
      this.UI.structure.push(newElement3);
      this.UI.last_id = new_id + 1;
      this.reload++;
    },
    updateListPlace() {
      this.reload++;
    },
    ValidationJSON() {
      const ajv = new Ajv();
      const validateMetadata = ajv.compile(MetadataSchema);
      const validMetadata = validateMetadata(this.Metadata);
      if (!validMetadata) {
        this.validJSON = false;
        this.errorString.push(validateMetadata.errors);
      }

      const validateUI = ajv.compile(UI_Schema);
      const validUI = validateUI(this.UI);
      if (!validUI) {
        this.validJSON = false;
        this.errorString.push(validateUI.errors);
      }

      const validateCode = ajv.compile(CodeSchema);
      const validCode = validateCode(this.Code);
      if (!validCode) {
        this.validJSON = false;
        this.errorString.push(validateCode.errors);
      }

      if (this.validJSON === false) {
        this.error = true;
      }
      console.log(this.errorString);
    },
    OpenRightSidebar() {},
    OpenLeftSidebar() {},

    RenderTextareas() {},
    RenderChecks() {},
    RenderRadios() {},

    LaunchAPI(functionNumber, buttonNumber) {
      //this.run_code=false;
      this.run_code = true;
      let thisIs = this;
      this.$refs.cApi.Simbuilder(functionNumber, buttonNumber);
    },
    OpenConstructor() {
      console.log(true)
      this.isConstructing = true;
    },
    OpenTesting() {
      console.log(false)
      this.isConstructing = false;
    },

    ReceiveTest(thisIs) {
      console.log(thisIs);
    },
    ReceiveAPI(thisIs1, status) {
      const delayForRender = 500;
      console.log(thisIs1);
      this.loaded = false;
      this.status = status;
      if (this.status === "stop_run_code_period") {
        this.run_code = true;
      }
      this.UI = thisIs1.UI;
      this.Code = thisIs1.Code;
      this.inputs = thisIs1.inputs;
      this.round = thisIs1.round;
      this.roundFlag = thisIs1.roundFlag;
      this.rightAnswer = thisIs1.rightAnswer;
      //this.reload++;
      //this.reloadPlotly++;
      //this.reload_preview++;
      //this.reload_preview++
      this.round = thisIs1.round;
      this.roundFlag = thisIs1.roundFlag;
      this.rightAnswer = thisIs1.rightAnswer;
      this.loaded = true;
      //this.run_code=false;
      /*
      setTimeout(() => {
        this.reload++, this.reloadPlotly++;
        this.reload_preview++;
      }, delayForRender);  */
      setTimeout(() => {
        this.round = thisIs1.round;
        this.roundFlag = thisIs1.roundFlag;
        this.rightAnswer = thisIs1.rightAnswer;
      }, delayForRender);
      /*
      if (thisIs1 != undefined) {
        this.UI = thisIs1.UI;
        this.Code = thisIs1.Code;
        this.inputs = thisIs1.inputs;
        this.round = thisIs1.round;
        this.roundFlag = thisIs1.roundFlag;
        this.rightAnswer = thisIs1.rightAnswer;
        this.reload++;
        this.reloadPlotly++;
        this.reload_preview++;
        this.loaded = true;
        setTimeout(() => {
          this.round = thisIs1.round;
          this.roundFlag = thisIs1.roundFlag;
          this.rightAnswer = thisIs1.rightAnswer;
        }, delayForRender);
      } */
      /*
      setTimeout(() => {
        this.reload++, this.reloadPlotly++;
        this.reload_preview++;
      }, delayForRender); */
    },
    ReloadAll() {},
    //#region receive
    // используется в RightSidebarsFunctions.js и LeftSidebarsFunctions.js
    ReceiveControls(controls) {
      this.UI.controls = controls;
      this.reload++;
      this.reloadPlotly++;
      this.loaded = true;
    },
    // используется в InputOutputFunctions.js
    ReceiveInputs(inputs) {
      this.UI.inputs = inputs;
      this.inputs = this.UI.inputs;
    },
    ReceiveUIinputs(inputs) {
      this.UI.UIinputs = inputs;
    },
    ReceiveOutputs(outputs) {
      this.UI.outputs = outputs;
    },
    ReceiveFunctionsButtons(functions, buttons) {
      this.Code.functions = functions;
      this.UI.controls.buttons = buttons;
    },
    ReceiveFunctions(functions) {
      this.Code.functions = functions;
      this.loaded = true;
    },
    ReceiveRounds(rounds) {
      this.UI.settings.rounds = rounds;
    },
    //#endregion

    //#region Функции для inputs, outputs, функций, команд

    InputClearInputs(clearInputs) {
      if (clearInputs != "") {
        this.UI.controls.buttons[clearInputs - 1].functionNumber = "clear";
      }
    },
    //#endregion

    InputTextArea(newValue) {
      this.UI.controls.textareas = newValue;
    },
    InputTextInput(newValue) {
      this.UI.controls.textinputs = newValue;
    },
    InputCheckbox(i, value) {
      this.UI.controls.checkboxes[i].value = value;
    },

    InputGroupOfRadioboxes(value, i) {
      this.UI.controls.groupsOfRadioboxes[i].value = value;
    },
    AddRadiobox() {
      this.UI.controls.radioboxes.push({
        name: this.UI.controls.radioboxes.length,
        value: false,
        type: "число",
        x: 0,
        y: 0,
      });
      //  this.UI.checkboxes.push({ name: this.checkboxCount, x: 0, y: 0 });
    },
    RemoveRadiobox() {
      this.UI.controls.radioboxes.splice(-1);
    },
    InputRadiobox() {},

    //#region Функции с 'right' из правого sidebara

    Input2Dcomponent(object, index, i) {
      this.loaded = false;
      this.UI.controls.plotlyObjects2D[i].data[index] = object;
      this.reload++;
      this.reloadPlotly++;
      this.loaded = true;
    },
    Input2DLayout(layout, i) {
      this.loaded = false;
      this.UI.controls.plotlyObjects2D[i].layout = layout;
      this.reload++;
      this.reloadPlotly++;
      this.loaded = true;
    },
    Input2DConfig(config, i) {
      this.loaded = false;
      this.UI.controls.plotlyObjects2D[i]["config"] = config;
      this.reload++;
      this.reloadPlotly++;
      this.loaded = true;
    },
    Input2D(object, i) {
      this.loaded = false;
      this.UI.controls.plotlyObjects2D[i].data = object;
      this.reload++;
      this.reloadPlotly++;
      this.loaded = true;
    },
    //#endregion

    //#region Функции для статической таблицы
    CreateBlockInStaticTable(
      tableIndex,
      x_start,
      y_start,
      x_end,
      y_end,
      table_type
    ) {
      let table = this.UI.controls.staticTables[tableIndex];
      let block = {
        name: String(tableIndex),
        x_start: x_start,
        y_start: y_start,
        x_end: x_end,
        y_end: y_end,
        value: [],
        field: [],
        inputType: [],
        type: table_type,
      };
      if (block.type === "json_ready") {
        for (let j = x_start - 1; j <= x_end - 1; j++) {
          //if (y_start <= j <= y_end) {
          block.field.push(table.inputs[(y_start - 1) * table.columns + j]);
          //}
        }
        for (let i = y_start; i <= y_end - 1; i++) {
          let inputRow = {};
          for (let j = x_start - 1; j <= x_end - 1; j++) {
            //block.inputType.push("текст");
            // if (x_start <= i <= x_end && y_start <= j <= y_end) {
            inputRow[block.field[j - x_start + 1]] =
              table.inputs[i * table.columns + j];
            /*
            block.inputs[(i - y_start) * table.rows + (j + 1 - x_start)] =
              table.inputs[i * table.rows + j]; */
            //  }
          }
          block.value.push(inputRow);
        }

        for (let i = y_start; i <= y_end - 1; i++) {
          let inputStringIsText = [];
          //let Tfalse = true;
          for (let j = x_start - 1; j <= x_end - 1; j++) {
            inputStringIsText.push("текст");
          }
          block.inputType.push(inputStringIsText);
        }
        this.UI.controls.staticTables[tableIndex].blocks.push(block);
      }
      if (block.type === "массив_текста" || block.type === "массив_чисел") {
        let Matrix = [];
        for (let i = y_start - 1; i <= y_end - 1; i++) {
          let inputRow = [];
          for (let j = x_start - 1; j <= x_end - 1; j++) {
            if (block.type === "массив_текста") {
              inputRow.push(table.inputs[i * table.columns + j]);
            }
            if (block.type === "массив_чисел") {
              inputRow.push(parseInt(table.inputs[i * table.columns + j]));
            }
          }
          Matrix.push(inputRow);
        }
        block.value = Matrix;
        this.UI.controls.staticTables[tableIndex].blocks.push(block);
      }
      /*
      if(x_start==x_end)
      {
        block.field.push(table.inputs[(x_start - 1) * table.rows + x_start - 1]);
      } */
      //console.log(block);
      //console.log(this.UI.controls.staticTables[tableIndex].blocks);
    },
    PutInputInStaticTableBlock(j1, j2) {
      console.log("Координаты -", "x:", j2, "y:", j1);
      /*
      for (
        let i = 0;
        i < this.UI.controls.staticTables[tableIndex].blocks.length;
        i++
      ) {
        if (
          this.UI.controls.staticTables[tableIndex].blocks[i].x_start <= j2 &&
          j2 <= this.UI.controls.staticTables[tableIndex].blocks[i].x_end &&
          this.UI.controls.staticTables[tableIndex].blocks[i].y_start <= j1 &&
          j1 <= this.UI.controls.staticTables[tableIndex].blocks[i].y_end
        ) {
          let yStart =
            this.UI.controls.staticTables[tableIndex].blocks[i].y_start;
          let yEnd = this.UI.controls.staticTables[tableIndex].blocks[i].y_end;
          let xStart =
            this.UI.controls.staticTables[tableIndex].blocks[i].x_start;
          let xEnd = this.UI.controls.staticTables[tableIndex].blocks[i].x_end;
          let field = this.UI.controls.staticTables[tableIndex].blocks[i].field;
          let tableInput =
            this.UI.controls.staticTables[tableIndex].inputs[
              (j1 - 1) * this.UI.controls.staticTables[tableIndex].columns +
                (j2 - 1)
            ];
          if (
            this.UI.controls.staticTables[tableIndex].blocks[i].type ===
            "json_ready"
          ) {
            console.log("Текущее -", tableInput);
            console.log(j1, yStart);
            console.log(
              this.UI.controls.staticTables[tableIndex].blocks[i].value[
                j1 - 1 - yStart
              ][field[j2 - xStart]]
            );
            this.UI.controls.staticTables[tableIndex].blocks[i].value[
              j1 - 1 - yStart
            ][field[j2 - xStart]] = tableInput;
            console.log(
              "Другое - ",
              this.UI.controls.staticTables[tableIndex].blocks[i].value[
                j1 - 1 - yStart
              ][field[j2 - xStart]]
            );
            console.log(
              "Все блоки -",
              this.UI.controls.staticTables[tableIndex].blocks
            );
          }
          if (
            this.UI.controls.staticTables[tableIndex].blocks[i].type ==
            "массив_текста"
          ) {
            console.log(tableInput);
            this.UI.controls.staticTables[tableIndex].blocks[i].value[
              j1 - yStart
            ][j2 - xStart] = tableInput;
            console.log(
              "новый блок -",
              this.UI.controls.staticTables[tableIndex].blocks[i]
            );
          }
          if (
            this.UI.controls.staticTables[tableIndex].blocks[i].type ==
            "массив_чисел"
          ) {
            this.UI.controls.staticTables[tableIndex].blocks[i].value[
              j1 - yStart
            ][j2 - xStart] = parseInt(tableInput);
          }
        }
      } */
    },
    DeleteStaticTableBlock(tableIndex, blockIndex) {
      //arrayOf=[1, 2, 3, 4, 5, 6, 7, 8, 9,]

      const halfBeforeTheUnwantedElement = this.UI.controls.staticTables[
        tableIndex
      ].blocks.slice(0, blockIndex);

      const halfAfterTheUnwantedElement = this.UI.controls.staticTables[
        tableIndex
      ].blocks.slice(blockIndex + 1);

      const copyWithoutThirdElement = halfBeforeTheUnwantedElement.concat(
        halfAfterTheUnwantedElement
      );
      this.UI.controls.staticTables[tableIndex].blocks =
        copyWithoutThirdElement;
      //console.log(copyWithoutThirdElement);
    },
    AddColumnOrRowInStaticTable(i) {
      this.UI.controls.staticTables[i - 1].inputs.push({});
    },

    SaveStaticTable(i, rows, columns) {
      /*
      let temp = this.UI.controls.staticTables[i - 1].inputs;
      this.UI.controls.staticTables[i - 1].inputs = new Array(
        this.UI.controls.staticTables[i - 1].rows
      );
      for (let j = 0; j < this.UI.controls.staticTables[i - 1].rows; j++) {
        this.UI.controls.staticTables[i - 1].inputs[j] = new Array(
          this.UI.controls.staticTables[i - 1].columns
        );
      }
      i++;
      console.log(i);
      for (let j = 0; j < temp.length; j++) {
        for (let u = 0; u < temp[j].length; u++) {
          this.UI.controls.staticTables[i - 1].inputs[j][u] = temp[j][u];
        }
      } */
      this.UI.controls.staticTables[i].columns = columns;
      this.UI.controls.staticTables[i].rows = rows;
      this.UI.controls.staticTables[i].inputs.length = columns * rows;
      for (let j = 0; j < columns * rows; j++) {
        this.UI.controls.staticTables[i].inputs[j] = " ";
      }

      /*
      let table = this.UI.controls.staticTables[i];
      table.columns = this.columns;
      table.rows = this.rows;
      table.inputs =[]; */
      /*
      for(let i = 0; i < table.rows; i++)
      {
        let string =  ""
        string += "{"
        for(let j = 0; j < table.columns-1; j++)
        {
            string += ` "1": "1" `;
        }
        table.inputs.push({""})
      } */
      //for(let i = 0; i < this.columns; i++)
      //{
      //  for(let j = 0; j < this.rows; j++)
      //  {
      // }
      //  }
    },
    InputStaticTableInputs(i, j) {
      //this.UI.controls.staticTables = tables;
      this.PutInputInStaticTableBlock(i + 1, j + 1);
    },
    СhangeInputTypeInBlockStaticTable(tableIndex, blockIndex, i, j, type) {
      this.UI.controls.staticTables[tableIndex].blocks[
        blockIndex
      ].inputTypeIsText[i][j] = type;
    },
    InputBlocKStaticTable(tableIndex, blockIndex, block) {
      this.UI.controls.staticTables[tableIndex].blocks[blockIndex] = block;
    },
    BlocksInputs(table, block) {
      let new_block = {};
      if (block.type == "массив_чисел" || block.type == "массив_текста") {
        for (let i = 0; i < block.value.length; i++) {
          for (let j = 0; j < block.value[i].length; j++) {
            [table, new_block] = this.PushBlockInputsInStaticTableInputs(
              table,
              block,
              i,
              j
            );
          }
        }
      }
      return [table, new_block];
    },
    PushBlockInputsInStaticTableInputs(table, block, j1, j2) {
      let cell = block.value[j1][j2];
      let our_block = block;
      table.attributes.inputs[
        (j1 + our_block.y_start - 1) * table.attributes.columns +
          j2 +
          our_block.x_start -
          1
      ] = String(cell);
      return [table, block];
    },
    //#endregion

    //#region Функции для динамической таблицы
    CreateBlockInDynamicTable(tableIndex, x, y, table_type) {
      this.UI.controls.dynamicTables[tableIndex].blocks.push({
        x: x,
        y: y,
        name: "0",
        value: [], //json, массив чисел
        field: [],
        inputTypeIsText: [],
        type: table_type,
      });
    },
    ChangeBlockInDynamicBlock() {},

    //#endregion

    //#region Функции для настроее тренажёра, кода, и метаданных.
    ChangePosition(switch1, switch2) {
      let i = this.UI.settings.renderItems.findIndex(
        (element) => element == switch1
      );
      let j = this.UI.settings.renderItems.findIndex(
        (element) => element == switch2
      );
      if (i != -1 && j != -1) {
        let temp = this.UI.settings.renderItems[i];
        this.UI.settings.renderItems[i] = this.UI.settings.renderItems[j];
        this.UI.settings.renderItems[j] = temp;
      }
    },
    InputSettings(input) {
      this.UI.settings = input;
    },
    InputSystems(input) {
      // this.loaded=false;
      if (input.roundSystem == true) {
        this.UI.systems.roundSystem = true;
        this.UI.systems = input;
        this.UI.systems["rounds"] = [];
      } else {
        this.UI.settings.roundSystem = false;
        this.UI.settings["rounds"] = [];
      }
      //this.loaded=true;
      this.reload++;
    },
    InputCode(input) {
      this.Code.functions = input;
    },
    InputTrainerInfo(name, description) {
      this.UI.name = name;
      this.UI.description = description;
    },
    //#endregion

    //#region Функции с сохранением или удалением тренажёра
    SaveTrainer() {
      this.ValidationJSON();
      console.log("ошибка!", this.error);
      this.error = false;
      if (this.error === false) {
        axios({
          method: "post",
          url: this.base_url + "/edit/" + this.$route.params.id,
          data: {
            dataUI: this.UI,
            code: this.Code,
          },
          headers: {
            "Access-Control-Allow-Origin": this.access_origin,
            "Access-Control-Allow-Credentials": true,
          },
          validateStatus: (status) => {
            return true; // I'm always returning true, you may want to do it depending on the status received
          },
        })
          .catch((error) => {})
          .then((response) => {
            this.toastString = "Тренажер сохранен!";
            this.isSaved = true;
            this.hideToast = false;
          });
      } else {
        this.toastString = "Тренажер не сохранен!";
        this.hideToast = false;
      }
    },
    SaveTrainerChanges(name, description, now, status) {
      this.UI.name = name;
      this.UI.description = description;
      this.UI.status = status;
      this.UI.created = now;
    },
    DeleteAllSaves() {
      let newUI = {
        id: "",
        name: "",
        controls: {
          checkboxes: [],
          radioboxes: [],
          groupsOfRadioboxes: [],
          buttons: [],
          cards: [],
          textareas: [],
          staticTables: [],
          dynamicTables: [],
          textinputs: [],
          plotlyObjects2D: [],
        },
        structure: [],
        UIinputs: [],
        systems: {
          roundSystem: false,
          rounds: [],
        },
        last_id: 1,
        inputs: [],
        outputs: [],
        settings: {
          buttonReverse: false,
          checkboxInline: false,
          radioboxInline: false,
          renderItems: [
            "button",
            "textarea",
            "input",
            "checkbox",
            "radiobox",
            "staticTable",
            "dynamicTable",
            "card",
            "2Dcomponent",
          ],
        },
      };
      let newCode = {
        functions: [],
      };
      this.UI = newUI;
      this.Code = newCode;
    },
    DeleteTrainer() {
      axios({
        method: "delete",
        url: this.base_url + "/edit/" + this.$route.params.id,
        data: {},
        headers: {
          "Access-Control-Allow-Origin": this.access_origin,
          "Access-Control-Allow-Credentials": true,
        },
        validateStatus: (status) => {
          console.log(status);
          return true; // I'm always returning true, you may want to do it depending on the status received
        },
      })
        .catch((error) => {
          console.log(error);
        })
        .then((response) => {
          console.log(response);
        });
      this.$router.push("/");
    },
    //#endregion

    ReadInputsFromNextRound(i) {
      let SroundInputs = [];
      this.roundFlag = 0;
      SroundInputs = this.UI.settings.rounds[i].roundInputs;
      //console.log("SSS", SroundInputs, this.UI.systems.rounds[i].roundInputs)
      for (let j = 0; j < SroundInputs.length; j++) {
        let v = SroundInputs[j].attributes.value;
        switch (SroundInputs[j].attributes.type) {
          case "число":
            v = parseInt(v);
            break;
          case "массив_чисел":
            v = JSON.parse(v);
            break;
          case "массив_текста":
            v = JSON.parse(v);
            break;
          case "json":
            v = JSON.parse(v);
            break;
        }

        SroundInputs[j].attributes.value = v;
      }

      let allInputs = this.PushInputControls(this.UI.structure, []);

      for (let i = 0; i < this.UI.inputs.length; i++) {
        allInputs.push(this.UI.inputs[i]);
      }
      for (let i = 0; i < SroundInputs.length; i++) {
        let flag = allInputs.findIndex(function (object) {
          if (object.name == SroundInputs[i].attributes.name) {
            return true;
          }
          if (object["attributes"] !== undefined) {
            if (object.attributes.name == SroundInputs[i].attributes.name) {
              return true;
            }
          }
        });
        if (flag != -1) {
          if (allInputs[flag]["attributes"] !== undefined) {
            allInputs[flag].attributes.value = SroundInputs[i].attributes.value;
          } else {
            allInputs[flag].value = SroundInputs[i].attributes.value;
          }
        }

        /*
        flag = allInputs.findIndex(
          (object) => (object.attributes.name == SroundInputs[i].attributes.name)
        );
        if (flag != -1) {
          if(allInputs[flag]['attributes'] !== undefined) 
          {
            allInputs[flag].attributes.value = SroundInputs[i].attributes.value;
          }
        }  */
      }

      this.EditInputsFOrCourseTask(allInputs);
      this.round++;
      this.reload++;
      this.reload_preview++;
    },
    PutFunctionOnButton() {
      for (let k = 0; k < this.Code.functions.length; k++) {
        this.UI.controls.buttons[
          this.Code.functions[k].control - 1
        ].functionNumber = k;
      }
    },
    /*
    PushInputControls(structure, arrayOfInputControls) {
      let arrayOfInputControls_new = arrayOfInputControls;
      for (let i = 0; i < structure.length; i++) {
        if (
          structure[i].type == "textarea" ||
          structure[i].type == "card" ||
          structure[i].type == "textinput" ||
          structure[i].type == "2Dcomponent"
        ) {
          arrayOfInputControls.push(structure[i]);
        }
        if (
          structure[i].type == "staticTable" ||
          structure[i].type == "dynamicTable"
        ) {
          for (let j = 0; j < structure[i].attributes.blocks.length; j++) {
            arrayOfInputControls.push(structure[i].attributes.blocks[j]);
          }
        }
        if (
          structure[i].structure != [] &&
          structure[i].structure != undefined
        ) {
          arrayOfInputControls_new = this.PushInputControls(
            structure[i].structure,
            arrayOfInputControls
          );
        }
      }
      return arrayOfInputControls_new;

      //return arrayOfInputControls;
    }, */
    PushInputALLControls() {},
    /*
    PushInputALLControls() {
      var arrayOfInputControls = [];
      //arrayOfInputControls.push({name: ""});
      //arrayOfInputControls.push({name: "", array: "dwe"});
      //console.log(arrayOfInputControls)
      this.UI.controls.textareas.forEach(function (i) {
        arrayOfInputControls.push(i);
      });
      this.UI.controls.groupsOfRadioboxes.forEach(function (i) {
        arrayOfInputControls.push(i);
      });
      this.UI.controls.staticTables.forEach(function (i) {
        //console.log(i);
        for (let j = 0; j < i.blocks.length; j++) {
          //console.log("блок = ", i.blocks[j]);
          arrayOfInputControls.push(i.blocks[j]);
        }
        // нужно добавить и значения в инпуты
      });
      this.UI.controls.textinputs.forEach(function (i) {
        arrayOfInputControls.push(i);
      });
      this.UI.controls.cards.forEach(function (i) {
        arrayOfInputControls.push(i);
      });
      this.inputs.forEach(function (i) {
        arrayOfInputControls.push(i);
      });
      console.log("S", this.inputs);
      return arrayOfInputControls;
    }, */
    HideToast() {
      this.hideToast = true;
    },
    TestFunction() {
      console.log("tick");
    },
    ClearAllInputs() {
      for (let i = 0; i < this.UI.inputs.length; i++) {
        this.UI.inputs[i].value = this.UI.inputs[i].originalValue;
      }
      for (let k = 0; k < this.UI.controls.staticTables.length; k++) {
        let result2 = this.UI.controls.staticTables[k].blocks.findIndex(
          ({ color_block }) => {
            if (color_block != undefined) {
              return color_block.value;
            }
          }
        );
        if (result2 != -1) {
          let result3 = this.inputs.findIndex(
            ({ name }) =>
              name ===
              this.UI.controls.staticTables[k].blocks[result2].color_block.value
          );
          this.loaded = false;
          if (this.inputs[result3].type === "число") {
            this.UI.controls.staticTables[k].blocks[
              result2
            ].color_block.number = parseInt(this.inputs[result3].value);
            this.reload++;
            this.loaded = true;
          }
          //console.log(this.inputs[result3]);
        }
      }
      this.EndPeriodFunction();
    },
    PushInputControls(structure, arrayOfInputControls) {
      let arrayOfInputControls_new = arrayOfInputControls;
      for (let i = 0; i < structure.length; i++) {
        if (
          structure[i].type == "textarea" ||
          structure[i].type == "card" ||
          structure[i].type == "textinput" ||
          structure[i].type == "2Dcomponent"
        ) {
          arrayOfInputControls.push(structure[i]);
        }
        if (
          structure[i].type == "staticTable" ||
          structure[i].type == "dynamicTable"
        ) {
          arrayOfInputControls.push(structure[i]);
          for (let j = 0; j < structure[i].attributes.blocks.length; j++) {
            arrayOfInputControls.push(structure[i].attributes.blocks[j]);
          }
        }
        if (
          structure[i].structure != [] &&
          structure[i].structure != undefined
        ) {
          arrayOfInputControls_new = this.PushInputControls(
            structure[i].structure,
            arrayOfInputControls
          );
        }
      }
      return arrayOfInputControls_new;
    },
    FindTableForBlock(input_controls, control) {
      let table = {};
      input_controls.forEach((input) => {
        if (input.type === "staticTable") {
          input.attributes.blocks.forEach((block) => {
            if (block.name === control.name) {
              table = input;
              return table;
            }
          });
        }
      });
      return table;
    },
    EditInputsFOrCourseTask(allinputs) {
      let input_controls = this.PushInputControls(this.UI.structure, []);
      for (let i = 0; i < allinputs.length; i++) {
        let control = "";
        for (let j = 0; j < input_controls.length; j++) {
          if (input_controls[j].name === allinputs[i].name) {
            control = allinputs[i];
            break;
          }
        }
        /*
        let control = input_controls.find(function(object) {

        }) */
        if (control != undefined) {
          let table = this.FindTableForBlock(input_controls, control);
          [table, control] = this.BlocksInputs(table, control);

          if (table.attributes != undefined) {
            for (let j = 0; j < table.attributes.blocks.length; j++) {
              if (table.attributes.blocks[j].name === control.name) {
                table.attributes.blocks[j] = control;
              }
            }
          }
        }
        let control1 = input_controls.find(function (object) {
          if (object.attributes != undefined) {
            if (object.attributes.name === allinputs[i].name) {
              return object;
            }
          }
        });
        if (control1 != undefined) {
          control1.attributes.value = allinputs[i].value;
        }
        if (
          this.inputs.indexOf((object) => object.name === allinputs[i].name) !=
          -1
        ) {
          allinputs[i].value = this.inputs.indexOf(
            (object) => object.name === allinputs[i].name
          ).value;
        }
        /*
        if(allinputs[i].attributes.name === this.UI.controls.cards[j].name) {
          this.UI.controls.cards[j].value = allinputs[i].value;
        } */
        /*
        for (let j = 0; j < this.UI.controls.staticTables.length; j++) {
          for (
            let ji = 0;
            ji < this.UI.controls.staticTables[j].blocks.length;
            ji++
          ) {
            if (
              allinputs[i].name ===
              this.UI.controls.staticTables[j].blocks[ji].name
            ) {
              this.UI.controls.staticTables[j].blocks[ji].value =
                allinputs[i].value;
              //console.log("Block -", this.UI.controls.staticTables[j].blocks[ji]);
              //console.log("Table -",this.UI.controls.staticTables[j]);
              this.BlocksInputs(j, ji);
            }
          }
        }
        if (
          this.inputs.indexOf((object) => object.name === allinputs[i].name) !=
          -1
        ) {
          allinputs[i].value = this.inputs.indexOf(
            (object) => object.name === allinputs[i].name
          ).value;
        }
        for (let j = 0; j < this.UI.controls.cards.length; j++) {
          console.log(
            "инпуты раунда",
            allinputs[i].name,
            this.UI.controls.cards[j].name
          );
          if (allinputs[i].name === this.UI.controls.cards[j].name) {
            //console.log("")
            this.UI.controls.cards[j].value = allinputs[i].value;
          }
        } */
      }
    },
    WatchingElement(structure, type) {
      let length = structure.length;
      if (structure[0] !== undefined) {
        if (
          structure[0].type !== "row" &&
          structure[0].type !== "column" &&
          length == 1
        ) {
          if (type === "row" && structure[0].type != "column") {
            return true;
          }
        } else {
          for (let i = 0; i < structure.length; i++) {
            if (type === "row") {
              if (
                structure[i].type !== "column" &&
                structure[i].type !== "canvas"
              ) {
                return true;
              }
            }
            if (type === "column") {
              if (
                structure[i].type !== "row" &&
                structure[i].type !== "canvas"
              ) {
                return true;
              }
            }
            if (
              structure[i].structure !== undefined &&
              structure[i].structure.length !== 0
            ) {
              let structure_new = structure[i].structure;
              let d = this.WatchingElement(structure_new, structure[i].type);
              if (d === true) return true;
            }
          }
        }
        return false;
      } else {
        return false;
      }
    },
  },
  watch: {
    UI_structure_watched: {
      handler(newVal, oldVal) {
        if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
          //console.log("")
          let new_structure = newVal;
          let old_structure = oldVal;
          let runned = false;
          for (let i = 0; i < new_structure.length; i++) {
            if (
              JSON.stringify(new_structure[i]) !==
                JSON.stringify(old_structure[i]) &&
              (this.run_code === true || this.isConstructing === true)
            ) {
              this.reloads[i]++;
              //runned = true;
            }
          }
          if (
            this.status === "stop_run_code" ||
            this.status === "stop_run_code_period"
          ) {
            this.run_code = false;
          }
          /*
          if(this.status === "stop_run_code_period_stop") {
            this.run_code = false;
            //this.isConstructing 
          } */
          /*
          if(runned===true)
          {
            this.run_code=false;
          } */
          //let d = this.WatchingElement(new_structure, "canvas");
          /*
          if (d === true) {
            this.UI.structure = oldVal;
          } */
          if (this.UI.structure.length !== this.reloads.length) {
            this.reloads = [];
            for (let i = 0; i < this.UI.structure.length; i++) {
              this.reloads.push(0);
            }
          }
          //this.reload++;
          /*
          console.log("gabaryte", this.run_code)
          if(this.run_code===true) {
            console.log("gabaryte")
            this.reload_preview++;
          } */
          //this.reload_preview++;
        }
      },
      deep: true,
    },

    Canvas_watched: {
      handler(newVal, oldVal) {
        if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
          let continue_iter = true;
          for (let i = 0; i < this.UI.structure.length; i++) {
            if (this.UI.structure[i].attributes.positions !== undefined) {
              if (this.UI.structure[i].attributes.positions.h > newVal.h) {
                //this.UI.canvas.h = oldVal.h;
                this.UI.canvas.h = this.UI.structure[i].attributes.positions.h;
                continue_iter = false;
                break;
              }
              if (this.UI.structure[i].attributes.positions.w > newVal.w) {
                this.UI.canvas.w = this.UI.structure[i].attributes.positions.w;
                continue_iter = false;
                break;
              }
            }
          }
          if (continue_iter === true) {
            for (let i = 0; i < this.UI.structure.length; i++) {
              if (this.UI.structure[i].attributes.positions !== undefined) {
                if (
                  this.UI.structure[i].attributes.positions.y +
                    this.UI.structure[i].attributes.positions.h >
                  newVal.h
                ) {
                  this.UI.structure[i].attributes.positions.y =
                    newVal.h - this.UI.structure[i].attributes.positions.h;
                }
                if (
                  this.UI.structure[i].attributes.positions.x +
                    this.UI.structure[i].attributes.positions.w >
                  newVal.w
                ) {
                  this.UI.structure[i].attributes.positions.x =
                    newVal.w - this.UI.structure[i].attributes.positions.w;
                }
              }
            }
          }
        }
      },
      deep: true,
    },
    TrashCan: {
      handler(val, oldVal) {
        //this.UI = val;
        this.reload++;
        this.TrashCan = {};
      },
      //deep: true,
    },
  },
  computed: {
    RenderSizeOfTable(i) {
      /*this.UI.controls.staticTables[i].inputs.length =
        this.UI.controls.staticTables[i].columns * this.UI.controls.staticTables[i].rows;
        return*/
      let inputs = [];
      inputs.length =
        this.UI.controls.staticTables[i].columns *
        this.UI.controls.staticTables[i].rows;
      return inputs;
    },
    UI_structure_watched: function () {
      return JSON.parse(JSON.stringify(this.UI.structure));
    },
    Canvas_watched: function () {
      return JSON.parse(JSON.stringify(this.UI.canvas));
    },
  },
};
</script>

<style>
.siteArea {
  margin: 20px;
}

.createdButton {
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 5px;
}

.construct-sidebar .accordion-button {
  padding: 0;
}

.construct-sidebar .accordion-header {
}

.navbar-construct .nav-link {
  color: #fff;
}

.construct-sidebar .tab-content {
  font-size: 10px;
}

.construct-sidebar .accordion-button {
  font-size: 12px;
}

.construct-sidebar label {
  font-size: 10px;
}

.construct-sidebar span {
  font-size: 12px;
}

/* Изменения размера -sm */
.construct-sidebar .form-select-sm {
  font-size: 10px;
}

.construct-sidebar .input-group-sm .input-group-text {
  font-size: 10px;
}

.construct-sidebar .input-group-sm .form-control {
  font-size: 10px;
}

.construct-sidebar .form-control-sm {
  font-size: 10px;
}

.accordion {
  --bs-accordion-border-color: rgb(102, 102, 102) !important;
}

.text-gray {
  color: rgb(211, 211, 211) !important;
  border-color: rgb(73, 73, 73) !important;
  font-size: 0.7rem;
  background-color: rgb(25, 25, 25) !important;
}

.text-gray[type="number"] {
  color-scheme: dark !important;
}

.checkbox-gray {
  background-color: rgb(25, 25, 25) !important;
  border-color: rgb(73, 73, 73) !important;
  /*accent-color: blue !important;*/
}

.checkbox-gray:checked {
  background-color: rgb(0, 113, 212) !important;
  border-color: rgb(0, 113, 212) !important;
}

/*
.background-darker {
 background-color: rgb(25, 25, 25) !important;
}*/
</style>

<style scoped></style>
