import dynamic from "next/dynamic";
import HomeMain from "@/components/home-4";

export const metadata = {
  title: 'Home || Portal',
  description:
    'Portal',
}

const index = () => {
  return (
    <>
      <HomeMain />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
