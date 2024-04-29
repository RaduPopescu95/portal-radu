"use client";

import dynamic from "next/dynamic";
import MyDashboard from "@/components/dashboard-utilizator/my-dashboard";
import { handleQueryFirestoreSubcollection } from "@/utils/firestoreUtils";
import { useAuth } from "@/context/AuthContext";

// export const metadata = {
//   title: "Dashboard || Dashboard",
//   description: "Dashboard",
// };

const index = async () => {
  const { userData } = useAuth();
  let oferteInregistrate = [];
  // if (userData?.user_uid) {
  //   oferteInregistrate = await handleQueryFirestoreSubcollection(
  //     "OferteÎnregistrate",
  //     "idUtilizator",
  //     userData?.user_uid
  //   );
  // }
  console.log("test here oferteInregistrate...", oferteInregistrate);
  return (
    <>
      <MyDashboard oferteInregistrate={oferteInregistrate} />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
