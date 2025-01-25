import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, subject, message } = await req.json();

  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("contact-form")
      .insert({ name, email, subject, message });

    if (error) throw error;
    console.log("form submission err", error);

    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error sending email:", error.message);
    } else {
      throw new Error("Something went wrong. Please try again later");
    }
    return NextResponse.json(
      { error: "Failed to submit a form", status: 500 },
      { status: 500 }
    );
  }
}
