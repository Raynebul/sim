<template>
  <div
    class="tab-pane fade show"
    id="canvas"
    role="tabpanel"
    aria-labelledby="canvas-tab"
  >
    <div class="pt-3">
      <div class="input-group input-group-sm mb-3">
        <span class="input-group-text text-gray" id="inputGroup-sizing-sm"
          >Ширина полотна</span
        >
        <input
          v-model="canvas_.w"
          @focusout="Change()"
          v-on:keyup.enter="Change()"
          type="number"
          class="form-control text-gray"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-sm"
        />
      </div>
      <div class="input-group input-group-sm mb-3">
        <span class="input-group-text text-gray" id="inputGroup-sizing-sm"
          >Высота полотна</span
        >
        <input
          v-model="canvas_.h"
          @focusout="Change()"
          v-on:keyup.enter="Change()"
          type="number"
          class="form-control text-gray"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-sm"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    canvas: {
      type: Object,
    },
  },

  data(props) {
    let canvas_ = {};
    let canvas_change = props.canvas;
    for (let key in props.canvas) {
      canvas_[key] = props.canvas[key];
    }
    //canvas_ = props.canvas;
    return {
      canvas_,
      canvas_change,
      state_input: true,
    };
  },
  mounted() {},
  computed: {
    canvas_watched: function () {
      return JSON.parse(JSON.stringify(this.canvas));
    },
    canvas__watched: function () {
      return JSON.parse(JSON.stringify(this.canvas_));
    },
  },
  watch: {
    canvas_watched: {
      handler(newVal, oldVal) {
        for (let key in newVal) {
          this.canvas_[key] = newVal[key];
        }
      },
      deep: true,
    },
    canvas__watched: {
      handler(newVal, oldVal) {
        let hplus = newVal.h + 1 === oldVal.h;
        let hminus = newVal.h - 1 === oldVal.h;
        let wplus = newVal.w + 1 === oldVal.w;
        let wminus = newVal.w - 1 === oldVal.w;
        if (hplus || hminus || wplus || wminus) {
          for (let key in this.canvas) {
            this.canvas_change[key] = this.canvas_[key];
          }
        }
      },
      deep: true,
    },
  },
  methods: {
    Change() {
      if (
        this.canvas_.h !== this.canvas_change.h ||
        this.canvas_.w !== this.canvas_change.w
      ) {
        for (let key in this.canvas) {
          this.canvas_change[key] = this.canvas_[key];
        }
      }
    },
    StateButton() {
      this.state_input = false;
    },
    /*
    ChangeButton() {
      let hplus = this.canvas_.h + 1 === this.canvas_change.h;
      let hminus = this.canvas_.h - 1 === this.canvas_change.h;
      let wplus = this.canvas_.w + 1 === this.canvas_change.w;
      let wminus = this.canvas_.w - 1 === this.canvas_change.w;
      console.log(hplus, hminus, wplus, wminus);
      if (this.state_input === true || hplus || hminus || wplus || wminus) {
        console.log("test", true);
        for (let key in this.canvas) {
          this.canvas_change[key] = this.canvas_[key];
        }
      }
    }, */
  },
};
</script>

<style></style>
