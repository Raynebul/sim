<template></template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    AddButton(controls) {
      controls.buttons.push({
        name: String(controls.buttons.length),
        x: 0,
        y: 0,
        functionNumber: -1,
        nRight: false,
      });
      this.$emit("receiveControls", controls);
    },
    RemoveButton(controls) {
      controls.buttons.splice(-1);
      this.$emit("receiveControls", controls);
    },
    AddTextArea(controls) {
      controls.textareas.push({
        name: controls.textareas.length,
        value: "",
        type: "число",
        x: 0,
        y: 0,
      });
      this.$emit("receiveControls", controls);
    },
    RemoveTextArea(controls) {
      controls.textareas.splice(-1);
      this.$emit("receiveControls", controls);
    },
    InputTextArea(controls, newValue) {
      console.log("TEST!!");
      controls.textareas = newValue;
    },
    AddTextInput(controls) {
      controls.textinputs.push({
        name: String(controls.textinputs.length),
        textname: "Текстовый инпут",
        value: "",
        type: "число",
        x: 0,
        y: 0,
      });
      this.$emit("receiveControls", controls);
    },
    RemoveTextInput(controls) {
      controls.textinputs.splice(-1);
      this.$emit("receiveControls", controls);
    },
    InputTextInput(controls, newValue) {
      controls.textinputs = newValue;
    },

    AddCard(controls) {
      controls.cards.push({
        name: String(controls.cards.length),
        value: "",
      });
      this.$emit("receiveControls", controls);
    },
    RemoveCard(controls) {
      controls.cards.splice(-1);
      this.$emit("receiveControls", controls);
    },
    AddCheckbox(controls) {
      controls.checkboxes.push({
        name: controls.checkboxes.length,
        value: false,
        x: 0,
        y: 0,
      });
      this.$emit("receiveControls", controls);
    },
    RemoveCheckbox(controls) {
      controls.checkboxes.splice(-1);
      this.$emit("receiveControls", controls);
    },
    InputCheckbox(controls, i, value) {
      controls.checkboxes[i].value = value;
    },
    AddGroupOfRadioboxes(controls) {
      controls.groupsOfRadioboxes.push({
        name: 1,
        type: "число",
        radioboxes: [],
        value: "0",
      });
      this.$emit("receiveControls", controls);
    },
    RemoveGroupOfRadioboxes(controls) {
      controls.groupsOfRadioboxes.splice(-1);
      this.$emit("receiveControls", controls);
    },
    AddStaticTable(controls) {
      this.loaded = false;
      controls.staticTables.push({
        rows: 1,
        columns: 1,
        blocks: [],
        inputs: [" "],
        edit: false,
        name: controls.staticTables.length,
        table: true,
        all_blocks_color: [],
      });
      console.log(controls.staticTables[controls.staticTables.length - 1]);
      console.log(
        controls.staticTables[controls.staticTables.length - 1].inputs.length
      );
      this.reload++;
      this.loaded = true;
      this.$emit("receiveControls", controls);
    },
    RemoveStaticTable(controls) {
      controls.staticTables.splice(-1);
      this.$emit("receiveControls", controls);
      //this.controls.staticTables.push({ rows: 1, columns: 1 });
      // this.tableInputs.push({});
    },
    AddDynamicTable(controls) {
      // this.controls.staticTables.push({ rows: 1, columns: 1 });
      this.loaded = false;
      controls.dynamicTables.push({
        rows: 1,
        columns: 1,
        blocks: [],
        inputs: [" "],
        edit: false,
        name: controls.dynamicTables.length,
        table: true,
      });
      //console.log("Динамические таблицы - ", this.UI.controls.dynamicTables);
      this.$emit("receiveControls", controls);
      this.reload++;
      this.loaded = true;
    },
    RemoveDynamicTable(controls) {
      controls.dynamicTables.splice(-1);
      this.$emit("receiveControls", controls);
      //this.controls.staticTables.push({ rows: 1, columns: 1 });
      // this.tableInputs.push({});
    },
    Add2Dcomponent(controls) {
      this.loaded = false;
      let data = [];
      let trace1 = {
        x: [1, 2, 3, 4],
        y: [10, 15, 13, 17],
        type: "scatter",
        text: [],
      };
      data = [trace1];
      let layout = {
        title: "Test",
        xaxis: {
          range: [],
        },
        yaxis: {
          range: [],
        },
      };
      let config =
      {};
      let object = {
        data: data,
        layout: layout,
        config: config,
        plotlyId: "plot" + String(controls.plotlyObjects2D.length + 1),
      };
      controls.plotlyObjects2D.push(object);
      //console.log(this.UI);
      this.$emit("receiveControls", controls);
      this.reload++;
      this.loaded = true;
    },
    Remove2Dcomponent(controls) {
      controls.plotlyObjects2D.splice(-1);

      this.$emit("receiveControls", controls);
    },
  },
};
</script>
