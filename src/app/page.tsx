import SitePage from "@/components/SitePage";
import {
  HomeProfileGate,
  SiteProfileProvider,
} from "@/components/SiteProfileProvider";
import { saraProfile } from "@/data/saraProfile";

export default function Home() {
  return (
    <HomeProfileGate>
      <SiteProfileProvider profile={saraProfile}>
        <SitePage />
      </SiteProfileProvider>
    </HomeProfileGate>
  );
}
