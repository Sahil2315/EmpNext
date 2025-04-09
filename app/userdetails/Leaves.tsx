import { useContext, useEffect, useState } from "react"
import { empContext } from "./userProvider"
import '../globals.css'

type leaveTS = {
  empid: string,
  team: number,
  Reason: string,
  category: string,
  from: string,
  to: string
  lstat: string
}

const Leaves = () => {
  const today = new Date()
  const todayString = `${today.getFullYear()}-${today.getMonth() <= 9 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1}-${today.getDate()}`
  let [fromDate, setFrom] = useState(todayString)
  let [toDate, setTo] = useState(todayString)
  let [reason, setReason] = useState("")
  let [category, setCat] = useState("PL")
  let {user} = useContext(empContext)
  let [currList, setCurrList] = useState<leaveTS[]>([])

  useEffect(() => {
    setTo(fromDate)
  }, [fromDate])

  useEffect(()=> {
    async function Inititialize(){
      let request = await fetch( '/api/leaves', {
        'method': 'POST', 
        'headers': {
          'Content-Type': 'application/json'
        },
        'body': JSON.stringify({
          'empid': user.empid
        })
      })
      let response = await request.json()
      if(response.success){
        setCurrList(response.leaves)
        console.log(response)
      }
    }
    if(user.team > -1) Inititialize()
  }, [user])

  async function submitNew(){
    if(reason == "") return
    let request = await fetch( '/api/leaves/newApplication', {
      'method': 'POST', 
      'headers': {
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify({
        'user': user.empid,
        'team': user.team,
        'fromDate': fromDate,
        'toDate': toDate,
        'reason': reason,
        'category': category
      })
    })
    let response = await request.json()
    if(response.success){
      alert("Leave Application Submitted Successfully")
    }
  }

  let abbMapper = (abb: string) => {
    if(abb == "PL") return "Paid Leave"
    else if(abb == "SL") return "Sick Leave"
    else return "Casual Leave"
  }

  return (
    <div className={`mt-4 w-full h-full bg-opacity-20 rounded-lg bg-indigo-600 p-2`}>
        <div className="flex flex-row w-full h-full bg-black/50">
          <div className="flex-1 flex flex-col justify-center items-center border-r-2 border-violet-500 border-opacity-15 my-4">
            <span className="text-2xl font-semibold ">Apply for a Leave</span>
            <input type="text" onChange={(e) => setReason(e.target.value)} defaultValue={reason} className="mt-16 text-center outline-none bg-slate-700 bg-opacity-30 text-xl px-2 py-1 w-96 rounded-md" placeholder="Reason"/>
            <div className="flex mt-8 flex-row items-center">
              <span>Category:</span>
              <select onChange={(e) => setCat(e.target.value)} className="ml-4 w-48 cursor-pointer outline-none bg-slate-700 bg-opacity-80 text-xl px-2 rounded-md py-1" name="Category">
                <option value="PL">Paid Leave</option>
                <option value="SL">Sick Leave</option>
                <option value="CL">Casual Leave</option>
              </select>
            </div>
            <div className="flex mt-8 text-xl flex-row items-center">
              <span>From:</span>
              <input min={todayString} onChange={(e) => setFrom(e.target.value)} defaultValue={fromDate} className="outline-none cursor-pointer ml-2 px-2 py-1 rounded-md bg-slate-700 bg-opacity-80" type="date"/>
              <span className="ml-20">To:</span>
              <input min={fromDate} onChange={(e) => setTo(e.target.value)} defaultValue={toDate} className="outline-none ml-2 px-2 py-1 cursor-pointer rounded-md bg-slate-700 bg-opacity-80" type="date"/>
            </div>
            <button onClick={submitNew} className="mt-16 py-1 px-6 text-lg bg-indigo-600 bg-opacity-50 rounded-lg hover:bg-opacity-90">Submit Application</button>
          </div>
          <div className="w-[500px] flex flex-col">
            <span className="text-2xl font-semibold mx-4 text-center mt-8 border-b border-violet-500 border-opacity-15 pb-4"> Previous Applications</span>
            <div className="mt-4 overflow-y-scroll">
              {
                currList.map((item, index) => {
                  return(
                    <div className="flex py-2 px-4 items-center flex-col mt-2 bg-slate-600 mx-4 rounded-md bg-opacity-50" key={index}>
                      <div className="flex flex-row items-center">
                        <span className="text-center leave-reason">{item.Reason}</span>
                        <span className={`${item.lstat == "Held" ? 'bg-amber-600' : item.lstat == "Approved" ? 'bg-emerald-600' : 'bg-rose-600'} px-2 ml-4 mt-1 rounded`}>{item.lstat}</span>
                      </div>
                      <div className="flex-row mt-4">
                        <span>{abbMapper(item.category)}</span>
                        <span className="ml-4">From:-{item.from.slice(0, 10)}</span>
                        <span className="ml-4">To:-{item.to.slice(0, 10)}</span>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
    </div>
  )
}

export default Leaves