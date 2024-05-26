import { Col, Form, Input, InputNumber, Row, Select as AntdSelect } from "antd";
import { apiService } from "../../shared/apiService";
import { FormSelect } from "../../shared/components";

export const VehicleFormContent = () => {
  const form = Form.useFormInstance();

  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <FormSelect
            rules={[{ required: true, message: "Необходимо заполнить поле" }]}
            label={"Бренд"}
            name={"brand"}
            fetchData={() => {
              return apiService.get("/dictionaries/brands");
            }}
          />
        </Col>
        <Col span={12}>
          <FormSelect
            rField="brand"
            rSub
            label={"Модель"}
            name={"model"}
            rules={[{ required: true, message: "Необходимо заполнить поле" }]}
            fetchData={() => {
              return apiService.get("/dictionaries/models", {
                params: { id: form.getFieldValue("brand") },
              });
            }}
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={"Год выпуска"}
            name={"year"}
            rules={[{ required: true, message: "Необходимо заполнить поле" }]}
          >
            <InputNumber controls={false} style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={"Грузоподъемность, кг."}
            name={"liftingCapacity"}
            rules={[{ required: true, message: "Необходимо заполнить поле" }]}
          >
            <InputNumber controls={false} style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={"Длина, мм."}
            name={"length"}
            rules={[{ required: true, message: "Необходимо заполнить поле" }]}
          >
            <InputNumber controls={false} style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={"Высота, мм."}
            name={"height"}
            rules={[{ required: true, message: "Необходимо заполнить поле" }]}
          >
            <InputNumber controls={false} style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={"Ширина, мм."}
            name={"width"}
            rules={[{ required: true, message: "Необходимо заполнить поле" }]}
          >
            <InputNumber controls={false} style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={"Объем кузова, л."}
            name={"capacity"}
            rules={[{ required: true, message: "Необходимо заполнить поле" }]}
          >
            <InputNumber controls={false} style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={"Мощность двигателя, л.с."}
            name={"enginePower"}
            rules={[{ required: true, message: "Необходимо заполнить поле" }]}
          >
            <InputNumber controls={false} style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={"Крутящий момент, кг/Н"}
            name={"torque"}
            rules={[{ required: true, message: "Необходимо заполнить поле" }]}
          >
            <InputNumber controls={false} style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={"Тип топлива"}
            name={"fuelType"}
            rules={[{ required: true, message: "Необходимо заполнить поле" }]}
          >
            <AntdSelect
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
            rules={[{ required: true, message: "Необходимо заполнить поле" }]}
          >
            <AntdSelect
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
            rules={[{ required: true, message: "Необходимо заполнить поле" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};
