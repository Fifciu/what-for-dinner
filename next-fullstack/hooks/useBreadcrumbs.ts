import { redirect, usePathname } from "next/navigation";

const PATHNAME_TO_PAGE_TITLE = [
  [
    /^\/household\/(\d+)\/dishes$/, 'My dishes'
  ],
  [
    /^\/household\/(\d+)$/, 'Household'
  ]
] as const;

export function useBreadcrumbs() {
  const pathname = usePathname();

  function getPageTitle() {
    const pathnameObj = PATHNAME_TO_PAGE_TITLE.find((reg) => reg[0].test(pathname));
    return pathnameObj
      ? pathnameObj[1]
      : 'Unknown route';
  }

  const pageTitle = getPageTitle();

  return {
    pageTitle,
    pathname
  }
}
