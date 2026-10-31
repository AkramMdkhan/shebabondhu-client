import { Banner } from "@/components/home/banner";
import { Features } from "@/components/home/features";
import { Gallery } from "@/components/home/gallery";
import { RecentEvents } from "@/components/home/recent-events";

export default function HomePage() {
  return (
    <>
      <Banner />
      <Features />
      <RecentEvents />
      <Gallery />
    </>
  );
}