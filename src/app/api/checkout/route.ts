import { NextRequest, NextResponse } from "next/server";
import { Checkout } from "@creem_io/nextjs";

const CREEM_PRODUCT_ID = "prod_5fA1D4dTnToVhrAQR84LnO";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const productId = request.nextUrl.searchParams.get("productId");

  if (productId !== CREEM_PRODUCT_ID) {
    return NextResponse.json({ error: "Invalid product" }, { status: 400 });
  }

  const apiKey = process.env.CREEM_API_KEY?.trim();

  if (!apiKey) {
    return NextResponse.json(
      { error: "Creem is not configured" },
      { status: 500 },
    );
  }

  const testMode = false;

  const checkout = Checkout({
    apiKey,
    testMode,
    defaultSuccessUrl: `${request.nextUrl.origin}/billing/success`,
  });

  return checkout(request);
}
