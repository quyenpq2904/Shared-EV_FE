import AppNavbar from "@/components/AppNavbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppNavbar />
      <main className="max-w-7xl mx-auto mt-5">{children}</main>
    </>
  );
}
