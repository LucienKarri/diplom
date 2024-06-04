import { Button, Flex, Input, Modal, Space } from "antd";
import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FormField } from "../FormField";
import { ISignInFormData } from "../UserAuth/ui";
import { apiService } from "../../apiService";
import { useUser } from "../../hooks";

interface IRequestModal {
  open: boolean;
  handleClose: () => void;
}

export const RequestModal: FC<IRequestModal> = ({ open, handleClose }) => {
  const {
    user: { userInfo },
  } = useUser();

  const { handleSubmit, control, reset } = useForm<ISignInFormData>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (value: ISignInFormData) => {
    try {
      setLoading(true);

      const nameParts = value.fullName.replace(/ {2,}/g, " ").trim().split(" ");

      const body = {
        firstName: nameParts[1],
        lastName: nameParts[0],
        middleName: nameParts[2],
        companyName: value.companyName,
        phoneNumber: value.phoneNumber,
        email: value.email,
        password: value.password,
      };

      await apiService.post("/application", body);

      reset();
      handleClose();
    } catch (error) {
      console.error("fetch error >", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userInfo) {
      reset({
        companyName: userInfo.companyName,
        email: userInfo.email,
        fullName: [
          userInfo.lastName,
          userInfo.firstName,
          userInfo.middleName,
        ].join(" "),
        phoneNumber: userInfo.phoneNumber,
        password: "312321321",
      });
    } else {
      reset();
    }
  }, [reset, userInfo]);

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      title={"Оставить заявку"}
      footer={null}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex vertical gap={24}>
          <Flex gap={16}>
            <Controller
              name="companyName"
              control={control}
              render={({ field }) => {
                return (
                  <FormField label="Название компании" required>
                    <Input {...field} style={{ width: "100%" }} />
                  </FormField>
                );
              }}
            />
          </Flex>
          <Flex gap={16}>
            <Controller
              name="fullName"
              control={control}
              render={({ field }) => {
                return (
                  <FormField label="ФИО" required>
                    <Input {...field} style={{ width: "100%" }} />
                  </FormField>
                );
              }}
            />
          </Flex>
          <Flex gap={16}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => {
                return (
                  <FormField label="email" required>
                    <Input {...field} style={{ width: "100%" }} />
                  </FormField>
                );
              }}
            />
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => {
                return (
                  <FormField label="Телефон" required>
                    <Input {...field} style={{ width: "100%" }} />
                  </FormField>
                );
              }}
            />
          </Flex>
          <Flex gap={16}>
            <Controller
              name="password"
              control={control}
              render={({ field }) => {
                return (
                  <FormField label="Пароль" required>
                    <Input.Password {...field} style={{ width: "100%" }} />
                  </FormField>
                );
              }}
            />
          </Flex>
          <Flex justify="end">
            <Space>
              <Button onClick={handleClose}>Отмена</Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                Отправить
              </Button>
            </Space>
          </Flex>
        </Flex>
      </form>
    </Modal>
  );
};
