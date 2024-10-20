import Image from "next/image";
import styles from "@/styles/auth.module.scss";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.auth_layout}>
      <div className={styles.container}>
        <>{children}</>
        <div>
          <Image
            src="/images/home-cinema.svg"
            alt="Cinema image"
            width={400}
            height={400}
          />
        </div>
      </div>
    </div>
  );
}
