import dynamic from "next/dynamic";
import ListaDoctori from "../../../components/dashboard-master/lista-doctori";
import { handleQueryFirestore } from "@/utils/firestoreUtils";

export const metadata = {
  title: "Portal || Portal",
  description: "Portal",
};

const index = async () => {
  const doctori = await handleQueryFirestore("Users", "userType", "Doctor");
  return (
    <>
      <ListaDoctori doctori={doctori} />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
