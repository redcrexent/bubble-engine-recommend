module.exports = {
  friendlyName: "post recomend profile",

  description: "",

  inputs: {
    EmployerId: {
      type: "string",
      required: true,
    },

    ProfileId: {
      type: "string",
      required: true,
    },

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

  fn: async function (inputs) {
    let url = "https://medappy.bubbleapps.io/api/1.1/obj/RecomendedProfile";
    if (inputs.IsTest)
      url = "https://medappy.bubbleapps.io/version-test/api/1.1/obj/RecomendedProfile";
    var options = {
      method: "POST",
      uri: url,
      form: {
        EmployerId: inputs.EmployerId,
        ProfileId: inputs.ProfileId,
      },
      headers: {
        Authorization: "Bearer 893a8f6242e817db95672b8a91c8a780",
      },
    };

    var rp = require("request-promise");

    try {
      let data = await rp(options);
    } catch (err) {}
  },
};
