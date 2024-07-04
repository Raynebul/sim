<template>
  <!--
  <div class="accordion-item">
    <h2 class="accordion-header" id="panelsStayOpenSettings-heading">
      <button
        class="accordion-button collapsed bg-dark text-white"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#panelsStayOpenSettings-collapse"
        aria-expanded="false"
        aria-controls="panelsStayOpenSettings-collapse"
      >
        Настройки тренажера
      </button>
    </h2>
    <div
      id="panelsStayOpenSettings-collapse"
      class="accordion-collapse collapse bg-dark"
      aria-labelledby="panelsStayOpenSettings-heading"
    >
      <div class="accordion-body text-white">
        <form @click="$emit(`inputSettings`, inputSettings)">
          <div class="form-check">
            <input
              class="form-check-input checkbox-gray"
              type="checkbox"
              id="flexCheckDefault"
              v-model="inputSettings.buttonReverse"
            />
            <label class="form-check-label" for="flexCheckDefault"
              >Reverse
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input checkbox-gray"
              type="checkbox"
              id="flexCheckDefault"
              v-model="inputSettings.checkboxInline"
            />
            <label class="form-check-label" for="flexCheckDefault"
              >Inline checkbox
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input checkbox-gray"
              type="checkbox"
              id="flexCheckDefault"
              v-model="inputSettings.radioboxInline"
            />
            <label class="form-check-label" for="flexCheckDefault"
              >Inline radiobox
            </label>
          </div>
        </form>
        <hr style="margin: 0 0 0 0" />
        <div style="font-size: 0.8rem">
          <ol class="list-group list-group-numbered rounded-0">
            Список
            <li
              class="list-group-item"
              v-for="render in UI.settings.renderItems"
              :key="render"
            >
              {{ render }}
            </li>
          </ol>
          Поменять два местами:
          <input
            class="form-control text-gray form-control-sm rounded-0"
            style="border-color: #414141"
            type="text"
            v-model="switch1"
          />
          <input
            class="form-control text-gray form-control-sm rounded-0"
            style="border-color: #414141"
            type="text"
            v-model="switch2"
          />
          <hr style="margin: 5px 0 5px 0" />
          <button
            class="btn btn-sm btn-primary"
            type="button"
            @click="$emit(`changePosition`, switch1, switch2)"
          >
            Изменить
          </button>
        </div>
      </div>
    </div>
  </div>-->
  <div class="accordion-item">
    <h2 class="accordion-header" id="panelsStayOpenSystem-heading">
      <button
        class="accordion-button collapsed bg-dark text-white"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#panelsStayOpenSystem-collapse"
        aria-expanded="false"
        aria-controls="panelsStayOpenSystem-collapse"
      >
        Тип тренажёра
      </button>
    </h2>
    <div
      id="panelsStayOpenSystem-collapse"
      class="accordion-collapse collapse bg-dark"
      aria-labelledby="panelsStayOpenSystem-heading"
    >
      <div class="accordion-body text-white">
        <div>Типы тренажёра:</div>
        <div @click="InputSystems()">
          <!--@click="$emit(`inputSystems`, inputSettings)"-->
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
              v-model="inputSettings.roundSystem"
            />
            <label class="form-check-label" for="flexSwitchCheckDefault"
              >Включить раундовую систему</label
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    UI: {
      type: Object,
      required: true,
    },
  },
  data(props, context) {
    let inputSettings = props.UI.settings;
    let switch1 = "";
    let switch2 = "";
    //let roundSystem = false;
    return {
      inputSettings,
      switch1,
      switch2,
    };
  },
  methods: {
    Test(test) {
      console.log(test);
    },
    InputSystems() {
      // this.loaded=false;
      if (this.inputSettings.roundSystem == true) {
        //this.UI.systems.roundSystem = true;
        //this.UI.systems = input;
        this.inputSettings["rounds"] = [];
      } else {
        //console.log(2);
        //this.UI.settings.roundSystem = false;
        this.inputSettings["rounds"] = [];
      }
    },
  },
  //emits: ["newValue"],
};
</script>

<style>
.list-group-item {
  background-color: transparent;
  border-top: 1px solid #ddd;
  padding: 3px 0px 3px 10px;
  border-radius: 0;
  color: #fff;
}
</style>
