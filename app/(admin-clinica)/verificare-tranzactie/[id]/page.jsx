import dynamic from "next/dynamic";
import {
  handleQueryFirestore,
  handleQueryFirestoreSubcollection,
} from "@/utils/firestoreUtils";
import Tranzactie from "@/components/dashboard/verifica-tranzactie/Tranzactie";

export const metadata = {
  title: "Verifica tranzactie || ExclusivMD",
  description: "ExclusivMD",
};

const index = async ({ params }) => {
  const { id } = params;
  const parts = id.split("-");
  const userId = parseFloat(parts[0]);
  const cod = parts[1];
  const codParts = cod.split("UIDD");
  const offerId = codParts[0];
  const partenerId = codParts[1];

  const utilizatorData = await handleQueryFirestore("Users", "id", userId);
  const ofertaData = await handleQueryFirestoreSubcollection(
    "Oferte",
    "documentId",
    offerId
  );
  return (
    <>
      <Tranzactie
        partenerId={partenerId}
        utilizator={utilizatorData[0]}
        oferta={ofertaData[0]}
      />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
