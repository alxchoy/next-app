"use client";
import Link from "next/link";
import styles from "@/styles/home.module.scss";

export default function Home() {
  return (
    <main>
      <div className={styles.home}>
        <h1 className={styles.title}>An Auth + CRUD App</h1>
        <p>
          Please <Link href="/login">login</Link> to see the auth flow, or go to
          the <Link href="/movies">movies</Link>
        </p>
      </div>
    </main>
  );
}
