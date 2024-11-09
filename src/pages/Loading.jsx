import { LoadingFrame } from "components/global/LoadingFrame";
import { InitDay6 } from "components/loading/InitDay6";
import { AnimateMember } from "components/loading/AnimateMember";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Loading = () => {
  const [initDay6, setInitDay6] = useState(true);
  const [animateMember, setAnimateMember] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setInitDay6(false);
    }, 2000);

    !initDay6 &&
      setTimeout(() => {
        setAnimateMember(true);
      }, 2000);

    setTimeout(() => {
      navigate("/day6");
    }, 8000);
  });

  return (
    <LoadingFrame>
      <InitDay6 initDay6={initDay6} setInitDay6={setInitDay6} />
      <AnimateMember
        animateMember={animateMember}
        setAnimateMember={setAnimateMember}
      />
    </LoadingFrame>
  );
};
