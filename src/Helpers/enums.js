export const provider=[
    {
        "id": 134,
        "clinicId": 93422,
        "providerType": 1,
        "firstName": "Vinit",
        "middleName": "",
        "lastName": "Lal",
        "credential": "MD",
        "userId": 83,
        "favourite": true,
        "roleId": 3,
        "fullName": "Vinit Lal"
    },
    {
        "id": 135,
        "clinicId": 93422,
        "providerType": 1,
        "firstName": "Randall",
        "middleName": "Glenn",
        "lastName": "Gale",
        "credential": "DO",
        "userId": 85,
        "favourite": true,
        "roleId": 3,
        "fullName": "Randall Gale"
    },
    {
        "id": 136,
        "clinicId": 93422,
        "providerType": 1,
        "firstName": "Kelsey",
        "middleName": "",
        "lastName": "Reekie",
        "credential": "NP",
        "userId": 86,
        "favourite": true,
        "roleId": 3,
        "fullName": "Kelsey Reekie"
    },
    {
        "id": 137,
        "clinicId": 93422,
        "providerType": 1,
        "firstName": "Mesha",
        "middleName": "",
        "lastName": "Dancer",
        "credential": "",
        "userId": 87,
        "favourite": true,
        "roleId": 3,
        "fullName": "Mesha Dancer"
    },
    {
        "id": 221,
        "clinicId": 93422,
        "providerType": 1,
        "firstName": "George",
        "middleName": "",
        "lastName": "Jacob",
        "credential": "MD",
        "userId": 1121,
        "favourite": false,
        "roleId": 3,
        "fullName": "George Jacob"
    },
    {
        "id": 1443,
        "clinicId": 93422,
        "providerType": 1,
        "firstName": "Savannah",
        "middleName": "",
        "lastName": "Doughty",
        "credential": "MD",
        "userId": 676,
        "favourite": false,
        "roleId": 3,
        "fullName": "Savannah Doughty"
    }
]
export const facility=[
    {
        "id": 2694,
        "locationName": "H36o test location ",
        "favourite": false,
        "locationAlias": "H360 test loc"
    },
    {
        "id": 1087,
        "locationName": "Olympia Neurological-McAlester",
        "favourite": false,
        "locationAlias": "Office"
    },
    {
        "id": 114,
        "locationName": "Texas Health Heart & Vascular Hospital Arlington",
        "favourite": true,
        "locationAlias": "Texas Health Heart"
    },
    {
        "id": 98,
        "locationName": "Heart360 Specialists Pc",
        "favourite": true,
        "locationAlias": "H360S Pc"
    }
]
export const insuranceTypes = [
    { value: 1, label: 'Cash' },
    { value: 2, label: 'PPO' },
    { value: 3, label: 'HMO' },
    { value: 4, label: 'POS' },
    { value: 5, label: 'Other' },
    { value: 6, label: 'Wc' },
    { value: 7, label: 'PIP' },
    { value: 8, label: 'OtherCash' },
    { value: 9, label: 'Ins' },
    { value: 10, label: 'Contract' }
];
export const state=[
    {value: "TX", label: "Texas"},
    {value: "CT", label: "Connecticut"},
    {value: "AZ", label: "Arizona"},
    {value: "CA", label: "California"},
    {value: "NY", label: "New York"},
    {value: "FL", label: "Florida"},
    {value: "IL", label: "Illinois"},
    {value: "PA", label: "Pennsylvania"},
    {value: "OH", label: "Ohio"},
    {value: "GA", label: "Georgia"},
    {value: "MI", label: "Michigan"},
    {value: "NC", label: "North Carolina"},
    {value: "NJ", label: "New Jersey"},
    {value: "VA", label: "Virginia"},
    {value: "WA", label: "Washington"},
    {value: "MA", label: "Massachusetts"},
    {value: "IN", label: "Indiana"},
    {value: "TN", label: "Tennessee"},
    {value: "MO", label: "Missouri"},
    {value: "MD", label: "Maryland"},
    {value: "WI", label: "Wisconsin"},
    {value: "CO", label: "Colorado"},
    {value: "MN", label: "Minnesota"},
    {value: "SC", label: "South Carolina"},
    {value: "AL", label: "Alabama"}
]
export const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };

  export const parties = [
    {
      name: "Primary",
      value: 1,
    },
    {
      name: "Secondary",
      value: 2,
    },
    {
      name: "Tertiary",
      value: 3,
    },
    {
      name: "Patient",
      value: 4,
    },
    {
      name: "None",
      value: 5,
    },
  ];
  
  (1),
    (2),
    (3),
    (4),
    (5),
    (6),
    (7),
    (8),
    (9),
    (10),
    (11),
    (12),
    (13);
    export const types = [
      {
        name: "Billed",
        value: 1,
      },
      {
        name: "Allowed",
        value: 2,
      },
      {
        name: "ContAdj",
        value: 3,
      },
      {
        name: "OtherAdj",
        value: 4,
      },
      {
        name: "Paid",
        value: 5,
      },
      {
        name: "OverPaid",
        value: 6,
      },
      {
        name: "ProAdj",
        value: 7,
      },
      {
        name: "Copay",
        value: 8,
      },
      {
        name: "CoIns",
        value: 9,
      },
      {
        name: "Ded",
        value: 10,
      },
      {
        name: "Other",
        value: 11,
      },
      {
        name: "WriteOff",
        value: 12,
      },
      {
        name: "BilledCorrection",
        value: 13,
      },
    ];