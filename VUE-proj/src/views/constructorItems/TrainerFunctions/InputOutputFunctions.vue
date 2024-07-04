<template></template>

<script>
export default {
  data() {},
  methods: {
    InputInputs(inputs_or, inputs) {
      inputs_or = inputs;
      for (let i = 0; i < inputs_or.length; i++) {
        inputs_or[i].value = inputs_or[i].originalValue;
        if (inputs_or[i].type == "число") {
          inputs_or[i].value = parseInt(inputs_or[i].value);
        }
      }
      this.$emit("receiveInputs", inputs_or);
    },
    InputUIinputs(UIinputs, inputs) {
      UIinputs = inputs;
      this.$emit("receiveUIinputs", UIinputs);
    },
    InputOutputs(outputs_or, outputs) {
      outputs_or = outputs;
      this.$emit("receiveOutputs", outputs_or);
    },
    InputFunctions(functions_or, buttons, functions, control) {
      functions_or = functions;
      //Проверка
      console.log(
        "Проверка кнопочек и функций",
        functions_or,
        buttons,
        functions,
        control
      );
      for (let k = 0; k < functions_or.length; k++) {
        console.log(k);
        buttons[control].functionNumber = k;
        if (functions_or[k].period === true) {
          functions_or[k].commands.forEach((command) => {
            buttons[command.button - 1].functionNumber = k;
          });
        }
      }
      this.$emit("receiveFunctionsButtons", functions_or, buttons);
    },
    InputFunctionWithoutButtons(functions_or, functions) {
      functions_or = functions;
      this.$emit("receiveFunctions", functions_or);
    },
    InputCommandButton(functions_or, functions, i, command, buttons) {
      let buttons_or = buttons;
      console.log(functions_or, functions, i, command, buttons);
      let button_number = functions[i].commands[command].button;
      buttons_or[button_number - 1].functionNumber = i; // присваивается номер функциии кнопке.
      console.log(buttons_or);
      this.$emit("receiveFunctionsButtons", functions_or, buttons_or);
    },
    AddNewInput(inputs) {
      inputs.push({
        name: "",
        originalValue: "",
        value: "",
        type: "число",
      });
      this.$emit("receiveInputs", inputs);
    },
    AddNewUIinput(UIinputs) {
      UIinputs.push({
        name: "",
        control: "",
        //type: "число",
      });
      this.$emit("receiveUIinputs", UIinputs);
    },
    RemoveInput(inputs) {
      inputs.splice(-1);
      this.$emit("receiveInputs", inputs);
    },
    AddNewRoundInput(rounds) {
      rounds.push({
        name: "",
        roundInputs: [],
        //type: "число",
      });
      this.$emit("receiveRounds", rounds);
    },
    RemoveRoundInput(rounds) {
      rounds.splice(-1);
      this.$emit("receiveRounds", rounds);
    },
    RemoveUIinput(UIinputs) {
      UIinputs.splice(-1);
      this.$emit("receiveUIinputs", UIinputs);
    },
    AddNewOutput(outputs) {
      outputs.push({
        name: "",
        control: "",
        //type: "число",
      });
      this.$emit("receiveOutputs", outputs);
    },
    RemoveOutput(outputs) {
      outputs.splice(-1);
      this.$emit("receiveOutputs", outputs);
    },
    AddNewFunction(functions) {
      //this.loaded = false;
      functions.push({
        functionCode: "",
        jsonInput: "",
        jsonOutput: "",
        name: "",
        control: "",
        value: "",
        inputs: [],
        outputs: [],
        period: false,
        periodsec: 0,
        commands: [],
      });
      this.$emit("receiveFunctions", functions);
    },
    RemoveNewFunction(functions) {
      this.loaded = false;
      functions.splice(-1);
      this.$emit("receiveFunctions", functions);
      this.reload++;
      this.loaded = true;
    },
    AddCommandToFunction(functions, i) {
      this.loaded = false;
      if (functions[i].commands === undefined) {
        functions[i].commands = [];
      }
      functions[i].commands.push({
        name: "",
        button: "",
        commandName: "",
        commandCode: "",
        inputs: [],
      });
      this.$emit("receiveFunctions", functions);
      this.reload++;
      this.loaded = true;
    },
    RemoveCommandToFunction(functions, i) {
      functions[i].commands.splice(-1);
      this.$emit("receiveFunctions", functions);
    },
    InputClearInputs(clearInputs) {
      if (clearInputs != "") {
        this.UI.controls.buttons[clearInputs - 1].functionNumber = "clear";
        console.log(this.UI.controls.buttons);
      }
    },
  },
};
</script>
