<template>
  <div class="d-flex align-items-start">
    <div
      class="nav flex-column nav-pills vh-100"
      id="v-pills-tab"
      role="tablist"
      aria-orientation="vertical"
      style="background-color: rgb(28, 31, 33)"
    >
      <button
        class="btn text-light rounded-0"
        style="background-color: rgb(28, 31, 33)"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasScrolling"
        aria-controls="offcanvasScrolling"
      >
        ?
      </button>
      <button
        class="btn text-light rounded-0"
        type="button"
        style="background-color: rgb(28, 31, 33)"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasWithBackdrop"
        aria-controls="offcanvasWithBackdrop"
      >
        ->
      </button>
    </div>
    <div>
      <div
        class="card text-white bg-success rounded-0"
        v-if="TrainerCourseUser.progress >= $route.params.task"
      >
        <div class="card-body d-flex">
          <div class="card-text">Задание выполнено и зачтено!</div>
          <RouterLink
            :to="
              `/trainercourse/` +
              $route.params.id +
              `/` +
              String(parseInt($route.params.task) + 1)
            "
            class="btn btn-sm btn-light"
            style="margin-left: 1rem"
          >
            Далее
          </RouterLink>
        </div>
      </div>
      <div class="p-2 d-flex">
        <div class="siteArea">
          <h3>{{ UI.name }}</h3>
          <!--
          <ReadyUI
            :UI="UI"
            :round="round"
            :roundFlag="roundFlag"
            :loaded="loaded"
            :reload="reload"
            :Code="Code"
            @inputGroupOfRadioboxes="InputGroupOfRadioboxes"
            @testInput="TestInput"
            @inputTextArea="InputTextArea"
            @inputTextInput="InputTextInput"
            @inputCheckbox="InputCheckbox"
            @inputStaticTableInputs="InputStaticTableInputs"
            @readInputsFromNextRound="ReadInputsFromNextRound"
          ></ReadyUI>-->
        </div>
      </div>

      <div>
        <div
          class="completed alert alert-success d-flex align-items-center"
          role="alert"
          v-if="isDone == true"
        >
          <svg
            class="bi flex-shrink-0 me-2"
            width="24"
            height="24"
            role="img"
            aria-label="Success:"
          >
            <use xlink:href="#check-circle-fill" />
          </svg>
          <div>Задание выполнено!</div>
        </div>
        <div v-if="loaded === true">
          <RouterLink
            v-if="$route.params.task != TrainerCourse.number_of_tasks"
            :to="
              `/trainercourse/` +
              TrainerCourse.id +
              `/` +
              String(parseInt($route.params.task) + 1)
            "
            class="btn btn-success"
            >Дальше</RouterLink
          >
          <RouterLink v-else to="/user" class="btn btn-success"
            >Конец</RouterLink
          >
        </div>
      </div>
    </div>
  </div>

  <!--Навигационная панель курса-->
  <div
    class="offcanvas offcanvas-start w-50"
    data-bs-scroll="true"
    data-bs-backdrop="false"
    tabindex="-1"
    id="offcanvasScrolling"
    aria-labelledby="offcanvasScrollingLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasScrollingLabel">Теория</h5>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Закрыть"
      ></button>
    </div>
    <div class="offcanvas-body">
      <h5>{{ courseTask.name }}</h5>
      <p>
        {{ courseTask.description }}
      </p>
      <div class="card">
        <div class="card-body" style="width: 20rem">
          {{ UI.description }}
        </div>
      </div>
    </div>
  </div>
  <div
    class="offcanvas offcanvas-start"
    data-bs-scroll="true"
    tabindex="-1"
    id="offcanvasWithBackdrop"
    aria-labelledby="offcanvasWithBackdropLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasWithBackdropLabel">
        Задания курса
      </h5>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Закрыть"
      ></button>
    </div>
    <div class="offcanvas-body">
      <div class="btn-group-vertical" role="group" aria-label="Basic example">
        <RouterLink
          v-for="i in TrainerCourseUser.progress"
          :to="`/trainercourse/` + TrainerCourse.id + `/` + String(i)"
          :key="i"
          type="button"
          class="btn btn-success"
        >
          {{ i }}. {{ TrainerCourse.course.tasks[i - 1].name }}
        </RouterLink>
        <RouterLink
          :to="`/trainercourse/` + TrainerCourse.id + `/` + String(i)"
          v-for="i in remain"
          :key="i"
          type="button"
          class="btn btn-outline-primary"
        >
          {{ i + TrainerCourseUser.progress }}.
          {{
            TrainerCourse.course.tasks[i - 1 + TrainerCourseUser.progress].name
          }}
        </RouterLink>
        <!--<button type="button" class="btn btn-primary">Middle</button>-->
      </div>
      <!--
      <ul class="list-group">
        <li
          class="list-group-item"
          v-for="i in TrainerCourse.course.tasks.length"
          :key="i"
        >
          <button v-if="i <= user.settings.progress" class="btn btn-succes">
            {{ i }}. {{ TrainerCourse.course.tasks[i - 1].name }}
          </button>
          <button v-else class="btn btn-primary">
            {{ i }}. {{ TrainerCourse.course.tasks[i - 1].name }}
          </button>
        </li>
      </ul>-->
    </div>
  </div>
  <!--Навигационная панель курса-->
</template>

<script setup>
import axios, { all } from "axios";
/* import ReadyUI from "./constructorItems/ReadyTrainer.vue"; */
import { RouterLink } from "vue-router";

</script>

<script>
export default {
  data() {
    return {
      TrainerCourse: {
        course: {
          tasks: [],
        },
      },
      TrainerCourseUser: {},
      courseTask: {},
      UI: {
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
        UIinputs: [],
        systems: {
          roundSystem: false,
          rounds: [],
        },
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
      },
      Code: {
        functions: [
        ],
      },
      Metadata: {
        id: "",
        name: "",
        author: "",
        description: "",
        created: "",
        status: "",
      },
      Course: {},
      task: {
        description: "",
        rightanswer: {},
      },
      remain: 0,
      isDone: false,
      loaded: false,
      reload: 0,
      round: 0,
      roundFlag: 0,
      inputs: [],
      user: "",
    };
  },
  mounted() {
    /* this.base_url +
          "/trainercourse/" +
          this.$route.params.id +
          "/" +
          this.$route.params.task */
    axios
      .get(
        this.base_url +
          "/trainercourse/" +
          this.$route.params.id +
          "/" +
          this.$route.params.task
      )
      .then((response) => {
        // this.name = response.data.name;
        // this.inputs = response.data.inputs;
        // this.outputs = response.data.outputs;
        // this.functions = response.data.functions;
        this.TrainerCourse = response.data.trainercourse;

        console.log(this.TrainerCourse);
        this.TrainerCourse.course = JSON.parse(this.TrainerCourse.course);
        this.courseTask =
          this.TrainerCourse.course.tasks[this.$route.params.task - 1];
        console.log(this.courseTask);
        //console.log(JSON.parse(this.TrainerCourse.course.tasks[this.$route.params.task - 1]));
        //this.courseTask = JSON.parse(
        //  response.data.trainercourse.course.tasks[this.$route.params.task - 1]
        //  );
        if (response.data.dataUI != "") {
          this.UI = response.data.dataUI;
          this.Code = response.data.code;
        } else {
          this.UI.name = response.data.name;
          this.UI.inputCount = response.data.inputs;
          this.UI.outputCount = response.data.outputs;
          this.UI.functionCount = response.data.functions;
          for (let i = 0; i < this.UI.functionCount; i++) {
            this.UI.functions.push({
              name: "Function" + String(i),
              control: "",
              value: "",
            });
          }
          /*
                    this.UI.functions.push({
                      name: "ClearAllInputs",
                      control: "",
                      value: "",
                    }); */
          for (let i = 0; i < this.UI.inputCount; i++) {
            this.UI.inputs.push({
              name: "Input" + String(i),
              value: "",
              originalValue: "",
              type: "",
            });
          }
          for (let i = 0; i < this.UI.outputCount; i++) {
            this.UI.outputs.push({
              name: "Output" + String(i),
              control: "",
              value: "",
            });
          }
          this.Code.functions = [];
          for (let i = 0; i < this.UI.functionCount; i++) {
            this.Code.functions.push({
              functionCode:
                "def function(x):\n" +
                "    answer = x + 1\n" +
                "    return answer",
              jsonInput: "{ input: }",
              jsonOutput: "card1",
            });
          }
        }
        console.log("Тренажёр: ", this.UI);
        /*
                for (let i = 0; i < this.UI.inputCount; i++) {
                  this.inputs.push({ name: "Input" + String(i), value: "" });
                }*/
        //this.UI.id = this.$route.params.id;
        //this.inputCount = this.UI.inputCount;
        //this.functionCount = this.UI.functionCount;
        //this.Code.functions;
        //this.outputCount = this.UI.outputCount;
        //this.TrainerCourse = response.data.trainercourse;
        //this.task = this.TrainerCourse.tasks[this.$route.params.task];
        this.inputs = this.UI.inputs;
        console.log(response.data);
        console.log(this.base_url);
        //console.log();
        this.user = JSON.parse(localStorage.getItem("user"));
        this.user.settings = JSON.parse(this.user.settings);
        console.log("user -", this.user.settings);
        for (let i = 0; i < this.user.settings.trainercourses.length; i++) {
          if (typeof this.user.settings.trainercourses[i].course == "string")
            this.user.settings.trainercourses[i].course = JSON.parse(
              this.user.settings.trainercourses[i].course
            );
        }
        this.TrainerCourseUser = this.user.settings.trainercourses.find(
          (course) => course.id === this.TrainerCourse.id
        );
        console.log("Курс, ", this.TrainerCourseUser);
        console.log(
          "длина",
          this.TrainerCourse.course.tasks.length -
            this.TrainerCourseUser.progress
        );
        this.remain =
          this.TrainerCourse.course.tasks.length -
          this.TrainerCourseUser.progress;
        this.ChangeInputsForCourseTask();
        this.loaded = true;
        //console.log("Таблица", this.UI.controls.staticTables);
      });

    // var inputs;
    console.log("Все успешно завершено!");
  },
  computed: {
    RemainLength() {
      let answer =
        this.TrainerCourse.course.tasks.length -
        parseInt(this.TrainerCourseUser.progress);
      return answer;
    },
  },
  methods: {
    //#region Функции для инпутов
    InputTextArea(newValue) {
      this.UI.controls.textareas = newValue;
    },
    InputTextInput(newValue) {
      this.UI.controls.textinputs = newValue;
    },
    //#endregion

    //#region Функции со статистическими таблицами
    PutInputInStaticTableBlock(tableIndex, j1, j2) {
      console.log("Координаты -", "x:", j2, "y:", j1);

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
              j1 - 1 - yStart
            ][j2 - 1 - xStart] = parseInt(tableInput);
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
      console.log(j, i);
      this.PutInputInStaticTableBlock(tableIndex, i + 1, j + 1);

      console.log(this.UI.controls.staticTables);
    },
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
    },
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
    },
    //#endregion

    //#region Функции с динамическими таблицами
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
          console.log(j1, j2);
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
        console.log("Проверка", arrayOfInputs[i][arrayOfInputs[i].length - 1]);
        if (arrayOfInputs[i][arrayOfInputs[i].length - 1] == "\\") {
          arrayOfInputs[i] = arrayOfInputs[i].slice(0, -1);
        }
      }
      return arrayOfInputs;
    },
    //#endregion

    //#region Функции для запуска функции

    TransOutputToJSON(outputs) {
      let string = "";
      string += "{";
      string += `\n`;
      for (let i = 0; i < outputs.length; i++) {
        string += `"` + outputs[i].name + `": "` + outputs[i].control + `"`;
        if (i !== outputs.length - 1) {
          string += `,`;
        }
        string += `\n`;
      }
      string += "}";
      return string;
    },
    TransToJSON(UIinputs, inputs) {
      let string = "";
      string += "[";
      string += `\n`;
      for (let i = 0; i < inputs.length; i++) {
        let index = UIinputs.findIndex(
          (element) => element.name === inputs[i].name
        );
        if (index != -1) {
          string +=
            `{"` +
            UIinputs[index].name +
            `": "` +
            UIinputs[index].control +
            `", "type": 1}`;
          if (i !== inputs.length - 1) {
            string += `,`;
          }
          string += `\n`;
        }
      }
      string += "]";
      console.log("чё", string);
      return string;
    },
    SwitchForJSON_ready(block) {
      console.log("Его состояние", block);

      for (let i = 0; i < block.value.length; i++) {
        for (let j = 0; j < block.field.length; j++) {
          switch (block.inputType[i][j]) {
            case "число":
              block.value[i][block.field[j]] = parseInt(
                block.value[i][block.field[j]]
              );
              console.log(block);
              break;
            default:
              break;
          }
        }
      }
      return block;
    },
    ParsingJSONinJsonOutput(jsonOutput) {
      let jsonString = JSON.stringify(jsonOutput);
      //jsonOutput.forEach(element => console.log(element));
    },
    MakeCode(code, UIinputs) {
      let newCode = "";
      newCode += "def function(object):\n";
      newCode += "  answer={}\n";
      for (let i = 0; i < UIinputs.length; i++) {
        newCode +=
          "  " + UIinputs[i].name + ` = object["` + UIinputs[i].name + `"]\n`;
      }
      newCode += code;
      newCode += "  json_answer = json.dumps(answer)\n";
      newCode += "  return json_answer\n";
      console.log("Код", newCode);
      return newCode;
    },
    TestInput(functionNumber, buttonNumber) {
      // Формирование кода
      console.log("funfunfun", this.Code.functions[functionNumber]);
      console.log("Номер -", functionNumber, buttonNumber);
      // Запуск периодичной функции
      let command = "";
      if (functionNumber === "clear") {
        this.ClearAllInputs();
        return 0;
      }
      if (this.Code.functions[functionNumber].period == true) {
        if (buttonNumber + 1 === this.Code.functions[functionNumber].control) {
          const self = this;
          let delay =
            parseInt(self.Code.functions[functionNumber].periodsec) * 1000;
          //this.LaunchFunction(functionNumber);
          let timerid = setInterval(function tick() {
            self.LaunchFunction(functionNumber, buttonNumber);
          }, delay);
          this.timerIds.push(timerid);
          console.log("Таймер", timerid, this.timerIds);
          return 0;
        } else {
          console.log("Таймеры", this.timerIds);
          command = this.FindCommand(functionNumber, buttonNumber);
          clearTimeout(this.timerIds.slice(-1));
          this.timerIds.pop();
          this.LaunchFunction(functionNumber, buttonNumber);
          //console.log("Прочие данные", command, functionNumber, parseInt(buttonNumber))
          return 0;
          //this.LaunchFunction(functionNumber, buttonNumber);
          //const self = this;
        }

        //this.LaunchFunctionPeriod(functionNumber, buttonNumber); // функция исполнения тренажера с командами
        //return 0;
      }
      // Остановка функции
      if (this.Code.functions[functionNumber].stopPeriod === true) {
        //this.EndPeriodFunction();
        //console.log(this.timerIds);
        //console.log("мы останавливаем процесс!");
        return 0;
      }
      //console.log("Таблички", this.UI.controls.staticTables);
      // Запуск функции с очищением
      if (functionNumber >= 0 && functionNumber != "clear") {
        console.log("Код", this.Code);
        this.LaunchFunction(functionNumber);
        console.log("Код", this.Code);
      }
    },
    LaunchFunction(number, button_number) {
      let functionCode = "";
      let axiosTest = "";
      var arrayOfInputs = "";
      let indexCommand = "";
      console.log("Еееее", number, parseInt(button_number));
      if (this.Code.functions[number].period == true) {
        if (this.Code.functions[number].commands != undefined) {
          for (
            let index = 0;
            index < this.Code.functions[number].commands.length;
            index++
          ) {
            if (
              this.Code.functions[number].commands[index].button ===
              button_number + 1
            ) {
              indexCommand = index;
            }
          }
        }
      }
      console.log("id команды -", indexCommand);
      // Функция создание входных данных для axios.
      if (
        button_number + 1 === this.Code.functions[number].control ||
        this.Code.functions[number].period != true
      ) {
        functionCode = this.MakeCode(
          this.Code.functions[number].functionCode,
          this.UI.UIinputs,
          this.Code.functions[number]
        );
      } else {
        functionCode = this.MakeCode(
          this.Code.functions[number].commands[indexCommand].commandCode,
          this.UI.UIinputs,
          this.Code.functions[number].commands[indexCommand]
        );
      }
      let returnedInputData = this.InputData(
        number,
        indexCommand,
        button_number,
        functionCode,
        axiosTest,
        arrayOfInputs
      );
      functionCode = returnedInputData.functionCode;
      axiosTest = returnedInputData.axiosTest;
      arrayOfInputs = returnedInputData.arrayOfInputs;
      console.log(functionCode, axiosTest, arrayOfInputs);
      let data1 = {
        dataUI: this.UI,
        code: this.Code,
        functionCode: functionCode,
        input: axiosTest,
        arrayOfInputs: arrayOfInputs,
      };
      console.log("ЭЭЭЭЭЭЭ", data1);
      axios({
        method: "put",
        url: this.base_url + "/constructor/" + this.$route.params.id,
        data: {
          dataUI: this.UI,
          code: this.Code,
          functionCode: functionCode,
          input: axiosTest,
          arrayOfInputs: arrayOfInputs,
        },
        validateStatus: (status) => {
          return true; // I'm always returning true, you may want to do it depending on the status received
        },
      })
        .catch((error) => {})
        .then((response) => {
          //console.log(this.UI.controls.cards);
          //console.log(this.Code.functions[number].jsonOutput);
          // массив выходных данных
          var output = this.TransOutputToJSON(this.UI.outputs);
          let newOutput = [];
          for (let i = 0; i < this.UI.outputs.length; i++) {
            newOutput.push({
              name: this.UI.outputs[i].name,
              control: this.UI.outputs[i].control,
              value: "",
            });
          }
          var arrayOfOutputs = this.MakeArrayOfInputsOrOutputs(output);
          // console.log("Выходные данные -", arrayOfOutputs);
          output = JSON.parse(output);
          //output = JSON.parse(this.Code.functions[number].jsonOutput);
          // console.log("Еще данные", output);
          // выходные данные
          var jsonOutput = JSON.parse(response.data.output);
          console.log("Выходные данные из функции -", response.data.output);
          console.log("Выходные данные из функции -", jsonOutput);
          for (let j = 0; j < newOutput.length; j++) {
            console.log(newOutput);
            //console.log(jsonOutput[newOutput[0].name])
            console.log(jsonOutput);
            //console.log(jsonOutput[0])
            //let si = newOutput.findIndex(({name}) => jsonOutput[name] !== undefined);
            //console.log("ОГО", si)
            if (jsonOutput[newOutput[j].name] != undefined) {
              console.log("ОГО", jsonOutput[newOutput[j].name]);
              newOutput[j].value = jsonOutput[newOutput[j].name];
              // json
            }
          }
          console.log(arrayOfOutputs);
          console.log(this.UI.outputs);
          //output =
          //console.log(JSON.parse(jsonOutput.table))
          for (let j = 0; j < arrayOfOutputs.length; j++) {
            let result = this.UI.controls.cards.findIndex(
              ({ name }) => name === output[arrayOfOutputs[j]]
            );
            //console.log(result);
            if (result != -1) {
              this.UI.controls.cards[result].value =
                jsonOutput[arrayOfOutputs[j]];
            }
            // просмотр таблиц и блоков
            for (let k = 0; k < this.UI.controls.staticTables.length; k++) {
              let result = this.UI.controls.staticTables[k].blocks.findIndex(
                ({ name }) => name === output[arrayOfOutputs[j]]
              );
              //поиск индекса
              let result2 = this.UI.controls.staticTables[k].blocks.findIndex(
                ({ color_block }) => {
                  if (color_block != undefined) {
                    return color_block.value === output[arrayOfOutputs[j]];
                  }
                }
              );
              //console.log("каков цвет =", result2);
              //console.log(result2);
              if (result != -1) {
                this.UI.controls.staticTables[k].blocks[result].value =
                  jsonOutput[arrayOfOutputs[j]];
                for (
                  let i =
                    this.UI.controls.staticTables[k].blocks[result].y_start;
                  i <= this.UI.controls.staticTables[k].blocks[result].y_end;
                  i++
                ) {
                  for (
                    let ii =
                      this.UI.controls.staticTables[k].blocks[result].x_start;
                    ii <= this.UI.controls.staticTables[k].blocks[result].x_end;
                    ii++
                  ) {
                    this.UI.controls.staticTables[k].inputs[
                      (i - 1) * this.UI.controls.staticTables[k].columns +
                        (ii - 1)
                    ] =
                      this.UI.controls.staticTables[k].blocks[result].value[
                        i -
                          this.UI.controls.staticTables[k].blocks[result]
                            .y_start
                      ][
                        ii -
                          this.UI.controls.staticTables[k].blocks[result]
                            .x_start
                      ];
                    //console.log(this.UI.controls.staticTables[k]);
                  }
                }
              }
              if (result2 != -1) {
                this.loaded = false;
                this.UI.controls.staticTables[k].blocks[
                  result2
                ].color_block.number = jsonOutput[arrayOfOutputs[j]];
                console.log(
                  "каков цвет =",
                  this.UI.controls.staticTables[k].blocks[result2].color_block
                );
                this.reload++;
                this.loaded = true;
              }
            }
            // просмотр таблиц и блоков
            for (let k = 0; k < this.UI.controls.dynamicTables.length; k++) {
              let result = this.UI.controls.dynamicTables[k].blocks.findIndex(
                ({ name }) => name === output[arrayOfOutputs[j]]
              );
              if (result != -1) {
                if (
                  this.UI.controls.dynamicTables[k].blocks[result].type ==
                  "json_ready"
                ) {
                  let stringJSON = JSON.stringify(
                    jsonOutput[arrayOfOutputs[j]]
                  );
                  let field = this.MakeFieldInDynamicBlock(stringJSON);
                  this.UI.controls.dynamicTables[k].blocks[result].field =
                    field;
                  this.UI.controls.dynamicTables[k].blocks[result].value =
                    JSON.parse(jsonOutput[arrayOfOutputs[j]]);
                  //console.log(JSON.parse(jsonOutput[arrayOfOutputs[j]]));
                }
                // console.log(result);
              }
            }
          }
          for (let j = 0; j < arrayOfOutputs.length; j++) {
            let result = this.inputs.findIndex(
              ({ name }) => name === output[arrayOfOutputs[j]]
            );
            if (result != -1) {
              this.inputs[result].value = jsonOutput[arrayOfOutputs[j]];
            }
          }
          /*
          if (this.UI.systems.roundSystem === true) {
            let flag = this.CheckRoundAnswer(this.round, newOutput);
            if (flag === false) {
              this.roundFlag = 1; //1 - значит неправильно!
            } else {
              this.roundFlag = 2; //2 - значит правильно!
            }
            console.log("флаг =", this.roundFlag);
          } */
          this.CheckRightAnswer(jsonOutput);
          //this.reload++;
          //console.log(this.PushInputControls());
          //console.log(this.UI.controls.cards);
        });
    },
    InputData(
      number,
      indexCommand,
      button_number,
      functionCode,
      axiosTest,
      arrayOfInputs
    ) {
      if (
        button_number + 1 === this.Code.functions[number].control ||
        this.Code.functions[number].period != true
      ) {
        this.Code.functions[number].jsonInput = this.TransToJSON(
          this.UI.UIinputs,
          this.Code.functions[number].inputs
        );
        arrayOfInputs = this.MakeArrayOfInputsOrOutputs(
          this.Code.functions[number].jsonInput
        );
      } else {
        console.log("аацуджццщуощж");
        this.Code.functions[number].jsonInput = this.TransToJSON(
          this.UI.UIinputs,
          this.Code.functions[number].commands[indexCommand].inputs
        );
        arrayOfInputs = this.MakeArrayOfInputsOrOutputs(
          this.Code.functions[number].jsonInput
        );
      }
      // Создаётся массив из элементов
      // Анализ
      console.log(arrayOfInputs);
      console.log(arrayOfInputs);
      console.log("TEST!!");
      var test = JSON.parse(this.Code.functions[number].jsonInput);
      // Здесь заменяются значения в JSON на значения из контроллов;

      console.log(this.PushInputControls());
      var arrayOfInputControls = this.PushInputControls();
      // Смотри по textareas
      axiosTest = {};
      console.log(test);
      for (let j = 0; j < arrayOfInputs.length; j++) {
        console.log(j, " итерация");
        console.log(test[j], arrayOfInputs[j]);
        console.log(arrayOfInputControls);
        let result = arrayOfInputControls.find(
          ({ name }) =>
            name === test[j][arrayOfInputs[j]] && test[j]["type"] == 1
        );
        console.log(result);
        if (result != undefined) {
          axiosTest[arrayOfInputs[j]] = result.value;
          console.log("Вход - ", axiosTest[arrayOfInputs[j]]);
          // Здесь заменяются значения в JSON на значения из контроллов;
          if (result.type == "число") {
            axiosTest[arrayOfInputs[j]] = parseInt(axiosTest[arrayOfInputs[j]]);
          }
          if (result.type == "json") {
            console.log(test[j][arrayOfInputs[j]]);
            axiosTest[arrayOfInputs[j]] = JSON.parse(
              axiosTest[arrayOfInputs[j]]
            );
          }
          if (result.type == "массив_текста") {
            if (result.table == true) {
              axiosTest[arrayOfInputs[j]] = result.inputs;
              console.log(axiosTest[arrayOfInputs[j]]);
            }
          }
          if (result.type == "json_ready") {
            console.log(test[j][arrayOfInputs[j]]);
            console.log("Старый блок -", result);
            let new_result = this.SwitchForJSON_ready(result);
            console.log("Новый блок -", new_result);
            axiosTest[arrayOfInputs[j]] = new_result.value;
            console.log(axiosTest[arrayOfInputs[j]]);
          }
        }
        if (test[j]["type"] == 0) {
          axiosTest[arrayOfInputs[j]] = test[j][arrayOfInputs[j]];
          console.log(0);
        }
      }
      // определяем функция или команда
      let length = 0;
      if (
        button_number + 1 === this.Code.functions[number].control ||
        this.Code.functions[number].period != true
      ) {
        length = this.Code.functions[number].inputs.length;
      } else {
        length =
          this.Code.functions[number].commands[indexCommand].inputs.length;
      }
      for (let j = 0; j < length; j++) {
        let index = 0;
        if (
          button_number + 1 === this.Code.functions[number].control ||
          this.Code.functions[number].period != true
        ) {
          index = this.inputs.findIndex(
            (element) =>
              element.name === this.Code.functions[number].inputs[j].name
          );
        } else {
          index = this.inputs.findIndex(
            (element) =>
              element.name ===
              this.Code.functions[number].commands[indexCommand].inputs[j].name
          );
        }
        if (index != -1) {
          axiosTest[this.inputs[index].name] = this.inputs[index].value;
          if (this.inputs[index].type == "число") {
            axiosTest[this.inputs[index].name] = parseInt(
              axiosTest[this.inputs[index].name]
            );
          }
          if (this.inputs[index].type == "json") {
            axiosTest[this.inputs[index].name] = JSON.parse(
              axiosTest[this.inputs[index].name]
            );
          }
          if (this.inputs[index].type == "boolean") {
            if (
              axiosTest[this.inputs[index].name] === "true" ||
              axiosTest[this.inputs[index].name] === true
            ) {
              axiosTest[this.inputs[index].name] = true;
            } else {
              axiosTest[this.inputs[index].name] = false;
            }
          }
        }
      }
      let returnedInputData = {
        functionCode: functionCode,
        axiosTest: axiosTest,
        arrayOfInputs: arrayOfInputs,
      };
      console.log("Чё получилось", returnedInputData);
      return returnedInputData;
    },
    MakeArrayOfInputsOrOutputs(put) {
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
          console.log(j1, j2);
          if (put.slice(j1 + 1, j2) !== "type") {
            arrayOfInputs.push(put.slice(j1 + 1, j2));
          }
          j1 = undefined;
          j2 = undefined;
        }
      }
      return arrayOfInputs;
    },
    PushInputControls() {
      var arrayOfInputControls = [];
      //arrayOfInputControls.push({name: ""});
      //arrayOfInputControls.push({name: "", array: "dwe"});
      //console.log(arrayOfInputControls)
      this.UI.controls.textareas.forEach(function (i) {
        arrayOfInputControls.push(i);
      });
      /* использование радиобоксов*/
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

        /*
        i.blocks.foreach(function (j) {
          arrayOfInputControls.push(j);
        }) */
      });
      this.UI.controls.textinputs.forEach(function (i) {
        arrayOfInputControls.push(i);
      });
      return arrayOfInputControls;
    },
    PushOutputControls() {},
    PushInputALLControls() {
      var arrayOfInputControls = [];
      //arrayOfInputControls.push({name: ""});
      //arrayOfInputControls.push({name: "", array: "dwe"});
      //console.log(arrayOfInputControls)
      this.UI.controls.textareas.forEach(function (i) {
        arrayOfInputControls.push(i);
      });
      /* использование радиобоксов*/
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

        /*
        i.blocks.foreach(function (j) {
          arrayOfInputControls.push(j);
        }) */
      });
      this.UI.controls.textinputs.forEach(function (i) {
        arrayOfInputControls.push(i);
      });
      this.inputs.forEach(function (i) {
        arrayOfInputControls.push(i);
      });
      console.log("S", this.inputs);
      return arrayOfInputControls;
    },
    //#endregion

    //#region Функции для раундовой системы
    EditInputsFOrCourseTask(allinputs) {
      //var arrayOfInputControls = [];
      //arrayOfInputControls.push({name: ""});
      //arrayOfInputControls.push({name: "", array: "dwe"});
      //console.log(arrayOfInputControls)
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
      }
      console.log("изменение", this.inputs);
    },
    //#endregion

    ClearAllInputs() {
      console.log("Инпуты -", this.UI.inputs);
      for (let i = 0; i < this.UI.inputCount; i++) {
        this.UI.inputs[i].value = this.UI.inputs[i].originalValue;
      }
      console.log(this.UI.inputs);
    },
    CheckRightAnswer(string_output) {
      // console.log(this.courseTask.right_answer);
      //console.log(JSON.stringify(string_output));
      let jsonRight = JSON.parse(this.courseTask.right_answer);
      console.log("Ответы: ", JSON.stringify(string_output));
      console.log("Ответы: ", this.courseTask.right_answer);
      //console.log("Ответы: ",  string_output);
      //console.log("Ответы: ", JSON.parse(this.courseTask.right_answer));
      //console.log(string_output == JSON.parse(this.courseTask.right_answer))
      if (
        JSON.stringify(string_output) == this.courseTask.right_answer ||
        JSON.stringify(string_output) == JSON.stringify(jsonRight)
      ) {
        this.isDone = true;
        if (this.TrainerCourseUser.progress + 1 == this.$route.params.task) {
          this.TrainerCourseUser.progress++;
          //if (this.remain > 0) {
          this.remain--;
          this.AddCourseToUser();
          //}
        }
        //this.AddCourseToUser()
      }
      console.log(this.isDone);
    },
    AddCourseToUser() {
      let trainercourse = this.TrainerCourseUser;
      //trainercourse["progress"] = 0;
      axios({
        method: "put",
        url: this.base_url + "/trainercourse/" + this.$route.params.id,
        data: {
          user: this.user,
          trainercourse: trainercourse,
        },
        validateStatus: (status) => {
          return true; // I'm always returning true, you may want to do it depending on the status received
        },
      })
        .catch((error) => {})
        .then((response) => {
          if (response.data.error == false) {
            localStorage.setItem("user", JSON.stringify(response.data.user));
            //localStorage.setItem("jwt", response.data.token);
            if (localStorage.getItem("jwt") != null) {
              this.$emit("loggedIn");
              //this.$router.push("/user");
            }
          } else {
            console.log("ERROR!!!");
          }
          //console.log("YES!");
          //this.isSaved = true;
        });
    },
    /* Изменение инпутов для конкретного задания курса*/
    ChangeInputsForCourseTask() {
      let allInputs = this.PushInputALLControls();
      this.courseTask.inputs = JSON.parse(this.courseTask.inputs);
      console.log("Новое значение", this.courseTask.inputs);
      for (let i = 0; i < this.courseTask.inputs.length; i++) {
        let flag = allInputs.findIndex(
          (object) => object.name == this.courseTask.inputs[i].name
        );
        if (flag != -1) {
          allInputs[flag].value = this.courseTask.inputs[i].value;
        }
      }
      console.log("Новое значение инпутов", allInputs);
      console.log("Новое значение инпутов", this.courseTask.inputs);
      this.EditInputsFOrCourseTask(allInputs);
    },
    RemainLength1() {
      let answer =
        this.TrainerCourse.course.tasks.length -
        this.TrainerCourseUser.progress;
      return answer;
    },
    PutFunctionOnButton() {
      console.log(this.Code.functions);
      for (let k = 0; k < this.Code.functions.length; k++) {
        console.log(k);
        this.UI.buttons[this.Code.functions[k].control - 1].functionNumber = k;
        console.log(this.UI.buttons);
      }
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
</style>

<style>
.list-example,
.list-group-item {
  background-color: #292b2c;
  -webkit-border-radius: 0 !important;
  -moz-border-radius: 0 !important;
  border-radius: 0 !important;
}

.list-group-item {
  border: none;
  color: #fff;
}
</style>
