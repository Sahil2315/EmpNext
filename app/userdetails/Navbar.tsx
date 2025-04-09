import { Dispatch, SetStateAction } from "react"
import chatLogo from "../images/chatLogo.svg"
import projectTrack from "../images/projTrack.svg"
import editLogo from "../images/editLogo.svg"
import searchIcon from "../images/searchIcon.svg"
import leavesLogo from "../images/leavesLogo.svg"
const Navbar = ({resetCurr, currOpened}: {resetCurr: Dispatch<SetStateAction<number>>, currOpened: number}) => {
  return (
    <div className="flex flex-row">
    {/* navHeader */}
        <button  onClick={() => {resetCurr(0)}} className={`flex border-b border-violet-400 flex-row items-center mr-4 text-md rounded px-2 py-1 ${currOpened == 0 ? 'bg-violet-400/20' : 'hover:bg-violet-400/15'}`}><img className="w-[30px] mr-1" src={chatLogo.src}/>Chat</button>
        <button  onClick={() => {resetCurr(1)}} className={`flex border-b border-violet-400 flex-row items-center mr-4 text-md rounded px-2 py-1 ${currOpened == 1 ? 'bg-violet-400/20' : 'hover:bg-violet-400/15'}`}><img className="w-[30px] mr-1" src={projectTrack.src}/>Project</button>
        <button  onClick={() => {resetCurr(2)}} className={`flex border-b border-violet-400 flex-row items-center mr-4 text-md rounded px-2 py-1 ${currOpened == 2 ? 'bg-violet-400/20' : 'hover:bg-violet-400/15'}`}><img className="w-[30px] mr-1" src={editLogo.src}/>Edit Profile</button>
        <button  onClick={() => {resetCurr(3)}} className={`flex border-b border-violet-400 flex-row items-center mr-4 text-md rounded px-2 py-1 ${currOpened == 3 ? 'bg-violet-400/20' : 'hover:bg-violet-400/15'}`}><img className="w-[25px] mr-1" src={leavesLogo.src}/>Leaves</button>
        <button  onClick={() => {resetCurr(4)}} className={`flex border-b border-violet-400 flex-row items-center mr-4 text-md rounded px-2 py-1 ${currOpened == 4 ? 'bg-violet-400/20' : 'hover:bg-violet-400/15'}`}><img className="w-[30px] mr-1" src={searchIcon.src}/>Search</button>
    </div>
  )
}

export default Navbar