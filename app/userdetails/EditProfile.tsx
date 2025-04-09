import { useContext, useEffect, useState } from "react";
import { empContext } from "./userProvider";
import ClientOnlyLoader from "./clientOnlyLoader";

type changeTS = {
  empid: string;
  field: string;
  value: string;
  chstat: string;
};

const EditProfile = () => {
  let { user } = useContext(empContext);
  let [changes, setChanges] = useState<changeTS[]>([]);
  let [field, setField] = useState<string>("");
  let [value, setValue] = useState<string>("");
  let [org, toggleorg] = useState<boolean>(true);
  let [ovVisible, toggleOv] = useState<boolean>(false);
  let [selectedLogin, setSelected] = useState<string>("");
  let [loginVisible, setLoginVisible] = useState<boolean>(false);

  useEffect(() => {
    async function Init() {
      let request = await fetch("/api/change", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          empid: user.empid,
        }),
      });
      let response = await request.json();
      if (response.success) {
        setChanges(response.changes);
      }
    }
    if (user.team > -1) Init();
  }, [user]);

  function ovStart(currField: string, currValue: string, currOrg: boolean) {
    setField(currField);
    setValue(currValue);
    toggleorg(currOrg);
    toggleOv(true);
  }
  function loginSet(select: string) {
    setSelected(select);
    setLoginVisible(true);
  }

  return (
    <div
      className={`relative mt-4 w-full h-full bg-opacity-20 rounded-lg bg-indigo-600 p-2`}
    >
      <div className="rounded-lg bg-black/50 h-full w-full flex flex-row">
        <div className="flex w-[65%] border-r-2 border-violet-500 border-opacity-15 flex-col items-center my-2 px-4">
          <div className="h-[40%] flex flex-col items-center">
            <span className="text-xl w-max border-b border-indigo-600 border-opacity-40 px-1 pb-2">
              Personal Details
            </span>
            <div className="flex flex-row w-[600px]">
              <button
                onClick={() => {
                  ovStart("Email ID", user.email, false);
                }}
                className="hover:bg-opacity-60 flex-1 py-6 mt-8 bg-slate-600 bg-opacity-40 rounded-md"
              >
                {user.email}
              </button>
              <button
                onClick={() => {
                  ovStart("Phone Number", user.phone, false);
                }}
                className="hover:bg-opacity-60 flex-1 py-6 ml-6 mt-8 bg-slate-600 bg-opacity-40 rounded-md"
              >
                {user.phone}
              </button>
            </div>
            <div className="flex flex-row w-[600px]">
              <button
                onClick={() => {
                  ovStart("Current Address", user.c_add, false);
                }}
                className="hover:bg-opacity-60 flex-1 py-6 mt-8 bg-slate-600 bg-opacity-40 rounded-md"
              >
                {user.c_add}
              </button>
              <button
                onClick={() => {
                  ovStart("Permanent Address", user.p_add, false);
                }}
                className="hover:bg-opacity-60 flex-1 py-6 ml-6 mt-8 bg-slate-600 bg-opacity-40 rounded-md"
              >
                {user.p_add}
              </button>
            </div>
          </div>
          <div className="h-[40%] flex flex-col items-center">
            <span className="text-xl border-b w-max border-indigo-600 border-opacity-40 px-1 pb-2">
              Organisational Details
            </span>
            <div className="flex flex-row w-[600px]">
              <button
                onClick={() => {
                  ovStart("Team Number", `${user.team}`, true);
                }}
                className="hover:bg-opacity-60 flex-1 py-6 mt-8 bg-slate-600 bg-opacity-40 rounded-md"
              >
                Team: {user.team}
              </button>
              <button
                onClick={() => {
                  ovStart("Laptop ID", user.laptop, true);
                }}
                className="hover:bg-opacity-60 flex-1 py-6 ml-6 mt-8 bg-slate-600 bg-opacity-40 rounded-md"
              >
                Laptop: {user.laptop}
              </button>
            </div>
            <div className="flex flex-row w-[600px]">
              <button
                onClick={() => {
                  ovStart("Department", user.dept, true);
                }}
                className="hover:bg-opacity-60 flex-1 py-6 mt-8 bg-slate-600 bg-opacity-40 rounded-md"
              >
                Department: {user.dept}
              </button>
              <button
                onClick={() => {
                  ovStart("Job Title", user.title, true);
                }}
                className="hover:bg-opacity-60 flex-1 py-6 ml-6 mt-8 bg-slate-600 bg-opacity-40 rounded-md"
              >
                {user.title}
              </button>
            </div>
          </div>
          <div className="h-[20%] flex flex-col items-center">
            <span className="text-xl border-b border-indigo-600 w-max border-opacity-40 px-1 pb-2">
              Login Details
            </span>
            <div className="flex flex-row mt-6">
              <button
                onClick={() => {
                  loginSet("UN");
                }}
                className="hover:bg-opacity-60 px-10 py-4 bg-slate-600 bg-opacity-40 rounded-md"
              >
                Username
              </button>
              <button
                onClick={() => {
                  loginSet("PW");
                }}
                className="hover:bg-opacity-60 ml-16 px-10 py-4 bg-slate-600 bg-opacity-40 rounded-md"
              >
                Password
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col items-center px-2 py-2">
          <span className="text-xl mt-4 border-b border-indigo-600 border-opacity-40 px-1 pb-2">
            Previous Changes
          </span>
          <div className="flex flex-col px-2 w-full">
            {changes.map((item, index) => {
              return (
                <div
                  className="px-4 items-center flex flex-col overflow-y-scroll py-2 w-full mt-4 rounded-md bg-indigo-600 bg-opacity-50"
                  key={index}
                >
                  <span className="text-xl">
                    {item.field} - {item.value}
                  </span>
                  <span
                    className={`${
                      item.chstat == "Held"
                        ? "bg-amber-600"
                        : item.chstat == "Approved"
                        ? "bg-emerald-600"
                        : "bg-rose-600"
                    } px-2 my-2 rounded`}
                  >
                    {item.chstat}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <ClientOnlyLoader
          empid={user.empid}
          field={field}
          value={value}
          org={org}
          ovVisible={ovVisible}
          ovToggle={toggleOv}
          currSelected={selectedLogin}
          setSelected={setSelected}
          loginVisible={loginVisible}
          loginToggle={setLoginVisible}
        />
      </div>
    </div>
  );
};

export default EditProfile;
