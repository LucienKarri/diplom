import { Card, Flex } from "antd";
import { useEffect, useState } from "react";
import { apiService } from "../../shared/apiService";

const { Meta } = Card;

export const HotDrops = () => {
  const [vehicle, setVehicle] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const getVehicle = async () => {
    try {
      setLoading(true);
      const response = await apiService.get<any[]>("/api/vehicle");

      setVehicle(response.data);
    } catch (error) {
      console.error("fetch news > ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getVehicle();
  }, []);

  return (
    <Flex gap={16} style={{ padding: "0 16px" }}>
      <Card
        hoverable
        style={{ width: 240, flex: "1" }}
        cover={
          <img
            alt="example"
            src="https://www.fenadismerencarretera.com/wp-content/uploads/2022/09/actrosf-plus-iaa.jpg.webp"
          />
        }
      >
        <Meta
          title={
            <Flex justify="space-between">
              <div>{vehicle[0]?.brandEntity.name}</div>
              <div>{vehicle[0]?.modelEntity.name}</div>
            </Flex>
          }
          description={
            <Flex justify="space-between">
              <div>{`Год выпуска:${vehicle[0]?.year}`}</div>
              <div>{`Грузоподъемность:${vehicle[0]?.liftingCapacity}`}</div>
            </Flex>
          }
        />
      </Card>
      <Card
        hoverable
        style={{ width: 240, flex: "1" }}
        cover={
          <img
            alt="example"
            src="https://www.cvdriver.com/wp-content/uploads/2019/10/MAN-TGS.jpg"
          />
        }
      >
        <Meta
          title={
            <Flex justify="space-between">
              <div>{vehicle[1]?.brandEntity.name}</div>
              <div>{vehicle[1]?.modelEntity.name}</div>
            </Flex>
          }
          description={
            <Flex justify="space-between">
              <div>{`Год выпуска:${vehicle[1]?.year}`}</div>
              <div>{`Грузоподъемность:${vehicle[1]?.liftingCapacity}`}</div>
            </Flex>
          }
        />
      </Card>
      <Card
        hoverable
        style={{ width: 240, flex: "1" }}
        cover={
          <img
            alt="example"
            src="https://grupoconcesur.es/wp-content/uploads/2023/12/IMG-20231229-WA0031.jpg?t=1716355543"
          />
        }
      >
        <Meta
          title={
            <Flex justify="space-between">
              <div>{vehicle[2]?.brandEntity.name}</div>
              <div>{vehicle[2]?.modelEntity.name}</div>
            </Flex>
          }
          description={
            <Flex justify="space-between">
              <div>{`Год выпуска:${vehicle[2]?.year}`}</div>
              <div>{`Грузоподъемность:${vehicle[2]?.liftingCapacity}`}</div>
            </Flex>
          }
        />
      </Card>
    </Flex>
  );
};
