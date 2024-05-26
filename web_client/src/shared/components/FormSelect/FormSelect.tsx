import { Select as AntdSelect, Form } from "antd";
import { Rule } from "antd/es/form";
import { DefaultOptionType } from "antd/es/select";
import { AxiosResponse } from "axios";
import { FC, useEffect, useState } from "react";

interface ISelect {
  fetchData: () => Promise<AxiosResponse>;
  name: string;
  label: string;
  rules?: Rule[];
  rField?: string;
  rSub?: boolean;
}

export const FormSelect: FC<ISelect> = ({
  fetchData,
  name,
  label,
  rules,
  rField,
  rSub,
}) => {
  const [opts, setOpts] = useState<DefaultOptionType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const form = Form.useFormInstance();
  const rValue = Form.useWatch(rField, form);

  const fetchOptions = async () => {
    try {
      setLoading(true);
      setOpts([]);

      const response = await fetchData();

      setOpts(
        response.data.map(
          (item: { name: string; id: string | number }) =>
            ({
              label: item.name,
              value: item.id,
            } as DefaultOptionType)
        )
      );
    } catch (error) {
      setOpts([]);
      console.error("jopa");
    } finally {
      setLoading(false);
    }
  };

  const handleFetchOnOpen = (value: boolean) => {
    if (value) {
      fetchOptions();
    }
  };

  useEffect(() => {
    if (rField && rSub) {
      setOpts([]);
      form.setFieldValue(name, undefined);
    }
  }, [form, name, rField, rSub, rValue]);

  return (
    <Form.Item label={label} name={name} rules={rules}>
      <AntdSelect
        options={opts}
        loading={loading}
        onDropdownVisibleChange={handleFetchOnOpen}
      />
    </Form.Item>
  );
};
