import dynamic from "next/dynamic";
import MyDashboard from "@/components/dashboard-utilizator/my-dashboard";

export const metadata = {
  title: 'Dashboard || Dashboard',
  description:
    'Dashboard',
}


const index = () => {
  return (
    <>
      <MyDashboard />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
