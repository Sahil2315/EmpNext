import { RefObject, useContext, useEffect, useRef, useState } from "react";
import { empContext } from "./userProvider";
import crossSvg from "../images/cross.svg"

const LoginChange = ({currSelected, setSelected, visible, toggle}: {currSelected: string, setSelected: (curr: string) => void, visible: boolean, toggle: (vis: boolean) => void}) => {
  let centerDiv = useRef<HTMLDivElement>(null)
  let {user} = useContext(empContext)
  let [username, setUsername] = useState("")
  let [password, setPassword] = useState("")
  let [newUsername, setNUN] = useState("")
  let [newPassword, setNewPW] = useState("")
  let [oldPassword, setOldPW] = useState("")
  let [confirmPassword, setConfirmPW] = useState("")
  let [cscreenVis, toggleCscreen] = useState(false)

  useEffect(() => {
    async function Initiate(){
      let request = await fetch('/api/loginDet', {
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
        setUsername(response.username)
      }
    }
    if(user.team > -1){ 
      Initiate()
    }
  }, [user])

  function OutsideClicker(ref: RefObject<HTMLDivElement>) {
    useEffect(() => {
      function handleClickOutside(event: MouseEvent ) {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          toggle(false)
          toggleCscreen(false)
        }
      }
      if (typeof document !== 'undefined' ){
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }
    }, [ref]);
  }
  OutsideClicker(centerDiv as RefObject<HTMLDivElement>)
  async function finalSubmit(){
    if(currSelected == "UN"){
      if(newUsername == ""){
        alert("Username Cannot Be Empty")
      }
      if(password == ""){
        alert("Password Cannot Be Empty")
      }
      else{
        let request = await fetch('/api/change/changeUN', {
          'method': 'POST', 
          'headers': {
            'Content-Type': 'application/json'
          },
          'body': JSON.stringify({
            'empid': user.empid,
            'newUN': newUsername,
            'username': username,
            'password': password
          })
        })
        let response = await request.json()
        if(response.success){
          alert("Username Updated Successfully")
          setUsername(newUsername)
          toggle(false)
          toggleCscreen(false)
        }
        else{
          alert("Username Update Failed - " + response.message)
          toggleCscreen(false)
        }
        setNUN("")
        setPassword("")
      }
    }
    else if(currSelected == "PW"){
      if(newPassword == "" || oldPassword == "" || confirmPassword == ""){
        alert("All PAssword Fields Are Required")
      }
      else if(newPassword!= confirmPassword){
        alert("Passwords Do Not Match")
      }
      else{
        let request = await fetch('/api/change/changePW', {
          'method': 'POST', 
          'headers': {
            'Content-Type': 'application/json'
          },
          'body': JSON.stringify({
            'empid': user.empid,
            'username': username,
            'oldPW': oldPassword,
            'newPW': newPassword 
          })
        })
        let response = await request.json()
        if(response.success){
          alert("Password Updated Successfully")
          toggle(false)
          toggleCscreen(false)
        }
        else{
          alert("Password Update Failed - " + response.message)
          toggleCscreen(false)
        }
        setOldPW("")
        setConfirmPW("")
        setNewPW("")
      }
    }
  }
  function openCScreen() {
    if (currSelected == "UN") { 
      if(newUsername == "" || password == "" ){
        alert("Username and Password Are Required")
        return
      }
      toggleCscreen(true)
    }
    else{
      if(oldPassword == "" || newPassword == "" || confirmPassword == ""){
        alert("All Password Fields Are Required")
        return
      }
      if( confirmPassword != newPassword){
        alert("Passwords Do Not Match")
        return
      }
      toggleCscreen(true)
    }
  }
  return (
    <div className={visible ? 'cursor-pointer absolute top-0 left-0 w-full h-full z-50 bg-slate-700 bg-opacity-50 backdrop-blur flex flex-col justify-center items-center': 'hidden'}>
      <div ref={centerDiv} className='p-8 relative bg-slate-800 flex flex-col justify-center items-center cursor-default rounded-lg'>
        <div className='flex flex-row text-2xl rounded'>
          <button onClick={() => setSelected("UN")} className={`py-1 px-4 ${currSelected == "UN" ? 'bg-indigo-500 bg-opacity-50' : ' bg-slate-600 hover:bg-opacity-50'} border-r-2 border-slate-500 rounded-l`}>
            Username
          </button>
          <button onClick={() => setSelected("PW")} className={`py-1 px-4 ${currSelected == "PW" ? 'bg-indigo-500 bg-opacity-50' : ' bg-slate-600 hover:bg-opacity-50'}`}>
            Password
          </button>
        </div>
        <div>
          {
            currSelected == "UN" ? 
            <div className="flex flex-col mt-8 items-center">
              <span className="text-xl py-1 w-full text-center px-8 rounded-md bg-slate-700 bg-opacity-70">Current Username: <span className="text-emerald-300">{username}</span></span>
              <div className="flex flex-row items-center mt-8">
                <span className="text-xl mr-4 w-[200px] text-end">New Username:</span>
                <input value={newUsername} onChange={(e) => setNUN(e.target.value)} type="text" placeholder="Enter Username Here" className="py-1 px-2 bg-slate-700 bg-opacity-60 rounded-md outline-none"/>
              </div>
              <div className="flex flex-row items-center mt-8">
                <span className="text-xl mr-4 w-[200px] text-end">Password:</span>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter Password Here" className="py-1 px-2 bg-slate-700 bg-opacity-60 rounded-md outline-none"/>
              </div>
              <button onClick={openCScreen} className="mt-10 px-4 py-1 bg-indigo-600 w-max hover:bg-opacity-70">Submit</button>
            </div>
            :
            <div className="flex items-center flex-col">
              <div className="flex flex-row items-center mt-10">
                <span className="w-[240px] text-end text-xl mr-4 ">Old Password:</span>
                <input value={oldPassword} onChange={(e) => {setOldPW(e.target.value)}} type="password" placeholder="Old Password Here"  className="bg-slate-700 bg-opacity-60 px-2 py-1 rounded-md outline-none"/>
              </div>
              <div className="flex flex-row items-center mt-6">
                <span className="w-[240px] text-end text-xl mr-4 ">New Password:</span>
                <input value={newPassword} onChange={(e) => {setNewPW(e.target.value)}} type="password" placeholder="New Password Here"  className="bg-slate-700 bg-opacity-60 px-2 py-1 rounded-md outline-none"/>
              </div>
              <div className="flex flex-row items-center mt-6">
                <span className="w-[240px] text-end text-xl mr-4 ">Retype Password:</span>
                <input value={confirmPassword} onChange={(e) => {setConfirmPW(e.target.value)}} type="password" placeholder="Retype Password Here"  className="bg-slate-700 bg-opacity-60 px-2 py-1 rounded-md outline-none"/>
              </div>
              <button onClick={openCScreen} className="mt-10 px-4 py-1 bg-indigo-600 w-max hover:bg-opacity-70">Submit</button>
            </div>
          }
        </div>
        <div className={`w-[700px] ml-[-100px] h-full top-0 left-0 rounded-lg px-4 absolute bg-slate-700 flex flex-col items-center justify-center ${cscreenVis ? '' : 'hidden'}`}>
          <span className="text-2xl">Confirm Your Action Below</span>
          <div className="flex flex-row items-center mt-6">
            <span className="text-xl">Changes:</span>
            <span className="ml-6 bg-amber-500 py-1 px-2 rounded-lg text-lg">{currSelected == "UN" ? "Username" : "Password"}</span>
            <span className="ml-4 bg-violet-500 py-1 px-2 rounded-lg items-center text-lg"> {"->"} </span>
            <span className="ml-4 bg-emerald-500 py-1 px-2 rounded-lg text-lg">{currSelected == "UN" ? newUsername : "****"}</span>
          </div>
          <button onClick={finalSubmit} className="mt-6 bg-indigo-600 px-4 py-1 rounded-md hover:bg-opacity-80">Submit</button>
          <button onClick={() => toggleCscreen(false)}><img src={crossSvg.src} className="bg-red-500 absolute top-4 right-4 rounded-lg w-[50px] p-2 hover:bg-opacity-80"/></button>
        </div>
      </div>
    </div>
  )
}

export default LoginChange