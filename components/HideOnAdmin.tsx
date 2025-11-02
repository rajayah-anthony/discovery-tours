// components/HideOnAdmin.tsx
"use client";

import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

export default function HideOnAdmin({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");
    if (isAdmin) return null;
    return <>{children}</>;
}
