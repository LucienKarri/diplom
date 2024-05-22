import { Divider } from "antd";
import { CarouselBlock } from "../../widgets/CarouselBlock";
import { NewsBlock } from "../../widgets/NewsBlock";
import { HotDrops } from "../../widgets/HotDrops";
import { Calculator } from "../../widgets/Calculator";

export const IntroPage = () => {
  return (
    <div>
      <CarouselBlock />
      <Divider style={{ borderBlockStartWidth: "2px" }} />
      <HotDrops />
      <Divider style={{ borderBlockStartWidth: "2px" }} />
      <Calculator />
      <Divider style={{ borderBlockStartWidth: "2px" }} />
      <NewsBlock />
    </div>
  );
};
