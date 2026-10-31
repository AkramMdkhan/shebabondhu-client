import { Banner } from "@/components/home/banner";
import { Features } from "@/components/home/features";
import { RecentEvents } from "@/components/home/recent-events";

export default function HomePage() {
  return (
    <>
      <Banner />
      <Features />
      <RecentEvents />
    </>
  );
}