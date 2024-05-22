import { GlobalToken } from "antd";
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme extends GlobalToken {}
}
