import dynamic from "next/dynamic";
import MySavedSearch from "@/components/dashboard-master/lista-tranzactii";

export const metadata = {
  title: 'Lista oferte || Porta',
  description:
    'Porta',
}

const index = () => {
  return (
    <>
      <MySavedSearch />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
