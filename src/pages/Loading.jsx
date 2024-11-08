import { DefaultPage } from "components/global/DefaultPage";
import { InitDay6 } from "components/loading/InitDay6";
import { AnimateMember } from "components/loading/AnimateMember";
import { useEffect, useState } from "react";

export const Loading = () => {
  const [initDay6, setInitDay6] = useState(true);
  const [animateMember, setAnimateMember] = useState(false);
  const [exitDay6, setExitDay6] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setInitDay6(false);
    }, 2000);

    !initDay6 &&
      setTimeout(() => {
        setAnimateMember(true);
      }, 2000);
  });

  return (
    <DefaultPage>
      <InitDay6 initDay6={initDay6} setInitDay6={setInitDay6} />
      <AnimateMember
        animateMember={animateMember}
        setAnimateMember={setAnimateMember}
      />
    </DefaultPage>
  );
};
