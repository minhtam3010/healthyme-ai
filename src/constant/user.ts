export const BASIC_INFO = [
  [
    {
      label: "Full Name",
      placeholder: "e.g Nguyen Van A",
      type: "text",
      id: "name",
    },
  ],
  [
    {
      label: "Age",
      placeholder: "32",
      type: "number",
      id: "age",
      min: 1,
      max: 100,
    },
    {
      label: "Gender",
      placeholder: "Male/Female",
      type: "select",
      id: "gender",
    },
  ],
  [
    {
      label: "Current Weight",
      placeholder: "100kg",
      type: "number",
      id: "weight",
      min: 30,
      max: 200,
    },
    {
      label: "Height",
      placeholder: "178cm",
      type: "number",
      id: "height",
      min: 30,
      max: 300,
    },
  ],
  [
    {
      label: "Goal Weight",
      placeholder: "80kg",
      type: "number",
      id: "goalWeight",
      min: 30,
      max: 200,
    },
  ],
];

export const defaultAction = ["Gain Weight", "Lose Weight", "Build Muscle"];
export const COLORS = ["#4c6ef5", "#40c057", "#fa5252"];
export const BORDER_COLORS = ["#364fc7", "#2b8a3e", "#c92a2a"];

export const COMMITMENT = [
  {
    label: "1 day/week",
    value: 1,
    color: "#c92a2a",
    note: "Good start",
  },
  {
    label: "2 days/week",
    value: 2,
    color: "#a61e4d",
    note: "Excellent",
  },
  {
    label: "3 days/week",
    value: 3,
    color: "#862e9c",
    note: "Consistent",
  },
  {
    label: "4 days/week",
    value: 4,
    color: "#5f3dc4",
    note: "Dedicated",
  },
  {
    label: "5 days/week",
    value: 5,
    color: "#1864ab",
    note: "Athlete",
  },
  {
    label: "6 days/week",
    value: 6,
    color: "#5c940d",
    note: "Elite",
  },
  {
    label: "7 days/week",
    value: 7,
    color: "#d9480f",
    note: "Unstoppable",
  },
];
