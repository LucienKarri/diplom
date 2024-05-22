import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useCallback, useEffect, useState } from "react";
import { AxiosResponse } from "axios";

interface IEntityTable<T> {
  columns: ColumnsType;
  fetchData?: () => Promise<AxiosResponse>;
  mockData?: T[];
}

export const EntityTable = <T,>({
  columns,
  fetchData,
  mockData,
}: IEntityTable<T>) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const getData = useCallback(async () => {
    if (fetchData) {
      try {
        setLoading(true);
        const response = await fetchData();

        setData(response.data);
      } catch (error) {
        console.error("get table data error >", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    }
  }, [fetchData]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Table
      columns={columns}
      dataSource={data.length ? data : mockData}
      loading={loading}
      pagination={false}
      scroll={{ x: "max-content" }}
      size="small"
    />
  );
};
