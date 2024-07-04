<template>
  <div class="accordion-item">
    <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
      <button
        class="accordion-button collapsed bg-dark text-white"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#panelsStayOpen-collapseTwo"
        aria-expanded="false"
        aria-controls="panelsStayOpen-collapseTwo"
      >
        Функции тренажера
      </button>
    </h2>
    <div
      id="panelsStayOpen-collapseTwo"
      class="accordion-collapse collapse bg-dark"
      aria-labelledby="panelsStayOpen-headingTwo"
    >
      <div class="accordion-body text-white">
        <div>Количество: {{ Code.functions.length }}</div>
        <div class="accordion" id="accordionPanelsStayOpenExample">
          <div
            class="accordion-item"
            v-for="i in Code.functions.length"
            :key="i"
          >
            <h2
              class="accordion-header"
              :id="'panelsStayOpenNamedFunction-heading' + i"
            >
              <button
                class="accordion-button bg-dark text-white"
                type="button"
                data-bs-toggle="collapse"
                :data-bs-target="'#panelsStayOpenNamedFunction-collapse' + i"
                aria-expanded="false"
                :aria-controls="'panelsStayOpenNamedFunction-collapse' + i"
              >
                Функция "{{ Code.functions[i - 1].name }}"
              </button>
            </h2>
            <div
              :id="'panelsStayOpenNamedFunction-collapse' + i"
              class="accordion-collapse collapse bg-dark"
              :aria-labelledby="'panelsStayOpenGroupRadiobox-heading' + i"
            >
              <div class="accordion-body text-white">
                <div @keyup="InputFunctionWithoutButtons()">
                  <div class="input-group input-group-sm mb-3">
                    <span
                      class="input-group-text text-gray"
                      id="inputGroup-sizing-sm"
                      >Имя</span
                    >
                    <input
                      type="text"
                      class="form-control text-gray"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      v-model="functions[i - 1].name"
                    />
                  </div>
                </div>
                <label class="form-label">Контрол: </label>
                <select
                  v-model="buttonControls[i - 1]"
                  @click="ChooseButton(i - 1)"
                  class="form-select form-select-sm text-gray"
                  aria-label="Default select example"
                >
                  <option value="" selected></option>
                  <option v-for="j in buttons.length" :key="j" :value="j - 1">
                    {{ buttons[j - 1].attributes.name }}
                  </option>
                </select>
                <p></p>
                <button
                  class="btn btn-sm btn-outline-info rounded-0"
                  style="font-size: 0.7rem"
                  data-bs-toggle="offcanvas"
                  :data-bs-target="`#offcanvasFunction` + String(i)"
                  :aria-controls="`offcanvasFunction` + String(i)"
                >
                  Данные
                </button>
                <!--           
                            data-bs-toggle="modal"
                  :data-bs-target="`#exampleModalFuncs` + i"-->
                <p></p>
                <div class="form-check">
                  <input
                    class="form-check-input checkbox-gray"
                    type="checkbox"
                    v-model="functions[i - 1].period"
                    id="flexCheckDefault"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    Включить периодичность
                  </label>
                </div>
                <!--
                <div class="form-check">
                  <input
                    class="form-check-input checkbox-gray"
                    type="checkbox"
                    v-model="functions[i - 1].stopPeriod"
                    id="flexCheckDefault"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    Включить остановку периодичности
                  </label>
                </div>-->
                <input
                  v-if="functions[i - 1].period == true"
                  v-model="functions[i - 1].periodsec"
                  class="form-control form-control-sm text-gray"
                  type="number"
                  placeholder="количество секунд"
                  aria-label=".form-control-sm example"
                />
                <div v-if="functions[i - 1].period == true">
                  <label class="form-check-label" for="flexCheckDefault">
                    Команды
                  </label>
                  <div v-if="functions[i - 1].commands != undefined">
                    <div
                      v-for="command in functions[i - 1].commands.length"
                      :key="command"
                      class="border border-info"
                      style="margin-bottom: 2px; padding: 2px"
                    >
                      <div class="input-group input-group-sm mb-3">
                        <span
                          class="input-group-text text-gray"
                          id="inputGroup-sizing-sm"
                          >Имя</span
                        >
                        <input
                          type="text"
                          class="form-control text-gray"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-sm"
                          v-model="functions[i - 1].commands[command - 1].name"
                          @keyup="InputFunctionWithoutButtons()"
                        />
                      </div>
                      <select
                        v-model="functions[i - 1].commands[command - 1].button"
                        class="form-select form-select-sm text-gray"
                        @click="ChooseButtonForCommand(i - 1, command - 1)"
                        aria-label="Disabled select example"
                      >
                        <option value="" selected>Выберете</option>
                        <option
                          v-for="j in buttons.length"
                          :key="j"
                          :value="buttons[j - 1].id"
                        >
                          {{ buttons[j - 1].attributes.name }}
                        </option>
                      </select>
                      <p></p>
                      <button
                        class="btn btn-sm btn-outline-info rounded-0"
                        style="font-size: 0.7rem"
                        data-bs-toggle="offcanvas"
                        :data-bs-target="
                          `#offcanvasCommand` + String(i) + String(command)
                        "
                        :aria-controls="
                          `offcanvasCommand` + String(i) + String(command)
                        "
                      >
                        Данные
                      </button>
                      <DeletePut
                        :index="i - 1"
                        :type="`команду`"
                        @delete_put="DeleteCommand(i - 1, command - 1)"
                      >
                      </DeletePut>
                    </div>
                  </div>
                  <div
                    class="btn-group btn-group-sm"
                    role="group"
                    aria-label="..."
                  >
                    <button
                      type="button"
                      class="btn btn-outline-primary rounded-0"
                      style="font-size: 0.7rem"
                      @click="$emit(`addCommandToFunction`, i - 1)"
                    >
                      Добавить
                    </button>
                    <!--
                    <button
                      type="button"
                      class="btn btn-outline-danger rounded-0"
                      style="font-size: 0.7rem"
                      @click="$emit(`removeCommandToFunction`, i - 1)"
                    >
                      Удалить
                    </button>-->
                  </div>
                </div>
                <DeletePut
                  :index="i - 1"
                  :type="`функцию`"
                  @delete_put="DeletePut_one"
                ></DeletePut>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2
              class="accordion-header"
              id="panelsStayOpenClearFunction-heading"
            >
              <button
                class="accordion-button bg-dark text-white"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpenClearFunction-collapse"
                aria-expanded="false"
                aria-controls="panelsStayOpenClearFunction-collapse"
              >
                Функция "Clear"
              </button>
            </h2>
            <div
              id="panelsStayOpenClearFunction-collapse"
              class="accordion-collapse collapse bg-dark"
              aria-labelledby="panelsStayOpenClearFunction-heading"
            >
              <div class="accordion-body text-white">
                <div class="input-group input-group-sm mb-3">
                  <span
                    class="input-group-text text-gray"
                    id="inputGroup-sizing-sm"
                    >Имя</span
                  >
                  <input
                    type="text"
                    class="form-control text-gray"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-sm"
                  />
                </div>

                <select
                  v-model="clearInputs"
                  @click="$emit(`chooseClearInputs`, clearInputs)"
                  class="form-select form-select-sm text-gray"
                  aria-label="Default select example"
                >
                  <option value="" selected>Выберете</option>
                  <option v-for="j in buttons.length" :key="j" :value="j">
                    {{ buttons[j - 1].attributes.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <button
          style="font-size: 0.7rem"
          type="button"
          class="btn btn-outline-primary btn-sm rounded-0"
          @click="$emit(`addNewFunction`)"
        >
          Добавить
        </button>
        <!--
        <button
          style="font-size: 0.7rem"
          type="button"
          class="btn btn-outline-danger btn-sm rounded-0"
          @click="$emit(`removeNewFunction`)"
        >
          Удалить
        </button>-->
        <button
          style="font-size: 0.7rem"
          class="btn btn-sm btn-outline-secondary rounded-0"
          @click="$emit(`chooseClearInputs`, clearInputs)"
        >
          Clear
        </button>
      </div>
    </div>
  </div>

  <div v-for="i in Code.functions.length" :key="i" class="text-white">
    <div
      
      :key="i"
      class="offcanvas offcanvas-end bg-dark"
      tabindex="-1"
      data-bs-scroll="true"
      :id="`offcanvasFunction` + i"
      aria-labelledby="offcanvasRightLabel"
    >
      <div class="offcanvas-header">
        <h5 id="offcanvasRightLabel">Функция {{ i }}</h5>

        <button
          type="button"
          class="btn-close text-reset btn-close-white"
          data-bs-dismiss="offcanvas"
          aria-label="Закрыть"
        ></button>
      </div>
      <div class="offcanvas-body">
        <div class="text-light">Входные данные</div>
        <div v-for="j in functions[i - 1].inputs.length" :key="j">
          <p></p>
          <select
            v-model="functions[i - 1].inputs[j - 1].name"
            class="form-select form-select-sm"
            aria-label="Default select example"
          >
            <!--@click="$emit(`inputFunctions`, functions)"-->
            <option value="" selected>Выберете</option>
            <option v-for="jj in UI.inputs" :key="jj" :value="jj.name">
              {{ jj.name }}
            </option>
            <option v-for="jj in UI.UIinputs" :key="jj" :value="jj.name">
              {{ jj.name }}
            </option>
          </select>
          <DeletePut
            :index="i - 1"
            :type="`вход`"
            @delete_put="DeleteFunctionInput(i - 1, j - 1)"
          ></DeletePut>
        </div>
        <p></p>
        <div class="btn-group btn-group-sm" role="group" aria-label="...">
          <button
            type="button"
            class="btn btn-outline-primary rounded-0"
            style="font-size: 0.7rem"
            @click="AddInput(i - 1)"
          >
            Добавить
          </button>
          <!--
              <button
                type="button"
                class="btn btn-danger"
                style="font-size: 0.7rem"
                @click="RemoveInput(i - 1)"
              >
                Удалить
              </button>-->
        </div>
        <!--
        <div>Выходные данные</div>
        <div v-for="j in functions[i - 1].outputs" :key="j">
          <p></p>
          <select
            v-model="j.name"
            class="form-select form-select-sm"
            aria-label="Default select example"
          >
            
            <option value="" selected>Выберете</option>
            <option v-for="jj in UI.outputs" :key="jj" :value="jj.name">
              {{ jj.name }}
            </option>
          </select>
          <DeletePut
            :index="i - 1"
            :type="`выход`"
            @delete_put="DeleteFunctionOutput(i-1, j-1)"
          ></DeletePut>
        </div>
        <p></p>
        <div class="btn-group btn-group-sm" role="group" aria-label="...">
          <button
            type="button"
            class="btn btn-outline-primary rounded-0"
            style="font-size: 0.7rem"
            @click="AddOutput(i - 1)"
          >
            Добавить
          </button>
        </div>-->
      </div>
    </div>
    <div
      v-if="
        Code.functions[i - 1].period == true &&
        Code.functions[i - 1].commands != undefined
      "
    >
      <div
        v-for="j in Code.functions[i - 1].commands.length"
        :key="j"
        class="offcanvas offcanvas-end bg-dark text-light"
        tabindex="-1"
        data-bs-scroll="true"
        :id="`offcanvasCommand` + String(i) + String(j)"
        aria-labelledby="offcanvasRightLabel"
      >
        <div class="offcanvas-header">
          <h5 id="offcanvasRightLabel">Команда {{ j }}</h5>

          <button
            type="button"
            class="btn-close text-reset btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Закрыть"
          ></button>
        </div>
        <div class="offcanvas-body">
          <div>Входные данные</div>
          <div
            v-for="ji in functions[i - 1].commands[j - 1].inputs.length"
            :key="ji"
          >
            <p></p>
            <select
              v-model="functions[i - 1].commands[j - 1].inputs[ji - 1].name"
              class="form-select form-select-sm"
              aria-label="Default select example"
            >
              <!--@click="$emit(`inputFunctions`, functions)"-->
              <option value="" selected>Выберете</option>
              <option v-for="jj in UI.inputs" :key="jj" :value="jj.name">
                {{ jj.name }}
              </option>
              <option v-for="jj in UI.UIinputs" :key="jj" :value="jj.name">
                {{ jj.name }}
              </option>
            </select>
            <DeletePut
              :index="i - 1"
              :type="`вход`"
              @delete_put="DeleteCommandInput(i - 1, j - 1, ji - 1)"
            ></DeletePut>
          </div>
          <p></p>
          <div class="btn-group btn-group-sm" role="group" aria-label="...">
            <button
              type="button"
              class="btn btn-outline-primary rounded-0"
              style="font-size: 0.7rem"
              @click="AddCommandInput(i - 1, j - 1)"
            >
              Добавить
            </button>
            <!--
            <button
              type="button"
              class="btn btn-danger"
              style="font-size: 0.7rem"
              @click="RemoveCommandInput(i - 1, j - 1)"
            >
              Удалить
            </button>-->
          </div>
          <!--
          <div>Выходные данные</div>
          <div v-for="j1 in functions[i - 1].commands[j - 1].outputs" :key="j1">
            <p></p>
            <select
              v-model="j1.name"
              class="form-select form-select-sm"
              aria-label="Default select example"
            >
              
              <option value="" selected>Выберете</option>
              <option v-for="jj in UI.outputs" :key="jj" :value="jj.name">
                {{ jj.name }}
              </option>
            </select>
          </div>
          <p></p>
          <div class="btn-group btn-group-sm" role="group" aria-label="...">
            <button
              type="button"
              class="btn btn-primary"
              style="font-size: 0.7rem"
              @click="AddCommandOutput(i - 1)"
            >
              Добавить
            </button>
            <button
              type="button"
              class="btn btn-danger"
              style="font-size: 0.7rem"
              @click="RemoveCommandOutput(i - 1)"
            >
              Удалить
            </button>
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import DeletePut from "./DeletePut.vue";
</script>

<script>
export default {
  props: {
    UI: {
      type: Object,
      required: true,
    },
    Code: {
      type: Object,
      required: true,
    },
  },
  data(props, context) {
    let functions = props.Code.functions;
    let inputs = props.UI.inputs;
    let UIinputs = props.UI.UIinputs;
    let buttons = this.AllButons(props.UI.structure, []);
    let buttonControls = [];
    for (let index = 0; index < functions.length; index++) {
      //console.log(buttons.findIndex((object) => object.functionNumber === index), buttons[0].functionNumber, index, "Jdkjwahkjwhh")
      if (
        buttons.findIndex(
          (object) => object.attributes.functionNumber === index
        ) != -1
      ) {
        buttonControls.push(
          buttons.findIndex(
            (object) => object.attributes.functionNumber === index
          )
        );
      } else {
        buttonControls.push(-1);
      }
    }
    return {
      buttons,
      functions,
      clearInputs: "",
      inputs,
      UIinputs,
      buttonControl: -1,
      buttonControls,
      numberMinusOne: -1,
    };
  },
  methods: {
    DeletePut_one(index, type) {
      this.functions.splice(index, 1);
    },
    DeleteCommand(index, command) {
      this.functions[index].commands.splice(command, 1);
    },
    DeleteCommandInput(index, command, j) {
      this.functions[index].commands[command].inputs.splice(j, 1);
    },
    DeleteCommandOutput(index, command, j) {
      this.functions[index].commands[command].outputs.splice(j, 1);
    },
    DeleteFunctionInput(index, j) {
      this.functions[index].inputs.splice(j, 1);
    },
    DeleteFunctionOutput(index, j) {
      this.functions[index].outputs.splice(j, 1);
    },
    Test(test) {
      console.log(test);
    },
    AddInput(i) {
      this.functions[i]["inputs"].push({
        name: "0",
      });
    },
    RemoveInput(i) {
      this.functions[i]["inputs"].splice(-1);
    },
    AddOutput(i) {
      this.functions[i]["outputs"].push({
        name: "0",
      });
    },
    RemoveOutput(i) {
      this.functions[i]["outputs"].splice(-1);
    },
    AddCommandInput(i, j) {
      this.functions[i].commands[j]["inputs"].push({
        name: "0",
      });
    },
    RemoveCommandInput(i, j) {
      this.functions[i].commands[j]["inputs"].splice(-1);
    },
    AddCommandOutput(i, j) {
      this.functions[i].commands[j]["outputs"].push({
        name: "0",
      });
    },
    RemoveCommandOutput(i, j) {
      this.functions[i].commands[j]["outputs"].splice(-1);
    },
    Save() {
      this.$emit("inputFunctionWithoutButtons", this.functions);
    },
    ChooseButton(i) {
      if (this.buttonControls[i] !== "" && this.buttonControls[i] !== -1) {
        this.$emit(`inputFunctions`, this.functions, this.buttonControls[i]);
      }
    },
    ChooseButtonForCommand(i, command) {
      console.log(1);
      //this.$emit("inputCommandButton", this.functions, i, command);
    },
    InputFunctionWithoutButtons() {
      this.$emit("inputFunctionWithoutButtons", this.functions);
    },
    AllButons(structure, buttons) {
      let buttons_new = buttons;
      for (let i = 0; i < structure.length; i++) {
        if (structure[i].type == "button") {
          buttons.push(structure[i]);
        }
        if (
          structure[i].structure != [] &&
          structure[i].structure != undefined
        ) {
          buttons_new = this.AllButons(structure[i].structure, buttons);
        }
      }
      return buttons_new;
    },
  },
  watch: {
    UI: {
      handler(newVal, oldVa) {
        let buttons = this.AllButons(newVal.structure, []);
        let buttonControls = [];
        for (let index = 0; index < this.functions.length; index++) {
          if (
            buttons.findIndex(
              (object) => object.attributes.functionNumber === index
            ) != -1
          ) {
            buttonControls.push(
              buttons.findIndex(
                (object) => object.attributes.functionNumber === index
              )
            );
          } else {
            buttonControls.push(-1);
          }
        }
        this.buttons = buttons;
        this.buttonControls = buttonControls;
      },
      deep: true,
    },
  },
  //emits: ["newValue"],
};
</script>
