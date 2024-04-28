var moment=require('moment');
module.exports = {
  friendlyName: "Index",

  description: "Index recomendation.",

  inputs: {},

  exits: {},

  fn: async function (_, __, inputs, exits) {
    console.log(inputs.req._parsedUrl.path);
    let profiles = await sails.helpers.profile();
    let type = inputs.req.param("type");
    let villeCode = inputs.req.param("vc")[0] + "" + inputs.req.param("vc")[1];
    let employeeCode = inputs.req.param("eid");

    let recProfile = [];
    for (i = 0; i < profiles.length; i++) {
      let nurse = profiles[i];
      if (nurse.preference1code?.startsWith(villeCode) ||nurse.preference2code?.startsWith(villeCode)
            ||nurse.preference3code?.startsWith(villeCode)) {
        if ((type == "Clinique" && nurse.Clinique) ||(type.indexOf("Hospitalier") >= 0
                  && nurse["Centre Hospitalier"]) || (type == "EHPAD" && nurse.EHPAD)
                  || (type == "MAS, FAM, FAS, EAM" && nurse["MAS, FAM"])) {

              let sdate = moment(nurse.startdate).format("YYMM");
              let currentdate = moment().format("YYMM");

              if (sdate >= currentdate) {
                var options = {
                  method: "POST",
                  uri: "https://medappy.bubbleapps.io/version-test/api/1.1/obj/RecomendedProfile",
                  form: {
                    EmployerId: employeeCode,
                    ProfileId: nurse._id,
                  },
                  headers: {
                    Authorization: "Bearer 893a8f6242e817db95672b8a91c8a780",
                  },
                };

                var rp = require("request-promise");

                let data = await rp(options);
              }
        }
      }
    }
    return "";
  },
};
