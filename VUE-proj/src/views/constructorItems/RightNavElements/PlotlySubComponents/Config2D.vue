<template>
  <div
    class="offcanvas offcanvas-end bg-dark"
    tabindex="-1"
    
    data-bs-scroll="true"
    :id="`offcanvasRight` + `Config`"
    aria-labelledby="offcanvasRightLabel"
  >
    <div class="offcanvas-header">
      <h5 id="offcanvasRightLabel" class="text-light">Config</h5>

      <button
        type="button"
        class="btn-close text-reset btn-close-white"
        data-bs-dismiss="offcanvas"
        aria-label="Закрыть"
      ></button>
    </div>
    <div class="offcanvas-body text-light">
      <div class="text-light">{{ config_ }}</div>
      <div>
        <div class="text-light">staticPlot</div>
        <div class="form-check">
          <input
            class="form-check-input checkbox-gray"
            type="checkbox"
            value=""
            id="flexCheckDefault"
            v-model="config_.staticPlot"
            @click="ChangeConfig"
          />
          <label class="form-check-label" for="flexCheckDefault">
            staticPlot
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toHandlers } from "vue";

export default {
  props: {
    config: {
      type: Object,
      required: true,
    },
  },
  watch: {},
  data(props, context) {
    //console.log(props.UI.controls.buttons);
    let config_ = props.config;
    //let input = props.UI.controls.plotlyObjects2D;
    //console.log("2D-компоненты", input);
    return {
      config_,
    };
  },
  methods: {
    ChangeConfig() {
      this.$emit("input2DConfig", this.config_);
    },
  },
  //emits: ["newValue"],
};
</script>