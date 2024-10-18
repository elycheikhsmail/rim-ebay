import { cookies } from "next/headers";
import {NavAuthUI} from "./ui";
import {NavNonAuthUI} from "./ui";

export default function ConditionalNav({ lang = "ar" }) {
  const isAuthenticated = cookies().has("sessionId");
  console.log({ isAuthenticated });

  return (
    <>
      {isAuthenticated ? <NavAuthUI lang={lang} /> : <NavNonAuthUI lang={lang} />}
    </>
  );
}
