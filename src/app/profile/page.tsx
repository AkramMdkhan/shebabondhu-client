import type { Metadata } from "next";
import { ProfileCard } from "@/components/profile/profile-form";

export const metadata: Metadata = {
  title: "My Profile",
};

export default function ProfilePage() {
  return (
    <section className="mx-auto flex w-full max-w-7xl justify-center px-4 py-16 sm:px-6 lg:py-24">
      <ProfileCard />
    </section>
  );
}