import controls from "./cControlsSchema";

let UI_Schema = {
  type: "object",
  properties: {
    id: {
      type: "string",
    },
    name: {
      type: "string",
    },
    controls: {
      type: "object",
      properties: {
        checkboxes: {
          type: "array",
          items: controls.checkboxObject,
        },
        radioboxes: {
          type: "array",
          items: controls.radioboxObject,
        },
        groupsOfRadioboxes: {
          type: "array",
          items: controls.groupOfRadioboxes,
        },
        buttons: {
          type: "array",
          items: controls.buttonObject,
        },
        cards: {
          type: "array",
          items: controls.buttonObject,
        },
        textareas: {
          type: "array",
          items: controls.textareaObject,
        },
        staticTables: {
          type: "array",
          items: controls.staticTableObject,
        },
        dynamicTables: {
          type: "array",
          items: controls.dynamicTableObject,
        },
        textinputs: {
          type: "array",
          items: controls.textinputObject,
        },
        plotlyObjects2D: {
          type: "array",
          items: controls.plotlyObjects2D,
        },
      },
    },
    UIinputs: {
      type: "array",
    },
    systems: {
      type: "object",
      properties: {
        roundSystem: {
          type: "boolean",
        },
        rounds: {
          type: "array",
        },
      },
    },
    inputs: {
      type: "array",
    },
    outputs: {
      type: "array",
    },
    settings: {
      type: "object",
      properties: {
        buttonReverse: {
          type: "boolean",
        },
        checkboxInline: {
          type: "boolean",
        },
        radioboxInline: {
          type: "boolean",
        },
        renderItems: {
          type: "array",
        },
      },
    },
  },
};

/*
let Code = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  type: "object",
  properties: {
    functions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          functionCode: {
            type: "string",
          },
          jsonInput: {
            type: "string",
          },
          jsonOutput: {
            type: "string",
          },
          name: {},
          control: {
            type: "string",
          },
          period: {
            type: "boolean",
          },
          periodsec: {
            type: "number",
          },
          commands: {
            type: "array",
          },
        },
      },
    },
  },
};

let Metadata = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  type: "object",
  properties: {
    id: {
      type: "string",
    },
    name: {
      type: "string",
    },
    author: {
      type: "string",
    },
    description: {
      type: "string",
    },
    created: {
      type: "string",
    },
    status: {
      type: "string",
    },
  },
};

let user = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  type: "object",
  properties: {
    username: {
      type: "string"
    },
    email: {
      type: "string",
      format: "email",
    },
    password: {
      type: "string"
    },
    status: {
      type: "string"
    },
    first_name: {
      type: "string"
    },
    last_name: {
      type: "string"
    },
    patronymic: {
      type: "string"
    },
    telephone: {
      type: "string"
    },
  },
};*/

export { UI_Schema };
