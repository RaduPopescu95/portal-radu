import dynamic from "next/dynamic";
import MyDashboard from "@/components/dashboard-master/my-dashboard";

export const metadata = {
  title: 'Dashboard || Nume Portal',
  description:
    'Nume Portal',
}


const index = () => {
  return (
    <>
      <MyDashboard />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
