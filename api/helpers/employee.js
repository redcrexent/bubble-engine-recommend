var rp = require('request-promise');
module.exports = {
  friendlyName: 'Employee',
  description: 'Employee something.',
  inputs: {
    EmployeeId: {
      type: "string",
      required: true,
    },
  },
  exits: {

    success: {
      description: 'All done.',
    },

  },



  fn: async function (inputs,exits) {
    const url =
    "https://medappy.bubbleapps.io/api/1.1/obj/Employer/" +
    inputs.EmployeeId;

  let data = await rp.get(url);

  data = JSON.parse(data);
  let employee = data.response;
  return exits.success(employee);
  }
};

