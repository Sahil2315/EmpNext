import prisma from "./prismaclient";

export async function Test() {
  const people = await prisma.employee.findMany();
  return people;
}

export async function empLoginDB({
  entry,
  pword,
}: {
  entry: string;
  pword: string;
}) {
  let resp = await prisma.logindet.findFirst({
    where: {
      AND: [
        {
          username: entry,
        },
        {
          password: pword,
        },
      ],
    },
    select: {
      empid: true,
      username: true,
      email: true,
    },
  });
  return resp;
}

export async function completeDetails(empid: string) {
  let resp = await prisma.employee.findUnique({
    where: {
      empid: empid,
    },
  });
  return resp;
}

export async function searchFor(searchVal: string) {
  searchVal = searchVal + "%";
  let resp =
    await prisma.$queryRaw`SELECT * FROM employee natural join logindet where employee.empid ilike ${searchVal} or username ilike ${searchVal} or "name" ilike ${searchVal}`;
  return resp;
}

type leaveForm = {
  user: string;
  team: number;
  fromDate: string;
  toDate: string;
  reason: string;
  category: string;
};

export async function newLeave(form: leaveForm) {
  let fromDate = new Date(form.fromDate);
  let toDate = new Date(form.toDate);
  const application = await prisma.leaves.create({
    data: {
      empid: form.user,
      team: form.team,
      from: fromDate,
      to: toDate,
      Reason: form.reason,
      category: form.category,
    },
  });
  return application;
}

export async function olderLeaves(empid: string) {
  let today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);
  let temp = await prisma.leaves.updateMany({
    where: {
      empid: empid,
      from: {
        lt: today,
      },
      NOT: {
        lstat: "Approved",
      },
    },
    data: {
      lstat: "Declined",
    },
  });
  let leaves = await prisma.leaves.findMany({
    where: {
      empid: empid,
    },
    orderBy: {
      reqid: "desc",
    },
  });
  return leaves;
}

export async function olderChanges(empid: string) {
  let changes = await prisma.change.findMany({
    where: {
      empid: empid,
    },
    orderBy: {
      changeid: "desc",
    },
  });
  return changes;
}

export async function getUsername(empid: string) {
  let username = await prisma.logindet.findFirst({
    where: {
      empid: empid,
    },
    select: {
      username: true,
    },
  });
  return username;
}

let fieldMap: any = {
  "Email ID": "email",
  "Phone Number": "phone",
  "Current Address": "c_add",
  "Permanent Address": "p_add",
  "Team Number": "team",
  "Laptop ID": "laptop",
  Department: "dept",
  "Job Title": "title",
};
export async function setChangeQuery(
  empid: string,
  field: string,
  value: string
) {
  let change = await prisma.employee.update({
    where: {
      empid: empid,
    },
    data: {
      [fieldMap[field]]: value,
    },
  });
  return change;
}

export async function setChangeRecord(
  empid: string,
  field: string,
  value: string
) {
  console.log(fieldMap[field]);
  let change = await prisma.change.create({
    data: {
      empid: empid,
      field: fieldMap[field],
      value: value,
    },
  });
  return change;
}

export async function passwordCheck(
  empid: string,
  username: string,
  password: string
) {
  let login = await prisma.logindet.findFirst({
    where: {
      empid: empid,
      username: username,
      password: password,
    },
  });
  return login != null;
}

export async function updateUsername(
  empid: string,
  username: string,
  newUsername: string
) {
  let update = await prisma.logindet.update({
    where: {
      empid: empid,
      username: username,
    },
    data: {
      username: newUsername,
    },
  });
  return update;
}
export async function updatePassword(
  empid: string,
  username: string,
  password: string
) {
  let update = await prisma.logindet.update({
    where: {
      empid: empid,
      username: username,
    },
    data: {
      password: password,
    },
  });
  return update;
}

export async function getTeamProject(team: number) {
  let project = await prisma.projects.findFirst({
    where: {
      team: team,
      status: "Active",
    },
  });
  return project;
}

export async function getProjectModules(projectId: number) {
  let modules = await prisma.modules.findMany({
    where: {
      pid: projectId,
    },
    select:{
      mid: true,
      mname: true,
      mstat: true,
      statval: true
    }
  });
  return modules;
}
