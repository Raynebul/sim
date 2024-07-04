<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable prettier/prettier -->
<script setup>
import plotlyAttrs_js from "./plotlyAttrs.js" 
import cPlotlyJsOutputs from "./cPlotlyJsOutputs.vue";
import DeletePut from "./DeletePut.vue";
</script>

<template>
  <div class="accordion-item">
    <h2 class="accordion-header" id="panelsStayOpenOutputs-headingOne">
      <button
        class="accordion-button collapsed bg-dark text-white"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#panelsStayOpenOutputs-collapseOne"
        aria-expanded="false"
        aria-controls="panelsStayOpenOutputs-collapseOne"
      >
        Выходные данные
      </button>
    </h2>
    <!---->
    <div
      id="panelsStayOpenOutputs-collapseOne"
      class="accordion-collapse collapse bg-dark"
      aria-labelledby="panelsStayOpenOutputs-headingOne"
    >
      <!--ууууу-->
      <div class="accordion-body text-white">
        <div>Количество: {{ UI.outputs.length }}</div>
        <!--<form @keyup="$emit(`inputOutputs`, outputs)">-->
        <div
          v-for="i in outputs.length"
          :key="i"
          class="border border-info"
          style="margin-bottom: 5px; padding: 5px"
        >
          <div class="input-group input-group-sm mb-3">
            <span class="input-group-text text-gray" id="inputGroup-sizing-sm"
              >Имя</span
            >
            <input
              type="text"
              class="form-control text-gray"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              v-model="outputs[i - 1].name"
            />
          </div>
          <label class="form-label">Контрол: </label>
          <select
            class="form-select form-select-sm text-gray"
            aria-label=".form-select-sm example"
            @click="InputOutputsAndCheckPlotly()"
            v-model="outputs[i - 1].control"
          >
            <option
              v-for="j in allcontrols.length"
              :key="j"
              :value="allcontrols[j - 1].attributes.name"
            >
              {{ allcontrols[j - 1].attributes.name }}
            </option>
            <option
              v-for="j in allcontrols_without_attributes.length"
              :key="j"
              :value="allcontrols_without_attributes[j - 1].name"
            >
              {{ allcontrols_without_attributes[j - 1].name }}
            </option>
            <option
              v-for="j in inputControls.length"
              :key="j"
              :value="inputControls[j - 1].name"
            >
              {{ inputControls[j - 1].name }}
            </option>
          </select>
          <p></p>
          <div v-if="outputs[i - 1].isPlotly === true">
            <button
              class="btn btn-outline-warning rounded-0 btn-sm"
              style="font-size: 0.7rem"
              type="button"
              data-bs-toggle="offcanvas"
              :data-bs-target="
                `#offcanvasRight` + `PlotlyOutputs` + String(i - 1)
              "
              :aria-controls="
                `offcanvasRight` + `PlotlyOutputs` + String(i - 1)
              "
            >
              Данные
            </button>
          </div>
          <p></p>
          <label class="form-label">Изменяет: </label>
          <select
            class="form-select form-select-sm text-gray"
            aria-label=".form-select-sm example"
            v-model="outputs[i - 1].mode"
            @click="$emit(`inputOutputs`, outputs)"
          >
            <option value="value">Value</option>
            <option value="class">Class</option>
            <option value="style">Style</option>
          </select>
          <div v-if="outputs[i - 1].mode === `class`">
            <div style="font-size: 0.8rem">Доступные классы на выбор:</div>
            <div v-for="j in outputs[i - 1].classValues.length" :key="j">
              <div class="input-group input-group-sm mb-3">
                <span
                  class="input-group-text text-gray"
                  id="inputGroup-sizing-sm"
                  >значение</span
                >
                <input
                  type="text"
                  class="form-control text-gray"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  v-model="outputs[i - 1].classValues[j - 1].value"
                />
              </div>

              <select
                class="form-select form-select-sm"
                aria-label=".form-select-sm example"
                v-model="outputs[i - 1].classValues[j - 1].class"
              >
                <option value="disabled">disabled</option>
              </select>
            </div>
          </div>
          <div v-if="outputs[i - 1].mode === `style`">
            <div style="font-size: 0.8rem">Доступные СТИЛИ на выбор:</div>
            <div v-for="j in outputs[i - 1].styleValues.length" :key="j">
              <div class="input-group input-group-sm mb-3">
                <span
                  class="input-group-text text-gray"
                  id="inputGroup-sizing-sm"
                  >значение</span
                >
                <input
                  type="text"
                  class="form-control text-gray"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  v-model="outputs[i - 1].styleValues[j - 1].value"
                />
              </div>

              <select
                class="form-select form-select-sm text-gray"
                aria-label=".form-select-sm example"
                v-model="outputs[i - 1].styleValues[j - 1].style"
              >
                <option value="" selected>Выберете</option>
                <option value="background-color: black">
                  background-color: black
                </option>
                <option value="background-color: red">
                  background-color: red
                </option>
                <option value="background-color: green">
                  background-color: green
                </option>
                <option value="background-color: blue">
                  background-color: blue
                </option>
                <option value="background-color: yellow">
                  background-color: yellow
                </option>
              </select>
            </div>
          </div>
          <DeletePut
            :index="i - 1"
            :type="`аутпут`"
            @delete_put="DeletePut_one"
          ></DeletePut>
        </div>
        <!--</form>-->
        <div class="btn-group btn-group-sm" role="group" aria-label="...">
          <button
            type="button"
            style="font-size: 0.7rem"
            class="btn btn-outline-primary rounded-0"
            @click="$emit(`addNewOutput`)"
          >
            Добавить
          </button>
          <!--
          <button
            type="button"
            style="font-size: 0.7rem"
            class="btn btn-outline-danger rounded-0"
            @click="$emit(`removeOutput`)"
          >
            Удалить
          </button>-->
        </div>
      </div>
    </div>
    <!---->
  </div>
  <div v-for="i in outputs.length" :key="i">
    <cPlotlyJsOutputs
      :index="i - 1"
      :output="outputs[i - 1]"
      :plotlyObjects="plotlyControls"
      @inputPlotlyOutput="InputPlotlyOutput"
    ></cPlotlyJsOutputs>
  </div>
</template>

<script>
export default {
  props: {
    UI: {
      type: Object,
      required: true,
    },
  },
  /*
  watch: {
    outputs(newVal, oldVal) {
      //this.xDiff = newVal-oldVal
      for (let i = 0; i < newVal.length; i++) {
        console.log("what the")
        let index = this.plotlyControls.findIndex(
          (object) => object.name == newVal[i].name
        );
        if (index !== -1) {
          if (
            this.outputs[i]["plotlyAttrs"] === undefined &&
            this.outputs[i].type === "value"
          ) {
            this.output[i]["isPlotly"] = true;
            this.outputs[i]["plotlyAttrs"] = {};
          }
        }
      }
    },
  }, */
  data(props, context) {
    //console.log(props.UI.buttons);
    //let inputs = props.UI.inputs;
    //let UIinputs = props.UI.UIinputs;
    let plotlyObjects = [];
    for (let i = 0; i < props.UI.structure.length; i++) {
      if (props.UI.structure[i].type === "2Dcomponent") {
        plotlyObjects.push(props.UI.structure[i]);
      }
    }
    let allcontrols = [];
    let outputs = props.UI.outputs;
    /*
    for (let i = 0; i < outputs.length; i++) {
      if (outputs[i].mode === "style") {
        outputs[i]["styleValues"] = [];
        outputs[i]["styleValues"].push({ value: "", style: "" });
      }
    } */
    let modes = [];
    let plotlyControls = [];
    // Все контролы

    outputs.forEach(function (i) {
      modes.push("value");
    });
    allcontrols = this.PushInputControls(props.UI.structure, []);
    plotlyControls = this.PushPlotlyControls(props.UI.structure, []);
    let inputControls = [];
    this.UI.inputs.forEach(function (i) {
      inputControls.push(i);
    });
    let allcontrols_without_attributes = [];
    let length = allcontrols.length;
    for (let i = 0; i < length; i++) {
      if (allcontrols[i].attributes === undefined) {
        allcontrols_without_attributes.push(allcontrols[i]);
        allcontrols.splice(i, 1);
        i--;
        length--;
      }
    }
    /*
    this.UI.controls.staticTables.forEach(function (i) {
      for (let j = 0; j < i.blocks.length; j++) {
        allcontrols.push(i.blocks[j]);
      }
    });
    this.UI.controls.cards.forEach(function (i) {
      allcontrols.push(i);
    });
    this.UI.inputs.forEach(function (i) {
      allcontrols.push(i);
    });
    this.UI.controls.textinputs.forEach(function (i) {
      allcontrols.push(i);
    });
    this.UI.controls.dynamicTables.forEach(function (i) {
      for (let j = 0; j < i.blocks.length; j++) {
        allcontrols.push(i.blocks[j]);
      }
    });
    this.UI.controls.buttons.forEach(function (i) {
      allcontrols.push(i);
    });
    this.UI.controls.plotlyObjects2D.forEach(function (i) {
      allcontrols.push(i);
      plotlyControls.push(i);
    }); */
    // Все контролы
    return {
      outputs,
      allcontrols,
      allcontrols_without_attributes,
      plotlyControls,
      plotlyObjects,
      inputControls,
      modes,
    };
  },
  methods: {
    DeletePut_one(index, type) {
      this.outputs.splice(index, 1);
    },
    Test(test) {
      console.log(test);
    },
    InputOutputsAndCheckPlotly() {
      for (let i = 0; i < this.outputs.length; i++) {
        //console.log(this.plotlyControls, this.outputs[i])
        let index = this.plotlyControls.findIndex(
          (object) => object.name === this.outputs[i].control
        );
        if (index !== -1) {
          if (
            this.outputs[i]["plotlyAttrs"] === undefined &&
            this.outputs[i].mode === "value"
          ) {
            this.outputs[i]["isPlotly"] = true;
            this.outputs[i]["plotlyAttrs"] = {};
          }
        }
      }
      this.$emit(`inputOutputs`, this.outputs);
    },
    InputPlotlyOutput(output, index) {
      this.outputs[index] = output;
      this.$emit(`inputOutputs`, this.outputs);
    },
    ChangeMode() {},
    PushInputControls(structure, arrayOfInputControls) {
      let arrayOfInputControls_new = arrayOfInputControls;
      for (let i = 0; i < structure.length; i++) {
        if (
          structure[i].type == "textarea" ||
          structure[i].type == "card" ||
          structure[i].type == "textinput" ||
          structure[i].type == "2Dcomponent" ||
          structure[i].type == "button"
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
      /*
      this.thisIs_data.UI.controls.textareas.forEach(function (i) {
        arrayOfInputControls.push(i);
      });
      this.thisIs_data.UI.controls.groupsOfRadioboxes.forEach(function (i) {
        arrayOfInputControls.push(i);
      });
      this.thisIs_data.UI.controls.staticTables.forEach(function (i) {
        for (let j = 0; j < i.blocks.length; j++) {
          arrayOfInputControls.push(i.blocks[j]);
        }
      });
      this.thisIs_data.UI.controls.cards.forEach(function (i) {
        arrayOfInputControls.push(i);
      });
      this.thisIs_data.UI.controls.textinputs.forEach(function (i) {
        arrayOfInputControls.push(i);
      });*/

      //return arrayOfInputControls;
    },
    PushPlotlyControls(structure, arrayOfInputControls) {
      let arrayOfInputControls_new = arrayOfInputControls;
      for (let i = 0; i < structure.length; i++) {
        if (structure[i].type == "2Dcomponent") {
          arrayOfInputControls.push(structure[i]);
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
  },
  //emits: ["newValue"],
};
</script>
