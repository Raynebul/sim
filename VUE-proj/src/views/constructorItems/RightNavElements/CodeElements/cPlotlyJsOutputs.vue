<script setup>
import plotlyAttrs_js from "./plotlyAttrs.js";
</script>

<template>
  <div
    class="offcanvas offcanvas-end bg-dark"
    tabindex="-1"
    
    data-bs-scroll="true"
    :id="`offcanvasRight` + `PlotlyOutputs` + index"
    aria-labelledby="offcanvasRightLabel"
  >
    <div class="offcanvas-header">
      <h5 id="offcanvasRightLabel">Layout</h5>

      <button
        type="button"
        class="btn-close text-reset btn-close-white"
        data-bs-dismiss="offcanvas"
        aria-label="Закрыть"
      ></button>
    </div>
    <div class="offcanvas-body">
      <div>
        <div class="text-light">Layout или data</div>

        <select
          class="form-select form-select-sm text-gray"
          aria-label=".form-select-sm example"
          @click="ChangeMode()"
          v-if="plotlyObject !== undefined"
          v-model="output_.plotlyObject.id"
        >
          <!--@click="ChangeMode()"-->
          <option selected>Open this select menu</option>
          <option value="layout">Layout</option>
          <option value="data">Data</option>
          <option
            v-for="i in plotlyObject.attributes.data.length"
            :key="i"
            :value="String(i - 1)"
          >
            {{ String(i - 1) }} график
          </option>
        </select>
        <div class="text-light">Аттрибут</div>
        <select
          class="form-select form-select-sm text-gray"
          aria-label=".form-select-sm example"
          v-if="
            output_.plotlyObject.id != `layout` &&
            output_.plotlyObject.id != `` &&
            output_.plotlyObject.id != 'data'
          "
          @click="InputPlotlyOutput"
          v-model="output_.plotlyObject.attribute"
        >
          <option selected>Open this select menu</option>
          <option v-for="obj in plotlyAttrs_js.data" :key="obj" :value="obj">
            {{ obj }}
          </option>
        </select>
        <div v-if="output_.plotlyObject.id == `data`">
          <div class="text-light">Что изменяется</div>
          <div class="form-check">
            <input
              class="form-check-input checkbox-gray"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              @click="CheckboxesArray()"
              v-model="checkboxes.x"
            />
            <label class="form-check-label" for="flexCheckDefault"> x </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input checkbox-gray"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              @click="CheckboxesArray()"
              v-model="checkboxes.y"
            />
            <label class="form-check-label" for="flexCheckChecked"> y </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input checkbox-gray"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              @click="CheckboxesArray()"
              v-model="checkboxes.fillcolor"
            />
            <label class="form-check-label text-light" for="flexCheckChecked">
              fillcolor
            </label>
          </div>
        </div>
        <div class="mb-3" v-if="output_.plotlyObject.id == `data`">
          <label for="exampleFormControlTextarea1" class="form-label text-light"
            >JSON data - пример</label
          >
          <textarea
            class="form-control rounded-0 text-light"
            id="exampleFormControlTextarea1"
            @keyup="InputPlotlyOutput()"
            v-model="output_.plotlyObject.dataElement"
            rows="6"
            style="
              background-color: #252729 !important;
              border-color: rgb(78, 77, 80) !important;
            "
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: Object,
    },
    output: {
      type: Object,
    },
    plotlyObjects: {
      type: Object,
    },
  },
  data(props) {
    //console.log(plotlyAttrs_js.data);
    let output_ = props.output;
    if (output_["plotlyObject"] == undefined) {
      output_["plotlyObject"] = {
        id: "",
        attribute: "",
      };
    }
    //output_.plotlyObject["dataElement"] = "";
    let plotlyObject = props.plotlyObjects.find(
      (object) => output_.control === object.attributes.name
    );
    let checkboxes = {
      x: false,
      y: false,
      fillcolor: false,
    };
    for (let j = 0; j < output_.plotlyObject.attribute.length; j++) {
      switch (output_.plotlyObject.attribute[j]) {
        case "x": {
          checkboxes.x = true;
          break;
        }
        case "y": {
          checkboxes.y = true;
          break;
        }
        case "fillcolor": {
          checkboxes.fillcolor = true;
          break;
        }
        default:
          break;
      }
    }
    return {
      output_,
      plotlyObject,
      horny: "",
      checkboxes,
    };
  },
  methods: {
    InputPlotlyOutput() {
      this.$emit("inputPlotlyOutput", this.output_, this.index);
    },
    ChangeMode() {
      if (this.output_.plotlyObject.id == "data") {
        this.output_.plotlyObject.attribute = [];
      }
      //this.$emit("inputPlotlyOutput", this.output_, this.index);
    },
    CheckboxesArray() {
      if (
        this.checkboxes.x === true &&
        this.output_.plotlyObject.attribute.findIndex(
          (object) => object === "x"
        ) === -1
      )
        this.output_.plotlyObject.attribute.push("x");
      else
        this.output_.plotlyObject.attribute =
          this.output_.plotlyObject.attribute.filter(function (obj) {
            return obj !== "x";
          });
      if (
        this.checkboxes.y === true &&
        this.output_.plotlyObject.attribute.findIndex(
          (object) => object === "y"
        ) === -1
      )
        this.output_.plotlyObject.attribute.push("y");
      else
        this.output_.plotlyObject.attribute =
          this.output_.plotlyObject.attribute.filter(function (obj) {
            return obj !== "y";
          });
      if (
        this.checkboxes.fillcolor === true &&
        this.output_.plotlyObject.attribute.findIndex(
          (object) => object === "fillcolor"
        ) === -1
      )
        this.output_.plotlyObject.attribute.push("fillcolor");
      else
        this.output_.plotlyObject.attribute =
          this.output_.plotlyObject.attribute.filter(function (obj) {
            return obj !== "fillcolor";
          });
    },
  },
};
</script>
