import { useCallback, useEffect, useState } from "react";
import { IVehicle } from "../../entities/VehicleEntity/types";
import { apiService } from "../../shared/apiService";
import { Button, Col, Flex, InputNumber, Row, Space, theme } from "antd";
import { VehicleCard } from "../../shared/components/VehicleCard";
import { FormField, FormSelect } from "../../shared/components";
import { Controller, FormProvider, useForm } from "react-hook-form";

export const CardsViewer = () => {
  const { token } = theme.useToken();

  const methods = useForm();
  const { handleSubmit, control, reset } = methods;
  const [data, setData] = useState<IVehicle[]>([]);
  const [query, setQuery] = useState();

  const formStyle: React.CSSProperties = {
    maxWidth: "none",
    background: token.colorBgBase,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await apiService.get<IVehicle[]>("/api/vehicle", {
        params: query,
      });
      setData(response.data);
      console.log("data", response.data);
    } catch (error) {
      console.error("fetch data >", error);
    }
  }, [query]);

  const onSubmit = (values: any) => {
    console.log("Received values of form: ", values);
    setQuery(values);
    // fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div style={{ padding: 24 }} id="catalog">
      <Flex gap={24} vertical>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} style={{ ...formStyle }}>
            <Flex gap={24} vertical>
              <Flex gap={16}>
                <Controller
                  name="brandId"
                  control={control}
                  render={({ field }) => {
                    return (
                      <FormField label="Бренд">
                        <FormSelect
                          {...field}
                          fetchData={() => {
                            return apiService.get("/dictionaries/brands");
                          }}
                        />
                      </FormField>
                    );
                  }}
                />
                <Controller
                  name="fuel"
                  control={control}
                  render={({ field }) => {
                    return (
                      <FormField label="Топливо" required>
                        <FormSelect
                          {...field}
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
                          fetchData={() => {
                            return apiService.get(
                              "/dictionaries/transmissions"
                            );
                          }}
                        />
                      </FormField>
                    );
                  }}
                />
              </Flex>
              <Flex gap={16}>
                <Controller
                  name="minPrice"
                  control={control}
                  render={({ field }) => {
                    return (
                      <FormField label="Цена, от">
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
                  name="maxPrice"
                  control={control}
                  render={({ field }) => {
                    return (
                      <FormField label="Цена, до">
                        <InputNumber
                          {...field}
                          controls={false}
                          style={{ width: "100%" }}
                        />
                      </FormField>
                    );
                  }}
                />
                <FormField> </FormField>
              </Flex>
              <div style={{ textAlign: "right" }}>
                <Space size="small">
                  <Button type="primary" htmlType="submit">
                    Найти
                  </Button>
                  <Button
                    onClick={() => {
                      setQuery(undefined);
                      reset();
                    }}
                  >
                    Очистить
                  </Button>
                </Space>
              </div>
            </Flex>
          </form>
        </FormProvider>
        <Flex gap={24} wrap>
          {data &&
            data.map((vehicle) => (
              <Flex style={{ width: "calc((100% - 72px)/4)" }} justify="center">
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              </Flex>
            ))}
        </Flex>
      </Flex>
    </div>
  );
};
