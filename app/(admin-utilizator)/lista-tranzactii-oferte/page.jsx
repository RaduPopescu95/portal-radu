"use client";

import dynamic from "next/dynamic";
import MySavedSearch from "@/components/dashboard-utilizator/lista-tranzactii";
import {
  handleGetSubcollections,
  handleQueryFirestoreSubcollection,
} from "@/utils/firestoreUtils";
import { useAuth } from "@/context/AuthContext";

// export const metadata = {
//   title: "Lista oferte || Porta",
//   description: "Porta",
// };

const index = async () => {
  const { userData } = useAuth();
  let oferteInregistrate = [];
  if (userData?.user_uid) {
    oferteInregistrate = await handleQueryFirestoreSubcollection(
      "OferteÎnregistrate",
      "idUtilizator",
      userData?.user_uid
    );
  }
  console.log("test here oferteInregistrate...", oferteInregistrate);
  return (
    <>
      <MySavedSearch oferteInregistrate={oferteInregistrate} />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
