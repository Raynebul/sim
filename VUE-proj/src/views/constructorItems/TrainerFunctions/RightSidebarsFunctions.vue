<template></template>

<script>
export default {
  data() {},
  methods: {
    InputRightGroupOfRadioboxes(controls, input) {
      controls.groupsOfRadioboxes = input;
      this.$emit("receiveControls", controls);
    },
    InputRightRadiobox(controls, input) {
      controls.radioboxes = input;
      this.$emit("receiveControls", controls);
    },
    InputRightCheckbox(controls, input) {
      controls.checkboxes = input;
      this.$emit("receiveControls", controls);
    },
    InputRightCard(controls, input) {
      controls.cards = input;
      this.$emit("receiveControls", controls);
    },
    InputRightTextInput(controls, input) {
      console.log("Новое значение -", input);
      controls.textinputs = input;
      this.$emit("receiveControls", controls);
    },
    InputRightTextArea(controls, input) {
      console.log("Новое значение -", input);
      controls.textareas = input;
      this.$emit("receiveControls", controls);
    },
    InputRightButton(controls, input) {
      controls.buttons = input;
      this.$emit("receiveControls", controls);
    },
    InputRightStaticTableInputs(controls, inputs, input) {
      //this.loaded = false;
      console.log("Инпуты", input);
      controls.staticTables = input;
      for (let i = 0; i < controls.staticTables.length; i++) {
        for (let j = 0; j < controls.staticTables[i].blocks.length; j++) {
          let result = inputs.findIndex(({ name }) => {
            if (this.UI.controls.staticTables[i].blocks[j].color_block) {
              return (
                name === controls.staticTables[i].blocks[j].color_block.value
              );
            }
          });
          if (result != -1) {
            controls.staticTables[i].blocks[j].color_block.number =
              inputs[result].value;
          }
        }
      }
      this.$emit("receiveControls", controls);
      /* ({ color_block }) => {if(color_block != undefined) {return color_block.value === output[arrayOfOutputs[j]]}}
                  );*/
      //this.UI.controls.staticTables[k].blocks[result2].color_block.number = jsonOutput[arrayOfOutputs[j]];
      //this.reload++;
      //this.loaded = true;
    },
    inputRightDynamicTableInputs(controls, input) {
      controls.dynamicTables = input;
      this.$emit("receiveControls", controls);
    },
    Input2Dcomponent(controls, object, index, i) {
      //this.loaded = false;
      controls.plotlyObjects2D[i].data[index] = object;
      this.$emit("receiveControls", controls);
      //this.reload++;
      //this.loaded = true;
    },
    Input2DLayout(controls, layout, i) {
      //this.loaded = false;
      controls.plotlyObjects2D[i].layout = layout;
      this.$emit("receiveControls", controls);
      //this.reload++;
      //this.loaded = true;
    },
    Input2D(controls, object, i) {
      //this.loaded = false;
      controls.plotlyObjects2D[i].data = object;
      this.$emit("receiveControls", controls);
      //console.log("фдцлдтудцу", this.UI.controls);
      //this.reload++;
      //this.loaded = true;
    },
    AddRadioboxToGroup(controls, i) {
      controls.groupsOfRadioboxes[i].radioboxes.push({
        name: "0",
        value: "0",
        x: 0,
        y: 0,
      });
      this.$emit("receiveControls", controls);
    },
  },
};
</script>
