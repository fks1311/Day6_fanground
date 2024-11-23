import { DefaultFrame } from "components/global/DefaultFrame";
import { motion } from "framer-motion";
import styled from "styled-components";

export const MV = () => {
  return (
    <DefaultFrame>
      <Layout>
        <Title>영상 타이틀</Title>
      </Layout>
    </DefaultFrame>
  );
};

const Layout = styled.div`
  background-color: yellow;
`;

const Title = styled.div``;
