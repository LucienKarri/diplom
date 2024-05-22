import {
  Button,
  Col,
  Flex,
  Form,
  FormInstance,
  FormProps,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
} from "antd";
import { FC, useEffect, useState } from "react";
import { apiService } from "../../../../shared/apiService";
import { DeleteOutlined } from "@ant-design/icons";

export interface IVehicleFormData {
  id?: number;
  brand: string;
  model: string;
  year: number;
  liftingCapacity: number;
  length: number;
  height: number;
  width: number;
  capacity: number;
  enginePower: number;
  torque: number;
  fuelType: string;
  transmission: string;
  description: string;
}

interface IVehicleFormProps {
  initialValues?: IVehicleFormData;
  mode: "create" | "edit";
  onFormInstanceReady: (instance: FormInstance<IVehicleFormData>) => void;
  fetchDataOnSuccess: () => void;
  onClose: () => void;
}

export const VehicleForm: FC<IVehicleFormProps> = ({
  initialValues,
  mode,
  fetchDataOnSuccess,
  onClose,
  onFormInstanceReady,
}) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    onFormInstanceReady(form);
  }, []);

  useEffect(() => {
    form.resetFields();
  }, [initialValues]);

  const handleSubmit: FormProps<IVehicleFormData>["onFinish"] = async (
    value: IVehicleFormData
  ) => {
    try {
      setLoading(true);

      if (mode === "create") {
        await apiService.post("/api/vehicle", value);
      }
      if (mode === "edit") {
        await apiService.put("/api/vehicle", {
          ...value,
          id: initialValues?.id,
        });
      }

      onClose();
      fetchDataOnSuccess();
    } catch (error) {
      console.error("create/edit vehicle > ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);

      await apiService.delete("/api/vehicle", {
        params: { id: initialValues?.id },
      });

      onClose();
      fetchDataOnSuccess();
    } catch (error) {
      console.error("delete vehicle > ", error);
    } finally {
      setLoading(false);
    }
  };

  const [selectOpt, setSelectOpt] = useState([]);
  const getBrands = async () => {
    try {
      setLoading(true);
      setSelectOpt([]);

      const response = await apiService.get("/dictionaries/brands");

      setSelectOpt(
        response.data.map((item) => ({
          label: item.name,
          value: item.id,
        }))
      );
    } catch (error) {
      console.log("e6lan", error);
    } finally {
      setLoading(false);
    }
  };
  const getModels = async () => {
    try {
      setLoading(true);
      setSelectOpt([]);
      const r = form.getFieldValue("brand");
      const response = await apiService.get("/dictionaries/models", {
        params: { id: r },
      });

      setSelectOpt(
        response.data.map((item) => ({
          label: item.name,
          value: item.id,
        }))
      );
    } catch (error) {
      console.log("e6lan", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      initialValues={initialValues}
      onFinish={handleSubmit}
      layout="vertical"
      style={{ height: "100%" }}
    >
      <Flex vertical style={{ height: "100%" }} justify="space-between">
        <div>
          {/* <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={"Бренд"}
                name={"brand"}
                rules={[
                  { required: true, message: "Необходимо заполнить поле" },
                ]}
              >
                <Select
                  options={selectOpt}
                  onFocus={() => getBrands()}
                  loading={loading}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={"Модель"}
                name={"model"}
                rules={[
                  { required: true, message: "Необходимо заполнить поле" },
                ]}
              >
                <Select
                  options={selectOpt}
                  onFocus={() => getModels()}
                  loading={loading}
                />
              </Form.Item>
            </Col>
          </Row> */}
          {/* <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={"Год выпуска"}
                name={"year"}
                rules={[
                  { required: true, message: "Необходимо заполнить поле" },
                ]}
              >
                <InputNumber controls={false} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={"Грузоподъемность, кг."}
                name={"liftingCapacity"}
                rules={[
                  { required: true, message: "Необходимо заполнить поле" },
                ]}
              >
                <InputNumber controls={false} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row> */}
          {/* <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={"Длина, мм."}
                name={"length"}
                rules={[
                  { required: true, message: "Необходимо заполнить поле" },
                ]}
              >
                <InputNumber controls={false} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={"Высота, мм."}
                name={"height"}
                rules={[
                  { required: true, message: "Необходимо заполнить поле" },
                ]}
              >
                <InputNumber controls={false} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row> */}
          {/* <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={"Ширина, мм."}
                name={"width"}
                rules={[
                  { required: true, message: "Необходимо заполнить поле" },
                ]}
              >
                <InputNumber controls={false} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={"Объем кузова, л."}
                name={"capacity"}
                rules={[
                  { required: true, message: "Необходимо заполнить поле" },
                ]}
              >
                <InputNumber controls={false} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row> */}
          {/* <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={"Мощность двигателя, л.с."}
                name={"enginePower"}
                rules={[
                  { required: true, message: "Необходимо заполнить поле" },
                ]}
              >
                <InputNumber controls={false} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={"Крутящий момент, кг/Н"}
                name={"torque"}
                rules={[
                  { required: true, message: "Необходимо заполнить поле" },
                ]}
              >
                <InputNumber controls={false} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row> */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={"Тип топлива"}
                name={"fuelType"}
                rules={[
                  { required: true, message: "Необходимо заполнить поле" },
                ]}
              >
                <Select
                  options={[
                    {
                      value: "gasoline",
                      label: "Бензин",
                    },
                    {
                      value: "diesel",
                      label: "Дизельное топливо",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={"Тип трансмиссии"}
                name={"transmission"}
                rules={[
                  { required: true, message: "Необходимо заполнить поле" },
                ]}
              >
                <Select
                  options={[
                    {
                      value: "mt",
                      label: "МКПП",
                    },
                    {
                      value: "amt",
                      label: "РКПП",
                    },
                    {
                      value: "at",
                      label: "АКПП",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label={"Описание"}
                name={"description"}
                rules={[
                  { required: true, message: "Необходимо заполнить поле" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </div>
        <Flex justify="space-between">
          <Space>
            <Button onClick={onClose}>Отмена</Button>
            <Button type="primary" loading={loading} htmlType="submit">
              {mode === "create" ? "Добавить" : "Сохранить"}
            </Button>
          </Space>
          {mode === "edit" && (
            <Button onClick={handleDelete} icon={<DeleteOutlined />} danger />
          )}
        </Flex>
      </Flex>
    </Form>
  );
};
