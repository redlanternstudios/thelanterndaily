import { redirect } from "next/navigation";
import { lanternArticles } from "@/data/lanternArticles";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ArticleIndexPage() {
  // Redirect to the most recent article
  const slug = lanternArticles[0].id;
  redirect(`/article/${slug}` as any);
}
