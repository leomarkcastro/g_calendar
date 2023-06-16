import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  async function signInWithGoogle() {
    const fetchRequest = await fetch("http://localhost:3000/api/gauth");
    const response = await fetchRequest.json();
    console.log(response);
    router.push(response["authURL"]);
  }

  return (
    <main>
      <button className="d-btn" onClick={signInWithGoogle}>
        Sign In With Google
      </button>
      <Link href="/calendar" className="d-btn">
        Calendar
      </Link>
    </main>
  );
}
