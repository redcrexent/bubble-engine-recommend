module.exports = {
  friendlyName: "Index",

  description: "Index recomendation.",

  inputs: {},

  exits: {},

  fn: async function (_, __, inputs, exits) {
    let profiles = await sails.helpers.profile();
    let type = inputs.req.param("type");
    let villeCode = inputs.req.param("vc")[0] + "" + inputs.req.param("vc")[1];
    let employeeCode = inputs.req.param("eid");

    let recProfile = [];
    for (i = 0; i < profiles.length; i++) {
      let nurse = profiles[i];
      if (
        nurse.preference1code?.startsWith(villeCode) ||
        nurse.preference2code?.startsWith(villeCode) ||
        nurse.preference3code?.startsWith(villeCode)
      ) {
        recProfile.push(nurse._id);
        var options = {
          method: "POST",
          uri: "https://medappy.bubbleapps.io/version-test/api/1.1/obj/RecomendedProfile",
          form: {
            'EmployerId': employeeCode,
            'ProfileId': nurse._id
          },
          headers: {
           'Authorization' : 'Bearer 893a8f6242e817db95672b8a91c8a780',
          },
        };

        var rp = require("request-promise");

        let data = await rp(options);
      }
    }

    //let job = await sails.helpers.job("1714039640909x502644892155772900");
    //let employer = await sails.helpers.employee("1713769404289x586068340378173400");
    //console.log(jobId);
    return exits.success({ profiles: profiles });
  },
};
