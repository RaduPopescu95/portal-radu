import Wrapper from "@/components/layout/Wrapper";
import HomeMain from "./(homes)/home-4/page";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "Home || Portal",
  description: "Portal",
};

export default function Home() {
  return (
    <Wrapper>
      <HomeMain />
    </Wrapper>
  );
}
