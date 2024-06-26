var moment = require("moment");
module.exports = {
  friendlyName: "Index",

  description: "Index recomendation.",

  inputs: {},

  exits: {},

  fn: async function (_, __, inputs, exits) {
    console.log(inputs.req._parsedUrl.path);
    let test = false;
    test = inputs.req.param("t") == 1;
    let profiles = await sails.helpers.profile(test);
    let existingProfiles = await sails.helpers.recomendedprofile(test);
    let type = inputs.req.param("type");
    let villeCode = inputs.req.param("vc")[0] + "" + inputs.req.param("vc")[1];
    let employeeCode = inputs.req.param("eid");

    for (i = 0; i < profiles.length; i++) {
      let nurse = profiles[i];
      if (
        nurse.preference1code?.startsWith(villeCode) ||
        nurse.preference2code?.startsWith(villeCode) ||
        nurse.preference3code?.startsWith(villeCode)
      ) {
        if (
          (type == "Clinique" && nurse.Clinique) ||
          (type.indexOf("Hospitalier") >= 0 && nurse["Centre Hospitalier"]) ||
          (type == "EHPAD" && nurse.EHPAD) ||
          (type == "MAS, FAM, FAS, EAM" && nurse["MAS, FAM"])
        ) {
            await sails.helpers.postrecomendprofile(employeeCode,nurse._id,test);
        }
      }
    }

    let deleteuri="https://medappy.bubbleapps.io/api/1.1/obj/RecomendedProfile/";
    if(test)
      deleteuri="https://medappy.bubbleapps.io/version-test/api/1.1/obj/RecomendedProfile/";
    for (j = 0; j < existingProfiles.length; j++) {
      let p = existingProfiles[j];
      if (p.EmployerId == employeeCode) {
        var options = {
          method: "DELETE",
          uri:
          deleteuri +
            p._id,
          headers: {
            Authorization: "Bearer 893a8f6242e817db95672b8a91c8a780",
          },
        };

        var rp = require("request-promise");

        try {
          let data = await rp(options);
        } catch (err) {
          console.log("delete error for " + inputs.req._parsedUrl.path);
        }
      }
    }

    return "";
  },
};
