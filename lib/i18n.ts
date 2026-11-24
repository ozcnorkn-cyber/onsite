import { cookies } from "next/headers";

export type Lang = "pl" | "en";

export async function getLang(): Promise<Lang> {
  const jar = await cookies();
  return jar.get("onsite-lang")?.value === "en" ? "en" : "pl";
}
