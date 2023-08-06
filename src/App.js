// import SimpleGame from "./components/SimpleGame";

import { lazy, Suspense, useState } from "react";

import Settings from "./icons/Settings";
import Rules from "./icons/Rules";
import Loading from "./icons/Loading";
import ActualGame from "./components/ActualGame";
import RestartGame from "./components/RestartGame";
import IconAsButton from "./common/IconsAsButton";
import { getModelContent, getModelTitle } from "./helpers";

const ModalPopUp = lazy(() => import("./common/Modal"));

export default function App() {
  const [modelOpenEnum, setModelOpenEnum] = useState(null);
  return (
    <div>
      <div className="header">
        <div className="header-title">{`Play a DICE`}</div>
        <div className="header-icons">
          <IconAsButton
            handler={() => {
              setModelOpenEnum("RULES");
            }}
          >
            <Rules />
          </IconAsButton>
          <IconAsButton
            handler={() => {
              setModelOpenEnum("SETTINGS");
            }}
          >
            <Settings />
          </IconAsButton>

          <RestartGame />
        </div>
      </div>
      {/* <SimpleGame /> */}
      {/* Without timer and modified way of input */}

      <ActualGame />
      {/* Code according to requirement */}

      <div>
        <Suspense fallback={<Loading />}>
          <ModalPopUp
            modalIsOpen={modelOpenEnum}
            closeModal={() => {
              setModelOpenEnum(null);
            }}
            title={getModelTitle(modelOpenEnum)}
            content={getModelContent(modelOpenEnum)}
          />
        </Suspense>
      </div>
    </div>
  );
}
// https://github.com/avaneeshtripathi/react-dice-roll
// https://codesandbox.io/s/dazzling-curie-s4tj7
