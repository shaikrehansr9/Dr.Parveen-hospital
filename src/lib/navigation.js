/**
 * Shared active-state logic for pathname links and homepage section anchors.
 * Keeping this pure makes navigation state easy to test and maintain.
 */
export function isActiveNavigationLink(href, pathname, currentHash = "") {
  if (href.includes("#")) {
    const [path, hash] = href.split("#");
    return pathname === (path || "/") && currentHash === `#${hash}`;
  }

  if (href === "/services") {
    return pathname === "/services" || pathname.startsWith("/services/");
  }

  if (href === "/") return pathname === "/" && !currentHash;
  return pathname === href || pathname.startsWith(`${href}/`);
}
