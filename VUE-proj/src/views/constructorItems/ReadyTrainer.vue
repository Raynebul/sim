<template>
  <div v-if="error === true">
    <div class="alert alert-danger d-flex align-items-center" role="alert">
      <svg
        class="bi flex-shrink-0 me-2"
        width="24"
        height="24"
        role="img"
        aria-label="Danger:"
      >
        <use xlink:href="#exclamation-triangle-fill" />
      </svg>
      <div>
        <b>ОШИБКА!</b>
        <div
          v-for="error_element in errorString"
          :key="error_element"
          style="font-size: 0.8rem"
        >
          {{ error_element }}
          <hr style="margin: 0.1rem" />
        </div>
      </div>
    </div>
  </div>
  <div v-if="UI.settings.roundSystem === true">
    <nav aria-label="...">
      <ul class="pagination pagination-sm">
        <li
          class="page-item"
          aria-current="page"
          v-for="i in UI.settings.rounds.length"
          :key="i"
        >
          <span
            v-bind:class="{
              'page-link': round !== i,
              'page-link active': round === i,
            }"
            >{{ i }}</span
          >
        </li>
      </ul>
    </nav>
  </div>
  <!--
  <div v-for="i in UI.controls.groupsOfRadioboxes.length" :key="i">
    <EditGroupOfRadioboxes
      v-if="loaded == true"
      :UI="UI"
      :groupID="i - 1"
      @inputGroupOfRadioboxes="InputGroupOfRadioboxes"
    ></EditGroupOfRadioboxes>
    <p>Проверка</p>
  </div>-->
  <!--
  <div v-for="render in UI.settings.renderItems" :key="render">
    <div v-if="isConstructing === true">{{ render }}</div>
    <div v-if="render == `button`">
      <EditButton :UI="UI" @runCode="TestInput"></EditButton>
    </div>

    <div v-if="render == `textarea`">
      <EditTextarea
        v-if="loaded == true"
        :UI="UI"
        @inputTextArea="InputTextArea"
      ></EditTextarea>
    </div>
    <div v-if="render == `input`">
      <EditTextInput
        v-if="loaded == true"
        :key="UI.controls.textinputs"
        :UI="UI"
        @inputTextInput="InputTextInput"
      ></EditTextInput>
    </div>
    <div v-if="render == `checkbox`">
      <EditCheckbox @inputCheckbox="InputCheckbox" :UI="UI"></EditCheckbox>
    </div>
    <div v-if="render == `radiobox`">
      <EditRadiobox :UI="UI"></EditRadiobox>
    </div>
    <div v-if="render == `staticTable`">
      <EditStaticTable
        v-if="loaded == true"
        :key="reload"
        :UI="UI"
        @inputTableInputs="InputStaticTableInputs"
      >
      </EditStaticTable>
    </div>
    <div v-if="render == `dynamicTable`">
      <EditDynamicTable
        v-if="loaded == true"
        :key="reload"
        :UI="UI"
      ></EditDynamicTable>
    </div>
    <div v-if="render == `card`">
      <EditCard :UI="UI"></EditCard>
    </div>

    <div v-if="render == `2Dcomponent`">
      <EditPlotlyObject2D
        :UI="UI"
        :reload="reloadPlotly"
        :idForPlotly="idForPlotly"
        v-if="loaded == true"
        :key="reloadPlotly"
      ></EditPlotlyObject2D>
    </div>
  </div> -->
  <div
    class="d-flex flex-row-reverse"
    v-if="
      UI.settings.roundSystem === true &&
      roundFlag === 2 &&
      round !== UI.settings.rounds.length
    "
  >
    <button
      class="btn btn-success btn-lg"
      @click="$emit('readInputsFromNextRound', round)"
    >
      Следующий раунд
    </button>
  </div>
  <div
    class="d-flex flex-row-reverse"
    v-if="
      UI.settings.roundSystem === true &&
      roundFlag === 2 &&
      round === UI.settings.rounds.length
    "
  >
    <button class="btn btn-success btn-lg">Конец!</button>
  </div>
</template>

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
    // обновление компонентов VUE
    reload: { type: Object, required: true },
    reloadPlotly: { type: Object, required: true },
    loaded: Boolean,
    // раундовая система
    round: {
      type: Object,
      required: true,
    },
    roundFlag: {
      type: Object,
      required: true,
    },
    isConstructing: Boolean,
    error: Boolean,
    errorString: {
      type: Object,
    },
    idForPlotly: {
      type: String,
    },
  },
  data(props) {
    //console.log(props.idForPlotly);
    return {
      test: "test",
    };
  },
  methods: {
    /*
    TestInput(number) {
      console.log(this.textareas);
      console.log(this.UI.textareas);
    }, */
    delete_element(element) {
      this.$emit("delete_element", element)
    },
    InputGroupOfRadioboxes(value, groupID) {
      this.$emit("inputGroupOfRadioboxes", value, groupID);
    },
    TestInput(functionNumber, buttonNumber) {
      this.$emit("testInput", functionNumber, buttonNumber);
    },
    InputTextArea(inputValue) {
      this.$emit("inputTextArea", inputValue);
    },
    InputTextInput(inputValue) {
      this.$emit("inputTextInput", inputValue);
    },
    InputCheckbox(i, value) {
      this.$emit("inputCheckbox", i, value);
    },
    InputStaticTableInputs(tables, i, j, d) {
      this.$emit("inputStaticTableInputs", tables, i, j, d);
    },
  },
};
</script>

<script setup>
// Элементы тренажёра
/*
import EditButton from "./EditTrainerComponents/Button.vue";
import EditTextarea from "./EditTrainerComponents/Textarea.vue";
import EditCard from "./EditTrainerComponents/Card.vue";
import EditRadiobox from "./EditTrainerComponents/Radiobox.vue";
import EditCheckbox from "./EditTrainerComponents/Checkbox.vue";
import EditStaticTable from "./EditTrainerComponents/StaticTable.vue";
import EditDynamicTable from "./EditTrainerComponents/DynamicTable.vue";
import EditGroupOfRadioboxes from "./EditTrainerComponents/GroupOfRadioboxes.vue";
import EditTextInput from "./EditTrainerComponents/Input.vue";
import EditPlotlyObject2D from "./EditTrainerComponents/2Dcomponent.vue";
*/
</script>
