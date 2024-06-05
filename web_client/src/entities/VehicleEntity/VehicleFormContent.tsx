import {
  Button,
  Flex,
  Input,
  InputNumber,
  Space,
  Upload,
  UploadFile,
  message,
} from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { FormField, FormSelect } from "../../shared/components";
import { BASE_URL, apiService } from "../../shared/apiService";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { IVehicle } from "./types";
import { FC, useCallback, useEffect, useState } from "react";

const defaultValues: IVehicle = {
  brand: undefined,
  capacity: undefined,
  description: undefined,
  enginePower: undefined,
  fuel: undefined,
  height: undefined,
  id: undefined,
  length: undefined,
  liftingCapacity: undefined,
  model: undefined,
  torque: undefined,
  transmission: undefined,
  width: undefined,
  year: undefined,
};

interface IVehicleFormContent {
  handleClose: () => void;
  mode: "create" | "edit";
  vehicleId?: number;
}

export const VehicleFormContent: FC<IVehicleFormContent> = ({
  handleClose,
  mode,
  vehicleId,
}) => {
  const { handleSubmit, control, watch, setValue, reset } = useFormContext();

  const [data, setData] = useState<IVehicle>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const brandValue = watch("brand");

  const onClose = () => {
    handleClose();
  };

  const onSubmit = async (data: IVehicle) => {
    try {
      if (mode === "create") {
        await apiService.post("/api/vehicle", data);
      } else {
        await apiService.put("/api/vehicle", data);
      }

      onClose();
    } catch (error) {
      console.error("create/update vehicle error:", error);
    }
  };

  const fetchCar = useCallback(async () => {
    if (vehicleId) {
      const res = await apiService.get<IVehicle[]>("/api/vehicle", {
        params: { id: vehicleId },
      });

      const data = res.data[0];

      const formValues: IVehicle = {
        id: data.id,
        attachment:
          typeof data.attachment === "object" && data.attachment
            ? data.attachment?.id
            : undefined,
        brand: typeof data.brand === "object" ? data.brand.id : data.brand,
        capacity: data.capacity,
        description: data.description,
        enginePower: data.enginePower,
        fuel: typeof data.fuel === "object" ? data.fuel.id : data.fuel,
        height: data.height,
        length: data.length,
        liftingCapacity: data.liftingCapacity,
        torque: data.torque,
        width: data.width,
        year: data.year,
        model: typeof data.model === "object" ? data.model.id : data.model,
        transmission:
          typeof data.transmission === "object"
            ? data.transmission.id
            : data.transmission,
        price: data.price,
      };
      setFileList(
        typeof data.attachment === "object" && data.attachment
          ? [
              {
                name: data?.attachment?.fileName,
                uid: data?.attachment?.id,
                status: "done",
                url: `${BASE_URL}/download/${data?.attachment?.id}`,
              },
            ]
          : []
      );
      setData(data);
      reset(formValues);
    }
  }, [reset, vehicleId]);

  useEffect(() => {
    if (mode === "create") {
      setData({});
      setFileList([]);
      reset(defaultValues);
    } else {
      reset(defaultValues);
      fetchCar();
    }
  }, [fetchCar, mode, reset]);

  return (
    // <FormProvider {...methods}>
    <form onSubmit={handleSubmit(onSubmit)} style={{ height: "100%" }}>
      <Flex vertical style={{ height: "100%" }} justify="space-between">
        <Flex vertical gap={24}>
          <Flex gap={16}>
            <Controller
              name="brand"
              control={control}
              render={({ field }) => {
                return (
                  <FormField label="Бренд" required>
                    <FormSelect
                      {...field}
                      subField={"model"}
                      defaultOption={{
                        label:
                          typeof data?.brand === "object"
                            ? data?.brand.name
                            : "jopa",
                        value:
                          typeof data?.brand === "object"
                            ? data?.brand.id
                            : data?.brand,
                      }}
                      fetchData={() => {
                        return apiService.get("/dictionaries/brands");
                      }}
                    />
                  </FormField>
                );
              }}
            />
            <Controller
              name="model"
              control={control}
              render={({ field }) => {
                return (
                  <FormField label="Модель" required>
                    <FormSelect
                      {...field}
                      defaultOption={{
                        label:
                          typeof data?.model === "object"
                            ? data?.model.name
                            : "jopa",
                        value:
                          typeof data?.model === "object"
                            ? data?.model.id
                            : data?.model,
                      }}
                      fetchData={() => {
                        return apiService.get("/dictionaries/models", {
                          params: { id: brandValue },
                        });
                      }}
                    />
                  </FormField>
                );
              }}
            />
          </Flex>
          <Flex gap={16}>
            <Controller
              name="year"
              control={control}
              render={({ field }) => {
                return (
                  <FormField label="Год выпуска" required>
                    <InputNumber
                      {...field}
                      controls={false}
                      style={{ width: "100%" }}
                    />
                  </FormField>
                );
              }}
            />
            <Controller
              name="height"
              control={control}
              render={({ field }) => {
                return (
                  <FormField label="Высота" required>
                    <InputNumber
                      {...field}
                      controls={false}
                      style={{ width: "100%" }}
                    />
                  </FormField>
                );
              }}
            />
          </Flex>
          <Flex gap={16}>
            <Controller
              name="length"
              control={control}
              render={({ field }) => {
                return (
                  <FormField label="Длина" required>
                    <InputNumber
                      {...field}
                      controls={false}
                      style={{ width: "100%" }}
                    />
                  </FormField>
                );
              }}
            />
            <Controller
              name="width"
              control={control}
              render={({ field }) => {
                return (
                  <FormField label="Ширина" required>
                    <InputNumber
                      {...field}
                      controls={false}
                      style={{ width: "100%" }}
                    />
                  </FormField>
                );
              }}
            />
          </Flex>
          <Flex gap={16}>
            <Controller
              name="liftingCapacity"
              control={control}
              render={({ field }) => {
                return (
                  <FormField label="Грузоподъемность" required>
                    <InputNumber
                      {...field}
                      controls={false}
                      style={{ width: "100%" }}
                    />
                  </FormField>
                );
              }}
            />
            <Controller
              name="capacity"
              control={control}
              render={({ field }) => {
                return (
                  <FormField label="Объем кузова" required>
                    <InputNumber
                      {...field}
                      controls={false}
                      style={{ width: "100%" }}
                    />
                  </FormField>
                );
              }}
            />
          </Flex>
          <Flex gap={16}>
            <Controller
              name="enginePower"
              control={control}
              render={({ field }) => {
                return (
                  <FormField label="Мощность двигателя" required>
                    <InputNumber
                      {...field}
                      controls={false}
                      style={{ width: "100%" }}
                    />
                  </FormField>
                );
              }}
            />
            <Controller
              name="torque"
              control={control}
              render={({ field }) => {
                return (
                  <FormField label="Крутящий момент" required>
                    <InputNumber
                      {...field}
                      controls={false}
                      style={{ width: "100%" }}
                    />
                  </FormField>
                );
              }}
            />
          </Flex>
          <Flex gap={16}>
            <Controller
              name="fuel"
              control={control}
              render={({ field }) => {
                return (
                  <FormField label="Топливо" required>
                    <FormSelect
                      {...field}
                      defaultOption={{
                        label:
                          typeof data?.fuel === "object"
                            ? data?.fuel.name
                            : "jopa",
                        value:
                          typeof data?.fuel === "object"
                            ? data?.fuel.id
                            : data?.fuel,
                      }}
                      fetchData={() => {
                        return apiService.get("/dictionaries/fuel");
                      }}
                    />
                  </FormField>
                );
              }}
            />
            <Controller
              name="transmission"
              control={control}
              render={({ field }) => {
                return (
                  <FormField label="Трансмиссия" required>
                    <FormSelect
                      {...field}
                      defaultOption={{
                        label:
                          typeof data?.transmission === "object"
                            ? data?.transmission.name
                            : "jopa",
                        value:
                          typeof data?.transmission === "object"
                            ? data?.transmission.id
                            : data?.transmission,
                      }}
                      fetchData={() => {
                        return apiService.get("/dictionaries/transmissions");
                      }}
                    />
                  </FormField>
                );
              }}
            />
          </Flex>
          <Flex gap={16}>
            <Controller
              name="price"
              control={control}
              render={({ field }) => {
                return (
                  <FormField label="Стоимость" required>
                    <InputNumber
                      {...field}
                      controls={false}
                      style={{ width: "100%" }}
                    />
                  </FormField>
                );
              }}
            />
          </Flex>
          <Flex gap={16}>
            <Controller
              name="description"
              control={control}
              render={({ field }) => {
                return (
                  <FormField label="Описание">
                    <Input.TextArea {...field} allowClear />
                  </FormField>
                );
              }}
            />
          </Flex>
          <Flex gap={16}>
            <FormField>
              <Upload
                onRemove={() => {
                  setFileList([]);
                }}
                beforeUpload={(file) => {
                  const isPNG =
                    file.type === "image/png" || file.type === "image/jpeg";
                  if (!isPNG) {
                    message.error(`${file.name} is not a png file`);
                  }
                  return isPNG || Upload.LIST_IGNORE;
                }}
                listType="picture"
                fileList={fileList}
                customRequest={({ file, onSuccess }) => {
                  const formData = new FormData();
                  formData.append("file", file);

                  apiService
                    .post("/upload", formData, {
                      headers: { "Content-Type": "multipart/form-data" },
                    })
                    .then((res) => {
                      onSuccess(res);
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
                }}
              >
                <Button icon={<UploadOutlined />} disabled={!!fileList.length}>
                  Загрузить изображение
                </Button>
              </Upload>
            </FormField>
          </Flex>
        </Flex>
        <Flex justify="space-between">
          <Space>
            <Button onClick={onClose}>Отмена</Button>
            <Button type="primary" htmlType="submit">
              {mode === "create" ? "Создать" : "Сохранить"}
            </Button>
          </Space>
          <Button
            onClick={() =>
              apiService.delete("/api/vehicle", { params: { id: data?.id } })
            }
            icon={<DeleteOutlined />}
            danger
          />
        </Flex>
      </Flex>
    </form>
    // </FormProvider>
  );
};
