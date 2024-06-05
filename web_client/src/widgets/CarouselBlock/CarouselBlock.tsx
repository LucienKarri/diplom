import { Carousel, Typography } from "antd";

export const CarouselBlock = () => {
  return (
    <div>
      <Carousel autoplay autoplaySpeed={5000}>
        <div>
          <div
            style={{
              display: "inline-block",
              width: "100%",
              height: 512,
              backgroundImage: "url(./src/assets/1.jpeg)",
              backgroundPositionY: "50%",
            }}
          >
            <div
              style={{
                height: "100%",
                width: "50%",
                backgroundColor: "lightblue",
                clipPath: "polygon(0% 0%, 100% 0%,75% 100%, 0% 100%)",
                padding: 48,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  justifyContent: "center",
                  width: "75%",
                }}
              >
                <Typography.Title>Цифровой автолизинг</Typography.Title>
                <Typography.Title level={3}>
                  Регистрируйтесь и получайте
                </Typography.Title>
                <ul>
                  <li>
                    <Typography.Text>Точные расчеты за минуту</Typography.Text>
                  </li>
                  <li>
                    <Typography.Text>
                      Мгновеные решения по лизингу
                    </Typography.Text>
                  </li>
                  <li>
                    <Typography.Text>
                      Доступ к персональным предложениям
                    </Typography.Text>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            style={{
              display: "inline-block",
              width: "100%",
              height: 512,
              backgroundImage: "url(./src/assets/3.jpg)",
              backgroundPositionY: "50%",
            }}
          >
            <div
              style={{
                height: "100%",
                width: "50%",
                backgroundColor: "lightblue",
                clipPath: "polygon(0% 0%, 100% 0%,75% 100%, 0% 100%)",
                padding: 48,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  justifyContent: "center",
                  width: "75%",
                }}
              >
                <Typography.Title>
                  Двойная выгода на технику в наличии
                </Typography.Title>
                <Typography.Title level={3}>
                  Приобретайте тягачи и самосвалы в лизинг на уникальных
                  условиях
                </Typography.Title>
                <ul>
                  <li>
                    <Typography.Text>
                      До 1,5 млн. рублей - скидки на технику
                    </Typography.Text>
                  </li>
                  <li>
                    <Typography.Text>
                      От 2х до 3х млн. рублей - выгода по сниженным ежемесячным
                      платежам
                    </Typography.Text>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            style={{
              display: "inline-block",
              width: "100%",
              height: 512,
              backgroundImage: "url(./src/assets/2.jpg)",
              backgroundPositionY: "50%",
            }}
          >
            <div
              style={{
                height: "100%",
                width: "50%",
                backgroundColor: "lightblue",
                clipPath: "polygon(0% 0%, 100% 0%,75% 100%, 0% 100%)",
                padding: 48,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  justifyContent: "center",
                  width: "75%",
                }}
              >
                <Typography.Title>
                  Техника в лизинг с сезонным графиком платежей
                </Typography.Title>
                <Typography.Title level={3}>
                  {
                    "Настраивайте свои размеры платежей в течение года, как удобно вам"
                  }
                </Typography.Title>
              </div>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
};
