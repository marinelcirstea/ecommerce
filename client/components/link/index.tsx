import { useRouter } from "next/router";
import Link, { LinkProps } from "next/link";
import PropTypes from "prop-types";

export interface NavLinkProps
  extends React.PropsWithChildren<LinkProps & React.HTMLAttributes<HTMLHyperlinkElementUtils>> {
  href: string;
  exact: boolean;
  children: React.ReactChildren | string;
}

function NavLink({ href, exact, children, ...props }: NavLinkProps) {
  const { pathname } = useRouter();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  if (isActive) {
    let np = props.className?.split(" ");
    np?.push("active");
    let cname = np?.join(" ");
    props.className = cname || "active";
  }

  return (
    <Link href={href}>
      <a {...props}>{children}</a>
    </Link>
  );
}

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  exact: PropTypes.bool,
};

NavLink.defaultProps = {
  exact: false,
};

export default NavLink;
