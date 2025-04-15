import { useEffect, useState } from "react"
import { employeeTS } from "../types"
import ladyPhoto from "../images/lady.jpg"
import manPhoto from "../images/man.jpg"

const Search = () => {
  const [empList, setEmplist] = useState<employeeTS[]>([])
  const [searchVal, setSearchVal] = useState<string>("")

  useEffect(() => {
    if(searchVal == ""){
      setEmplist([])
      return
    }
    async function performSrch(){
      const request = await fetch( '/api/searchEmp', {
        'method': 'POST', 
        'headers': {
          'Content-Type': 'application/json'
        },
        'body': JSON.stringify({
          searchVal: searchVal
        })
      })
      const response = await request.json()
      if(response.success){
        setEmplist(response.list)
      }
    }
    performSrch()
  }, [searchVal])
  
  return (
    <div className={`mt-4 w-full h-full rounded-lg bg-indigo-600/20 flex flex-col items-center`}>
        <div className="mt-4">
          <input onChange={(e) => {setSearchVal(e.target.value)}} type="text" className="w-[500px] text-xl px-3 py-1 outline-none rounded-md bg-black/30" placeholder="Enter the Name or Employee ID"/>
        </div>
        <div className="w-[80%] h-[85%] rounded-md overflow-y-scroll bg-black/40 pb-4 mt-4">
          {
            empList.length || searchVal == "" ? 
            empList.map((item: employeeTS, index: number) => {
              return(
                <div className="flex flex-row mt-8 mx-6" key={index}>
                  <img className="w-[150px] rounded-2xl " src={item?.gender == "Male" ? manPhoto.src : ladyPhoto.src }/>
                  <div className="ml-16 flex flex-row items-center">
                    <div className="flex flex-col w-[200px]">
                      <span className="text-xl w-max px-4 py-2 rounded bg-slate-600/5050">{item.empid}</span>
                      <span className="text-lg mt-4">{item.name}</span>
                    </div>
                    <div className="flex flex-col ml-8 w-[230px]">
                      <span className="text-xl">{item.phone}</span>
                      <span className="text-md mt-4">{item.email}</span>
                    </div>
                    <div className="flex flex-col ml-8 ">
                      <span>{ item.team == 0 ? "No Team" : `Team: ${item.team}`}</span>  
                      <span>{ item.title }</span>
                    </div>                  
                  </div>
                </div>
              )
            }) : 
            <div className="h-full w-full flex justify-center text-3xl items-center">
              <span>No People Found</span>
            </div>
          }
        </div>
    </div>
  )
}

export default Search