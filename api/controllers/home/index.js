module.exports = {


  friendlyName: 'Index',


  description: 'Index home.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs,exits) {

   return exits.success({message: 'Sails API'});

  }


};
