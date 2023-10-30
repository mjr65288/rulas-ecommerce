import type { Metadata } from "next";

//Define static metadata for the Network Element route
export const metadata: Metadata = {
  title: "Network Element | SMM",
  description: "Network Platform",
};

export default function NetworkElementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
