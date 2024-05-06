import dynamic from "next/dynamic";
import Plangeri from "@/components/plangeri";

export const metadata = {
  title: "Plangeri || Portal",
  description: "Portal",
};

const index = () => {
  return (
    <>
      <Plangeri />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
