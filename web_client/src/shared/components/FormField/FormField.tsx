import { Flex, Typography } from "antd";
import { FC, PropsWithChildren } from "react";
import { Asterisk } from "./Asterisk";

interface IFormField extends PropsWithChildren {
  label?: string;
  error?: string | undefined;
  required?: boolean;
}
export const FormField: FC<IFormField> = ({
  children,
  label,
  error,
  required,
}) => {
  return (
    <Flex vertical style={{ width: "100%" }}>
      {label && (
        <Typography.Text style={{ paddingBottom: 8 }}>
          {label}
          {required && <Asterisk />}
        </Typography.Text>
      )}
      {children}
      {error && <Typography.Text type="danger">{error}</Typography.Text>}
    </Flex>
  );
};
