<template>
  <div class="accordion-item" v-for="i in input.length" :key="i">
    <h2
      class="accordion-header"
      :id="'panelsStayOpenGroupRadiobox-heading' + i"
    >
      <button
        class="accordion-button collapsed bg-dark text-white"
        type="button"
        data-bs-toggle="collapse"
        :data-bs-target="'#panelsStayOpenGroupRadiobox-collapse' + i"
        aria-expanded="false"
        :aria-controls="'panelsStayOpenGroupRadiobox-collapse' + i"
      >
        Группа из радиокнопок "{{ input[i - 1].name }}"
      </button>
    </h2>
    <div
      :id="'panelsStayOpenGroupRadiobox-collapse' + i"
      class="accordion-collapse collapse bg-dark"
      :aria-labelledby="'panelsStayOpenGroupRadiobox-heading' + i"
    >
      <div class="accordion-body text-white">
        <div @keyup="$emit(`inputRightGroupOfRadioboxes`, input)">
          <div class="input-group input-group-sm mb-3">
            <span class="input-group-text text-gray" id="basic-addon1"
              >Имя</span
            >
            <input
              v-model="input[i - 1].name"
              class="form-control form-control-sm text-gray"
              type="text"
            />
          </div>
          <select
            class="form-select form-select-sm text-gray"
            aria-label=".form-select-sm example"
            v-model="input[i - 1].type"
          >
            <!--v-model="inputValue[i - 1].type"-->
            <option value="число" selected>Число</option>
            <option value="текст">Текст</option>
            <!--<option value="json">JSON</option>
            <option value="массив_чисел">Массив чисел</option>
            <option value="массив_строк">Массив строк</option>-->
          </select>
          <p></p>
        </div>
        <button
          class="btn btn-sm btn-outline-info"
          @click="$emit(`addRadioboxToGroup`, i - 1)"
        >
          Добавить радиокнопку
        </button>
        <div @keyup="$emit(`inputRightGroupOfRadioboxes`, input)">
          <div
            v-for="j in UI.controls.groupsOfRadioboxes[i - 1].radioboxes.length"
            :key="j"
          >
            <span>{{ j }} Радиокнопка</span>
            <div class="input-group input-group-sm mb-3">
              <span class="input-group-text text-gray" id="basic-addon1"
                >Имя</span
              >
              <input
                v-model="input[i - 1].radioboxes[j - 1].name"
                class="form-control form-control-sm text-gray"
                type="text"
              />
            </div>
            <div class="input-group input-group-sm mb-3">
              <span class="input-group-text text-gray" id="basic-addon1"
                >Имя</span
              >
              <input
                v-model="input[i - 1].radioboxes[j - 1].value"
                class="form-control form-control-sm text-gray"
                type="text"
              />
            </div>
          </div>
        </div>
        <!--
          <select
            class="form-select form-select-sm"
            aria-label=".form-select-sm example"
            v-model="input[i - 1].type"
          >
            <option value="число" selected>Число</option>
            <option value="текст">Текст</option>
          </select>-->
        <!--
            <input
              v-model="input[i - 1].name"
              class="form-control form-control-sm"
              type="text"
            />
  -->
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
    let input = props.UI.controls.groupsOfRadioboxes;
    return {
      input,
    };
  },
  methods: {
    Test(test) {
      console.log(test);
    },
  },
  //emits: ["newValue"],
};
</script>

<style scoped>
.accordion-body {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  padding-right: 0 !important;
  padding-left: 10px !important;
}
</style>
