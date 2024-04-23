import dynamic from "next/dynamic";
import ListaParteneri from "../../../components/dashboard-master/lista-parteneri";
import { handleQueryFirestore } from "@/utils/firestoreUtils";

export const metadata = {
  title: "Portal || Portal",
  description: "Portal",
};

const index = async () => {
  const parteneri = await handleQueryFirestore("Users", "userType", "Partener");
  return (
    <>
      <ListaParteneri parteneri={parteneri} />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
