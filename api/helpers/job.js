var rp = require('request-promise');
module.exports = {
  friendlyName: "Job",

  description: "Job something.",

  inputs: {
    JobId: {
      type: "string",
      required: true,
    },
  },

  exits: {
    success: {
      description: "All done.",
    },
  },

  fn: async function (inputs, exits) {
    const url =
      "https://medappy.bubbleapps.io/api/1.1/obj/job/" +
      inputs.JobId;

    let data = await rp.get(url);

    data = JSON.parse(data);
    let Job = data.response;
    return exits.success(Job);
  },
};
