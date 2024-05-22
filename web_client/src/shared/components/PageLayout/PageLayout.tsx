import { Layout } from "antd";
import { FC, PropsWithChildren } from "react";
import styled from "styled-components";

const StyledLayout = styled(Layout)`
  padding: 24px;
  width: calc(100% - 256px);
`;

export const PageLayout: FC<PropsWithChildren> = ({ children }) => {
  return <StyledLayout>{children}</StyledLayout>;
};
