import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

export default function Home() {
  const router = useRouter();
  const alreadyLoaded = useRef(false);

  async function getTokenFromCode(code: string) {
    const fetchRequest = await fetch(
      "http://localhost:3000/api/gauthres?code=" + code
    );
    const response = await fetchRequest.json();

    return response;
  }

  async function loadToken() {
    if (router.isReady && !alreadyLoaded.current) {
      alreadyLoaded.current = true;

      // get token from url
      const token = router.query.code;
      console.log(token);

      // get token from code
      if (token) {
        const result = await getTokenFromCode(token as string);

        // save result to local storage
        localStorage.setItem("token", JSON.stringify(result));

        // remove the token from url
        router.push("/");
      }
    }
  }

  useEffect(() => {
    loadToken();
  }, [router]);

  return (
    <main>
      <p>GAuth page</p>
    </main>
  );
}
