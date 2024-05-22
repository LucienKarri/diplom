import { Flex, Slider, Typography } from "antd";
import { FC } from "react";
import { ICalculatorState } from "../../Calculator";
import { StyledInputNumber } from "./SliderRow.styled";

interface ISliderRow {
  name: keyof ICalculatorState;
  title: string;
  textPostfix?: string;
  value: ICalculatorState;
  min: number;
  max: number;
  step: number;
  onChange: ({ name, value }: { name: string; value: number | null }) => void;
  formatter?: (
    value: number | undefined,
    info: { userTyping: boolean; input: string }
  ) => string;
  parser?: (displayValue: string | undefined) => number;
}

const { Text } = Typography;

export const SliderRow: FC<ISliderRow> = ({
  name,
  title,
  textPostfix,
  value,
  min,
  max,
  step,
  onChange,
  formatter,
  parser,
}) => {
  return (
    <Flex vertical>
      <Flex justify={"space-between"} align={"center"}>
        <Text ellipsis strong>
          {title}
        </Text>
        <StyledInputNumber
          value={value[name]}
          onChange={(value) => {
            onChange({ name, value });
          }}
          min={min}
          max={max}
          variant="borderless"
          controls={false}
          formatter={formatter}
          parser={parser}
        />
      </Flex>
      <Slider
        value={value[name]}
        onChange={(value) => onChange({ name, value })}
        min={min}
        max={max}
        step={step}
      />
      <Flex justify={"space-between"}>
        <Text>{`от ${min
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}${textPostfix}`}</Text>
        <Text>{`до ${max
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}${textPostfix}`}</Text>
      </Flex>
    </Flex>
  );
};
