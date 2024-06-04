import { Button, Divider, Flex, InputNumber, Space, Typography } from "antd";
import { FC, useCallback, useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { apiService } from "../../shared/apiService";
import { IRequestEntityResponse } from "./types";
import { IUserInfo } from "../../shared/providers/UserProvider/UserProvider";
import { FormField, FormSelect } from "../../shared/components";
import { IVehicleEntity } from "../VehicleEntity/types";

interface IRequestFormContent {
  handleClose: () => void;
  requestId?: number;
}

export const RequestFormContent: FC<IRequestFormContent> = ({
  handleClose,
  requestId,
}) => {
  const methods = useForm();
  const { handleSubmit, control, getValues, watch, setValue } = methods;
  const [data, setData] = useState<IRequestEntityResponse | undefined>();
  const [file, setFile] = useState<string | undefined>();
  const [body, setBody] = useState<{ createBy: IUserInfo }>();
  const [vehicle, setVehicle] = useState<IVehicleEntity>();

  const vehicleId = watch("vehicle");
  const advancePayment = watch("advancePayment");
  const creditTerm = watch("creditTerm");

  const onSubmit = (values) => {
    console.log("submit", values);
  };

  const fetchRequesEntity = useCallback(async () => {
    try {
      const response = await apiService.get<IRequestEntityResponse[]>(
        "/application",
        {
          params: { id: requestId },
        }
      );
      console.log("data", response.data);
      setData(response.data[0]);
    } catch (error) {
      console.error("fetch error >", error);
    }
  }, [requestId]);

  useEffect(() => {
    if (requestId) {
      fetchRequesEntity();
    }
  }, [fetchRequesEntity, requestId]);

  useEffect(() => {
    if (data) {
      setBody({ createBy: data.createBy });
    }
  }, [data]);

  const createPdf = () => {
    console.log(body);
    const values = getValues();
    const currentBody = {
      ...body,
      vehicle: values.vehicle,
      amountOfCredit: values.amountOfCredit,
      creditTerm: values.creditTerm,
      paymentDay: values.paymentDay,
      monthlyPayment: values.monthlyPayment,
      advancePayment: values.advancePayment,
    };
    apiService.post("/upload/pdf", currentBody).then((res) => {
      setFile(res.data.id);
    });
  };

  useEffect(() => {
    const a = async (id) => {
      const res = await apiService.get("/api/vehicle", {
        params: { id },
      });
      setVehicle(res.data[0]);
    };

    if (vehicleId) {
      a(vehicleId);
    }
  }, [vehicleId]);

  const updateCreditInfo = useCallback(() => {
    if (vehicle) {
      const months = creditTerm;
      const vehiclePrice = vehicle.price || 0;
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
          (((100 - (advancePayment * 100) / vehiclePrice) / 100) *
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

      setValue("amountOfCredit", Math.floor(res) || undefined);
      setValue("monthlyPayment", Math.floor(res / months) || undefined);
    }
  }, [advancePayment, creditTerm, setValue, vehicle]);

  useEffect(() => {
    updateCreditInfo();
  }, [updateCreditInfo]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ height: "100%" }}>
        <Flex vertical style={{ height: "100%" }} justify="space-between">
          <Flex vertical gap={24}>
            <Divider orientation="left" style={{ margin: 0 }}>
              Общаяя информация
            </Divider>
            <Divider orientation="left" style={{ margin: 0 }}>
              Предмет договора
            </Divider>
            <Flex gap={16}>
              <Controller
                name="vehicle"
                control={control}
                render={({ field }) => {
                  return (
                    <FormField label="Транспортное средство" required>
                      <FormSelect
                        {...field}
                        fetchData={() => {
                          return apiService.get("/api/vehicle");
                        }}
                        optionRender={(option) => {
                          return (
                            <div>
                              <Typography.Text>
                                {[
                                  option.brandEntity.name,
                                  option.modelEntity.name,
                                ].join(" ")}
                              </Typography.Text>
                            </div>
                          );
                        }}
                        labelRender={(option) => {
                          return (
                            <div>
                              <Typography.Text>
                                {[
                                  option.brandEntity.name,
                                  option.modelEntity.name,
                                ].join(" ")}
                              </Typography.Text>
                            </div>
                          );
                        }}
                      />
                    </FormField>
                  );
                }}
              />
            </Flex>
            <Divider orientation="left" style={{ margin: 0 }}>
              Кредитные условия
            </Divider>
            <Flex gap={16}>
              <Controller
                name={"amountOfCredit"}
                control={control}
                render={({ field }) => {
                  return (
                    <FormField label="Сумма кредита" required>
                      <InputNumber
                        {...field}
                        style={{ width: "100%" }}
                        controls={false}
                        readOnly
                        variant="filled"
                      />
                    </FormField>
                  );
                }}
              />
              <Controller
                name={"monthlyPayment"}
                control={control}
                render={({ field }) => {
                  return (
                    <FormField label="Ежемесячный платеж" required>
                      <InputNumber
                        {...field}
                        style={{ width: "100%" }}
                        controls={false}
                        readOnly
                        variant="filled"
                      />
                    </FormField>
                  );
                }}
              />
            </Flex>
            <Flex gap={16}>
              <Controller
                name={"creditTerm"}
                control={control}
                render={({ field }) => {
                  return (
                    <FormField label="Срок кредита" required>
                      <InputNumber {...field} style={{ width: "100%" }} />
                    </FormField>
                  );
                }}
              />
              <Controller
                name={"advancePayment"}
                control={control}
                render={({ field }) => {
                  return (
                    <FormField label="Аванс" required>
                      <InputNumber {...field} style={{ width: "100%" }} />
                    </FormField>
                  );
                }}
              />
            </Flex>
            <Flex gap={16}>
              <Controller
                name={"paymentDay"}
                control={control}
                render={({ field }) => {
                  return (
                    <FormField label="Дата платежа" required>
                      <InputNumber
                        {...field}
                        style={{ width: "100%" }}
                        controls={false}
                      />
                    </FormField>
                  );
                }}
              />
            </Flex>
            <Flex gap={16}>
              <Button onClick={() => createPdf()}>Создать pdf</Button>
              <Button
                onClick={() =>
                  apiService
                    .get(`/download/${file}`, {
                      responseType: "arraybuffer",
                    })
                    .then((res) => {
                      const url = window.URL.createObjectURL(
                        new Blob([res.data])
                      );
                      const a = document.createElement("a");
                      a.href = url;
                      a.setAttribute("download", "JOPAS.pdf");
                      a.click();
                    })
                }
              >
                Скачать pdf
              </Button>
              {/* <Button type="primary" onClick={a}>
                Рассчитать
              </Button> */}
            </Flex>
          </Flex>
          <Flex justify="space-between">
            <Space>
              <Button onClick={handleClose}>Отмена</Button>
              <Button type="primary" htmlType="submit">
                Сохранить
              </Button>
            </Space>
          </Flex>
        </Flex>
      </form>
    </FormProvider>
  );
};
