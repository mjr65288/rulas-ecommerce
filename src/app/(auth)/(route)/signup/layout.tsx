import type { Metadata } from "next";

//Define static metadata for the Sign up route
export const metadata: Metadata = {
  title: "Sign up | SMM",
  description: "Network Platform",
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
