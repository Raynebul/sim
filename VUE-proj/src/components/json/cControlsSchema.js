let buttonObject = {
  type: "object",
  properties: {
    functionNumber: {

    },
    name: {
      type: "string",
    },
  },
};

let textareaOject = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    type: {
      type: "string",
    },
    value: {
      type: "string",
    },
  },
};

let textinputObject = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    textname: {
      type: "string",
    },
    type: {
      type: "string",
    },
    value: {
      type: "string",
    },
  },
};

let staticTableObject = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    rows: {
      type: "number",
    },
    columns: {
      type: "number",
    },
    edit: {
      type: "boolean",
    },
    inputs: {
      type: "array",
    },
    blocks: {
      type: "array",
    },
  },
};

let dynamicTableObject = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    rows: {
      type: "number",
    },
    columns: {
      type: "number",
    },
    edit: {
      type: "boolean",
    },
    inputs: {
      type: "array",
    },
    blocks: {
      type: "array",
    },
  },
};

let plotlyObjects2D = {
  type: "object",
  properties: {
    data: {
      type: "array",
    },
    layout: {
      type: "object",
    },
    plotlyId: {
      type: "string",
    },
  },
};

let checkboxObject = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    value: {
      type: "string",
    },
  },
};

let groupsOfRadioboxes = {};

let cardObject = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    text: {
      type: "string",
    },
  },
};

/*
UI = {
  $schema: "https://json-schema.org/draft/2019-09/schema",
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
          items: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              value: {
                type: "string",
              },
            },
          },
        },
        buttons: {
          type: "array",
          items: {
            type: "object",
            properties: {
              functionNumber: {
                type: "number",
              },
              name: {
                type: "string",
              },
            },
          },
        },
        cards: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              text: {
                type: "string",
              },
            },
          },
        },
        textareas: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              type: {
                type: "string",
              },
              value: {
                type: "string",
              },
            },
          },
        },
        staticTables: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              rows: {
                type: "number",
              },
              columns: {
                type: "number",
              },
              edit: {
                type: "boolean",
              },
              inputs: {
                type: "array",
              },
              blocks: {
                type: "array",
              },
            },
          },
        },
        dynamicTables: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              rows: {
                type: "number",
              },
              columns: {
                type: "number",
              },
              edit: {
                type: "boolean",
              },
              inputs: {
                type: "array",
              },
              blocks: {
                type: "array",
              },
            },
          },
        },
        textinputs: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              textname: {
                type: "string",
              },
              type: {
                type: "string",
              },
              value: {
                type: "string",
              },
            },
          },
        },
        plotlyObjects2D: {
          type: "array",
          items: {
            type: "object",
            properties: {
              data: {
                type: "object",
              },
              layout: {
                type: "object",
              },
              plotlyId: {
                type: "string",
              },
            },
          },
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
}; */

export default {
  buttonObject,
  cardObject,
  textinputObject,
  textareaOject,
  staticTableObject,
  dynamicTableObject,
  plotlyObjects2D,
  checkboxObject,
  groupsOfRadioboxes,
};
