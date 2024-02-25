'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Exercise_Categories', [{
      exercise_id: 901, //Push up
      category_id: 901,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 901,
      category_id: 905,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 931,
      category_id: 901,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 931,
      category_id: 905,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 961,
      category_id: 901,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 961,
      category_id: 905,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    //Jumping Jacks
    {
      exercise_id: 902,
      category_id: 910,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 932,
      category_id: 910,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 962,
      category_id: 910,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    //Mountain Climber
    {
      exercise_id: 903,
      category_id: 901,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 903,
      category_id: 909,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 903,
      category_id: 912,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 933,
      category_id: 901,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 933,
      category_id: 909,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 933,
      category_id: 912,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 963,
      category_id: 901,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 963,
      category_id: 909,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 963,
      category_id: 912,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    //High Knees
    {
      exercise_id: 904,
      category_id: 904,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 904,
      category_id: 912,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 934,
      category_id: 904,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 934,
      category_id: 912,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 964,
      category_id: 904,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 964,
      category_id: 912,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    //Burpees
    {
      exercise_id: 905,
      category_id: 910,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 935,
      category_id: 910,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 965,
      category_id: 910,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    //Dips
    {
      exercise_id: 906,
      category_id: 901,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 906,
      category_id: 905,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 936,
      category_id: 901,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 936,
      category_id: 905,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 966,
      category_id: 901,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 966,
      category_id: 905,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    //Plank Jacks
    {
      exercise_id: 907,
      category_id: 901,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 907,
      category_id: 912,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 937,
      category_id: 901,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 937,
      category_id: 912,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 967,
      category_id: 901,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 967,
      category_id: 912,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    //Lunges
    {
      exercise_id: 908,
      category_id: 902,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 908,
      category_id: 904,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 908,
      category_id: 908,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 938,
      category_id: 902,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 938,
      category_id: 904,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 938,
      category_id: 908,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 968,
      category_id: 902,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 968,
      category_id: 904,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 968,
      category_id: 908,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    //Side Plank
    {
      exercise_id: 909,
      category_id: 911,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 939,
      category_id: 911,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 969,
      category_id: 911,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    //Russian Twist
    {
      exercise_id: 910,
      category_id: 912,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 910,
      category_id: 911,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 940,
      category_id: 912,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 940,
      category_id: 911,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 970,
      category_id: 912,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 970,
      category_id: 911,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    //Bicycle 
    {
      exercise_id: 911,
      category_id: 912,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 911,
      category_id: 911,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 941,
      category_id: 912,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 941,
      category_id: 911,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 971,
      category_id: 912,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 971,
      category_id: 911,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    //Leg Raises
    {
      exercise_id: 912,
      category_id: 912,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 912,
      category_id: 904,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 942,
      category_id: 912,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 942,
      category_id: 904,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 972,
      category_id: 912,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 972,
      category_id: 904,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    //Jump
    {
      exercise_id: 913,
      category_id: 902,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 913,
      category_id: 904,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 913,
      category_id: 907,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 943,
      category_id: 902,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 943,
      category_id: 904,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 943,
      category_id: 907,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 973,
      category_id: 902,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 973,
      category_id: 904,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 973,
      category_id: 907,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    //inchworms
    {
      exercise_id: 914,
      category_id: 901,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 914,
      category_id: 908,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 914,
      category_id: 912,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 944,
      category_id: 901,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 944,
      category_id: 908,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 944,
      category_id: 912,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 974,
      category_id: 901,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 974,
      category_id: 908,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 974,
      category_id: 912,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    //Box jumps
    {
      exercise_id: 915,
      category_id: 904,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 915,
      category_id: 907,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 945,
      category_id: 904,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 945,
      category_id: 907,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 975,
      category_id: 904,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 975,
      category_id: 907,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    //Side Lunges
    {
      exercise_id: 916,
      category_id: 904,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 916,
      category_id: 908,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 946,
      category_id: 904,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 946,
      category_id: 908,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 976,
      category_id: 904,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 976,
      category_id: 908,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    //Plank to Push Up
    {
      exercise_id: 917,
      category_id: 901,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 917,
      category_id: 905,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 917,
      category_id: 912,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 947,
      category_id: 901,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 947,
      category_id: 905,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 947,
      category_id: 912,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 977,
      category_id: 901,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 977,
      category_id: 905,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 977,
      category_id: 912,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    //Superman
    {
      exercise_id: 918,
      category_id: 901,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 918,
      category_id: 908,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 948,
      category_id: 901,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 948,
      category_id: 908,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 978,
      category_id: 901,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 978,
      category_id: 908,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    //Jump W Rope
    {
      exercise_id: 919,
      category_id: 910,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 949,
      category_id: 910,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 979,
      category_id: 910,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    //Tricep Push-ups
    {
      exercise_id: 920,
      category_id: 901,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 920,
      category_id: 905,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 950,
      category_id: 901,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 950,
      category_id: 905,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 980,
      category_id: 901,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 980,
      category_id: 905,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    //Lunges
    {
      exercise_id: 921,
      category_id: 902,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 921,
      category_id: 904,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 921,
      category_id: 908,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 951,
      category_id: 902,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 951,
      category_id: 904,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 951,
      category_id: 908,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 981,
      category_id: 902,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 981,
      category_id: 904,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 981,
      category_id: 908,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    //Wall Sit
    {
      exercise_id: 922,
      category_id: 902,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 922,
      category_id: 904,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 952,
      category_id: 902,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 952,
      category_id: 904,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 982,
      category_id: 902,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 982,
      category_id: 904,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    //Butt Kicks
    {
      exercise_id: 923,
      category_id: 913,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 953,
      category_id: 913,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      exercise_id: 983,
      category_id: 913,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Exercise_Categories', null, {});
  }
};
