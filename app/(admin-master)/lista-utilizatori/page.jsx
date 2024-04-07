import dynamic from "next/dynamic";
import MyProperties from "@/components/dashboard-master/my-properties";

export const metadata = {
  title: 'Portal || Portal',
  description:
    'Portal',
}

const index = () => {
  return (
    <>
      <MyProperties />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
