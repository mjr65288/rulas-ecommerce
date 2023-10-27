import type { Metadata } from "next";

//Define static metadata for the login route
export const metadata: Metadata = {
  title: "Sign in | SMM",
  description: "Network Platform",
};

export default function SigninLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
