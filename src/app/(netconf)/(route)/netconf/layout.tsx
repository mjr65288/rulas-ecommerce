import type { Metadata } from "next";

//Define static metadata for the User Home Page route
export const metadata: Metadata = {
  title: "NETCONF | SMM",
  description: "Network Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
