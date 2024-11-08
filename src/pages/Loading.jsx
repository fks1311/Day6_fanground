import { DefaultPage } from "components/global/DefaultPage";
import { AnimateDay6 } from "components/loading/AnimateDay6";
import { AnimateMember } from "components/loading/AnimateMember";
import { useState } from "react";

export const Loading = () => {
  const [animateDay6, setanimateDay6] = useState(true);

  return (
    <DefaultPage>
      <AnimateDay6 animateDay6={animateDay6} setanimateDay6={setanimateDay6} />
      <AnimateMember />
    </DefaultPage>
  );
};
