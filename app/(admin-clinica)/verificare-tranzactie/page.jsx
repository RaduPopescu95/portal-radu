import dynamic from "next/dynamic";
import CreateListing from "@/components/dashboard/verifica-tranzactie";
import {
  handleQueryFirestore,
  handleQueryFirestoreSubcollection,
} from "@/utils/firestoreUtils";

export const metadata = {
  title: "Creaza discount || nume portal",
  description: "nume portal",
};

const index = async () => {
  const utilizatorData = await handleQueryFirestore("Users", "id", userId);
  const ofertaData = await handleQueryFirestoreSubcollection(
    "Oferte",
    "documentId",
    offerId
  );
  return (
    <>
      <CreateListing />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
