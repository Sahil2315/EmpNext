import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { InitializeLanding } from "../utils/TokenChecker"
import ladyPhoto from "../images/lady.jpg"
import manPhoto from "../images/man.jpg"
import maleSign from "../images/maleSign.svg"
import femaleSign from "../images/femaleSign.svg"
import calender from "../images/calender.svg"
import mailSign from "../images/mail.svg"
import phoneSign from "../images/phone.svg"
import locationSign from "../images/location.svg"

import { empContext, empState } from "./userProvider"
import Navbar from "./Navbar"
import InnerCont from "./InnerCont"

const Container = () => {
    const router = useRouter()
    const [currOpened, resetCurr] = useState(0)
    const {user, resetUser} = useContext(empContext) as empState
    const [loading, toggleLoading] = useState(true)
    useEffect(() => {
      InitializeLanding(router, resetUser)
    }, [router])
    useEffect(() => {
      if(user.name != "") toggleLoading(false)
    }, [user])
    return (
      <div className='text-white bg-opacity-0'>
        <div className="text-2xl font-bold py-2 px-4 m-4 bg-slate-700 w-max rounded bg-opacity-50">{user?.empid}</div>
        <div className="flex flex-row">
          <div className="mx-32 mt-16 flex flex-col justify-center items-center">
            <img className="w-[300px] rounded-2xl" src={user?.gender == "Male" ? manPhoto.src : ladyPhoto.src }/>
            <div className="bg-slate-700 mt-8 w-full rounded bg-opacity-50 p-4 flex flex-col">
              <span className="text-xl border-b flex flex-row border-indigo-300 items-center py-1 w-max">
                {user?.name}
                <img className="w-[35px] ml-2" src={user?.gender == "Male" ? maleSign.src : femaleSign.src} />
              </span>
              <span className="text-lg flex flex-row items-center border-b border-indigo-300 py-1 w-max mt-4">
                <img className="w-[35px] mr-2" src={calender.src}/>
                {user?.dob.slice(0, 10)}
              </span>
              <span className="text-md flex flex-row items-center border-b border-indigo-300 py-1 w-max mt-4">
                <img className="w-[35px] mr-2" src={mailSign.src}/>
                {user?.email}
              </span>
              <span className="text-lg flex flex-row items-center border-b border-indigo-300 py-1 w-max mt-4">
                <img className="w-[35px] mr-2" src={phoneSign.src}/>
                {user?.phone}
              </span>
              <span className="text-sm flex flex-row items-center border-b border-indigo-300 py-1 w-max mt-4">
                <img className="w-[35px] mr-2" src={locationSign.src}/>
                {user?.c_add}
              </span>
            </div>
          </div>
          <div className="flex-1 ">
            <Navbar currOpened={currOpened} resetCurr = {resetCurr} />
            <div className="w-full h-[750px] pr-4">
              <InnerCont  currOpened={currOpened} />
            </div>
          </div>
        </div>
        <div className={`absolute overflow-x-hidden top-0 left-0 z-50 h-full w-full bg-zinc-950 ${loading ? '' : 'hidden'}`}>
          <div className="flex flex-row">
            <div>
            <div className="w-[145px] h-[46px] rounded-lg m-4 bg-slate-900"></div>
              <div className="w-[300px] h-[300px] rounded-2xl mx-32 mt-32 bg-slate-900"></div>
              <div className="w-[300px] h-[320px] rounded-lg mx-32 mt-8 bg-slate-900"></div>
            </div>
            <div className="w-full pr-4">
              <div className="w-[600px] h-[40px] rounded-lg mt-20 bg-slate-900"></div>
              <div className="w-full h-[750px] rounded-lg mt-4 bg-slate-900"></div>
            </div>
          </div>
          <div className="absolute bg-neutral-900 animate-pulse h-full w-full top-0 left-0 z-60">
            <div className="flex flex-row">
              <div>
              <div className="w-[145px] h-[46px] rounded-lg m-4 bg-slate-800"></div>
                <div className="w-[300px] h-[300px] rounded-2xl mx-32 mt-32 bg-slate-800"></div>
                <div className="w-[300px] h-[320px] rounded-lg mx-32 mt-8 bg-slate-800"></div>
              </div>
              <div className="w-full pr-4">
                <div className="w-[600px] h-[40px] rounded-lg mt-20 bg-slate-800"></div>
                <div className="w-full h-[750px] rounded-lg mt-4 bg-slate-800"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}

export default Container