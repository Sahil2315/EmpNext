import { RefObject, useEffect, useRef, useState } from "react";
import crossSvg from "../images/cross.svg";

const Overlay = ({
  field,
  value,
  org,
  visible,
  toggle,
  empid,
}: {
  field: string;
  value: string;
  org: boolean;
  visible: boolean;
  toggle: (ov: boolean) => void;
  empid: string;
}) => {
  const [nVal, setNval] = useState<string>("");
  const [confirmVis, setConVis] = useState<boolean>(false);
  const centerDiv = useRef<HTMLDivElement>(null);
  function OutsideClicker(ref: RefObject<HTMLDivElement>) {
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          toggle(false);
          setConVis(false);
        }
      }
      if (typeof document !== "undefined") {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }
    }, [ref]);
  }
  useEffect(() => {
    if (!visible) {
      setNval("");
      setConVis(false);
    }
  }, [visible]);
  OutsideClicker(centerDiv as RefObject<HTMLDivElement>);

  async function submitChange() {
    const request = await fetch("/api/change/newChange", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        empid: empid,
        field: field,
        value: nVal,
        org: org,
      }),
    });
    const response = await request.json();
    if (response.success) {
      alert(`Successfully Applied for the Change of ${field}`);
      toggle(false);
    }
  }
  function mVis() {
    if (nVal) {
      setConVis(true);
    } else {
      alert("Value can't be Empty.");
    }
  }

  return (
    <div
      className={
        visible
          ? "absolute cursor-pointer flex items-center justify-center top-0 left-0 h-full w-full rounded-lg z-50 bg-slate-700/50 backdrop-blur"
          : "hidden"
      }
    >
      <div
        ref={centerDiv}
        className="flex border-4 border-slate-400/20 relative cursor-default flex-col bg-slate-700 items-center text-xl px-4 py-4 rounded-lg"
      >
        <div className="w-full flex flex-row justify-end">
          <button
            onClick={() => {
              toggle(false);
              setConVis(false);
            }}
            className="h-[45px] rounded-lg flex justify-center items-center w-[45px] bg-rose-500 hover:bg-red-600"
          >
            <img className="w-[30px]" src={crossSvg.src} />
          </button>
        </div>
        <span className={org ? "text-rose-500 mt-2" : "mt-2"}>
          {" "}
          {org
            ? "This Change will require Approval from the Admin"
            : "This Change will be Directly Applied"}{" "}
        </span>
        <div className="flex flex-col mt-4">
          <div>
            Field to be Changed:{" "}
            <span className="ml-4 text-emerald-300">{field}</span>
          </div>
          <div className="mt-2 ">
            Current Value of the Field:{" "}
            <span className="ml-4 text-amber-300">{value}</span>
          </div>
        </div>
        <input
          value={nVal}
          onChange={(e) => setNval(e.target.value)}
          className="bg-black/60 px-2 py-1 w-[60%] mt-4 rounded-md"
          type="text"
          placeholder="New Value"
        />
        <button
          onClick={mVis}
          className="bg-indigo-600 w-max py-1 px-4 text-lg rounded-md mt-4 hover:bg-indigo-700"
        >
          Submit
        </button>
        <div
          className={`w-[700px] ml-[-25%] border-4 border-slate-400/20 h-full top-0 left-0 rounded-lg px-4 absolute bg-slate-700 flex flex-col items-center justify-center ${
            confirmVis ? "" : "hidden"
          }`}
        >
          <span className="text-2xl">Confirm Your Action Below</span>
          <div className="flex flex-row items-center mt-6">
            <span className="text-xl">Changes:</span>
            <span className="ml-6 bg-blue-500 py-1 px-2 rounded-lg text-lg">
              {field}
            </span>
            <span className="ml-4 bg-violet-500 py-1 px-2 rounded-lg items-center text-lg">
              {" "}
              {"->"}{" "}
            </span>
            <span className="ml-4 bg-emerald-500 py-1 px-2 rounded-lg text-lg">
              {nVal}
            </span>
          </div>
          <button
            onClick={submitChange}
            className="mt-6 bg-indigo-600 px-4 py-1 rounded-md hover:bg-indigo-600/80"
          >
            Submit
          </button>
          <button onClick={() => setConVis(false)}>
            <img
              src={crossSvg.src}
              className="bg-red-500 absolute top-4 right-4 rounded-lg w-[50px] p-2 hover:bg-red-500/80"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Overlay;
