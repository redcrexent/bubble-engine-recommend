var rp = require('request-promise');
module.exports = {
  friendlyName: "Profile",

  description: "Profile something.",

  inputs: {},

  exits: {
    success: {
      description: "All done.",
    },
  },

  fn: async function (inputs, exits) {
    let data = await rp.get(
      "https://medappy.bubbleapps.io/api/1.1/obj/Profile/"
    );
    data=JSON.parse(data);
    let profiles=data.response.results;
    return exits.success(profiles);
  },
};
