"use client";

import CHLink from "@/components/link/Link";
import styles from "@/styles/home.module.scss";

export default function Home() {
  return (
    <main>
      <div className={styles.home}>
        <h1 className={styles.title}>An Auth + CRUD App</h1>
        <p>
          Please <CHLink href="/login">login</CHLink> to see the auth flow, or
          go to the <CHLink href="/movies">movies</CHLink>
        </p>
      </div>
    </main>
  );
}
