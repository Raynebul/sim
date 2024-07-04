<template>
  <div class="card-group text-light">
    <div class="d-flex w-100">
      <div
        class="d-flex flex-column w-100 me-3 ms-3 border-start border-end"
        style="border-color: rgb(78, 77, 80) !important"
      >
        <div
          class="card rounded-0"
          v-for="i in Code.functions.length"
          :key="i"
          style="background-color: #141515"
        >
          <div class="card-body p-0">
            <h5 class="card-title mb-1 mt-2 ms-2 text-light">
              {{ Code.functions[i - 1].name }}
            </h5>
            <hr class="hr w-100 mt-0" />

            <form @keuyp="$emit('inputCode', functions)">
              <div v-if="Code.functions[i - 1].period === true">
                <div class="d-flex" style="">
                  <div style="width: 50%">
                    <label
                      for="exampleFormControlTextarea1"
                      class="form-label mb-1 mt-2 ms-2 text-light"
                      >Код перед "while True:" функции
                      {{ functions[i - 1].name }}</label
                    >
                    <!--
                    <textarea
                      v-bind:class="TextAreaClass()"
                      style="border-color: rgb(78, 77, 80) !important"
                      id="exampleFormControlTextarea1"
                      rows="15"
                      v-model="functions[i - 1].inputCode"
                    ></textarea>-->
                    <CodeBlock
                      :code="functions[i - 1].inputCode"
                      @functionCode="
                        (change) => {
                          InputCode(change, i - 1);
                        }
                      "
                    ></CodeBlock>
                  </div>
                  <div style="width: 50%">
                    <label
                      for="exampleFormControlTextarea1"
                      class="form-label mb-1 mt-2 ms-2 text-light"
                      >Код перед выводом команды функции
                      {{ functions[i - 1].name }}</label
                    >
                    <!--
                    <textarea
                      @keyup="TextColor(functions[i - 1].functionCode)"
                      v-bind:class="TextAreaClass()"
                      style="border-color: rgb(78, 77, 80) !important"
                      id="exampleFormControlTextarea1"
                      rows="15"
                      v-model="functions[i - 1].functionCode"
                    ></textarea>-->
                    <CodeBlock
                      :code="functions[i - 1].functionCode"
                      @functionCode="
                        (change) => {
                          FunctionCode(change, i - 1);
                        }
                      "
                    ></CodeBlock>
                  </div>
                  <!--
                  <div style="width: 50%">
                    <div style="padding-left: 0.5rem">
                      def input_wait(prompt='', timeout=timeout, *,
                      _delay=delay):
                    </div>
                    <div style="padding-left: 1.5rem">output = {}</div>
                    <div style="padding-left: 1.5rem">
                      output["command"]=str()
                    </div>
                    <div style="padding-left: 1.5rem">
                      start = time.time() #начало подсчёта времени
                    </div>
                    <div style="padding-left: 1.5rem">while True:</div>
                    <div style="padding-left: 1.5rem">...</div>
                  </div> -->
                </div>
                <div class="container-fluid">
                  <!--font-family: Consolas-->
                  <div class="row row-cols-2" style="">
                    <div
                      style="width: 50%; padding-left: 0px; padding-right: 0px"
                      v-for="j in functions[i - 1].commands.length"
                      :key="j"
                    >
                      <label
                        for="exampleFormControlTextarea1"
                        class="form-label mb-1 mt-2 ms-2 text-light"
                        >Команда "{{
                          functions[i - 1].commands[j - 1].name
                        }}"</label
                      >

                      <!--
                      <textarea
                        @keyup="TextColor(functions[i - 1].commandCode)"
                        class="form-control rounded-0 code-textarea text-light"
                        id="exampleFormControlTextarea1"
                        style="border-color: rgb(78, 77, 80) !important"
                        rows="12"
                        v-model="command.commandCode"
                      ></textarea> -->
                      <CodeBlock
                        :code="functions[i - 1].commands[j - 1].commandCode"
                        @functionCode="
                          (change) => {
                            CommandCode(change, i - 1, j - 1);
                          }
                        "
                      ></CodeBlock>
                    </div>
                  </div>
                </div>
              </div>
              <!--font-family: Consolas-->
              <div v-else class="d-flex" style="">
                <div style="width: 50%">
                  <label
                    for="exampleFormControlTextarea1"
                    class="form-label mb-1 ms-2 text-light"
                    >Функция на Python</label
                  >
                  <CodeBlock
                    :code="functions[i - 1].functionCode"
                    @functionCode="
                      (change) => {
                        FunctionCode(change, i - 1);
                      }
                    "
                  ></CodeBlock>
                  <!--
                  <textarea
                    @keyup="TextColor(functions[i - 1].functionCode)"
                    v-bind:class="TextAreaClass()"
                    style="border-color: rgb(78, 77, 80) !important"
                    id="exampleFormControlTextarea1"
                    rows="15"
                    v-model="functions[i - 1].functionCode" 
                  ></textarea>-->
                </div>
                <!--
            <div style="width: 50%">
              <label for="exampleFormControlTextarea1" class="form-label"
                >Функция на Javascript (пока не используется)</label
              >
              <textarea
                class="form-control code-textarea text-light"
                id="exampleFormControlTextarea1"
                rows="9"
              ></textarea>
            </div>-->
                <!--
            <div style="width: 33%">
              <label for="exampleFormControlTextarea1" class="form-label"
                >JSON входных данных для функции</label
              >
              <textarea
                class="form-control code-textarea text-light"
                id="exampleFormControlTextarea2"
                rows="9"
                v-model="functions[i - 1].jsonInput"
              ></textarea>
            </div>
            <div style="width: 33%">
              <label for="exampleFormControlTextarea1" class="form-label"
                >JSON выходных данных для функции</label
              >
              <textarea
                class="form-control code-textarea text-light"
                id="exampleFormControlTextarea2"
                rows="9"
                v-model="functions[i - 1].jsonOutput"
              ></textarea>
            </div>-->
              </div>
            </form>
            <p class="card-text">
              <small class="text-light">Дополнение к коду</small>
            </p>
            <div class="text-white" style="margin-left: 30px">
              <div>def function(object):</div>
              <div style="margin-left: 30px">answer={}</div>
              <div style="margin-left: 30px">...</div>
              <div style="margin-left: 30px">
                json_answer = json.dumps(answer)
              </div>
              <div style="margin-left: 30px">return json_answer</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CodeBlock from "./CodeBlock.vue";
/*
import hljs from 'highlight.js'; */
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
    //functions[0]["inputCode"] = "";
    return {
      functions,
    };
  },
  methods: {
    TextColor(text) {},
    TextAreaClass() {
      return "form-control rounded-0 code-textarea text-light border-bottom border-end border-top";
    },
    FunctionCode(change, i) {
      this.functions[i].functionCode = change;
    },
    InputCode(change, i) {
      this.functions[i].inputCode = change;
    },
    CommandCode(change, i, j) {
      this.functions[i].commands[j].commandCode = change;
    },
  },
  //emits: ["newValue"],
};
</script>

<style>
.code-textarea {
  background-color: #252729 !important;
}
</style>
