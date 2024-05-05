var moment = require("moment");
module.exports = {
  friendlyName: "Index",

  description: "Index recomendation.",

  inputs: {},

  exits: {},

  fn: async function (_, __, inputs, exits) {
    console.log(inputs.req._parsedUrl.path);

    let profile = inputs.req.param("profile");
    let test = false;
    test = inputs.req.param("t") == 1;
    let empuser = inputs.req.param("euser");
    let job = inputs.req.param("job");
    let salary = inputs.req.param("salary");
    await sails.helpers.offers(empuser,profile,job,salary,test);


  }
};
