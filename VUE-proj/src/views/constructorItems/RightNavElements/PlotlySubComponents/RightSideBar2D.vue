<template>
  <div
    class="offcanvas offcanvas-end bg-dark"
    tabindex="-1"
    
    data-bs-scroll="true"
    :id="`offcanvasRight` + index"
    aria-labelledby="offcanvasRightLabel"
  >
    <div class="offcanvas-header">
      <h5 id="offcanvasRightLabel" class="text-light">Компонент {{ index + 1 }}</h5>

      <button
        type="button"
        class="btn-close text-reset btn-close-white"
        data-bs-dismiss="offcanvas"
        aria-label="Закрыть"
      ></button>
    </div>
    <div class="offcanvas-body text-light">
      <div class="text-light">{{ object }}</div>
      <div class="text-light">Имя</div>
      <div class="input-group input-group-sm mb-3">
        <span class="input-group-text text-gray" id="inputGroup-sizing-sm"
          >Название</span
        >
        <input
          type="text"
          class="form-control text-gray"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-sm"
          @keyup="$emit(`input2Dcomponent`, object, index)"
          v-model="object.name"
        />
      </div>
      <div>Тип:</div>
      <select
        class="form-select form-select-sm text-gray"
        aria-label=".form-select-sm example"
        @click="ChangeTypeOf2Dcomponent"
        v-model="object.type"
      >
        <option value="">_</option>
        <option value="bar">Bar chart</option>
        <option value="scatter">Scatter</option>
        <!--<option value="histogram">Histogram</option>-->
        <option value="pie">Pie chart</option>
        <!--<option value="box">Box plot</option>
        <option value="sunburst">Sunburst</option>
        <option value="heatmap">Heatmap</option> -->
      </select>
      <div>Mode:</div>
      <select
        v-if="object.type == `scatter`"
        class="form-select form-select-sm text-gray"
        aria-label=".form-select-sm example"
        v-model="object.mode"
        @click="ChangeModeOf2Dcomponent()"
      >
        <option value="">_</option>
        <option value="markers">Markers</option>
        <option value="markers+text">Markers+text</option>
        <option value="lines">Lines</option>
        <option value="lines+markers">Lines+markers</option>
        <option value="lines+text">Lines+text</option>
        <option value="lines+markers+text">Lines+markers+text</option>
        <option value="none">None</option>
      </select>
      <div>Fill:</div>
      <select
        v-if="object.type == `scatter`"
        class="form-select form-select-sm text-gray"
        aria-label=".form-select-sm example"
        v-model="object.fill"
        @click="ChangeFillOf2Dcomponent()"
      >
        <option value=" " selected></option>
        <option value="tonexty">tonexty</option>
        <option value="tozeroy">tozeroy</option>
        <option value="toself">toself</option>
      </select>
      <p></p>
      <div>Точки:</div>
      <!---->
      <div v-if="object.type == 'scatter' || object.type == 'bar'">
        <div
          v-if="
            object.mode == `markers` ||
            object.mode == `markers+text` ||
            object.mode == `lines+markers`
          "
        >
          <div class="form-check">
            <input
              class="form-check-input checkbox-gray"
              type="checkbox"
              v-model="arrayOfMarkers"
              @click="ArrayOfMarkersColors()"
              id="flexCheckDefault"
            />
            <label class="form-check-label" for="flexCheckDefault">
              Массив точек (цвет)?
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input checkbox-gray"
              type="checkbox"
              v-model="arrayOfMarkerOpacity"
              @click="ArrayOfMarkerOpacity()"
              id="flexCheckDefault"
            />
            <label class="form-check-label" for="flexCheckDefault">
              Массив точек (прозрачность)?
            </label>
          </div>
          <div @click="ArrayOfMarkerSizes()">
            <div class="form-check">
              <input
                class="form-check-input checkbox-gray"
                type="checkbox"
                v-model="arrayOfMarkerSizes"
                id="flexCheckDefault"
              />
              <label class="form-check-label" for="flexCheckDefault">
                Массив точек (размер)?
              </label>
            </div>
          </div>
          <div>
            <div v-if="arrayOfMarkers == false">
              <label for="exampleColorInput" class="form-label"
                >Цвет точек</label
              >
              <input
                type="color"
                class="form-control form-control-color text-gray"
                id="exampleColorInput"
                v-model="object.marker.color"
                title="Choose your color"
              />
            </div>
            <div v-else>
              <div v-for="i in object.marker.color.length" :key="i">
                <label for="exampleColorInput" class="form-label text-gray"
                  >Цвет точек</label
                >
                <input
                  type="color"
                  class="form-control form-control-color text-gray"
                  id="exampleColorInput"
                  v-model="object.marker.color[i - 1]"
                  title="Choose your color"
                />
              </div>
            </div>
          </div>
          <div>
            <div v-if="arrayOfMarkerSizes == false">
              <div
                class="input-group input-group-sm mb-3"
                style="padding: 0 5px 0 0"
              >
                <span class="input-group-text text-gray" id="basic-addon1"
                  >Размер точки</span
                >
                <input
                  @keyup="$emit(`input2Dcomponent`, object, index)"
                  v-model="object.marker.size"
                  class="form-control text-gray"
                  type="number"
                />
              </div>
            </div>
            <div v-else>
              <div v-for="i in object.marker.size.length" :key="i">
                <div
                  class="input-group input-group-sm mb-3"
                  style="padding: 0 5px 0 0"
                >
                  <span class="input-group-text text-gray" id="basic-addon1"
                    >Размер точки</span
                  >
                  <input
                    @keyup="$emit(`input2Dcomponent`, object, index)"
                    v-model="object.marker.size[i - 1]"
                    class="form-control text-gray"
                    type="number"
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div v-if="arrayOfMarkerOpacity == false">
              <div
                class="input-group input-group-sm mb-3"
                style="padding: 0 5px 0 0"
              >
                <span class="input-group-text text-gray" id="basic-addon1"
                  >Прозрачность точки</span
                >
                <input
                  @keyup="$emit(`input2Dcomponent`, object, index)"
                  v-model="object.marker.opacity"
                  class="form-control text-gray"
                  type="number"
                />
              </div>
            </div>
            <div v-else>
              <div v-for="i in object.marker.opacity.length" :key="i">
                <div
                  class="input-group input-group-sm mb-3"
                  style="padding: 0 5px 0 0"
                >
                  <span class="input-group-text text-gray" id="basic-addon1"
                    >Прозрачность точки</span
                  >
                  <input
                    @keyup="$emit(`input2Dcomponent`, object, index)"
                    v-model="object.marker.opacity[i - 1]"
                    class="form-control text-gray"
                    type="number"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="object.mode == `lines` || object.mode == `lines+markers`"
          style="padding: 0 0 10px 0"
        >
          <label for="exampleColorInput" class="form-label text-gray"
            >Цвет линии</label
          >
          <input
            type="color"
            class="form-control form-control-color text-gray"
            id="exampleColorInput"
            v-model="object.line.color"
            title="Choose your color"
          />
          <div
            class="input-group input-group-sm mb-3"
            style="padding: 0 5px 0 0"
          >
            <span class="input-group-text text-gray" id="basic-addon1"
              >Ширина линии</span
            >
            <input
              @keyup="$emit(`input2Dcomponent`, object, index)"
              v-model="object.line.width"
              type="number"
              class="form-control text-gray"
            />
          </div>
        </div>
        <div
          v-if="object.mode == `lines` || object.mode == `lines+markers`"
          style="padding: 0 0 10px 0"
        >
          <label for="exampleColorInput" class="form-label text-gray"
            >Цвет заполнения:
          </label>
          <input
            type="color"
            class="form-control form-control-color text-gray"
            id="exampleColorInput"
            v-model="object.fillcolor"
            title="Choose your color"
          />
        </div>
        <div v-for="i in object.x.length" :key="i">
          <div class="d-flex">
            <div class="my-auto">{{ i }}._</div>
            <div class="input-group input-group-sm" style="padding: 0 5px 0 0">
              <span class="input-group-text text-gray" id="basic-addon1"
                >x</span
              >
              <input
                @keyup="$emit(`input2Dcomponent`, object, index)"
                v-model="object.x[i - 1]"
                class="form-control text-gray"
              />
            </div>
            <div class="input-group input-group-sm" style="padding: 0 0 0 5px">
              <span class="input-group-text text-gray" id="basic-addon1"
                >y</span
              >
              <input
                @keyup="$emit(`input2Dcomponent`, object, index)"
                v-model="object.y[i - 1]"
                class="form-control form-control-sm text-gray"
              />
            </div>
            <button
              @click="RemovePoint(i - 1)"
              style="
                font-size: 0.7rem;
                margin-right: 0px;
                margin-top: 0px;
                border-color: transparent !important;
                background-color: transparent;
              "
              class="bi bi-trash-fill btn btn-outline-danger me-md-2"
            ></button>
          </div>
        </div>
      </div>
      <div v-if="object.type == 'pie'">
        <div v-for="i in object.values.length" :key="i" class="d-flex">
          <div>{{ i }}._</div>
          <div
            class="input-group input-group-sm mb-3"
            style="padding: 0 5px 0 0"
          >
            <span class="input-group-text text-gray" id="basic-addon1">x</span>
            <input
              @keyup="$emit(`input2Dcomponent`, object, index)"
              v-model="object.values[i - 1]"
              class="form-control text-gray"
            />
          </div>
          <div
            class="input-group input-group-sm mb-3"
            style="padding: 0 5px 0 0"
          >
            <span class="input-group-text text-gray" id="basic-addon1">x</span>
            <input
              @keyup="$emit(`input2Dcomponent`, object, index)"
              v-model="object.labels[i - 1]"
              class="form-control text-gray"
            />
          </div>
        </div>
      </div>

      <div
        v-if="object.type == 'scatter' || object.type == 'bar'"
        class="btn-group btn-group-sm"
        role="group"
        aria-label="..."
      >
        <button
          type="button"
          class="btn btn-outline-primary rounded-0"
          style="font-size: 0.7rem"
          @click="AddPoint"
        >
          Добавить
        </button>
      </div>
      <div
        v-if="object.type == 'pie'"
        class="btn-group btn-group-sm"
        role="group"
        aria-label="..."
      >
        <button
          type="button"
          class="btn btn-outline-primary rounded-0"
          style="font-size: 0.7rem"
          @click="AddValue"
        >
          Добавить
        </button>
        <button
          type="button"
          class="btn btn-outline-danger rounded-0"
          style="font-size: 0.7rem"
          @click="RemoveValue"
        >
          Удалить
        </button>
      </div>
      <!--Текст-->
      <select
        v-if="
          object.type == `scatter` &&
          (object.mode == `markers+text` ||
            object.mode == `lines+text` ||
            object.mode == `lines+markers+text`)
        "
        class="form-select form-select-sm text-gray"
        aria-label=".form-select-sm example"
        v-model="object.textposition"
        @click="$emit(`input2Dcomponent`, object, index)"
      >
        <option value=" " selected></option>
        <option value="top center">top center</option>
        <option value="bottom center">bottom center</option>
        <option value="center">center</option>
      </select>
      <div v-if="object.text !== undefined">
        <div v-for="i in object.text.length" :key="i">
          <div class="d-flex">
            <div class="my-auto">{{ i }}._</div>
            <div class="input-group input-group-sm" style="padding: 0 5px 0 0">
              <span class="input-group-text text-gray" id="basic-addon1"
                >Текст</span
              >
              <input
                @keyup="$emit(`input2Dcomponent`, object, index)"
                v-model="object.text[i - 1]"
                class="form-control text-gray"
              />
            </div>
            <button
              @click="RemoveText(i - 1)"
              style="
                font-size: 0.7rem;
                margin-right: 0px;
                margin-top: 0px;
                border-color: transparent !important;
                background-color: transparent;
              "
              class="bi bi-trash-fill btn btn-outline-danger me-md-2"
            ></button>
          </div>
        </div>
      </div>
      <div
        v-if="object.type == 'scatter'"
        class="btn-group btn-group-sm"
        role="group"
        aria-label="..."
      >
        <button
          type="button"
          class="btn btn-outline-primary rounded-0"
          style="font-size: 0.7rem"
          @click="AddText"
        >
          Добавить
        </button>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<script>
import { toHandlers } from "vue";

export default {
  props: {
    input: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
    },
  },
  watch: {
    input: {
      handler(newVal, oldVal) {

      },
      deep: true,
    },
  },
  data(props, context) {
    let object = props.input;
    let arrayOfMarkers = false;
    let arrayOfMarkerSizes = false;
    let arrayOfMarkerOpacity = false;
    //let input = props.UI.controls.plotlyObjects2D;
    return {
      object,
      arrayOfMarkers,
      arrayOfMarkerSizes,
      arrayOfMarkerOpacity,
    };
  },
  methods: {
    Test(test) {
      console.log(test);
    },
    ChangeModeOf2Dcomponent() {
      switch (this.object.mode) {
        case "": {
          delete this.object["marker"];
          delete this.object["line"];
          break;
        }
        case "markers": {
          let marker = {
            size: 10,
            color: "rgb(164, 194, 244)",
            opacity: 1,
          };
          this.object["marker"] = marker;
          break;
        }
        case "markers+text": {
          let marker = {
            size: 10,
            color: "rgb(164, 194, 244)",
            opacity: 1,
          };
          this.object["marker"] = marker;
          break;
        }
        case "lines": {
          let line = {
            width: 1,
            color: "rgb(162, 234, 174)",
            opacity: 1,
          };
          this.object["line"] = line;
          break;
        }
        case "lines+markers": {
          let line = {
            width: 1,
            color: "rgb(162, 234, 174)",
            opacity: 1,
          };
          this.object["line"] = line;
          let marker = {
            size: 10,
            color: "rgb(164, 194, 244)",
            opacity: 1,
          };
          this.object["marker"] = marker;
          break;
        }
        case "none": {
          break;
        }
        default:
          console.log(1);
      }
      //this.$emit("input2Dcomponent", this.object, this.index);
    },
    ChangeFillOf2Dcomponent() {
      switch (this.object.fill) {
        case " ": {
          let fill = "";
          this.object["fill"] = fill;
          break;
        }
        case "tozeroy": {
          let fill = "tozeroy";
          this.object["fill"] = fill;
          break;
        }
        case "tonexty": {
          let fill = "tonexty";
          this.object["fill"] = fill;
          break;
        }
        default:
          console.log(1);
      }
      //this.$emit("input2Dcomponent", this.object, this.index);
    },
    ChangeTypeOf2Dcomponent() {
      switch (this.object.type) {
        case "bar": {
          let newData = {
            type: "bar",
            x: [1, 2, 3],
            y: [20, 10, 15],
          };
          this.object = newData;
          break;
        }
        case "scatter": {
          let newData = {
            type: "scatter",
            mode: "",
            x: [1, 2, 3],
            y: [20, 10, 15],
            text: [],
          };
          this.object = newData;
          break;
        }
        case "pie": {
          let newData = {
            type: "pie",
            values: [30, 29, 4],
            labels: ["1", "2", "3"],
          };
          this.object = newData;
          break;
        }
        case "histogram": {
          let newData = {
            type: "histogram",
            x: [],
            y: [],
          };
          this.object = newData;
          break;
        }
        case "box": {
          let newData = {
            type: "box",
            x: [],
            y: [],
          };
          this.object = newData;
          break;
        }
        case "sunburst": {
          let newData = {
            type: "sunburst",
            labels: [
              "Eve",
              "Cain",
              "Seth",
              "Enos",
              "Noam",
              "Abel",
              "Awan",
              "Enoch",
              "Azura",
            ],
            parents: [
              "",
              "Eve",
              "Eve",
              "Seth",
              "Seth",
              "Eve",
              "Eve",
              "Awan",
              "Eve",
            ],
            values: [10, 14, 12, 10, 2, 6, 6, 4, 4],
            outsidetextfont: { size: 20, color: "#377eb8" },
            leaf: { opacity: 0.4 },
            marker: { line: { width: 2 } },
          };
          this.object = newData;
          break;
        }
        case "heatmap": {
          let newData = {
            type: "heatmap",
            colorscale: [
              ["0.0", "rgb(165,0,38)"],
              ["0.111111111111", "rgb(215,48,39)"],
              ["0.222222222222", "rgb(244,109,67)"],
              ["0.333333333333", "rgb(253,174,97)"],
              ["0.444444444444", "rgb(254,224,144)"],
              ["0.555555555556", "rgb(224,243,248)"],
              ["0.666666666667", "rgb(171,217,233)"],
              ["0.777777777778", "rgb(116,173,209)"],
              ["0.888888888889", "rgb(69,117,180)"],
              ["1.0", "rgb(49,54,149)"],
            ],
          };
          this.object = newData;
          break;
        }
        default:
          console.log(1);
      }
      this.$emit("input2Dcomponent", this.object, this.index);
    },

    AddPoint() {
      this.object.x.push(1);
      this.object.y.push(1);
      this.$emit("input2Dcomponent", this.object, this.index);
    },
    RemovePoint(i) {
      this.object.x.splice(i, 1);
      this.object.y.splice(i, 1);
      //this.object.x.splice(-1);
      //this.object.y.splice(-1);
      //this.$emit("input2Dcomponent", this.object, this.index);
    },
    AddText() {
      this.object.text.push("");
      //this.$emit("input2Dcomponent", this.object, this.index);
    },
    RemoveText(i) {
      this.object.text.splice(i, 1);
      //this.object.text.splice(-1);
      //this.$emit("input2Dcomponent", this.object, this.index);
    },
    AddValue() {
      this.object.values.push(1);
      this.object.labels.push(String(this.object.labels.length + 1));
      //this.$emit("input2Dcomponent", this.object, this.index);
    },
    RemoveValue() {
      this.object.values.splice(-1);
      this.object.labels.splice(-1);
      //this.$emit("input2Dcomponent", this.object, this.index);
    },
    ArrayOfMarkersColors() {
      if (this.arrayOfMarkers == false) {
        let colors = [];
        this.object.marker.color = [];
        for (let i = 0; i < this.object.x.length; i++) {
          colors.push("rgb(164, 194, 244)");
        }
        this.object.marker.color = colors;
      } else {
        this.object.marker.color = "rgb(164, 194, 244)";
      }
      //this.$emit("input2Dcomponent", this.object, this.index);
    },
    ArrayOfMarkerSizes() {
      if (this.arrayOfMarkerSizes == false) {
        let sizes = [];
        //this.object.marker.size = [];
        for (let i = 0; i < this.object.x.length; i++) {
          sizes.push(10);
        }
        this.object.marker.size = sizes;
      } else {
        this.object.marker.size = 10;
      }
      //this.$emit("input2Dcomponent", this.object, this.index);
    },
    ArrayOfMarkerOpacity() {
      if (this.arrayOfMarkerOpacity == false) {
        let opacities = [];
        //this.object.marker.size = [];
        for (let i = 0; i < this.object.x.length; i++) {
          opacities.push(1);
        }
        this.object.marker.opacity = opacities;
      } else {
        this.object.marker.opacity = 1;
      }
      //this.$emit("input2Dcomponent", this.object, this.index);
    },
  },
  //emits: ["newValue"],
};
</script>
