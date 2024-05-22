import { FC, PropsWithChildren } from "react";
import styled from "styled-components";

const ContentWrapper = styled.div`
  flex: 1;

  padding: 24px;

  background: white;
  border-radius: ${({ theme }) => theme.borderRadiusLG}px;
`;

export const Paper: FC<PropsWithChildren> = ({ children }) => {
  return <ContentWrapper>{children}</ContentWrapper>;
};
