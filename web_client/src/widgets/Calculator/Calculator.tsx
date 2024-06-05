import { FC, useCallback, useEffect, useState } from "react";
import { SliderRow } from "./components";
import { Card, Divider, Flex, Typography } from "antd";
import { mathRound } from "../../shared/utils";
import styled from "styled-components";

const StyledCard = styled(Card)`
  & > .ant-card-body {
    height: 100%;
  }
`;
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
    prepaidExpense: (700000 * 17) / 100,
    prepaidExpensePer: 17,
    range: 46,
    redemptionPayment: 125000,
  });

  const [result, setResult] = useState<{ amount: number; monthly: number }>({
    amount: 0,
    monthly: 0,
  });

  const getResult = useCallback(() => {
    const months = values.range;
    const vehiclePrice = values.cost;
    const depreciationDeductions = 0.1;
    const loanRate = 0.2;
    const comission = 0.12;

    let res = 0;
    let currentMonths = months;
    let currentPriceS = vehiclePrice;
    let currentPriceE = vehiclePrice;

    for (let i = 0; i < Math.ceil(months / 12); i++) {
      const yearCof = currentMonths >= 12 ? 1 : currentMonths / 12;
      const ao = vehiclePrice * depreciationDeductions * yearCof;
      currentPriceE = currentPriceS - ao;
      const kr =
        (((100 - (values.prepaidExpense * 100) / vehiclePrice) / 100) *
          (currentPriceS + currentPriceE)) /
        2;
      const pk = kr * loanRate * yearCof;
      const kv = kr * comission * yearCof;
      const v = ao + pk + kv;
      const lp = v + v * 0.18;
      res = res + lp;
      currentMonths = currentMonths - 12;
      currentPriceS = currentPriceE;
    }
    setResult({ amount: Math.floor(res), monthly: Math.floor(res / months) });
  }, [values.cost, values.prepaidExpense, values.range]);

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
      getResult();
    },
    [getResult]
  );

  useEffect(() => {
    getResult();
  }, [getResult]);

  return (
    <Flex gap={16} style={{ padding: "0 24px" }} id="calculator">
      <Flex vertical gap={16} style={{ padding: "24px" }} flex={1}>
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
            return `${(values.cost * value) / 100} ₽ / ${value}%`.replace(
              /\B(?=(\d{3})+(?!\d))/g,
              " "
            );
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
      <StyledCard style={{ width: "50%" }}>
        <Flex vertical justify="space-between" style={{ minHeight: "100%" }}>
          <Flex justify="space-between">
            <Flex vertical style={{ width: "100%" }}>
              <Typography.Text style={{ fontSize: 24 }}>
                Ежемесячный платеж
              </Typography.Text>
              <Typography.Title style={{ margin: "24px 0" }}>
                {`${result.monthly} ₽`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
              </Typography.Title>
            </Flex>
            <Flex vertical style={{ width: "100%", textAlign: "right" }}>
              <Typography.Text style={{ fontSize: 24 }}>
                Сумма договода лизинга
              </Typography.Text>
              <Typography.Title style={{ margin: "24px 0" }}>
                {`${result.amount} ₽`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
              </Typography.Title>
            </Flex>
          </Flex>
          <Divider style={{ borderBlockStartWidth: "2px" }} />
          <Flex justify="space-between">
            <Flex vertical style={{ width: "100%" }}>
              <Typography.Text style={{ fontSize: 24 }}>
                Возврат НДС
              </Typography.Text>
              <Typography.Title style={{ margin: "24px 0" }}>
                {`${Math.floor(result.amount * 0.18)} ₽`.replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  " "
                )}
              </Typography.Title>
            </Flex>
            <Flex vertical style={{ width: "100%", textAlign: "right" }}>
              <Typography.Text style={{ fontSize: 24 }}>
                Снижение налога на прибыль
              </Typography.Text>
              <Typography.Title style={{ margin: "24px 0" }}>
                {`${Math.floor(result.amount * 0.18)} ₽`.replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  " "
                )}
              </Typography.Title>
            </Flex>
          </Flex>
        </Flex>
      </StyledCard>
    </Flex>
  );
};
