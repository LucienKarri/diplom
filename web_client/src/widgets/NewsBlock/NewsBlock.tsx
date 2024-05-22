import { useEffect, useState } from "react";
import { BASE_URL, apiService } from "../../shared/apiService";
import { Avatar, Card, Flex, List } from "antd";

const { Meta } = Card;

export const NewsBlock = () => {
  const [news, setNews] = useState<
    {
      title: string;
      paragraph: string[];
      attachmentId: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const getNews = async () => {
    try {
      setLoading(true);
      const response = await apiService.get<
        {
          title: string;
          paragraph: string[];
          attachmentId: string;
        }[]
      >("/posts");

      setNews(response.data);
    } catch (error) {
      console.error("fetch news > ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <div>
      <Flex gap={16} style={{ padding: "0 16px" }}>
        <Card
          hoverable
          style={{ width: "50%", padding: "12px 0" }}
          cover={<img src={`${BASE_URL}/download/${news[0]?.attachmentId}`} />}
        >
          <Meta title={news[0]?.title} description={news[0]?.paragraph[0]} />
        </Card>
        {/* <Flex vertical> */}
        <List
          style={{ width: "50%" }}
          itemLayout="vertical"
          dataSource={news.reduce(
            (acc, item, i) => {
              if (i === 0) return acc;
              acc.push(item);
              return acc;
            },
            [] as {
              title: string;
              paragraph: string[];
              attachmentId: string;
            }[]
          )}
          renderItem={(item, i) => (
            <List.Item
              key={i}
              extra={
                <img
                  width={272}
                  alt="logo"
                  src={`${BASE_URL}/download/${news[0]?.attachmentId}`}
                />
              }
            >
              <List.Item.Meta avatar={<Avatar />} title={<a>{item.title}</a>} />
              {item.paragraph[0]}
            </List.Item>
          )}
        />
        {/* </Flex> */}
      </Flex>
    </div>
  );
};
