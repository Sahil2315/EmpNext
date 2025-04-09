export type employeeTS = {
  empid: string;
  name: string;
  dob: string;
  email: string;
  phone: string;
  c_add: string;
  p_add: string;
  aadhaar: string;
  upi: string;
  dept: string;
  title: string;
  doj: string;
  salary: number;
  regport: string;
  regkey: string;
  laptop: string;
  leaves: number;
  gender: string;
  team: number;
};

export const empDefault = {
  empid: "",
  name: "",
  dob: "",
  email: "",
  phone: "",
  c_add: "",
  p_add: "",
  aadhaar: "",
  upi: "",
  dept: "",
  title: "",
  doj: "",
  salary: 0,
  regport: "",
  regkey: "",
  laptop: "",
  leaves: 0,
  gender: "",
  team: -1,
};

export type messageTS = {
  empid: string;
  ename: string;
  date: string;
  time: string;
  msgcont: string;
  team: number;
};

export type projectTS = {
  team: number;
  status: string;
  statpercentage: number;
  deadline: string;
  name: string;
}

export type moduleTS = {
  mid: number;
  mname: string;
  mstat: string;
  statval: number;
}