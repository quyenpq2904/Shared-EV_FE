import { redirect } from "next/navigation";

export default function MarketplaceRootPage() {
  redirect("/admin/marketplace/pending-approval");
}
