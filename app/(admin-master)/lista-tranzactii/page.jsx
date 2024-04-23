import dynamic from "next/dynamic";
import MySavedSearch from "@/components/dashboard-master/lista-tranzactii";
import { handleGetSubcollections } from "@/utils/firestoreUtils";

export const metadata = {
  title: "Lista oferte || Porta",
  description: "Porta",
};

const index = async () => {
  let oferteInregistrate = await handleGetSubcollections("OferteÎnregistrate");
  return (
    <>
      <MySavedSearch oferteInregistrate={oferteInregistrate} />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
