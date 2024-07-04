<template>
  <form></form>
</template>

<!--
  <script setup>
  import axios from "axios";
  </script>
  -->
<script>
import axios from "axios";
import io from "socket.io-client";
export default {
  props: {
    typeOf: {
      type: Object,
    },
    UI: {
      type: Object,
    },
    Code: {
      type: Object,
    },
    base_url: {
      type: Object,
    },
    inputs: {
      type: Object,
    },
    round: {
      type: Object,
    },
    roundFlag: {
      type: Object,
    },
    rightAnswer: {
      type: Object,
    },
    reload: {
      type: Object,
    },
    loaded: {
      type: Object,
    },
    paramsId: {
      type: Object,
    },
  },
  data(props) {
    let thisIs_data = {
      UI: props.UI,
      Code: props.Code,
      inputs: props.inputs,
      round: props.round,
      roundFlag: props.roundFlag,
      rightAnswer: props.rightAnswer,
      reload: props.reload,
      loaded: props.loaded,
    };
    return {
      timerIds: [],
      thisIs_data: thisIs_data,
      socket: "",
    };
  },

  mounted() {
    this.thisIs_data = {
      UI: this.UI,
      Code: this.Code,
      inputs: this.inputs,
      round: this.round,
      roundFlag: this.roundFlag,
      rightAnswer: this.rightAnswer,
      reload: this.reload,
      loaded: this.loaded,
    };
  },
  watch: {
    launch_api: function (functionNumber, buttonNumber) {
      this.Simbuilder(functionNumber, buttonNumber, this.thisIs_data);
    },
  },
  methods: {
    //#region Функции для запуска функции
    MakeCode(code, UIinputs, function1) {
      let functioninputs = [];
      for (let i = 0; i < function1.inputs.length; i++) {
        let index = UIinputs.findIndex(
          (element) => element.name === function1.inputs[i].name
        );
        if (index != -1) {
          functioninputs.push(UIinputs[index]);
        }
      }
      let newCode = "";
      newCode += "def function(object):\n";
      newCode += "  answer={}\n";
      for (let i = 0; i < functioninputs.length; i++) {
        newCode +=
          "  " +
          functioninputs[i].name +
          ` = object["` +
          functioninputs[i].name +
          `"]\n`;
      }
      newCode += code;
      newCode += "  json_answer = json.dumps(answer)\n";
      newCode += "  return json_answer\n";
      return newCode;
    },
    MakeCodePeriod(functionIndex) {
      let newCode = "";
      newCode += "answer = {}" + "\n";
      newCode +=
        this.thisIs_data.Code.functions[functionIndex].inputCode + "\n";
      newCode += "while True: \n";
      newCode +=
        this.thisIs_data.Code.functions[functionIndex].functionCode + "\n";
      newCode += "    command = input()" + "\n";
      /*
        newCode += "   if command == " + "`None`\n";
        newCode += "      json_answer = json.dumps(answer)\n";
        newCode += "      print(json_answer)\n";*/
      this.thisIs_data.Code.functions[functionIndex].commands.forEach(
        (command) => {
          newCode += "    if command == " + "'" + command.name + "':" + "\n";
          newCode += command.commandCode + "\n";
          newCode += "       json_answer = json.dumps(answer)\n";
          newCode += "       print(json_answer)\n";
        }
      );
      /*
        newCode += "   if command == " + "`stop`\n";
        newCode += "      json_answer = json.dumps(answer)\n";
        newCode += "      print(json_answer)\n"; */
      return newCode;
    },
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
      return string;
    },
    ParsingJSONinJsonOutput(jsonOutput) {
      let jsonString = JSON.stringify(jsonOutput);
    },
    SwitchForJSON_ready(block) {
      for (let i = 0; i < block.value.length; i++) {
        for (let j = 0; j < block.field.length; j++) {
          switch (block.inputType[i][j]) {
            case "число":
              block.value[i][block.field[j]] = parseInt(
                block.value[i][block.field[j]]
              );
              break;
            default:
              break;
          }
        }
      }
      return block;
    },

    AllButons(structure, buttons) {
      let buttons_new = buttons;
      for (let i = 0; i < structure.length; i++) {
        if (structure[i].type == "button") {
          buttons.push(structure[i]);
        }
        if (
          structure[i].structure != [] &&
          structure[i].structure != undefined
        ) {
          buttons_new = this.AllButons(structure[i].structure, buttons);
        }
      }
      return buttons_new;
    },
    AllStaticTables(structure, tables) {
      let tables_new = tables;
      for (let i = 0; i < structure.length; i++) {
        if (structure[i].type == "staticTable") {
          tables.push(structure[i]);
        }
        if (
          structure[i].structure != [] &&
          structure[i].structure != undefined
        ) {
          tables_new = this.AllStaticTables(structure[i].structure, tables);
        }
      }
      return tables_new;
    },
    //#endregion

    Simbuilder(functionNumber, buttonNumber) {
      this.thisIs_data = {
        UI: this.UI,
        Code: this.Code,
        inputs: this.inputs,
        round: this.round,
        roundFlag: this.roundFlag,
        rightAnswer: this.rightAnswer,
        reload: this.reload,
        loaded: this.loaded,
      };
      let control = -1;
      let buttons = this.AllButons(this.thisIs_data.UI.structure, []);
      control = buttons.findIndex(
        (button) => button.attributes.functionNumber === functionNumber
      );
      let command = "";

      if (functionNumber === "clear") {
        //this.thisIs_data = this.ClearAllInputs(this.thisIs_data);
        this.ClearAllInputs(this.thisIs_data);
        this.$emit(`receiveAPI`, this.thisIs_data, "stop_run_code");
        return 0;
      }

      if (this.thisIs_data.Code.functions[functionNumber].period == true) {
        this.LaunchFunctionPeriodic(
          functionNumber,
          buttonNumber,
          buttons,
          control
        );
      }
      // Остановка функции
      if (
        functionNumber >= 0 &&
        functionNumber != "clear" &&
        this.thisIs_data.Code.functions[functionNumber].period != true
      ) {
        this.LaunchFunction(functionNumber, buttonNumber);
        this.$emit(`receiveAPI`, this.thisIs_data, "stop_run_code");
      }
    },
    // возвращает this.thisIs_data
    MakeCodeOfFunctionOrCommand(number, button_number) {
      let functionCode = "";
      let indexCommand = "";
      if (this.thisIs_data.Code.functions[number].period == true) {
        if (this.thisIs_data.Code.functions[number].commands != undefined) {
          for (
            let index = 0;
            index < this.thisIs_data.Code.functions[number].commands.length;
            index++
          ) {
            if (
              this.thisIs_data.Code.functions[number].commands[index].button ===
              button_number + 1
            ) {
              indexCommand = index;
            }
          }
        }
      }
      // Функция создание входных данных для axios.
      if (
        button_number + 1 === this.thisIs_data.Code.functions[number].control ||
        this.thisIs_data.Code.functions[number].period != true
      ) {
        functionCode = this.MakeCode(
          this.thisIs_data.Code.functions[number].functionCode,
          this.thisIs_data.UI.UIinputs,
          this.thisIs_data.Code.functions[number]
        );
      } else {
        functionCode = this.MakeCode(
          this.thisIs_data.Code.functions[number].commands[indexCommand]
            .commandCode,
          this.thisIs_data.UI.UIinputs,
          this.thisIs_data.Code.functions[number].commands[indexCommand]
        );
      }
      return [functionCode, indexCommand];
    },
    LaunchFunction(number, button_number) {
      let functionCode = "";
      let axiosTest = "";
      var arrayOfInputs = "";
      let indexCommand = "";

      [functionCode, indexCommand] = this.MakeCodeOfFunctionOrCommand(
        number,
        button_number
      );

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
      let data1 = {
        functionCode: functionCode,
        input: axiosTest,
        arrayOfInputs: arrayOfInputs,
      };
      axios({
        method: "put",
        url: this.base_url + this.typeOf + "/" + this.paramsId,
        data: {
          functionCode: functionCode,
          input: axiosTest,
          arrayOfInputs: arrayOfInputs,
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
          // массив выходных данных
          var output = this.TransOutputToJSON(this.thisIs_data.UI.outputs);
          let newOutput = [];
          for (let i = 0; i < this.thisIs_data.UI.outputs.length; i++) {
            newOutput.push({
              name: this.thisIs_data.UI.outputs[i].name,
              control: this.thisIs_data.UI.outputs[i].control,
              value: "",
            });
          }
          var arrayOfOutputs = this.MakeArrayOfInputsOrOutputs(output);
          output = JSON.parse(output);
          // выходные данные
          var jsonOutput = JSON.parse(response.data.output);
          for (let j = 0; j < newOutput.length; j++) {
            if (jsonOutput[newOutput[j].name] != undefined) {
              newOutput[j].value = jsonOutput[newOutput[j].name];
              // json
            }
          }
          this.OutputData(arrayOfOutputs, jsonOutput, output);
          this.OutputDataInInputs(arrayOfOutputs, jsonOutput, output);
          if (this.thisIs_data.UI.settings.roundSystem === true) {
            let flag = this.CheckRoundAnswer(this.thisIs_data.round, newOutput);
            if (flag === false) {
              this.thisIs_data.roundFlag = 1; //1 - значит неправильно!
            } else {
              this.thisIs_data.roundFlag = 2; //2 - значит правильно!
            }
          }
        });
    },
    LaunchFunctionPeriodic(number, button_number, buttons, control) {
      let functionCode = "";
      let axiosTest = "";
      var arrayOfInputs = "";
      let indexCommand = -1;

      indexCommand = this.thisIs_data.Code.functions[number].commands.findIndex(
        (command) => command.button == button_number
      );
      if (indexCommand != -1) {
        this.SendCommandToFunction(number, indexCommand);
      }

      if (indexCommand == -1) {
        functionCode = this.MakeCodePeriod(number);
        let returnedInputData = this.InputDataNew(
          number,
          button_number,
          functionCode,
          axiosTest,
          arrayOfInputs
        );
        functionCode = returnedInputData.functionCode;
        axiosTest = returnedInputData.axiosTest;
        arrayOfInputs = returnedInputData.arrayOfInputs;
        let delay = this.thisIs_data.Code.functions[number].periodsec;
        if (this.socket === "") {
          this.CreateConnection(axiosTest, functionCode, arrayOfInputs, delay);
        }
      }
    },
    CreateConnection(axiosTest, functionCode, arrayOfInputs, delay) {
      //this.timer = 0;
      this.socket = io.connect(this.base_url);

      let inputSocket = {
        functionCode: functionCode,
        input: axiosTest,
        arrayOfInputs: arrayOfInputs,
        delay: delay,
      };
      let outputSocket = {};
      let command = "None";
      this.socket.emit("periodFunction", inputSocket);
      let commandData = {
        inputsForCommand: [],
        command: command,
      };
      this.socket.emit("commandFunction", commandData);
      this.socket.on("commandFunction", (arg) => {
        outputSocket = arg;
        var output = this.TransOutputToJSON(this.thisIs_data.UI.outputs);
        let newOutput = [];
        for (let i = 0; i < this.thisIs_data.UI.outputs.length; i++) {
          newOutput.push({
            name: this.thisIs_data.UI.outputs[i].name,
            control: this.thisIs_data.UI.outputs[i].control,
            value: "",
          });
        }
        var arrayOfOutputs = this.MakeArrayOfInputsOrOutputs(output);
        output = JSON.parse(output);
        // выходные данные
        var jsonOutput = JSON.parse(outputSocket);
        for (let j = 0; j < newOutput.length; j++) {
          if (jsonOutput[newOutput[j].name] != undefined) {
            newOutput[j].value = jsonOutput[newOutput[j].name];
          }
        }
        this.OutputData(arrayOfOutputs, jsonOutput, output);
        console.log(commandData)
        this.$emit(`receiveAPI`, this.thisIs_data, "stop_run_code_period",);
        //this.OutputDataInInputs(arrayOfOutputs, jsonOutput, output);
      });
    },
    SendCommandToFunction(number, indexCommand) {
      let command =
        this.thisIs_data.Code.functions[number].commands[indexCommand].name;
      let inputs =
        this.thisIs_data.Code.functions[number].commands[indexCommand].inputs;
      let inputsForCommand = this.CommandInputs(number, indexCommand);
      let commandData = {
        inputsForCommand: inputsForCommand,
        command: command,
      };
      if (this.socket !== "") {
        this.socket.emit("commandFunction", commandData, "stop_run_code_period");
      }
      if (command === `stop`) {
        //this.socket.disconnect();
        this.socket = "";
        //console.log("CLOSE CONNECTION!!!");
      }
    },
    CommandInputs(number, indexCommand) {
      let jsonInput = this.TransToJSON(
        this.thisIs_data.UI.UIinputs,
        this.thisIs_data.Code.functions[number].commands[indexCommand].inputs
      );
      let arrayOfInputs = this.MakeArrayOfInputsOrOutputs(jsonInput);
      var test = JSON.parse(jsonInput);
      var arrayOfInputControls = this.PushInputControls(
        this.thisIs_data.UI.structure,
        []
      );
      var inputsForCommand = [];
      let axiosTest = {};
      for (let j = 0; j < arrayOfInputs.length; j++) {
        let result = arrayOfInputControls.find(
          ({ attributes }) =>
            attributes.name === test[j][arrayOfInputs[j]] &&
            test[j]["type"] == 1
        );

        if (result != undefined) {
          axiosTest[arrayOfInputs[j]] = result.attributes.value;
          // Здесь заменяются значения в JSON на значения из контроллов;
          if (result.type == "число") {
            axiosTest[arrayOfInputs[j]] = parseInt(axiosTest[arrayOfInputs[j]]);
          }
          if (result.type == "json") {
            axiosTest[arrayOfInputs[j]] = JSON.parse(
              axiosTest[arrayOfInputs[j]]
            );
          }
          if (result.type == "массив_текста") {
            if (result.table == true) {
              axiosTest[arrayOfInputs[j]] = result.inputs;
            }
          }
          if (result.type == "json_ready") {
            let new_result = this.SwitchForJSON_ready(result);
            axiosTest[arrayOfInputs[j]] = new_result.value;
          }
        }
        if (test[j]["type"] == 0) {
          axiosTest[arrayOfInputs[j]] = test[j][arrayOfInputs[j]];
        }
      }
      for (let j = 0; j < arrayOfInputs.length; j++) {
        inputsForCommand.push(axiosTest[arrayOfInputs[j]]);
      }
      return inputsForCommand;
    },
    // вызов команды
    // возвращает this.thisIs_data
    LaunchCommand(number, button_number) {
      let functionCode = "";
      let axiosTest = "";
      var arrayOfInputs = "";
      let command = "";
      let delay = "";
      let startPeriod = true;
      command = this.FindCommand(number, button_number);
      delay = this.thisIs_data.Code.functions[number].periodsec;
      axios({
        method: "put",
        url: this.base_url + this.typeOf + "/" + this.paramsId + "/period",
        data: {
          dataUI: this.thisIs_data.UI,
          code: this.thisIs_data.Code,
          functionCode: functionCode,
          input: axiosTest,
          arrayOfInputs: arrayOfInputs,
          startPeriod: startPeriod,
          command: command,
          delay: delay,
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
          // массив выходных данных
          var output = this.TransOutputToJSON(this.thisIs_data.UI.outputs);
          let newOutput = [];
          for (let i = 0; i < this.thisIs_data.UI.outputs.length; i++) {
            newOutput.push({
              name: this.thisIs_data.UI.outputs[i].name,
              control: this.thisIs_data.UI.outputs[i].control,
              value: "",
            });
          }
          var arrayOfOutputs = this.MakeArrayOfInputsOrOutputs(output);
          output = JSON.parse(output);
          var jsonOutput = JSON.parse(response.data.output);
          for (let j = 0; j < newOutput.length; j++) {
            if (jsonOutput[newOutput[j].name] != undefined) {
              newOutput[j].value = jsonOutput[newOutput[j].name];
            }
          }
          // данные идут в контроллы
          this.OutputData(arrayOfOutputs, jsonOutput, output);
          // данные идут в инпуты, которые изменяется в течении всего тренажёра
          this.OutputDataInInputs(arrayOfOutputs, jsonOutput, output);
          // данные раундов
          //this.RoundData(newOutput)
          if (this.thisIs_data.UI.settings.roundSystem === true) {
            let flag = this.CheckRoundAnswer(this.thisIs_data.round, newOutput);
            if (flag === false) {
              this.thisIs_data.roundFlag = 1; //1 - значит неправильно!
            } else {
              this.thisIs_data.roundFlag = 2; //2 - значит правильно!
            }
          }
        });
    },
    FindCommand(functionNumber, buttonNumber) {
      let fun = this.thisIs_data.Code.functions[functionNumber]; //очень весело ^_^
      let command = fun.commands.findIndex(
        (command) => command.button === buttonNumber + 1
      );
      command = fun.commands[command].name;
      return command;
    },
    InputData(
      number,
      indexCommand,
      button_number,
      functionCode,
      axiosTest,
      arrayOfInputs
    ) {
      this.thisIs_data.Code.functions[number].jsonInput = this.TransToJSON(
        this.thisIs_data.UI.UIinputs,
        this.thisIs_data.Code.functions[number].inputs
      );
      arrayOfInputs = this.MakeArrayOfInputsOrOutputs(
        this.thisIs_data.Code.functions[number].jsonInput
      );

      var test = JSON.parse(this.thisIs_data.Code.functions[number].jsonInput);
      var arrayOfInputControls = this.PushInputControls(
        this.thisIs_data.UI.structure,
        []
      );

      axiosTest = {};
      for (let j = 0; j < arrayOfInputs.length; j++) {
        /*
        let result = arrayOfInputControls.find(
          ({ attributes }) => 
            attributes.name === test[j][arrayOfInputs[j]] &&
            test[j]["type"] == 1
        ); */

        let result = arrayOfInputControls.find(function (element) {
          if (element.attributes != undefined) {
            if (
              element.attributes.name === test[j][arrayOfInputs[j]] &&
              test[j]["type"] == 1
            ) {
              return element;
            }
          } else {
            if (
              element.name === test[j][arrayOfInputs[j]] &&
              test[j]["type"] == 1
            ) {
              return element;
            }
          }
        });
        if (result != undefined) {
          let type = "";
          if (result.attributes != undefined) {
            axiosTest[arrayOfInputs[j]] = result.attributes.value;
            type = result.attributes.type;
          } else {
            axiosTest[arrayOfInputs[j]] = result.value;
            type = result.type;
          }
          // Здесь заменяются значения в JSON на значения из контроллов;
          if (type == "число") {
            axiosTest[arrayOfInputs[j]] = parseInt(axiosTest[arrayOfInputs[j]]);
          }
          if (type == "json") {
            axiosTest[arrayOfInputs[j]] = JSON.parse(
              axiosTest[arrayOfInputs[j]]
            );
          }
          if (type == "массив_текста") {
            if (result.table == true) {
              axiosTest[arrayOfInputs[j]] = result.inputs;
            }
          }
          if (type == "json_ready") {
            let new_result = this.SwitchForJSON_ready(result);
            axiosTest[arrayOfInputs[j]] = new_result.value;
          }
        }
        if (test[j]["type"] == 0) {
          axiosTest[arrayOfInputs[j]] = test[j][arrayOfInputs[j]];
        }
      }
      // определяем функция или команда

      let length = 0;
      length = this.thisIs_data.Code.functions[number].inputs.length;
      for (let j = 0; j < length; j++) {
        let index = 0;
        index = this.thisIs_data.inputs.findIndex(
          (element) =>
            element.name ===
            this.thisIs_data.Code.functions[number].inputs[j].name
        );

        if (index != -1) {
          axiosTest[this.thisIs_data.inputs[index].name] =
            this.thisIs_data.inputs[index].value;
          if (this.thisIs_data.inputs[index].type == "число") {
            axiosTest[this.thisIs_data.inputs[index].name] = parseInt(
              axiosTest[this.thisIs_data.inputs[index].name]
            );
          }
          if (this.thisIs_data.inputs[index].type == "json") {
            axiosTest[this.thisIs_data.inputs[index].name] = JSON.parse(
              axiosTest[this.thisIs_data.inputs[index].name]
            );
          }
          if (this.thisIs_data.inputs[index].type == "boolean") {
            if (
              axiosTest[this.thisIs_data.inputs[index].name] === "true" ||
              axiosTest[this.thisIs_data.inputs[index].name] === true
            ) {
              axiosTest[this.thisIs_data.inputs[index].name] = true;
            } else {
              axiosTest[this.thisIs_data.inputs[index].name] = false;
            }
          }
        }
      }
      let returnedInputData = {
        functionCode: functionCode,
        axiosTest: axiosTest,
        arrayOfInputs: arrayOfInputs,
      };
      return returnedInputData;
    },
    InputDataNew(
      number,
      button_number,
      functionCode,
      axiosTest,
      arrayOfInputs
    ) {
      //if (button_number === this.thisIs_data.Code.functions[number].control) {
      this.thisIs_data.Code.functions[number].jsonInput = this.TransToJSON(
        this.thisIs_data.UI.UIinputs,
        this.thisIs_data.Code.functions[number].inputs
      );
      arrayOfInputs = this.MakeArrayOfInputsOrOutputs(
        this.thisIs_data.Code.functions[number].jsonInput
      );
      //}
      // Создаётся массив из элементов
      // Анализ
      if (this.thisIs_data.Code.functions[number].jsonInput != "") {
        var test = JSON.parse(
          this.thisIs_data.Code.functions[number].jsonInput
        );
      }
      // Здесь заменяются значения в JSON на значения из контроллов;

      var arrayOfInputControls = this.PushInputControls(
        this.thisIs_data.UI.structure,
        []
      );
      // Смотри по textareas
      axiosTest = {};
      for (let j = 0; j < arrayOfInputs.length; j++) {
        let result = arrayOfInputControls.find(function (element) {
          if (element.attributes != undefined) {
            if (
              element.attributes.name === test[j][arrayOfInputs[j]] &&
              test[j]["type"] == 1
            ) {
              return element;
            }
          } else {
            if (
              element.name === test[j][arrayOfInputs[j]] &&
              test[j]["type"] == 1
            ) {
              return element;
            }
          }
        });

        if (result != undefined) {
          let type = "";
          if (result.attributes != undefined) {
            axiosTest[arrayOfInputs[j]] = result.attributes.value;
            type = result.attributes.type;
          } else {
            axiosTest[arrayOfInputs[j]] = result.value;
            type = result.type;
          }
          // Здесь заменяются значения в JSON на значения из контроллов;
          if (type == "число") {
            axiosTest[arrayOfInputs[j]] = parseInt(axiosTest[arrayOfInputs[j]]);
          }
          if (type == "json") {
            axiosTest[arrayOfInputs[j]] = JSON.parse(
              axiosTest[arrayOfInputs[j]]
            );
          }
          if (type == "массив_текста") {
            if (result.table == true) {
              axiosTest[arrayOfInputs[j]] = result.inputs;
            }
          }
          if (type == "json_ready") {
            let new_result = this.SwitchForJSON_ready(result);
            axiosTest[arrayOfInputs[j]] = new_result.value;
          }
        }
        if (test[j]["type"] == 0) {
          axiosTest[arrayOfInputs[j]] = test[j][arrayOfInputs[j]];
        }
      }
      // определяем функция или команда
      let length = 0;
      length = this.thisIs_data.Code.functions[number].inputs.length;
      for (let j = 0; j < length; j++) {
        let index = 0;
        index = this.thisIs_data.inputs.findIndex(
          (element) =>
            element.name ===
            this.thisIs_data.Code.functions[number].inputs[j].name
        );
        if (index != -1) {
          axiosTest[this.thisIs_data.inputs[index].name] =
            this.thisIs_data.inputs[index].value;
          if (this.thisIs_data.inputs[index].type == "число") {
            axiosTest[this.thisIs_data.inputs[index].name] = parseInt(
              axiosTest[this.thisIs_data.inputs[index].name]
            );
          }
          if (this.thisIs_data.inputs[index].type == "json") {
            axiosTest[this.thisIs_data.inputs[index].name] = JSON.parse(
              axiosTest[this.thisIs_data.inputs[index].name]
            );
          }
          if (this.thisIs_data.inputs[index].type == "boolean") {
            if (
              axiosTest[this.thisIs_data.inputs[index].name] === "true" ||
              axiosTest[this.thisIs_data.inputs[index].name] === true
            ) {
              axiosTest[this.thisIs_data.inputs[index].name] = true;
            } else {
              axiosTest[this.thisIs_data.inputs[index].name] = false;
            }
          }
        }
      }
      let returnedInputData = {
        functionCode: functionCode,
        axiosTest: axiosTest,
        arrayOfInputs: arrayOfInputs,
      };
      return returnedInputData;
    },
    FindControlForOutput(structure, name) {
      let result = "";
      for (let i = 0; i < structure.length; i++) {
        if (structure[i].attributes.name === name) {
          result = structure[i];
          return structure[i];
        }
        if (
          structure[i].type === "staticTable" ||
          structure[i].type === "dynamicTable"
        ) {
          for (let j = 0; j < structure[i].attributes.blocks.length; j++) {
            if (structure[i].attributes.blocks[j].name === name) {
              result = structure[i];
              return result;
            }
          }
        }
        if (
          structure[i].structure != [] &&
          structure[i].structure != undefined
        ) {
          result = this.FindControlForOutput(structure[i].structure, name);
          if (result != "") return result;
        }
      }
      return result;
    },
    OutputData(arrayOfOutputs, jsonOutput, output) {
      let controls = this.PushInputControls(this.thisIs_data.UI.structure, []);
      for (let j = 0; j < arrayOfOutputs.length; j++) {
        let result = this.FindControlForOutput(
          this.thisIs_data.UI.structure,
          output[arrayOfOutputs[j]]
        );
        if (result.type === "dynamicTable") {
          let result_index = result.attributes.blocks.findIndex(
            ({ name }) => name === output[arrayOfOutputs[j]]
          );
          result.attributes.blocks[result_index];
          if (result.attributes.blocks[result_index].type == "json_ready") {
            let stringJSON = JSON.stringify(jsonOutput[arrayOfOutputs[j]]);
            let field = this.MakeFieldInDynamicBlock(stringJSON);
            result.attributes.blocks[result_index].field = field;
            result.attributes.blocks[result_index].value = JSON.parse(
              jsonOutput[arrayOfOutputs[j]]
            );
          }
        }
        if (result.type === "staticTable") {
          let result1 = result.attributes.blocks.findIndex(
            ({ name }) => name === output[arrayOfOutputs[j]]
          );
          let result2 = result.attributes.blocks.findIndex(
            ({ color_block }) => {
              if (color_block != undefined) {
                return color_block.value === output[arrayOfOutputs[j]];
              }
            }
          );
          if (result1 != -1) {
            result.attributes.blocks[result1].value =
              jsonOutput[arrayOfOutputs[j]];
            for (
              let i = result.attributes.blocks[result1].y_start;
              i <= result.attributes.blocks[result1].y_end;
              i++
            ) {
              for (
                let ii = result.attributes.blocks[result1].x_start;
                ii <= result.attributes.blocks[result1].x_end;
                ii++
              ) {
                result.attributes.inputs[
                  (i - 1) * result.attributes.columns + (ii - 1)
                ] =
                  result.attributes.blocks[result1].value[
                    i - result.attributes.blocks[result1].y_start
                  ][ii - result.attributes.blocks[result1].x_start];
              }
            }
          }
          if (result2 != -1) {
            this.thisIs_data.loaded = false;
            result.attributes.blocks[result2].color_block.number =
              jsonOutput[arrayOfOutputs[j]];
            this.thisIs_data.reload++;
            this.thisIs_data.loaded = true;
          }
        }
        if (result.type === "textinput") {
          result.attributes.value = jsonOutput[arrayOfOutputs[j]];
        }
        if (result.type === "card") {
          result.attributes.value = jsonOutput[arrayOfOutputs[j]];
        }
        if (result.type === "2Dcomponent") {
          let outputIndex = this.thisIs_data.UI.outputs.findIndex(
            (object) => object.name === arrayOfOutputs[j]
          );
          let id = parseInt(
            this.thisIs_data.UI.outputs[outputIndex].plotlyObject.id
          );

          let attribute =
            this.thisIs_data.UI.outputs[outputIndex].plotlyObject.attribute;
          if (typeof attribute === "string") {
            result.attributes.data[id][attribute] =
              jsonOutput[arrayOfOutputs[j]];
          }
          //0;
          if (typeof attribute === "object") {
            while (result.attributes.data.length !== 2) {
              result.attributes.data.splice(-1);
            }
            jsonOutput[arrayOfOutputs[j]].forEach((object) => {
              var new_object = JSON.parse(
                this.thisIs_data.UI.outputs[outputIndex].plotlyObject
                  .dataElement
              );
              attribute.forEach((object_attr) => {
                new_object[object_attr] = object[object_attr];
              });

              result.attributes.data.push(new_object);
            });
          }
        }
        let all_tables = this.AllStaticTables(
          this.thisIs_data.UI.structure,
          []
        );
        all_tables.forEach((object) => {
          /*
          let result1 = object.attributes.blocks.findIndex(({ name }) => name === output[arrayOfOutputs[j]]); */
          //поиск индекса
          let result2 = object.attributes.blocks.findIndex(
            ({ color_block }) => {
              if (color_block != undefined) {
                return color_block.value === output[arrayOfOutputs[j]];
              }
            }
          );
          /*
          if (result1 != -1) {
            console.log("HERE!, result1")
            result.attributes.blocks[result1].value =
              jsonOutput[arrayOfOutputs[j]];
            for (
              let i =
              result.attributes.blocks[result1]
                  .y_start;
              i <=
              result.attributes.blocks[result1].y_end;
              i++
            ) {
              for (
                let ii =
                result.attributes.blocks[result1]
                    .x_start;
                ii <=
                result.attributes.blocks[result1]
                  .x_end;
                ii++
              ) {
                result.attributes.inputs[
                  (i - 1) *
                  result.attributes.columns +
                    (ii - 1)
                ] =
                result.attributes.blocks[
                    result1
                  ].value[
                    i -
                    result.attributes.blocks[
                        result1
                      ].y_start
                  ][
                    ii -
                    result.attributes.blocks[
                        result1
                      ].x_start
                  ];
              }
            }
          } */
          if (result2 != -1) {
            this.thisIs_data.loaded = false;
            object.attributes.blocks[result2].color_block.number =
              jsonOutput[arrayOfOutputs[j]];
            this.thisIs_data.reload++;
            this.thisIs_data.loaded = true;
          }
        });
        // теперь нужно будет найти элемент и присовить его
      }
    },
    OutputDataInInputs(arrayOfOutputs, jsonOutput, output) {
      for (let j = 0; j < arrayOfOutputs.length; j++) {
        let result = this.thisIs_data.inputs.findIndex(
          ({ name }) => name === output[arrayOfOutputs[j]]
        );
        if (result != -1) {
          this.thisIs_data.inputs[result].value = jsonOutput[arrayOfOutputs[j]];
        }
      }
    },
    RoundData(newOutput) {
      if (this.thisIs_data.UI.settings.roundSystem === true) {
        let flag = this.CheckRoundAnswer(this.thisIs_data.round, newOutput);
        if (flag === false) {
          this.thisIs_data.roundFlag = 1; //1 - значит неправильно!
        } else {
          this.thisIs_data.roundFlag = 2; //2 - значит правильно!
        }
      }
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
          if (put.slice(j1 + 1, j2) !== "type") {
            arrayOfInputs.push(put.slice(j1 + 1, j2));
          }
          j1 = undefined;
          j2 = undefined;
        }
      }
      return arrayOfInputs;
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
    AllInputControlsFromStructure() {},
    PushOutputControls() {},
    CheckRoundAnswer(i, newOutput) {
      let allcontrols = [];
      let flag = true;
      let v = this.thisIs_data.UI.settings.rounds[i - 1];
      for (let j = 0; j < v.roundOutputs.length; j++) {
        let index = newOutput.findIndex(
          ({ control }) => control === v.roundOutputs[j].attributes.name
        );
        if (index != -1) {
          if (newOutput[index].value !== v.roundOutputs[j].attributes.value) {
            flag = false;
          }
        } else {
          flag = false;
        }
      }
      return flag;
    },
    // Функция, которая будет выполнять алгоритм в течение какого-то периода.
    PeriodFunction(number) {
      var self = this.thisIs_data;
      let timerId = setInterval(function () {
        this.thisIs_data = self.LaunchFunction(number);
      }, this.thisIs_data.Code.functions[number].periodsec * 1000);
      return timerId;
    },
    // первый вызов периодической функции
    LaunchFunctionPeriod(number, button_number) {
      let functionCode = "";
      let axiosTest = "";
      var arrayOfInputs = "";
      let command = "";
      let delay = "";
      let startPeriod = true;
      delay = this.thisIs_data.Code.functions[number].periodsec;
      if (
        button_number + 1 ===
        this.thisIs_data.Code.functions[number].control
      ) {
        startPeriod = true;
        command = "None";
      } else {
        startPeriod = false;
      }
      functionCode = this.MakePeriodCode(
        this.thisIs_data.Code.functions[number].functionCode,
        number
      );
      let indexCommand = 0;
      if (startPeriod === true) {
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
      } else {
        command = this.FindCommand(number, button_number);
      }
      let data = {
        dataUI: this.thisIs_data.UI,
        code: this.thisIs_data.Code,
        functionCode: functionCode,
        input: axiosTest,
        arrayOfInputs: arrayOfInputs,
        startPeriod: startPeriod,
        command: command,
        delay: delay,
      };

      axios({
        method: "put",
        url: this.base_url + "/constructor/" + this.paramsId + "/period",
        data: {
          dataUI: this.thisIs_data.UI,
          code: this.thisIs_data.Code,
          functionCode: functionCode,
          input: axiosTest,
          arrayOfInputs: arrayOfInputs,
          startPeriod: startPeriod,
          command: command,
          delay: delay,
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
          // массив выходных данных
        });
    },
    EndPeriodFunction() {
      clearInterval(
        this.thisIs_data.timerIds[this.thisIs_data.timerIds.length - 1]
      );
      this.thisIs_data.timerIds.splice(-1);
    },
    MakePeriodCode(functionCode, functionIndex) {
      let newCodeInputWait = "";
      let delay = this.thisIs_data.Code.functions[functionIndex].periodSec;
      newCodeInputWait +=
        "def input_wait(prompt='', timeout=1000, *, _delay=" + delay + "):\n";
      newCodeInputWait += "    output = {}\n";
      newCodeInputWait += "    output['command']=str()\n";
      newCodeInputWait += "    start = time.time() #начало подсчёта времени\n";
      newCodeInputWait += "    #while time.time() - start < timeout:\n";
      newCodeInputWait += "    while True:\n";
      newCodeInputWait += "        " + functionCode + "\n";
      newCodeInputWait +=
        "        prompt_t = '\\r{}| {}{}'.format(output['answer'], prompt, output['command'])\n";
      newCodeInputWait += "        if msvcrt.kbhit():\n";
      newCodeInputWait += "           char = msvcrt.getwch()\n";
      newCodeInputWait += "           if char == '\\r':\n";
      newCodeInputWait += "               msvcrt.putwch('\\n')\n";
      newCodeInputWait += "               break\n";
      newCodeInputWait +=
        "           elif char == '\\000' or char == '\\xe0':\n";
      newCodeInputWait += "               msvcrt.getwch()\n";
      newCodeInputWait += "               pass\n";
      newCodeInputWait +=
        "           elif ord(char) == 8: # нажат пробел, ord(char) - значение символа в Юникоде('\\n')\n";
      newCodeInputWait +=
        "               print('\\r{}'.format(' ' * len(prompt_t)), end='')\n";
      newCodeInputWait +=
        "               output['command'] = output['command'][:-1]\n";
      newCodeInputWait += "           else:\n";
      newCodeInputWait += "               output['command'] += char\n";
      newCodeInputWait += "        else:\n";
      newCodeInputWait +=
        "           time.sleep(_delay) #сколько нужно будет ждать - пользователь сам вводит из\n";
      newCodeInputWait += "     else:\n";
      newCodeInputWait += "        output['command'] = None\n";
      newCodeInputWait += "     return output\n";
      let newCodeSwitchCase = "";
      if (
        this.thisIs_data.Code.functions[functionIndex].commands != undefined
      ) {
        this.thisIs_data.Code.functions[functionIndex].commands.forEach(
          (command) => {
            newCodeSwitchCase += "      case '" + command.commandName + "':\n";
            newCodeSwitchCase += command.commandCode;
          }
        );
      }
      let newCode = {
        InputWait: newCodeInputWait,
        SwitchCase: newCodeSwitchCase,
      };
      return newCode;
    },
    //#endregion

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
    ClearAllInputs() {
      for (let i = 0; i < this.thisIs_data.UI.inputs.length; i++) {
        this.thisIs_data.UI.inputs[i].value =
          this.thisIs_data.UI.inputs[i].originalValue;
      }
      /*
      for (
        let k = 0;
        k < this.thisIs_data.UI.controls.staticTables.length;
        k++
      ) {
        let result2 = this.thisIs_data.UI.controls.staticTables[
          k
        ].blocks.findIndex(({ color_block }) => {
          if (color_block != undefined) {
            return color_block.value;
          }
        });
        if (result2 != -1) {
          let result3 = this.thisIs_data.inputs.findIndex(
            ({ name }) =>
              name ===
              this.thisIs_data.UI.controls.staticTables[k].blocks[result2]
                .color_block.value
          );
          this.thisIs_data.loaded = false;
          if (this.thisIs_data.inputs[result3].type === "число") {
            this.thisIs_data.UI.controls.staticTables[k].blocks[
              result2
            ].color_block.number = parseInt(
              this.thisIs_data.inputs[result3].value
            );
            this.thisIs_data.reload++;
            this.thisIs_data.loaded = true;
          }
        }
      } */
      for (let k = 0; k < this.thisIs_data.UI.structure.length; k++) {
        if (this.thisIs_data.UI.structure[k].type === `staticTable`) {
          let result2 = this.thisIs_data.UI.structure[
            k
          ].attributes.blocks.findIndex(({ color_block }) => {
            if (color_block != undefined) {
              return color_block.value;
            }
          });
          if (result2 != -1) {
            let result3 = this.thisIs_data.inputs.findIndex(
              ({ name }) =>
                name ===
                this.thisIs_data.UI.structure[k].attributes.blocks[result2]
                  .color_block.value
            );
            this.thisIs_data.loaded = false;
            if (this.thisIs_data.inputs[result3].type === "число") {
              this.thisIs_data.UI.structure[k].attributes.blocks[
                result2
              ].color_block.number = parseInt(
                this.thisIs_data.inputs[result3].value
              );
              this.thisIs_data.reload++;
              this.thisIs_data.loaded = true;
            }
          }
        }
      }
      //this.EndPeriodFunction();
    },
  },
};
</script>
