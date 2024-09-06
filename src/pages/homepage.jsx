import { BtcPriceWidget } from "../components/btcPriceWidget";

export const Homepage = () => {
  return (
    <main className=" bg-primaryBlack p-[3vw] pt-20 md:pt-[5vw] h-screen">
      <BtcPriceWidget />
    </main>
  );
};
