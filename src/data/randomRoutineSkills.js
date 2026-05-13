const noDoubles = [

  {
    name: "Straight Bounce",
    code: "0",
    dd: 0.0,
  },

  {
    name: "Barani Tuck",
    code: "41o",
    dd: 0.3,
  },

  {
    name: "Barani Pike",
    code: "41<",
    dd: 0.3,
  },

  {
    name: "Barani Straight",
    code: "41/",
    dd: 0.3,
  },

  {
    name: "Barani Ball Out",
    code: "51",
    dd: 0.2,
  },

  {
    name: "Front Full",
    code: "42/",
    dd: 0.7,
  },

  {
    name: "Rudy",
    code: "43/",
    dd: 0.8,
  },

  {
    name: "Randy",
    code: "45/",
    dd: 1.0,
  },

  {
    name: "Adolph",
    code: "807<",
    dd: 1.2,
  },

  {
    name: "Back Full",
    code: "42/",
    dd: 0.6,
  },

  {
    name: "Back Double Full",
    code: "44/",
    dd: 0.8,
  },

  {
    name: "Back Triple Full",
    code: "46/",
    dd: 1.0,
  },

  {
    name: "Pull Over",
    code: "30o",
    dd: 1.2,
  },

  {
    name: "Cody",
    code: "12000/",
    dd: 1.1,
  },


  {
    name: "Back Half",
    code: "41/",
    dd: 0.3,
  },

  {
    name: "Front 3/4 Tuck",
    code: "30o",
    dd: 0.2,
  },

   {
    name: "Front 3/4 Pike",
    code: "30<",
    dd: 0.2,
  },

   {
    name: "Front 3/4 Straight",
    code: "30/",
    dd: 0.2,
  },

];

const easyDoubles = [

  {
    name: "Double Back Tuck",
    code: "800o",
    dd: 0.9,
  },

  {
    name: "Double Back Pike",
    code: "800<",
    dd: 1.0,
  },

  {
    name: "Half Out Tuck",
    code: "12001o",
    dd: 1.2,
  },

  {
    name: "Half Out Pike",
    code: "12001<",
    dd: 1.4,
  },

  {
    name: "Kaboom Double Back",
    code: "12000<",
    dd: 1.5,
  },

];

const hardDoubles = [

  {
    name: "Rudy Out Tuck",
    code: "803o",
    dd: 1.6,
  },

  {
    name: "Rudy Out Pike",
    code: "803<",
    dd: 1.8,
  },

  {
    name: "Full Out Tuck",
    code: "802o",
    dd: 1.5,
  },
  {
    name: "Full Out Straight",
    code: "802/",
    dd: 1.5,
  },


  {
    name: "Full Full Tuck",
    code: "822o",
    dd: 2.2,
  },

  {
    name: "Full Full Straight",
    code: "822/",
    dd: 1.8,
  },

  {
    name: "Double Lay",
    code: "800/",
    dd: 1.2,
  },

  {
    name: "Half Out Lay",
    code: "801/",
    dd: 1.6,
  },



  {
    name: "Full Out Tuck",
    code: "803o",
    dd: 1.7,
  },

  {
    name: "Full Half Tuck",
    code: "821o",
    dd: 1.7,
  },

];

export const randomRoutineSkills = {

  noDoubles,

  easyDoubles: [
    ...noDoubles,
    ...easyDoubles,
  ],

  hardDoubles: [
    ...noDoubles,
    ...easyDoubles,
    ...hardDoubles,
  ],

  any: [
    ...noDoubles,
    ...easyDoubles,
    ...hardDoubles,
  ],
};