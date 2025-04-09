import { useContext, useEffect, useState } from "react"
import { empContext, empState } from "./userProvider"
import { projectTS, moduleTS } from "../types"
const Project = () => {
  const {user} = useContext(empContext) as empState
  const [project, setProject] = useState<projectTS>()
  const [modules, setModules] = useState<moduleTS[]>([])
  const [statP, resetStat] = useState<number>(0)
  useEffect(() => {
    async function get(){
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'team': user.team
        })
      })
      const data = await response.json()
      if (data.success) {
        setProject(data.project)
        setModules(data.modules)
      }
    }
    get()
  }, [user])
  useEffect(() => {
    resetStat(project?.statpercentage as number)
  }, [project])
  const statBarStyle = {
    width: `${statP}%`,
    backgroundColor: '#FFB300',
    height: '5px',
    borderRadius: '3px',
  }
  return (
    <div className={`mt-4 p-2 w-full h-full bg-opacity-20 rounded-lg bg-indigo-600`}>
        <div className="flex flex flex-col bg-black/50 h-full w-full relative rounded-lg">
          <div className="flex flex-row my-4 w-full text-xl">
            <span className="text-2xl ml-4 rounded-[3px] pb-2 border-b">{project?.name}</span>
          </div>
          <div className="absolute right-6 top-4">
            <span className="ml-16 py-1 px-4 rounded-xl bg-slate-700/60 text-rose-500">Deadline - {project?.deadline.slice(0, 10)}</span>
            <span className="ml-16 text-emerald-400 py-1 px-4 rounded-xl bg-slate-700/60">{project?.status}</span>
          </div>
          {/* Completion Bar */}
          <div className="w-full flex mt-6 flex-col items-center opacity-80">
            <span className="text-slate-400/65">{statP}%</span>
            <div className="w-[600px] mt-2 h-[5px] bg-gray-700 rounded-full">
              <div style={statBarStyle}></div>
            </div>
          </div>
          {/* Modules */}
          <div className="mx-16 bg-indigo-400/5 mt-8 rounded-lg p-6 overflow-auto mb-8">
            <span className="text-2xl">Modules of the Project:</span>
            {
              modules.map((module, index) => {
                const barStyle = {
                  width: `${module.statval}%`,
                  backgroundColor: '#449993',
                  height: '4px',
                  borderRadius: '3px',
                }
                return (
                  <div key={index} className="flex flex-row items-center text-xl mt-6 py-4 px-6 bg-slate-400/10 rounded-lg">
                    <span className="mr-4 w-[200px]">{module.mname}</span>
                    <span className="w-[150px]">{module.mstat}</span>
                    <div className="w-[400px] ml-24 bg-indigo-700/50 h-[4px]">
                      <div style={barStyle}></div>
                    </div>
                  </div>
                )
              })
            }
          </div>
          
        </div>
    </div>
  )
}

export default Project