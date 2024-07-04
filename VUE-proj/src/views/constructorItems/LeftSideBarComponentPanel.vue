<!-- eslint-disable prettier/prettier -->
<template>
  <div>
    <p></p>
    <h6>Элементы</h6>
    <div class="accordion accordion-flush" id="accordionPanelsStayOpenExample">
      <!--
      <div class="accordion-item">
        <h2 class="accordion-header" id="panelsStayOpenST-heading">
          <button
            class="accordion-button collapsed bg-dark text-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpenST-collapse"
            aria-expanded="false"
            aria-controls="panelsStayOpenST-collapse"
          >
            Построение сетки
          </button>
        </h2>
        <div
          id="panelsStayOpenST-collapse"
          class="accordion-collapse collapse bg-dark"
          aria-labelledby="panelsStayOpenST-heading"
        >
          <div class="accordion-body text-white">
            <div
              role="group"
              class="btn-group-vertical btn-group-sm list-group rounded-0"
            >
            <button
                @click="AddRow()"
                class="btn btn-dark list-group-item"
              >
                <div class="d-flex">
                  <i class="bi bi-distribute-vertical"></i>
                  <div style="font-size: 0.8rem; margin-left: 10px">
                    1 строка
                  </div>
                </div>
              </button>
              <button
                @click="AddColumn()"
                class="btn btn-dark list-group-item"
              >
                <div class="d-flex">
                  <i class="bi bi-distribute-horizontal"></i>
                  <div style="font-size: 0.8rem; margin-left: 10px">
                    1 столбец
                  </div>
                </div>
              </button>

              <button
                @click="AddRowOneColumn()"
                class="btn btn-dark list-group-item"
              >
                <div class="d-flex">
                  <i class="bi bi-square"></i>
                  <div style="font-size: 0.8rem; margin-left: 10px">
                    1 строка 1 столбец
                  </div>
                </div>
              </button>
              <button
                @click="AddRowTwoColumns()"
                class="btn btn-dark list-group-item"
              >
                <div class="d-flex">
                  <i class="bi bi-layout-split"></i>
                  <div style="font-size: 0.8rem; margin-left: 10px">
                    1 строка 2 столбца
                  </div>
                </div>
              </button>
              <button
                @click="AddRowThreeColumns()"
                class="btn btn-dark list-group-item"
              >
                <div class="d-flex">
                  <i class="bi bi-layout-three-columns"></i>
                  <div style="font-size: 0.8rem; margin-left: 10px">
                    1 строка 3 столбца
                  </div>
                </div>
              </button>

              <button
                @click="AddTwoRowsOneColumn()"
                class="btn btn-dark list-group-item"
              >
                <div  class="d-flex ">
                  <i class="bi bi-layout-split fa-rotate-90"></i>
                  <div style="font-size: 0.8rem; margin-left: 10px">
                    2 строка 1 столбец
                  </div>
                </div>
              </button>
              <button
                @click="AddTwoRowsTwoColumns()"
                class="btn btn-dark list-group-item"
              >
                <div  class="d-flex ">
                  <i class="bi bi-border-all"></i>
                  <div style="font-size: 0.8rem; margin-left: 10px">
                    2 строка 2 столбца
                  </div>
                </div>
              </button>
              <button
                @click="AddTwoRowsThreeColumns()"
                class="btn btn-dark list-group-item"
              >
                <div  class="d-flex ">
                  <i class="bi bi-grid-3x2"></i>
                  <div style="font-size: 0.8rem; margin-left: 10px">
                    2 строка 3 столбца
                  </div>
                </div>
              </button>

              <button
                @click="AddThreeRowsOneColumn()"
                class="btn btn-dark list-group-item"
              >
                <div  class="d-flex ">
                  <i class="bi bi-layout-three-columns fa-rotate-90"></i>
                  <div style="font-size: 0.8rem; margin-left: 10px">
                    3 строки 1 столбец
                  </div>
                </div>
              </button>
              <button
                @click="AddThreeRowsTwoColumns()"
                class="btn btn-dark list-group-item"
              >
                <div  class="d-flex ">
                  <i class="bi bi-grid-3x2 fa-rotate-90"></i>
                  <div style="font-size: 0.8rem; margin-left: 10px">
                    3 строки 2 столбца
                  </div>
                </div>
              </button>
              <button
                @click="AddThreeRowsThreeColumns()"
                class="btn btn-dark list-group-item"
              >
                <div  class="d-flex ">
                  <i class="bi bi-grid-3x3"></i>
                  <div style="font-size: 0.8rem; margin-left: 10px">
                    3 строки 3 столбца
                  </div>
                </div>
              </button>

            </div>
          </div>
        </div>
      </div> --> 
      <div class="accordion-item">
        <h2 class="accordion-header" id="panelsStayOpenComponentUI-heading">
          <button
            class="accordion-button collapsed bg-dark text-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpenComponentUI-collapse"
            aria-expanded="false"
            aria-controls="panelsStayOpenComponentUI-collapse"
          >
            Компоненты
          </button>
        </h2>
        <div
          id="panelsStayOpenComponentUI-collapse"
          class="accordion-collapse collapse bg-dark"
          aria-labelledby="panelsStayOpenComponentUI-heading"
        >
          <div class="accordion-body text-white">
            <div
              role="group"
              class="btn-group-vertical btn-group-sm list-group rounded-0"
            >
              <button @click="AddButton" class="btn btn-dark list-group-item border-0">
                <div class="d-flex">
                  <i class="bi bi-usb-c"></i>
                  <div style="font-size: 0.8rem; margin-left: 10px">Кнопка</div>
                </div>
              </button>
              <button @click="AddTextarea" class="btn btn-dark list-group-item border-0">
                <div class="d-flex">
                  <i class="bi bi-textarea-resize"></i>
                  <div style="font-size: 0.8rem; margin-left: 10px">
                    Textarea
                  </div>
                </div>
              </button>
              <button
                @click="AddTextinput"
                class="btn btn-dark list-group-item border-0"
              >
                <div class="d-flex">
                  <i class="bi bi-usb"></i>
                  <div style="font-size: 0.8rem; margin-left: 10px">Инпуты</div>
                </div>
              </button>
              <button @click="AddRadiobutton" class="btn btn-dark list-group-item border-0">
                <div class="d-flex">
                  <i class="bi bi-record-circle"></i>
                  <div style="font-size: 0.8rem; margin-left: 10px">
                    Радиокнопки
                  </div>
                </div>
              </button>
              <button @click="AddCheckbox" class="btn btn-dark list-group-item border-0">
                <div class="d-flex">
                  <i class="bi bi-check-square"></i>
                  <div style="font-size: 0.8rem; margin-left: 10px">
                    Чекбоксы
                  </div>
                </div>
              </button>
              <button @click="AddCard()" class="btn btn-dark list-group-item border-0">
                <div class="d-flex">
                  <i class="bi bi-card-text"></i>
                  <div style="font-size: 0.8rem; margin-left: 10px">
                    Карточки
                  </div>
                </div>
              </button>
              <button
                @click="AddStaticTable"
                class="btn btn-dark list-group-item border-0"
              >
                <div class="d-flex">
                  <i class="bi bi-table"></i>
                  <div style="font-size: 0.8rem; margin-left: 10px">
                    Статическая таблица
                  </div>
                </div>
              </button>
              <button @click="AddDynamicTable" class="btn btn-dark list-group-item border-0">
                <div class="d-flex">
                  <i class="bi bi-grid-3x2"></i>
                  <div style="font-size: 0.8rem; margin-left: 10px">
                    Динамическая таблица
                  </div>
                </div>
              </button>

              <!--@click="AddFile"-->
              <button  class="btn btn-dark list-group-item border-0">
                <div class="d-flex">
                  <i class="bi bi-folder2-open"></i>
                  <div style="font-size: 0.8rem; margin-left: 10px">
                    Файл 
                  </div>
                  <input @change="onFileSelected" type="file">
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="panelsStayOpenCharts-heading">
          <button
            class="accordion-button collapsed bg-dark text-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpenCharts-collapse"
            aria-expanded="false"
            aria-controls="panelsStayOpenCharts-collapse"
          >
            Графики (2D)
          </button>
        </h2>
        <div
          id="panelsStayOpenCharts-collapse"
          class="accordion-collapse collapse bg-dark"
          aria-labelledby="panelsStayOpenCharts-heading"
        >
          <div class="accordion-body text-white">
            <ol class="list-group rounded-0 ">
              <li class="list-group-item border-0" @click="Add2Dcomponent_LineChart()">
                <div class="d-flex">
                  <i class="bi bi-graph-up"></i>
                  <div  style="font-size: 0.8rem; margin-left: 10px">
                    Line chart
                  </div>
                </div>
              </li>
              <li class="list-group-item border-0" @click="Add2Dcomponent_BarChart()">
                <div class="d-flex">
                  <i class="bi bi-bar-chart-line-fill"></i>
                  <div   style="font-size: 0.8rem; margin-left: 10px">
                    Bar chart
                  </div>
                </div>
              </li>
              <li class="list-group-item border-0" @click="Add2Dcomponent_PieChart()">
                <div class="d-flex">
                  <i class="bi bi-pie-chart-fill"></i>
                  <div   style="font-size: 0.8rem; margin-left: 10px">
                    Pie chart
                  </div>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
</script>

<script>
export default {
  props: {
    UI: {
      type: Array,
      required: true,
    },
    last_id: {
      type: Number,
      required: true,
    },
  },
  display: "Nested",
  data(props) {
    let list = props.UIl;
    let listOfComponents = [];
    let chosen_file = "";
    return {
      list,
      id: 6,
      row: { id: 7, type: "row", structure: [], level: 1, attributes: {} },
    };
  },
  methods: {
    AddButton() {
      let button = {
        id: this.last_id,
        type: "button",
        attributes: {
          name: "button" + String(this.last_id),
          functionNumber: -1,
          class: ["btn", "btn-primary"],
          positions: {
            left: 0,
            bottom: 0,
            top: 0,
            right: 0,
            x: 0,
            y: 0,
            w: 100,
            h: 100,
          },
        },
      };
      this.$emit("updateList", button, this.last_id);
    },
    AddTextarea() {
      let button = {
        id: this.last_id,
        type: "textarea",
        attributes: {
          value: "",
          name: "textarea" + String(this.last_id),
          type: "текст",
          class: ["form-control"],
          positions: {
            left: 0,
            bottom: 0,
            top: 0,
            right: 0,
            x: 0,
            y: 0,
            w: 100,
            h: 100,
          },
        },
      };
      this.$emit("updateList", button, this.last_id);
    },
    AddTextinput() {
      let button = {
        id: this.last_id,
        type: "textinput",
        attributes: {
          value: "",
          name: "textinput" + String(this.last_id),
          type: "текст",
          class: [],
          positions: {
            left: 0,
            bottom: 0,
            top: 0,
            right: 0,
            x: 0,
            y: 0,
            w: 100,
            h: 100,
          },
        },
      };
      this.$emit("updateList", button, this.last_id);
    },
    AddFile() {
      let button = {
        id: this.last_id,
        type: "file",
        attributes: {
          fieldname: "",
          name: "file" + String(this.last_id),
          originalname: "",
          encoding: "",
          mimetype: "",
          destination: "",
          filename: "",
          path: "",
          size: 0,
          positions: {
            left: 0,
            bottom: 0,
            top: 0,
            right: 0,
            x: 0,
            y: 0,
            w: 100,
            h: 100,
          },
        },
      };
      //this.$emit("updateList", button, this.last_id);
      const formData = new FormData();
      formData.append("file", this.chosen_file);
      this.$emit('addingFile');
      //console.log(formData);
      /*
      axios({
        method: "post",
        url: this.base_url + "/edit/" + this.$route.params.id + "/file",
        body: formData,
        headers: {
          "Access-Control-Allow-Origin": this.access_origin,
          "Access-Control-Allow-Credentials": true,
          "Content-Type": "multipart/form-data",
        },
        validateStatus: (status) => {
          return true; // I'm always returning true, you may want to do it depending on the status received
        },
      }) */

      axios
        .post(
          this.base_url + "/upload/" + "/file",
          formData,
          {
            headers: {
              "Access-Control-Allow-Origin": this.access_origin,
              "Access-Control-Allow-Credentials": true,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .catch((error) => {})
        .then((response) => {
          console.log(response.data);
          let file = response.data;
          for (let key in file) {
            button.attributes[key] = file[key];
          }
          this.$emit("updateList", button, this.last_id);
        });
    },
    onFileSelected(event) {
      //console.log(event);
      this.chosen_file = event.target.files[0];
      this.AddFile();
    },
    onFileChange(event) {
      this.chosen_file = event.target.files[0];
      //this.createImage(file);
    },
    AddCheckbox() {
      let button = {
        id: this.last_id,
        type: "checkbox",
        attributes: {
          value: "",
          name: "checkbox" + String(this.last_id),
          class: ["form-check"],
          positions: {
            left: 0,
            bottom: 0,
            top: 0,
            right: 0,
            x: 0,
            y: 0,
            w: 100,
            h: 100,
          },
        },
      };
      this.$emit("updateList", button, this.last_id);
    },
    AddRadiobutton() {
      let button = {
        id: this.last_id,
        type: "radiobutton",

        attributes: {
          count: 5,
          class: ["form-check"],
          name: "radio" + String(this.last_id),
          positions: {
            left: 0,
            bottom: 0,
            top: 0,
            right: 0,
            x: 0,
            y: 0,
            w: 100,
            h: 100,
          },
        },
      };
      this.$emit("updateList", button, this.last_id);
    },
    AddStaticTable() {
      let button = {
        id: this.last_id,
        type: "staticTable",
        attributes: {
          blocks: [],
          class: ["table", "table-bordered", "border-dark"],
          columns: 1,
          edit: false,
          inputs: ["1"],
          name: "table" + String(this.last_id),
          rows: 1,
          table: true,
          positions: {
            left: 0,
            bottom: 0,
            top: 0,
            right: 0,
            x: 0,
            y: 0,
            w: 100,
            h: 100,
          },
        },
      };
      this.$emit("updateList", button, this.last_id);
    },
    AddDynamicTable() {
      let button = {
        id: this.last_id,
        type: "dynamicTable",
        attributes: {
          blocks: [],
          columns: 1,
          class: ["table", "table-bordered", "border-dark"],
          edit: false,
          inputs: [],
          name: "table2" + String(this.last_id),
          rows: 1,
          table: true,
          positions: {
            left: 0,
            bottom: 0,
            top: 0,
            right: 0,
            x: 0,
            y: 0,
            w: 100,
            h: 100,
          },
        },
      };
      this.$emit("updateList", button, this.last_id);
    },
    AddCard() {
      let button = {
        id: this.last_id,
        type: "card",
        attributes: {
          value: "Текст",
          name: "card" + String(this.last_id),
          class: ["card"],
          positions: {
            left: 0,
            bottom: 0,
            top: 0,
            right: 0,
            x: 0,
            y: 0,
            w: 100,
            h: 100,
          },
        },
      };
      this.$emit("updateList", button, this.last_id);
    },
    Add2Dcomponent_LineChart() {
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
        height: 300,
        width: 300,
        margin: {
          t: 50,
          b: 50,
          l: 50,
          r: 50,
        },
        yaxis: {
          range: [],
        },
      };
      let config = {};
      let button = {
        id: this.last_id,
        type: "2Dcomponent",
        attributes: {
          data: data,
          class: [],
          layout: layout,
          config: config,
          plotlyId: "plot" + String(this.last_id),
          name: "2dcomponent" + String(this.last_id),
          positions: {
            left: 0,
            bottom: 0,
            top: 0,
            right: 0,
            x: 0,
            y: 0,
            w: 300,
            h: 300,
          },
        },
      };

      this.$emit("updateList", button, this.last_id);
    },
    Add2Dcomponent_BarChart() {
      let data = [];
      let trace1 = {
        x: [1, 2, 3, 4],
        y: [10, 15, 13, 17],
        type: "bar",
        text: [],
      };
      data = [trace1];
      let layout = {
        title: "Test",
        xaxis: {
          range: [],
        },
        height: 300,
        width: 300,
        margin: {
          t: 10,
          b: 10,
          l: 10,
          r: 10,
        },
        yaxis: {
          range: [],
        },
      };
      let config = {};
      let button = {
        id: this.last_id,
        type: "2Dcomponent",
        attributes: {
          class: [],
          data: data,
          layout: layout,
          config: config,
          plotlyId: "plot" + String(this.last_id),
          name: "2dcomponent" + String(this.last_id),
          positions: {
            left: 0,
            bottom: 0,
            top: 0,
            right: 0,
            x: 0,
            y: 0,
            w: 300,
            h: 300,
          },
        },
      };
      this.$emit("updateList", button, this.last_id);
    },
    Add2Dcomponent_PieChart() {
      let data = [];
      let trace1 = {
        values: [19, 26, 55],
        labels: ["Residential", "Non-Residential", "Utility"],
        type: "pie",
        text: [],
      };
      data = [trace1];
      let layout = {
        title: "Test",
        xaxis: {
          range: [],
        },
        height: 300,
        width: 300,
        margin: {
          t: 10,
          b: 10,
          l: 10,
          r: 10,
        },
        yaxis: {
          range: [],
        },
      };
      let config = {};
      let button = {
        id: this.last_id,
        type: "2Dcomponent",
        attributes: {
          class: [],
          data: data,
          layout: layout,
          config: config,
          name: "2dcomponent" + String(this.last_id),
          plotlyId: "plot" + String(this.last_id),
          positions: {
            left: 0,
            bottom: 0,
            top: 0,
            right: 0,
            x: 0,
            y: 0,
            w: 300,
            h: 300,
          },
        },
      };
      this.$emit("updateList", button, this.last_id);
    },
    AddRowOneColumn() {
      let new_id = this.last_id + 1;
      let button = {
        id: this.last_id,
        type: "row",
        attributes: {},
        structure: [
          {
            id: this.last_id + 1,
            type: "column",
            attributes: {},
            structure: [],
          },
        ],
      };
      this.$emit("updateList", button, new_id);
    },
    AddRowTwoColumns() {
      let new_id = this.last_id + 2;
      let button = {
        id: this.last_id,
        type: "row",
        attributes: {},
        structure: [
          {
            id: this.last_id + 1,
            type: "column",
            attributes: {},
            structure: [],
          },
          {
            id: this.last_id + 2,
            type: "column",
            attributes: {},
            structure: [],
          },
        ],
      };
      this.$emit("updateList", button, new_id);
    },
    AddRowThreeColumns() {
      let new_id = this.last_id + 3;
      //console.log("new_id_before", new_id, this.last_id)
      let button = {
        id: this.last_id,
        type: "row",
        attributes: {},
        structure: [
          {
            id: this.last_id + 1,
            type: "column",
            attributes: {},
            structure: [],
          },
          {
            id: this.last_id + 2,
            type: "column",
            attributes: {},
            structure: [],
          },
          {
            id: this.last_id + 3,
            type: "column",
            attributes: {},
            structure: [],
          },
        ],
      };
      this.$emit("updateList", button, new_id);
    },

    AddTwoRowsOneColumn() {
      let new_id = this.last_id + 3;
      let button1 = {
        id: this.last_id,
        type: "row",
        attributes: {},
        structure: [
          {
            id: this.last_id + 1,
            type: "column",
            attributes: {},
            structure: [],
          },
        ],
      };
      let button2 = {
        id: this.last_id + 2,
        type: "row",
        attributes: {},
        structure: [
          {
            id: this.last_id + 3,
            type: "column",
            attributes: {},
            structure: [],
          },
        ],
      };
      this.$emit("updateListTwoRows", button1, button2, new_id);
    },
    AddTwoRowsTwoColumns() {
      let new_id = this.last_id + 5;
      let button1 = {
        id: this.last_id,
        type: "row",
        attributes: {},
        structure: [
          {
            id: this.last_id + 1,
            type: "column",
            attributes: {},
            structure: [],
          },
          {
            id: this.last_id + 2,
            type: "column",
            attributes: {},
            structure: [],
          },
        ],
      };
      let button2 = {
        id: this.last_id + 3,
        type: "row",
        attributes: {},
        structure: [
          {
            id: this.last_id + 4,
            type: "column",
            attributes: {},
            structure: [],
          },
          {
            id: this.last_id + 5,
            type: "column",
            attributes: {},
            structure: [],
          },
        ],
      };
      this.$emit("updateListTwoRows", button1, button2, new_id);
    },
    AddTwoRowsThreeColumns() {
      let new_id = this.last_id + 7;
      //console.log("new_id_before", new_id, this.last_id)
      let button1 = {
        id: this.last_id,
        type: "row",
        attributes: {},
        structure: [
          {
            id: this.last_id + 1,
            type: "column",
            attributes: {},
            structure: [],
          },
          {
            id: this.last_id + 2,
            type: "column",
            attributes: {},
            structure: [],
          },
          {
            id: this.last_id + 3,
            type: "column",
            attributes: {},
            structure: [],
          },
        ],
      };
      let button2 = {
        id: this.last_id + 4,
        type: "row",
        attributes: {},
        structure: [
          {
            id: this.last_id + 5,
            type: "column",
            attributes: {},
            structure: [],
          },
          {
            id: this.last_id + 6,
            type: "column",
            attributes: {},
            structure: [],
          },
          {
            id: this.last_id + 7,
            type: "column",
            attributes: {},
            structure: [],
          },
        ],
      };
      this.$emit("updateListTwoRows", button1, button2, new_id);
    },

    AddThreeRowsOneColumn() {
      let new_id = this.last_id + 5;
      let button1 = {
        id: this.last_id,
        type: "row",
        attributes: {},
        structure: [
          {
            id: this.last_id + 1,
            type: "column",
            attributes: {},
            structure: [],
          },
        ],
      };
      let button2 = {
        id: this.last_id + 2,
        type: "row",
        attributes: {},
        structure: [
          {
            id: this.last_id + 3,
            type: "column",
            attributes: {},
            structure: [],
          },
        ],
      };
      let button3 = {
        id: this.last_id + 4,
        type: "row",
        attributes: {},
        structure: [
          {
            id: this.last_id + 5,
            type: "column",
            attributes: {},
            structure: [],
          },
        ],
      };
      this.$emit("updateListThreeRows", button1, button2, new_id);
    },
    AddThreeRowsTwoColumns() {
      let new_id = this.last_id + 5;
      let button1 = {
        id: this.last_id,
        type: "row",
        attributes: {},
        structure: [
          {
            id: this.last_id + 1,
            type: "column",
            attributes: {},
            structure: [],
          },
          {
            id: this.last_id + 2,
            type: "column",
            attributes: {},
            structure: [],
          },
        ],
      };
      let button2 = {
        id: this.last_id + 3,
        type: "row",
        attributes: {},
        structure: [
          {
            id: this.last_id + 4,
            type: "column",
            attributes: {},
            structure: [],
          },
          {
            id: this.last_id + 5,
            type: "column",
            attributes: {},
            structure: [],
          },
        ],
      };
      let button3 = {
        id: this.last_id + 6,
        type: "row",
        attributes: {},
        structure: [
          {
            id: this.last_id + 7,
            type: "column",
            attributes: {},
            structure: [],
          },
          {
            id: this.last_id + 8,
            type: "column",
            attributes: {},
            structure: [],
          },
        ],
      };
      this.$emit("updateListThreeRows", button1, button2, button3, new_id);
    },
    AddThreeRowsThreeColumns() {
      let new_id = this.last_id + 11;
      //console.log("new_id_before", new_id, this.last_id)
      let button1 = {
        id: this.last_id,
        type: "row",
        attributes: {},
        structure: [
          {
            id: this.last_id + 1,
            type: "column",
            attributes: {},
            structure: [],
          },
          {
            id: this.last_id + 2,
            type: "column",
            attributes: {},
            structure: [],
          },
          {
            id: this.last_id + 3,
            type: "column",
            attributes: {},
            structure: [],
          },
        ],
      };
      let button2 = {
        id: this.last_id + 4,
        type: "row",
        attributes: {},
        structure: [
          {
            id: this.last_id + 5,
            type: "column",
            attributes: {},
            structure: [],
          },
          {
            id: this.last_id + 6,
            type: "column",
            attributes: {},
            structure: [],
          },
          {
            id: this.last_id + 7,
            type: "column",
            attributes: {},
            structure: [],
          },
        ],
      };
      let button3 = {
        id: this.last_id + 8,
        type: "row",
        attributes: {},
        structure: [
          {
            id: this.last_id + 9,
            type: "column",
            attributes: {},
            structure: [],
          },
          {
            id: this.last_id + 10,
            type: "column",
            attributes: {},
            structure: [],
          },
          {
            id: this.last_id + 11,
            type: "column",
            attributes: {},
            structure: [],
          },
        ],
      };
      this.$emit("updateListThreeRows", button1, button2, button3, new_id);
    },

    AddRow() {
      let button = {
        id: this.last_id,
        type: "row",
        attributes: {},
        structure: [],
      };
      this.$emit("updateList", button, this.last_id);
    },
    AddColumn() {
      let button = {
        id: this.last_id,
        type: "column",
        attributes: {},
        structure: [],
      };
      this.$emit("updateList", button, this.last_id);
    },
  },
};
</script>

<style>
.list-group-item {
  background-color: transparent;
  border-top: 1px solid #ddd;
  padding: 3px 0px 3px 10px;
  border-radius: 0;
  color: #949494;
}

.list-group-item:hover {
  color: #ffffff;
  cursor: pointer;
  background-color: rgb(45, 47, 53);
}
.fa-rotate-90 {
  -webkit-transform: rotate(90deg);
  -moz-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  -o-transform: rotate(90deg);
  transform: rotate(90deg);
}

input[type="file"] {
  position: absolute;
  top: 0;
  right: 0;
  min-width: 100%;
  min-height: 100%;
  /*font-size: 100px;*/
  text-align: right;
  filter: alpha(opacity=0);
  opacity: 0;
  outline: none;
  cursor: inherit;
  display: block;
}
</style>
