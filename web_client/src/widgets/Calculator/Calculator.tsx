import { FC, useCallback, useState } from "react";
import { SliderRow } from "./components";
import { Card, Divider, Flex, Typography } from "antd";
import { mathRound } from "../../shared/utils";

export interface ICalculatorState {
  cost: number;
  prepaidExpense: number;
  prepaidExpensePer: number;
  range: number;
  redemptionPayment: number;
}

export const Calculator: FC = () => {
  const [values, setValues] = useState<ICalculatorState>({
    cost: 700000,
    prepaidExpense: (700000 * 49) / 100,
    prepaidExpensePer: 49,
    range: 84,
    redemptionPayment: 0,
  });

  const handleChange = useCallback(
    ({ name, value }: { name: string; value: number | null }) => {
      if (value == null) {
        return;
      }

      setValues((prev) => {
        let currentValue = value;
        let currentPrepaidExpense = prev.prepaidExpense;

        if (name === "prepaidExpensePer") {
          currentPrepaidExpense = (prev.cost * currentValue) / 100;
        } else if (name === "cost") {
          currentValue = mathRound(currentValue, 1000);
          currentPrepaidExpense = (currentValue * prev.prepaidExpensePer) / 100;
        } else if (name === "redemptionPayment") {
          currentValue = mathRound(currentValue, 1000);
        }

        return {
          ...prev,
          [name]: currentValue,
          prepaidExpense: currentPrepaidExpense,
        };
      });
    },
    []
  );

  return (
    <Flex gap={8} style={{ padding: "0 16px" }}>
      <Flex vertical gap={8} style={{ padding: "0 16px" }} flex={1}>
        <SliderRow
          name={"cost"}
          title={"Стоимость автомобиля"}
          value={values}
          min={200000}
          max={40000000}
          step={1000}
          onChange={handleChange}
          formatter={(value) =>
            `${value} ₽`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
          }
          parser={(value) => value?.replace(/₽|\s+/g, "") as unknown as number}
          textPostfix={" ₽"}
        />
        <SliderRow
          name={"prepaidExpensePer"}
          title={"Аванс"}
          value={values}
          min={0}
          max={49}
          step={1}
          onChange={handleChange}
          formatter={(value) => {
            return `${value}%`;
          }}
          parser={(value) => Number(value)}
          textPostfix={"%"}
        />
        <SliderRow
          name={"range"}
          title={"Срок лизинга"}
          value={values}
          min={12}
          max={84}
          step={1}
          onChange={handleChange}
          textPostfix={" месяцев"}
          formatter={(value) => {
            return `${value} мес.`;
          }}
          parser={(value) => Number(value)}
        />
        <SliderRow
          name={"redemptionPayment"}
          title={"Выкупной платеж"}
          value={values}
          min={0}
          max={mathRound((values.cost * 30) / 100, 1000)}
          step={1000}
          onChange={handleChange}
          formatter={(value) =>
            `${value} ₽`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
          }
          parser={(value) => value?.replace(/₽|\s+/g, "") as unknown as number}
          textPostfix={" ₽"}
        />
      </Flex>
      <Card style={{ width: "50%" }}>
        <Flex justify="space-between" style={{ padding: "0 64px" }}>
          <Flex vertical>
            <Typography.Text>Срок кредита</Typography.Text>
            <Typography.Title>{values.range}</Typography.Title>
          </Flex>
          <Flex vertical>
            <Typography.Text>Выкупной платеж</Typography.Text>
            <Typography.Title>{values.redemptionPayment}</Typography.Title>
          </Flex>
        </Flex>
        <Divider />
        <Flex justify="space-between" style={{ padding: "0 32px" }}>
          <Flex vertical>
            <Typography.Text>Стоимость ТС</Typography.Text>
            <Typography.Title>{values.cost}</Typography.Title>
          </Flex>
          <Flex vertical>
            <Typography.Text>Аванс</Typography.Text>
            <Typography.Title>{values.prepaidExpense}</Typography.Title>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
};
