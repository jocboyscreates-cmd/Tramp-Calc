const noDoubles = [

  {
    name: "Front Somersault Tuck",
    code: "40o",
    dd: 0.5,
  },

  {
    name: "Back Somersault Tuck",
    code: "40o",
    dd: 0.5,
  },

  {
    name: "Front Somersault Pike",
    code: "40<",
    dd: 0.6,
  },

  {
    name: "Back Somersault Pike",
    code: "40<",
    dd: 0.6,
  },

  {
    name: "Front Somersault Straight",
    code: "40/",
    dd: 0.6,
  },

  {
    name: "Back Somersault Straight",
    code: "40/",
    dd: 0.6,
  },

  {
    name: "Barani Tuck",
    code: "41o",
    dd: 0.6,
  },

  {
    name: "Back Somersault Half Twist Tuck",
    code: "41o",
    dd: 0.6,
  },

  {
    name: "Barani Pike",
    code: "41<",
    dd: 0.6,
  },

  {
    name: "Back Somersault Half Twist Pike",
    code: "41<",
    dd: 0.6,
  },

  {
    name: "Barani Straight",
    code: "41/",
    dd: 0.6,
  },

  {
    name: "Back Somersault Half Twist Straight",
    code: "41/",
    dd: 0.6,
  },

  {
    name: "Rudy",
    code: "43/",
    dd: 0.8,
  },

  {
    name: "Back Full",
    code: "42/",
    dd: 0.7,
  },

  {
    name: "Randy",
    code: "45/",
    dd: 1.0,
  },

  {
    name: "Double Full",
    code: "44/",
    dd: 0.9,
  },

];

const easyDoubles = [

  {
    name: "Half Out Tuck",
    code: "801o",
    dd: 1.1,
  },

  {
    name: "Double Back Tuck",
    code: "800o",
    dd: 1.1,
  },

  {
    name: "Half Out Pike",
    code: "801<",
    dd: 1.3,
  },

  {
    name: "Double Back Pike",
    code: "800<",
    dd: 1.3,
  },

  {
    name: "Rudy Out Tuck",
    code: "803o",
    dd: 1.3,
  },

  {
    name: "Half In Half Out Tuck",
    code: "811o",
    dd: 1.3,
  },

  {
    name: "Rudy Out Pike",
    code: "803<",
    dd: 1.5,
  },

  {
    name: "Half In Half Out Pike",
    code: "811<",
    dd: 1.5,
  },

  {
    name: "Full Half Tuck",
    code: "821o",
    dd: 1.3,
  },

  {
    name: "Back In Full Out Tuck",
    code: "802o",
    dd: 1.3,
  },

];

const hardDoubles = [

  {
    name: "Full Half Pike",
    code: "821<",
    dd: 1.5,
  },

  {
    name: "Back In Full Out Pike",
    code: "802<",
    dd: 1.5,
  },

  {
    name: "Full Half Straight",
    code: "821/",
    dd: 1.5,
  },

  {
    name: "Back In Full Out Straight",
    code: "802/",
    dd: 1.5,
  },

  {
    name: "Half Out Straight",
    code: "801/",
    dd: 1.3,
  },

  {
    name: "Full In Full Out Tuck",
    code: "822o",
    dd: 1.5,
  },

  {
    name: "Full Half Tuck",
    code: "821o",
    dd: 1.3,
  },

  {
    name: "Full Half Pike",
    code: "821<",
    dd: 1.5,
  },

  {
    name: "Full Half Straight",
    code: "821/",
    dd: 1.5,
  },

  {
    name: "Front Front Half Tuck",
    code: "12001o",
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