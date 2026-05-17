// Centralized workflow IDs.
// When the backend rotates an ID, change it here only.

export const WORKFLOWS = {
  AUTH: {
    login: "dadaff59-f660-4933-96d2-279d89ddec70",
  },

  E2O: {
    kpi: {
      totalOfferValue:     "dbf3da76-cf50-11f0-8899-d9e4226dd9d5",
      turPackages:         "87c96aa9-cf51-11f0-8899-cb8d3876306e",
      directAtPackages:    "085ee5b0-cf52-11f0-8899-9d96291cf20a",
      executedProjects:    "b7237f77-cf52-11f0-8899-f9ef4e091cce",
      nonExecutedProjects: "26f4392e-cf53-11f0-8899-5fac8bbb32f8",
      conversionRate:      "bb48f0d5-cf53-11f0-8899-cf73d391ae59",
    },
    chart: {
      conversion: "4224252f-cf55-11f0-8899-a7e51d11fe6a",
    },
    filter: {
      customers: "b81107b2-d729-11f0-a2fd-cbc6fa243cb8",
      projects:  "414bf9e6-d732-11f0-a2fd-79c14edccab5",
      packages:  "f14807bb-d73a-11f0-a2fd-2f1759f8d68a",
    },
    table: {
      fetch: "6073fef8-446b-11f1-8e18-73bae3646b63",
    },
    crud: {
      save:           "208c9366-4924-11f1-8e18-b7ca19bb3690",
      delete:         "ea799a0d-d211-11f0-bead-af6e54058ecd",
      convertToOrder: "9b875474-491e-11f1-8e18-6f23cecef47a",
      attachDoc:      "ffa146fd-4aa3-11f1-97a8-394b0dd5d7ce",
      getForEdit:     "388c73d3-d20a-11f0-8d50-4be0661dac5c",
      update:         "d11fbf7f-490c-11f1-8e18-97246f7a1806",
    },
    bulk: {
      saveUpload: "9a96c36a-cea6-11f0-8899-a1080db368b6",
    },
  },

  O2S: {
    kpi: {
      totalOrders:     "16e89f6d-d98f-11f0-a2fd-492a4bd817ab",
      totalOrderValue: "30c35aef-d99c-11f0-a2fd-61cf4ae95a74",
      avgLeadTime:     "d36480e8-d99c-11f0-a2fd-e378ef6d4db7",
      inManufacturing: "00e2908b-d9a3-11f0-a2fd-ad47815792c8",
      delivered:       "2dabaf5d-d9a6-11f0-a2fd-93f7afe35fe0",
      otdRate:         "047bb5ec-df1c-11f0-a2fd-3bbc828fe82f",
    },
    chart: {
      monthlySales: "211ff21e-d9a8-11f0-a2fd-cfae3579ded3",
    },
    filter: {
      customers: "0159415e-4d38-11f1-bc29-77ef2d5279ee",
      projects:  "a637bf0d-4d36-11f1-bc29-2709207ca8aa",
    },
    table: {
      fetch: "2c80d805-4790-11f1-8e18-dff8866bd8b0",
    },
    crud: {
      delete:     "c3fbbfaa-da80-11f0-a2fd-1bfc768b8c24",
      getForEdit: "c7b9c5b7-4deb-11f1-bc29-71ebffa79f1c",
      update:     "2f41f12c-dcb4-11f0-a2fd-b56674ef8b8c",
    },
    bulk: {
      saveUpload: "580eae5e-d4c8-11f0-911f-5f25d94b6664",
    },
  },
};
