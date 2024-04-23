import dynamic from "next/dynamic";
import MyProfile from "@/components/dashboard-master/verifica-utilizator";

export const metadata = {
  title: 'My Profile || Profil',
  description:
    'Profil',
}

const index = () => {
  return (
    <>
      <MyProfile />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
