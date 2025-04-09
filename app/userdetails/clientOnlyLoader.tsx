
import Overlay from "./editOverlay";
import LoginChange from "./loginChange";
const ClientOnlyLoader = ({
  field,
  value,
  org,
  ovVisible,
  ovToggle,
  empid,
  currSelected,
  setSelected,
  loginVisible,
  loginToggle,
}: {
  field: string;
  value: string;
  org: boolean;
  ovVisible: boolean;
  ovToggle: (ov: boolean) => void;
  empid: string;
  currSelected: string;
  setSelected: (curr: string) => void;
  loginVisible: boolean;
  loginToggle: (vis: boolean) => void;
}) => {
  const renderComp = () => {
    switch (document) {
      case undefined:
        return <div />;
      default:
        return (
          <div>
            <Overlay
              empid={empid}
              field={field}
              value={value}
              org={org}
              visible={ovVisible}
              toggle={ovToggle}
            />
            <LoginChange
              currSelected={currSelected}
              setSelected={setSelected}
              visible={loginVisible}
              toggle={loginToggle}
            />
          </div>
        );
    }
  };
  return <div>{renderComp()}</div>;
};

export default ClientOnlyLoader;
