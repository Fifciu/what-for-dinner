"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type BreadcrumbContextType = {
  title: string;
  setTitle: (title: string) => void;
  parentTitle?: string;
  parentHref?: string;
  setParentInfo: (title: string, href: string) => void;
};

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(undefined);

export function BreadcrumbProvider({
  children,
  defaultTitle = "Overview",
  defaultParentTitle,
  defaultParentHref,
}: {
  children: ReactNode;
  defaultTitle?: string;
  defaultParentTitle?: string;
  defaultParentHref?: string;
}) {
  const [title, setTitle] = useState(defaultTitle);
  const [parentTitle, setParentTitle] = useState(defaultParentTitle);
  const [parentHref, setParentHref] = useState(defaultParentHref);

  const setParentInfo = (title: string, href: string) => {
    setParentTitle(title);
    setParentHref(href);
  };

  return (
    <BreadcrumbContext.Provider
      value={{
        title,
        setTitle,
        parentTitle,
        parentHref,
        setParentInfo,
      }}
    >
      {children}
    </BreadcrumbContext.Provider>
  );
}

export function useBreadcrumb() {
  const context = useContext(BreadcrumbContext);
  if (context === undefined) {
    throw new Error("useBreadcrumb must be used within a BreadcrumbProvider");
  }
  return context;
}
