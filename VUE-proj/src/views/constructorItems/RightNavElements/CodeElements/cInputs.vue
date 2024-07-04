<template>
  <div class="accordion-item">
    <h2 class="accordion-header" id="panelsStayOpen-headingOne">
      <button
        class="accordion-button collapsed bg-dark text-white"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#panelsStayOpen-collapseOne"
        aria-expanded="false"
        aria-controls="panelsStayOpen-collapseOne"
      >
        Начальные входные данные
      </button>
    </h2>
    <!---->
    <div
      id="panelsStayOpen-collapseOne"
      class="accordion-collapse collapse bg-dark"
      aria-labelledby="panelsStayOpen-headingOne"
    >
      <!--ууууу-->
      <div class="accordion-body text-white">
        <div>Количество: {{ inputs.length }}</div>
        <!--<form @keyup="$emit(`inputInputs`, inputs)">-->
        <div
          v-for="i in inputs.length"
          :key="i"
          class="border border-info"
          style="margin-bottom: 5px; padding: 5px"
        >
          <div class="input-group input-group-sm mb-3">
            <span class="input-group-text text-gray" id="inputGroup-sizing-sm"
              >Имя</span
            >
            <input
              type="text"
              class="form-control text-gray"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              v-model="inputs[i - 1].name"
            />
          </div>
          <div class="input-group input-group-sm mb-3">
            <span class="input-group-text text-gray" id="inputGroup-sizing-sm"
              >Value</span
            >
            <input
              type="text"
              class="form-control text-gray"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              v-model="inputs[i - 1].originalValue"
            />
          </div>
          <label  class="form-label">Тип данных</label>
          <select
            class="form-select form-select-sm text-gray"
            aria-label=".form-select-sm example"
            v-model="inputs[i - 1].type"
          >
            <option value="число" selected>Число</option>
            <option value="текст">Текст</option>
            <option value="json">JSON</option>
            <option value="boolean">Boolean</option>
            <option value="массив_чисел">Массив чисел</option>
            <option value="массив_строк">Массив строк</option>
          </select>
          <DeletePut
            :index="i - 1"
            :type="`инпут`"
            @delete_put="DeletePut_one"
          ></DeletePut>
        </div>
        <!--</form>-->
        <div class="btn-group btn-group-sm" role="group" aria-label="...">
          <button
            type="button"
            class="btn btn-outline-primary rounded-0"
            style="font-size: 0.7rem"
            @click="$emit(`addNewInput`)"
          >
            Добавить
          </button>
          <!--
          <button
            type="button"
            class="btn btn-outline-danger rounded-0"
            style="font-size: 0.7rem"
            @click="$emit(`removeInput`)"
          >
            Удалить
          </button>-->
        </div>
      </div>
      <!--ууууу-->
    </div>
    <!---->
  </div>

  <div class="accordion-item">
    <h2 class="accordion-header" id="panelsStayOpenUInput-headingOne">
      <button
        class="accordion-button collapsed bg-dark text-white"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#panelsStayOpenUInput-collapseOne"
        aria-expanded="false"
        aria-controls="panelsStayOpenUInput-collapseOne"
      >
        Данные, вводимые пользователем
      </button>
    </h2>
    <!---->
    <div
      id="panelsStayOpenUInput-collapseOne"
      class="accordion-collapse collapse bg-dark"
      aria-labelledby="panelsStayOpenUInput-headingOne"
    >
      <!--ууууу-->
      <div class="accordion-body text-white">
        <div>Количество: {{ UIinputs.length }}</div>
        <!--<form
          @keyup="$emit(`inputUIinputs`, UIinputs)"
          @click="$emit(`inputUIinputs`, UIinputs)"
        >-->
        <div
          v-for="i in UIinputs.length"
          :key="i"
          class="border border-info"
          style="margin-bottom: 5px; padding: 5px"
        >
          <div class="input-group input-group-sm mb-3">
            <span class="input-group-text text-gray" id="inputGroup-sizing-sm"
              >Имя</span
            >
            <input
              type="text"
              class="form-control text-gray"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              v-model="UIinputs[i - 1].name"
            />
          </div>
          <label class="form-label">Контрол:</label>
          <select
            class="form-select form-select-sm text-gray"
            aria-label=".form-select-sm example"
            v-model="UIinputs[i - 1].control"
          >
            <option
              v-for="j in allcontrols.length"
              :key="j"
              :value="allcontrols[j - 1].attributes.name"
            >
              <!--v-if="allcontrols[j].attributes != undefined"-->
              <div>{{ allcontrols[j - 1].attributes.name }}</div>
            </option>
            <option
              v-for="j in allcontrols_without_attributes.length"
              :key="j"
              :value="allcontrols_without_attributes[j - 1].name"
            >
              <!--v-if="allcontrols[j].attributes != undefined"-->
              <div>{{ allcontrols_without_attributes[j - 1].name }}</div>
            </option>
          </select>
          <DeletePut
            :index="i - 1"
            :type="`внешний инпут`"
            @delete_put="DeletePut_one"
          ></DeletePut>
        </div>
        <!--</form>-->
        <div class="btn-group btn-group-sm" role="group" aria-label="...">
          <button
            type="button"
            class="btn btn-outline-primary rounded-0"
            style="font-size: 0.7rem"
            @click="$emit(`addNewUIinput`)"
          >
            Добавить
          </button>
          <!--
          <button
            type="button"
            class="btn btn-outline-danger rounded-0"
            style="font-size: 0.7rem"
            @click="$emit(`removeUIinput`)"
          >
            Удалить
          </button>-->
        </div>
      </div>
      <!--ууууу-->
    </div>
    <!---->
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
  },
  data(props, context) {
    //console.log(props.UI.buttons);
    let inputs = props.UI.inputs;
    let UIinputs = props.UI.UIinputs;
    let allcontrols = [];
    allcontrols = this.PushInputControls(props.UI.structure, []);
    let allcontrols_without_attributes = [];
    let length = allcontrols.length;
    for (let i = 0; i < length; i++) {
      if (allcontrols[i].attributes === undefined) {
        allcontrols_without_attributes.push(allcontrols[i]);
        allcontrols.splice(i, 1);
        i--;
        length--;
      }
    }
    //console.log(allcontrols)
    /*
    this.UI.controls.textareas.forEach(function (i) {
      allcontrols.push(i);
    });
    this.UI.controls.cards.forEach(function (i) {
      allcontrols.push(i);
    });
    this.UI.controls.groupsOfRadioboxes.forEach(function (i) {
      allcontrols.push(i);
    });
    this.UI.controls.staticTables.forEach(function (i) {
      for (let j = 0; j < i.blocks.length; j++) {
        allcontrols.push(i.blocks[j]);
      }
    });
    this.UI.controls.textinputs.forEach(function (i) {
      allcontrols.push(i);
    }); */

    return {
      inputs,
      UIinputs,
      allcontrols,
      allcontrols_without_attributes,
    };
  },
  methods: {
    Test(test) {
      console.log(test);
    },
    DeletePut_one(index, type) {
      if (type == "внешний инпут") {
        this.UIinputs.splice(index, 1);
      } else {
        this.inputs.splice(index, 1);
      }
    },
    PushInputControls(structure, arrayOfInputControls) {
      let arrayOfInputControls_new = arrayOfInputControls;
      for (let i = 0; i < structure.length; i++) {
        if (
          structure[i].type == "textarea" ||
          structure[i].type == "card" ||
          structure[i].type == "textinput" ||
          structure[i].type == "2Dcomponent" ||
          structure[i].type == "button"
        ) {
          arrayOfInputControls.push(structure[i]);
        }
        if (
          structure[i].type == "staticTable" ||
          structure[i].type == "dynamicTable"
        ) {
          for (let j = 0; j < structure[i].attributes.blocks.length; j++) {
            arrayOfInputControls.push(structure[i].attributes.blocks[j]);
          }
        }
        if (
          structure[i].structure != [] &&
          structure[i].structure != undefined
        ) {
          arrayOfInputControls_new = this.PushInputControls(
            structure[i].structure,
            arrayOfInputControls
          );
        }
      }
      return arrayOfInputControls_new;
    },
    PushPlotlyControls(structure, arrayOfInputControls) {
      let arrayOfInputControls_new = arrayOfInputControls;
      for (let i = 0; i < structure.length; i++) {
        if (structure[i].type == "2Dcomponent") {
          arrayOfInputControls.push(structure[i]);
        }
        if (
          structure[i].structure != [] &&
          structure[i].structure != undefined
        ) {
          arrayOfInputControls_new = this.PushInputControls(
            structure[i].structure,
            arrayOfInputControls
          );
        }
      }
      return arrayOfInputControls_new;
    },
  },
  watch: {
    UI: {
      handler(newVal, oldVal) {
        /*
        console.log("НУЖНЫ КНОПКИ!!!");
        let buttons = this.AllButons(newVal.structure, []);
        console.log("buttons_functions", buttons);
        let buttonControls = [];
        for (let index = 0; index < this.functions.length; index++) {
          if (
            buttons.findIndex(
              (object) => this.object.attributes.functionNumber === index
            ) != -1
          ) {
            buttonControls.push(
              buttons.findIndex(
                (object) => this.object.attributes.functionNumber === index
              )
            );
          } else {
            buttonControls.push(-1);
          }
        }
        this.buttons = buttons;
        this.buttonControls = buttonControls; */
      },
      deep: true,
    },
  },
  //emits: ["newValue"],
};
</script>
