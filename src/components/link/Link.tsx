import Link, { LinkProps } from "next/link";
import styles from "./Link.module.scss";

interface CHLinkProps extends LinkProps {
  children?: React.ReactNode;
}

const CHLink = (props: CHLinkProps) => {
  return (
    <Link {...props} className={styles.link}>
      {props.children}
    </Link>
  );
};

export default CHLink;
