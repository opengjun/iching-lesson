import { NextRequest, NextResponse } from "next/server";
import {
  PAID_COOKIE_MAX_AGE,
  PAID_COOKIE_NAME,
  createAccessToken,
} from "@/lib/lesson-access";

const CREEM_PRODUCT_ID = "prod_5fA1D4dTnToVhrAQR84LnO";
const CREEM_CHECKOUT_STATUS = "completed";

export const dynamic = "force-dynamic";

type CreemCheckout = {
  id?: string;
  status?: string;
  product?: string | { id?: string };
};

function error(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return error("Invalid request.", 400);
  }

  const checkoutId =
    typeof body === "object" &&
    body !== null &&
    typeof (body as { checkoutId?: unknown }).checkoutId === "string"
      ? (body as { checkoutId: string }).checkoutId.trim()
      : "";

  if (!checkoutId || checkoutId.length > 200) {
    return error("Missing payment reference.", 400);
  }

  const apiKey = process.env.CREEM_API_KEY?.trim();
  if (!apiKey) {
    return error("Payments are not configured.", 500);
  }
  if (!process.env.LESSON_ACCESS_SECRET) {
    return error("Course access is not configured.", 500);
  }

  const baseUrl = apiKey.startsWith("creem_test_")
    ? "https://test-api.creem.io/v1"
    : "https://api.creem.io/v1";

  let checkout: CreemCheckout;

  try {
    const response = await fetch(
      `${baseUrl}/checkouts?checkout_id=${encodeURIComponent(checkoutId)}`,
      {
        headers: { "x-api-key": apiKey },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return error("This payment could not be verified.", 400);
    }

    checkout = (await response.json()) as CreemCheckout;
  } catch {
    return error("We could not reach the payment service. Please try again.", 502);
  }

  const productId =
    typeof checkout.product === "string"
      ? checkout.product
      : checkout.product?.id;

  if (checkout.status !== CREEM_CHECKOUT_STATUS || productId !== CREEM_PRODUCT_ID) {
    return error("This payment is not valid for the full course.", 402);
  }

  const token = await createAccessToken(checkout.id ?? checkoutId);
  const result = NextResponse.json({ ok: true });

  result.cookies.set({
    name: PAID_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: PAID_COOKIE_MAX_AGE,
  });

  return result;
}
