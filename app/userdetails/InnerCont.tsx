import Project from "./Project"
import EditProfile from "./EditProfile"
import Leaves from "./Leaves"
import Search from "./Search"
import Chat from "./Chat"
const InnerCont = ({currOpened}: {currOpened: number}) => {
    const renderComponent = () => {
        switch (currOpened) {
          case 0:
            return <Chat />;
          case 1:
            return <Project />;
          case 2:
            return <EditProfile />;
          case 3:
            return <Leaves />;
          case 4:
            return <Search />;
          default:
            return <Chat />;
        }
      };
  return (
    <div className="w-full h-full">
        {renderComponent()}
    </div>
  )
}

export default InnerCont