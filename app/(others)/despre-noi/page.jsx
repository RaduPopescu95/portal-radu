import dynamic from "next/dynamic";
import AboutUs from "@/components/about-us";

export const metadata = {
  title: "Despre ExclusivMD - Portalul de Oferte Exclusive pentru Doctori",
  description:
    "Află cum ExclusivMD conectează doctorii cu ofertele speciale ale partenerilor economici. Misiunea noastră este să oferim avantaje unice pentru profesioniștii din domeniul medical.",
};

const index = () => {
  return (
    <>
      <AboutUs />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
