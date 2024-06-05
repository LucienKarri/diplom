import { Divider, Flex, Typography, theme } from "antd";

export const Conditions = () => {
  const { token } = theme.useToken();
  return (
    <Flex vertical style={{ padding: "24px", background: "white" }}>
      <Typography.Title>Условия лизинга</Typography.Title>
      <Divider
        orientation="right"
        orientationMargin="75%"
        style={{
          borderBlockStartWidth: 8,
          borderBlockStartColor: token.colorPrimary,
        }}
      >
        {" "}
      </Divider>
      <Flex justify="space-between">
        <Flex align="center">
          <Typography.Title style={{ fontSize: 68, margin: 0 }}>
            0
          </Typography.Title>
          <Flex vertical>
            <Typography.Title style={{ margin: 0 }}>%</Typography.Title>
            <Typography.Text>Минимальный первоначальный взнос</Typography.Text>
          </Flex>
        </Flex>
        <Divider
          type="vertical"
          style={{
            height: "4.9em",
            borderInlineStartWidth: 2,
            borderInlineStartColor: token.colorPrimary,
          }}
        />
        <Flex align="center">
          <Typography.Title style={{ fontSize: 68, margin: 0 }}>
            9
          </Typography.Title>
          <Flex vertical>
            <Typography.Title style={{ margin: 0 }}>тыс.₽</Typography.Title>
            <Typography.Text>Минимальный ежемесячный платеж</Typography.Text>
          </Flex>
        </Flex>
        <Divider
          type="vertical"
          style={{
            height: "4.9em",
            borderInlineStartWidth: 2,
            borderInlineStartColor: token.colorPrimary,
          }}
        />
        <Flex align="center">
          <Typography.Title style={{ fontSize: 68, margin: 0 }}>
            7
          </Typography.Title>
          <Flex vertical>
            <Typography.Title style={{ margin: 0 }}>лет</Typography.Title>
            <Typography.Text>Максимальный срок договора</Typography.Text>
          </Flex>
        </Flex>
        <Divider
          type="vertical"
          style={{
            height: "4.9em",
            borderInlineStartWidth: 2,
            borderInlineStartColor: token.colorPrimary,
          }}
        />
        <Flex align="center">
          <Typography.Title style={{ fontSize: 68, margin: 0 }}>
            1
          </Typography.Title>
          <Flex vertical>
            <Typography.Title style={{ margin: 0 }}>тыс.₽</Typography.Title>
            <Typography.Text>Минимальный выкупной платеж</Typography.Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
