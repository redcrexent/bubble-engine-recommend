module.exports = {
  friendlyName: "Offers",

  description: "Offers something.",

  inputs: {
    EmployerUserId: {
      type: "string",
      required: true,
    },

    ProfileId: {
      type: "string",
      required: true,
    },

    JobId: {
      type: "string",
      required: true,
    },

    Salary: {
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
    let url = "https://medappy.bubbleapps.io/api/1.1/obj/Offres";
    if (inputs.IsTest)
      url = "https://medappy.bubbleapps.io/version-test/api/1.1/obj/Offres";
    var options = {
      method: "POST",
      uri: url,
      form: {
        JobId: inputs.JobId,
        Profileid: inputs.ProfileId,
        EmployerUserId: inputs.EmployerUserId,
        Salary: inputs.Salary,
      },
      headers: {
        Authorization: "Bearer 893a8f6242e817db95672b8a91c8a780",
      },
    };

    var rp = require("request-promise");

    try {
      let data = await rp(options);
    } catch (err) {
      console.log(err);
    }
  },
};
