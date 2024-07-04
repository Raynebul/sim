<template>
  <div
    class="offcanvas offcanvas-end bg-dark"
    tabindex="-1"
    
    data-bs-scroll="true"
    :id="`offcanvasRight` + `Layout`"
    aria-labelledby="offcanvasRightLabel"
  >
    <div class="offcanvas-header">
      <h5 id="offcanvasRightLabel" class="text-light">Layout</h5>

      <button
        type="button"
        class="btn-close text-reset btn-close-white"
        data-bs-dismiss="offcanvas"
        aria-label="Закрыть"
      ></button>
    </div>
    <div class="offcanvas-body text-light">
      <div class="text-light">{{ layout_ }}</div>
      <div>
        <div class="text-light">Название полотна</div>
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text text-gray" id="inputGroup-sizing-sm"
            >Название</span
          >
          <input
            type="text"
            class="form-control text-gray"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            @keyup="ChangeLayout"
            v-model="layout_.title.text"
          />
        </div>
        <div class="d-flex">
          <div
            class="input-group input-group-sm mb-3"
            style="padding: 0 5px 0 0"
          >
            <span class="input-group-text text-gray" id="basic-addon1">w</span>
            <input
              class="form-control text-gray"
              type="number"
              v-model="layout_.width"
              @keyup="ChangeLayout"
            />
          </div>
          <div
            class="input-group input-group-sm mb-3"
            style="padding: 0 0 0 5px"
          >
            <span class="input-group-text text-gray" id="basic-addon1">h</span>
            <input
              class="form-control form-control-sm text-gray"
              type="number"
              v-model="layout_.height"
              @keyup="ChangeLayout"
            />
          </div>
        </div>
        <div>xaxis</div>
        <div>xaxis range</div>
        <div class="d-flex">
          <div
            class="input-group input-group-sm mb-3"
            style="padding: 0 5px 0 0"
          >
            <span class="input-group-text text-gray" id="basic-addon1">x1</span>
            <input
              class="form-control text-gray"
              type="number"
              v-model="layout_.xaxis.range[0]"
              @keyup="ChangeLayout"
            />
          </div>
          <div
            class="input-group input-group-sm mb-3"
            style="padding: 0 0 0 5px"
          >
            <span class="input-group-text text-gray" id="basic-addon1">x2</span>
            <input
              class="form-control form-control-sm text-gray"
              type="number"
              v-model="layout_.xaxis.range[1]"
              @keyup="ChangeLayout"
            />
          </div>
        </div>
        <div class="input-group input-group-sm mb-3" style="padding: 0 5px 0 0">
          <span class="input-group-text text-gray" id="basic-addon1"
            >dtick</span
          >
          <input
            class="form-control text-gray"
            type="number"
            v-model="layout_.xaxis.dtick"
            @keyup="ChangeLayout"
          />
        </div>
        <div>xaxis linewidth</div>
        <div class="input-group input-group-sm mb-3" style="padding: 0 5px 0 0">
          <span class="input-group-text text-gray" id="basic-addon1">y1</span>
          <input
            class="form-control text-gray"
            type="number"
            v-model="layout_.xaxis.linewidth"
            @keyup="ChangeLayout"
          />
        </div>
        <div class="form-check">
          <input
            class="form-check-input checkbox-gray"
            type="checkbox"
            value=""
            id="flexCheckDefault"
            v-model="layout_.xaxis.autorange"
            @click="ChangeLayout"
          />
          <label class="form-check-label" for="flexCheckDefault">
            autorange
          </label>
        </div>
        <div>yaxis</div>
        <div>yaxis range</div>
        <div class="d-flex">
          <div
            class="input-group input-group-sm mb-3"
            style="padding: 0 5px 0 0"
          >
            <span class="input-group-text text-gray" id="basic-addon1">y1</span>
            <input
              class="form-control text-gray"
              type="number"
              v-model="layout_.yaxis.range[0]"
              @keyup="ChangeLayout"
            />
          </div>
          <div
            class="input-group input-group-sm mb-3"
            style="padding: 0 0 0 5px"
          >
            <span class="input-group-text text-gray" id="basic-addon1">y2</span>
            <input
              class="form-control form-control-sm text-gray"
              type="number"
              v-model="layout_.yaxis.range[1]"
              @keyup="ChangeLayout"
            />
          </div>
        </div>
        <div class="input-group input-group-sm mb-3" style="padding: 0 5px 0 0">
          <span class="input-group-text text-gray" id="basic-addon1"
            >dtick</span
          >
          <input
            class="form-control text-gray"
            type="number"
            v-model="layout_.yaxis.dtick"
            @keyup="ChangeLayout"
          />
        </div>
        <div>yaxis linewidth</div>
        <div class="input-group input-group-sm mb-3" style="padding: 0 5px 0 0">
          <span class="input-group-text text-gray" id="basic-addon1">y1</span>
          <input
            class="form-control text-gray"
            type="number"
            v-model="layout_.yaxis.linewidth"
            @keyup="ChangeLayout"
          />
        </div>
        <div class="form-check">
          <input
            class="form-check-input checkbox-gray"
            type="checkbox"
            value=""
            id="flexCheckDefault"
            v-model="layout_.yaxis.autorange"
            @click="ChangeLayout"
          />
          <label class="form-check-label" for="flexCheckDefault">
            autorange
          </label>
        </div>
        <div>Legend</div>
        <div class="form-check">
          <input
            class="form-check-input checkbox-gray"
            type="checkbox"
            value=""
            id="flexCheckDefault"
            v-model="layout_.showlegend"
            @click="ChangeLayout"
          />
          <label class="form-check-label" for="flexCheckDefault">
            showlegend
          </label>
        </div>
        <div>Scattergap</div>
        <div>Margin</div>
        <div class="d-flex">
          <div
            class="input-group input-group-sm mb-3"
            style="padding: 0 5px 0 0"
          >
            <span class="input-group-text text-gray" id="basic-addon1"
              >top</span
            >
            <input
              class="form-control text-gray"
              type="number"
              v-model="layout_.margin.t"
              @keyup="ChangeLayout"
            />
          </div>
          <div
            class="input-group input-group-sm mb-3"
            style="padding: 0 0 0 5px"
          >
            <span class="input-group-text text-gray" id="basic-addon1"
              >bottom</span
            >
            <input
              class="form-control form-control-sm text-gray"
              type="number"
              v-model="layout_.margin.b"
              @keyup="ChangeLayout"
            />
          </div>
        </div>
        <div class="d-flex">
          <div
            class="input-group input-group-sm mb-3"
            style="padding: 0 5px 0 0"
          >
            <span class="input-group-text text-gray" id="basic-addon1"
              >right</span
            >
            <input
              class="form-control text-gray"
              type="number"
              v-model="layout_.margin.r"
              @keyup="ChangeLayout"
            />
          </div>
          <div
            class="input-group input-group-sm mb-3"
            style="padding: 0 0 0 5px"
          >
            <span class="input-group-text text-gray" id="basic-addon1"
              >left</span
            >
            <input
              class="form-control form-control-sm text-gray"
              type="number"
              v-model="layout_.margin.l"
              @keyup="ChangeLayout"
            />
          </div>
        </div>
        <div>Barmode:</div>
        <select
          class="form-select form-select-sm text-gray"
          aria-label=".form-select-sm example "
          v-model="layout_.barmode"
          @click="ChangeBarmodeOfLayout"
        >
          <option value="">_</option>
          <option value="group">group</option>
          <option value="stack">stack</option>
          <option value="relative">relative</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import { toHandlers } from "vue";

export default {
  props: {
    layout: {
      type: Object,
      required: true,
    },
  },
  watch: {},
  data(props, context) {
    //console.log(props.UI.controls.buttons);
    let layout_ = props.layout;
    //let input = props.UI.controls.plotlyObjects2D;
    //console.log("2D-компоненты", input);
    return {
      layout_,
    };
  },
  methods: {
    ChangeBarmodeOfLayout() {
      /*
      switch (this.layout_.barmode) {
        case "bar": {
          break;
        }
        case "scatter": {
          let newData = {
            type: "scatter",
            mode: "",
            x: [1, 2, 3],
            y: [20, 10, 15],
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
        default:
          console.log(1);
          //alert("Нет таких значений");
      } */
      this.$emit("input2DLayout", this.layout_);
    },
    ChangeLayout() {
      this.$emit("input2DLayout", this.layout_);
    },
  },
  //emits: ["newValue"],
};
</script>
