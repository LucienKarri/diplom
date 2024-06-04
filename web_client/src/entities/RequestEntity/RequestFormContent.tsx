import {
  Button,
  Divider,
  Flex,
  Input,
  InputNumber,
  Space,
  Typography,
  Upload,
  UploadFile,
} from "antd";
import { FC, useCallback, useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { BASE_URL, apiService } from "../../shared/apiService";
import { IRequestEntityResponse } from "./types";
import { IUserInfo } from "../../shared/providers/UserProvider/UserProvider";
import { FormField, FormSelect } from "../../shared/components";
import { IVehicleEntity } from "../VehicleEntity/types";
import { DefaultOptionType } from "antd/es/select";
import { FilePdfOutlined } from "@ant-design/icons";

interface IRequestFormContent {
  handleClose: () => void;
  requestId?: number;
}

export const RequestFormContent: FC<IRequestFormContent> = ({
  handleClose,
  requestId,
}) => {
  const methods = useForm<IRequestEntityResponse>();
  const { handleSubmit, control, getValues, watch, setValue, reset } = methods;
  const [data, setData] = useState<IRequestEntityResponse | undefined>();
  const [file, setFile] = useState<string | undefined>();
  const [body, setBody] = useState<{ createBy: IUserInfo }>();
  const [vehicle, setVehicle] = useState<IVehicleEntity>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const vehicleId = watch("vehicle");
  const advancePayment = watch("advancePayment");
  const creditTerm = watch("creditTerm");

  const onSubmit = async (values: IRequestEntityResponse) => {
    try {
      const body = {
        ...values,
        id: data?.id,
        createBy:
          typeof data?.createBy === "object"
            ? data?.createBy.id
            : data?.createBy,
        vehicle:
          typeof values.vehicle === "object"
            ? values.vehicle?.id
            : values.vehicle,
        status:
          typeof values.status === "object" ? values.status?.id : values.status,
        attachment: file,
      } as IRequestEntityResponse;
      await apiService.patch("/application", body);

      handleClose();
    } catch (error) {
      console.error("JOPA:", error);
    }
  };

  const fetchRequesEntity = useCallback(async () => {
    try {
      const { data } = await apiService.get<IRequestEntityResponse[]>(
        "/application",
        {
          params: { id: requestId },
        }
      );
      setData(data[0]);

      setFileList(
        typeof data[0].attachment === "object" && data[0].attachment
          ? [
              {
                name: data[0]?.attachment?.fileName,
                uid: data[0]?.attachment?.id,
                status: "done",
                url: `${BASE_URL}/download/${data[0]?.attachment?.id}`,
              },
            ]
          : []
      );
      reset({
        ...data[0],
        status: data[0].status.id,
        vehicle: data[0]?.vehicle?.id || undefined,
      });
    } catch (error) {
      console.error("fetch error >", error);
    }
  }, [requestId, reset]);

  useEffect(() => {
    if (requestId) {
      setBody(undefined);
      setData(undefined);
      setFile(undefined);
      setVehicle(undefined);
      setFileList([]);
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
      companyAdress: values.companyAdress,
    };
    apiService.post("/upload/pdf", currentBody).then((res) => {
      setFileList([
        {
          name: res.data.fileName,
          uid: res.data.id,
          url: `${BASE_URL}/download/${res.data.id}`,
          status: "done",
        },
      ]);
      setValue("attachment", res.data.id);
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
            <Flex gap={16}>
              <Controller
                name={"status"}
                control={control}
                render={({ field }) => {
                  return (
                    <FormField label="Статус">
                      <FormSelect
                        {...field}
                        fetchData={() => {
                          return apiService.get("/dictionaries/statuses");
                        }}
                        defaultOption={
                          {
                            label: data?.status.name,
                            value: data?.status.id,
                          } as DefaultOptionType
                        }
                      />
                    </FormField>
                  );
                }}
              />
              <Controller
                name={"companyAdress"}
                control={control}
                render={({ field }) => {
                  return (
                    <FormField label="Адрес компании" required>
                      <Input {...field} />
                    </FormField>
                  );
                }}
              />
            </Flex>
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
                        defaultOption={
                          {
                            ...data?.vehicle,
                            label: data?.vehicle?.id || undefined,
                            value: data?.vehicle?.id || undefined,
                          } as DefaultOptionType
                        }
                        optionRender={(option) => {
                          return (
                            <div>
                              <Typography.Text>
                                {[
                                  option?.brandEntity?.name,
                                  option?.modelEntity?.name,
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
                                  option?.brandEntity?.name,
                                  option?.modelEntity?.name,
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
            <Divider orientation="left" style={{ margin: 0 }}>
              Договор
            </Divider>
            {!!fileList.length && (
              <Flex gap={16}>
                <FormField>
                  <Upload
                    showUploadList={{ showRemoveIcon: false }}
                    fileList={fileList}
                    iconRender={() => <FilePdfOutlined />}
                  ></Upload>
                </FormField>
              </Flex>
            )}
            <Flex gap={16}>
              <FormField>
                <Button onClick={() => createPdf()}>
                  Сформировать договор
                </Button>
              </FormField>
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
