"use client";

import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import SidebarWrapper from "@/components/shared/sidebar/SidebarWrapper";
import { LoadingLogo } from "@/components/shared/LoadingLogo";

type Props = React.PropsWithChildren<{}>;

export default function Layout({ children }: Props) {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && !user) {
      redirect("/sign-in");
    }
  }, [isLoaded, user]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingLogo />
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  return <SidebarWrapper>{children}</SidebarWrapper>;
}
