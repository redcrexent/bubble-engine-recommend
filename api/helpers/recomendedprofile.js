var rp = require("request-promise");
module.exports = {
  friendlyName: "Profile",

  description: "Profile something.",

  inputs: {
    IsTest: {
      type: "boolean",
      required: false,
    },
  },

  exits: {
    success: {
      description: "All done.",
    },
  },

  fn: async function (inputs, exits) {
    let url = "https://medappy.bubbleapps.io/api/1.1/obj/RecomendedProfile/";
    if (inputs.IsTest)
      url =
        "https://medappy.bubbleapps.io/version-test/api/1.1/obj/RecomendedProfile/";
    let data = await rp.get(url);
    data = JSON.parse(data);
    let profiles = data.response.results;
    return exits.success(profiles);
  },
};
