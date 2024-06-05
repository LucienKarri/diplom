import { Select as AntdSelect } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { AxiosResponse } from "axios";
import { FC, useState } from "react";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";

const StyledSelect = styled(AntdSelect)`
  &:where(
      .css-dev-only-do-not-override-1okl62o
    ).ant-select-outlined.ant-select-disabled:not(.ant-select-customize-input)
    .ant-select-selector {
    color: inherit;
    background: white;
  }
`;
interface ISelect {
  fetchData: () => Promise<AxiosResponse>;
  status?: boolean;
  defaultOption?: DefaultOptionType;
  subField?: string;
  labelRender?: (option) => React.ReactNode;
  optionRender?: (option) => React.ReactNode;
  disabled?: boolean;
}

export const FormSelect: FC<ISelect> = ({
  fetchData,
  status,
  defaultOption,
  subField,
  labelRender,
  optionRender,
  disabled,
  ...props
}) => {
  const { setValue } = useFormContext();
  const [opts, setOpts] = useState<DefaultOptionType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchOptions = async () => {
    try {
      setLoading(true);
      setOpts([]);

      const response = await fetchData();
      setOpts(
        response.data.map(
          (item) =>
            ({
              ...item,
              label: item.name,
              value: item.id,
            } as DefaultOptionType)
        )
      );
    } catch (error) {
      setOpts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchOnOpen = (value: boolean) => {
    if (value) {
      fetchOptions();
    }
  };

  const options = opts.length ? opts : defaultOption ? [defaultOption] : [];

  return (
    <StyledSelect
      loading={loading}
      onDropdownVisibleChange={handleFetchOnOpen}
      allowClear
      options={options}
      style={{ width: "100%", background: "white" }}
      status={status ? "error" : undefined}
      {...props}
      onChange={(v) => {
        if (subField) {
          setValue(subField, undefined);
        }
        props.onChange(v);
      }}
      value={props.value}
      labelRender={
        labelRender
          ? ({ value }) =>
              labelRender?.(options.find((item) => item.value === value))
          : undefined
      }
      optionRender={
        optionRender
          ? ({ value }) =>
              optionRender?.(options.find((item) => item.value === value))
          : undefined
      }
      disabled={disabled}
    />
  );
};
