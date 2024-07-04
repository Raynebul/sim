<template>
  <!--<div class="p-2 d-flex">-->
  <div class="siteArea mw-100 min-vh-100">
    <h3>{{ Metadata.name }}</h3>
    <div class="card">
      <div class="card-body">
        {{ Metadata.description }}
      </div>
    </div>
    <Canvas
      @updateListPlace="updateListPlace"
      @inputAttributes="inputAttributes"
      @runCode="LaunchAPI"
      @readInputsFromNextRound="ReadInputsFromNextRound"
      :canvas="UI.canvas"
      :key="reload_preview"
      :round="round"
      :roundFlag="roundFlag"
      :UI="UI.structure"
      :settings="UI.settings"
      :reload="reload"
      :reloads="reloads"
      :status="`preview`"
    ></Canvas>
  </div>
  <simAPI
    v-if="loaded == true"
    ref="cApi"
    :launch_api="triggerAPI"
    :typeOf="`/run`"
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
  >
  </simAPI>
</template>

<script setup>
import axios from "axios";
//import ReadyUI from "./constructorItems/ReadyTrainer.vue";
import Canvas from "./constructorItems/Canvas.vue";

import simAPI from "./constructorItems/TrainerFunctions/simAPI.vue";
import { ref } from "vue";

const cApi = ref(null);
//import testTextarea from "./constructorItems/EditTrainerComponents/TestTextarea.vue";
</script>

<script>
export default {
  data() {
    return {
      UI: {
        id: "",
        name: "",
        UIinputs: [],
        inputs: [],
        outputs: [],
        structure: [],
        canvas: {
          w: 1000,
          h: 1000,
        },
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
      stauts: "",
      loaded: false,
      roundFlag: 0,
      run_code: false,
      round: 0,
      reload: 0,
      reloads: [],
      reload_preview: 0,
      timerIds: [],
      inputs: [],
      testText: "hello",
      reloadPlotly: 0,
    };
  },
  mounted() {
    /* this.base_url + `/run/` + this.$route.params.id */
    axios({
      method: "get",
      url: this.base_url + `/run/` + this.$route.params.id,
      headers: {
        "Access-Control-Allow-Origin": this.access_origin,
        "Access-Control-Allow-Credentials": true,
      },
      validateStatus: (status) => {
        return true; // I'm always returning true, you may want to do it depending on the status received
      },
    }).then((response) => {
      if (response.data.dataUI != "") {
        this.UI = response.data.dataUI;
        for (let i = 0; i < this.UI.structure.length; i++) {
          this.reloads.push(0);
        }
        /*
          this.UI["canvas"] = {
            w: 1000,
            h: 1000,
          }; */
        this.Code = response.data.code;
        this.get_Metadata();
      } else {
        this.UI.name = response.data.name;
        this.Code.functions = [];
        this.get_Metadata();
      }
      this.UI.id = this.$route.params.id;
      this.inputs = this.UI.inputs;
      if (this.UI.settings.roundSystem === true) {
        this.ReadInputsFromNextRound(this.round);
      }
      this.loaded = true;
    });
  },
  methods: {
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
          url: this.base_backend_url + "/metadata/" + this.$route.params.id,
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
        });
      }

      /* this.base_backend_url + "/metadata/" + this.$route.params.id */
    },
    //#region Функции с инпутами
    InputTextArea(newValue) {
      this.UI.controls.textareas = newValue;
    },
    InputTextInput(newValue) {
      this.UI.controls.textinputs = newValue;
    },
    //#endregion

    //#region Функции со статистической таблицей
    PutInputInStaticTableBlock(tableIndex, j1, j2) {
      for (
        let i = 0;
        i < this.UI.controls.staticTables[tableIndex].blocks.length;
        i++
      ) {
        /*   console.log(
          this.UI.controls.staticTables[tableIndex].blocks[i].x_start,
          this.UI.controls.staticTables[tableIndex].blocks[i].x_end
        );
        console.log(
          this.UI.controls.staticTables[tableIndex].blocks[i].y_start,
          this.UI.controls.staticTables[tableIndex].blocks[i].y_end
        );
 */
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
            this.UI.controls.staticTables[tableIndex].blocks[i].value[
              j1 - 1 - yStart
            ][field[j2 - xStart]] = tableInput;
          }
          if (
            this.UI.controls.staticTables[tableIndex].blocks[i].type ==
            "массив_текста"
          ) {
            this.UI.controls.staticTables[tableIndex].blocks[i].value[
              j1 - yStart
            ][j2 - xStart] = tableInput;
          }
          if (
            this.UI.controls.staticTables[tableIndex].blocks[i].type ==
            "массив_чисел"
          ) {
            this.UI.controls.staticTables[tableIndex].blocks[i].value[
              j1 - yStart
            ][j2 - xStart] = parseInt(tableInput);
          }
          /*
          console.log(
            "Текущее -",
            this.UI.controls.staticTables[tableIndex].blocks[i].inputs[yEnd - yStart - 1][
              field[xEnd - xStart - 1]
            ]
          ); */
        }
      }
    },
    InputStaticTableInputs(tables, tableIndex, i, j) {
      this.UI.controls.staticTables = tables;
      this.PutInputInStaticTableBlock(tableIndex, i + 1, j + 1);
    },
    /*
    PushBlockInputsInStaticTableInputs(tableIndex, blockindex, j1, j2) {
      let cell =
        this.UI.controls.staticTables[tableIndex].blocks[blockindex].value[j1][
          j2
        ];
      let our_block =
        this.UI.controls.staticTables[tableIndex].blocks[blockindex];
      this.UI.controls.staticTables[tableIndex].inputs[
        (j1 + our_block.y_start - 1) *
          this.UI.controls.staticTables[tableIndex].columns +
          j2 +
          our_block.x_start -
          1
      ] = String(cell);
    }, */
    PushBlockInputsInStaticTableInputs(table, block, j1, j2) {
      let cell = block.value[j1][j2];
      let our_block = block;
      table.attributes.inputs[
        (j1 + our_block.y_start - 1) * table.attributes.columns +
          j2 +
          our_block.x_start -
          1
      ] = String(cell);
      //console.log(cell);
      return [table, block];
    },
    //#endregion

    //#region Функции с динамической таблицей

    MakeFieldInDynamicBlock(put) {
      var arrayOfInputs = [];
      let j1 = undefined;
      let j2 = undefined;
      for (let i = 0; i < put.length; i++) {
        if (put[i] === `"` && j1 !== undefined && put[i + 1] === `:`) {
          j2 = i;
        } else if (put[i] === `"`) {
          j1 = undefined;
          j2 = undefined;
        }
        if (put[i] === `"` && j1 === undefined) {
          j1 = i;
        }

        if (j1 !== undefined && j2 != undefined) {
          /*
          if (put.slice(j1 + 1, j2) !== "type") {
            arrayOfInputs.push(put.slice(j1 + 1, j2));
          } */
          if (
            arrayOfInputs.findIndex(
              (object) => object == put.slice(j1 + 1, j2)
            ) == -1
          ) {
            arrayOfInputs.push(put.slice(j1 + 1, j2));
          }
          j1 = undefined;
          j2 = undefined;
        }
      }
      for (let i = 0; i < arrayOfInputs.length; i++) {
        if (arrayOfInputs[i][arrayOfInputs[i].length - 1] == "\\") {
          arrayOfInputs[i] = arrayOfInputs[i].slice(0, -1);
        }
      }
      return arrayOfInputs;
    },

    //#endregion

    LaunchAPI(functionNumber, buttonNumber) {
      //let thisIs = this;
      this.run_code = true;
      this.$refs.cApi.Simbuilder(functionNumber, buttonNumber);
    },
    ReceiveTest(thisIs) {
      console.log(thisIs);
    },
    ReceiveAPI(thisIs1, status) {
      //this.loaded=false;
      const delayForRender = 500;
      console.log(thisIs1);
      this.loaded = false;
      this.status = status;
      if(this.status==="stop_run_code_period") {
        this.run_code=true;
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
      //this.reload_preview++;
      this.round = thisIs1.round;
      this.roundFlag = thisIs1.roundFlag;
      this.rightAnswer = thisIs1.rightAnswer;
      this.loaded = true;
      
      /*
      setTimeout(() => {
        this.reload++, this.reloadPlotly++;
        this.reload_preview++;
      }, delayForRender); */
      setTimeout(() => {
        this.round = thisIs1.round;
        this.roundFlag = thisIs1.roundFlag;
        this.rightAnswer = thisIs1.rightAnswer;
      }, delayForRender);
      /*
      if (thisIs1 != undefined) {
        //console.log(thisIs1, "чё за");
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
      }
      setTimeout(() => {
        this.reload++, this.reloadPlotly++;
        this.reload_preview++;
      }, delayForRender); */
    },

    //#region Функции для раундовой системы
    /* 
    ReadInputsFromNextRound(i) {
      let SroundInputs = [];
      this.roundFlag = 0;
      SroundInputs = this.UI.settings.rounds[i].roundInputs;
      for (let j = 0; j < SroundInputs.length; j++) {
        let v = SroundInputs[j].value;
        switch (SroundInputs[j].type) {
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
        SroundInputs[j].value = v;
      }
      let allInputs = this.PushInputALLControls();
      console.log("Новое значение", SroundInputs);
      for (let i = 0; i < SroundInputs.length; i++) {
        let flag = allInputs.findIndex(
          (object) => object.name == SroundInputs[i].name
        );
        if (flag != -1) {
          allInputs[flag].value = SroundInputs[i].value;
        }
      }
      console.log("Новое значение инпутов", allInputs);
      console.log("Новое значение инпутов", SroundInputs);
      //this.EditInputsFOrCourseTask(SroundInputs);

      this.EditInputsFOrCourseTask(allInputs);
      this.round++;
    }, */
    /*
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
      let allInputs = this.PushInputALLControls();
      //console.log("Новое значение", SroundInputs);
      for (let i = 0; i < SroundInputs.length; i++) {
        let flag = allInputs.findIndex(
          (object) => object.name == SroundInputs[i].attributes.name
        );
        if (flag != -1) {
          allInputs[flag].value = SroundInputs[i].attributes.value;
        }
      }
      //console.log("Новое значение инпутов", allInputs);
      //console.log("Новое значение инпутов", SroundInputs);

      this.EditInputsFOrCourseTask(allInputs);
      this.round++;
      this.reload++;
      this.reload_preview++;
      //console.log("round", this.round);
    }, */
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
      //console.log("Новое значение", SroundInputs);
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
      //console.log("round", this.round);
    },
    CheckRoundAnswer(i, newOutput) {
      let allcontrols = [];
      let flag = true;
      //allcontrols = this.MakeArrayOfInputsOrOutputs(output);
      //allcontrols = output;
      let v = this.UI.settings.rounds[i - 1];
      for (let j = 0; j < v.roundOutputs.length; j++) {
        let index = newOutput.findIndex(
          ({ control }) => control === v.roundOutputs[j].name
        );
        if (index != -1) {
          if (newOutput[index].value !== v.roundOutputs[j].value) {
            flag = false;
          }
        } else {
          flag = false;
        }
      }
      return flag;
    },
    EditInputsFOrCourseTask(allinputs) {
      //console.log("123", );
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
    /*
    EditInputsFOrCourseTask(allinputs) {
      console.log("новыелцооуцу", allinputs);
      for (let i = 0; i < allinputs.length; i++) {
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
            this.UI.controls.cards[j].value = allinputs[i].value;
          }
        }
      }
      console.log("изменение", this.inputs);
    }, */
    //#endregion

    PutFunctionOnButton() {
      for (let k = 0; k < this.Code.functions.length; k++) {
        this.UI.buttons[this.Code.functions[k].control - 1].functionNumber = k;
      }
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
    PushInputALLControls() {
      var arrayOfInputControls = [];
      this.UI.controls.textareas.forEach(function (i) {
        arrayOfInputControls.push(i);
      });
      this.UI.controls.groupsOfRadioboxes.forEach(function (i) {
        arrayOfInputControls.push(i);
      });
      this.UI.controls.staticTables.forEach(function (i) {
        for (let j = 0; j < i.blocks.length; j++) {
          arrayOfInputControls.push(i.blocks[j]);
        }
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
      return arrayOfInputControls;
    },
    ClearAllInputs() {
      for (let i = 0; i < this.UI.inputCount; i++) {
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
    BlocksInputs(table, block) {
      // console.log("block", block, table)
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
            //console.log("block", new_block)
          }
        }
      }
      return [table, new_block];
    },
    /*
    BlocksInputs(tableIndex, blockindex) {
      if (
        this.UI.controls.staticTables[tableIndex].blocks[blockindex].type ==
          "массив_чисел" ||
        this.UI.controls.staticTables[tableIndex].blocks[blockindex].type ==
          "массив_текста"
      ) {
        for (
          let i = 0;
          i <
          this.UI.controls.staticTables[tableIndex].blocks[blockindex].value
            .length;
          i++
        ) {
          for (
            let j = 0;
            j <
            this.UI.controls.staticTables[tableIndex].blocks[blockindex].value[
              i
            ].length;
            j++
          ) {
            this.PushBlockInputsInStaticTableInputs(
              tableIndex,
              blockindex,
              i,
              j
            );
          }
        }
      }
    }, */
  },
  watch: {
    UI_structure_watched: {
      handler(newVal, oldVal) {
        if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
          let new_structure = newVal;
          let old_structure = oldVal;
          let runned = false;
          for(let i = 0; i < new_structure.length; i++) {
            console.log("run_code", this.run_code)
            if(JSON.stringify(new_structure[i]) !== JSON.stringify(old_structure[i]) && this.run_code===true) {
              this.reloads[i]++;
              console.log(i);
              runned = true;
            }
          }
          if(this.status === 'stop_run_code' || this.status === 'stop_run_code_period') 
          {
            console.log("wlkejwlje")
            this.run_code=false;
          }
          /*
          if(runned===true)
          {
            this.run_code=false;
          } */
          if(this.UI.structure.length !== this.reloads.length) {
            this.reloads=[];
            for(let i = 0; i < this.UI.structure.length; i++) {
              this.reloads.push(0);
            }
          }
        }
      },
      deep: true,
    },
  },
  computed: {
    UI_structure_watched: function () {
      return JSON.parse(JSON.stringify(this.UI.structure));
    },
  },
};
</script>

<style scoped>
.siteArea {
  margin: 20px;
}

.createdButton {
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 5px;
}

.accordion-button {
  padding: 0;
}

.accordion-header {
}

.nav-link {
  color: #fff;
}

.modal-backdrop.fade {
  opacity: 0;
}
</style>
