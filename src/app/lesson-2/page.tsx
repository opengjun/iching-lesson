import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Lesson2 } from "@/components/Lesson2";
import { PAID_COOKIE_NAME, verifyAccessToken } from "@/lib/lesson-access";

export const metadata: Metadata = {
  title: "Lesson 2 · Hexagrams",
  description:
    "The next step in the I Ching: how two trigrams stack to form a hexagram.",
};

type Lesson2PageProps = {
  searchParams: Promise<{ checkout_id?: string | string[] }>;
};

export default async function Lesson2Page({ searchParams }: Lesson2PageProps) {
  const cookieStore = await cookies();
  const token = cookieStore.get(PAID_COOKIE_NAME)?.value;

  if (await verifyAccessToken(token)) {
    return <Lesson2 />;
  }

  const params = await searchParams;
  const checkoutId =
    typeof params.checkout_id === "string" ? params.checkout_id.trim() : "";

  if (checkoutId) {
    redirect(`/billing/success?checkout_id=${encodeURIComponent(checkoutId)}`);
  }

  redirect("/?notice=unlock");
}
