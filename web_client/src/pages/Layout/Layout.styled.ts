import { Layout } from "antd";
import styled from "styled-components";

export const StyledHeader = styled(Layout.Header)`
  position: sticky;

  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  color: white;
`;

export const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

export const StyledFooter = styled(Layout.Footer)``;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
`;
