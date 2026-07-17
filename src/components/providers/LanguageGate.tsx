"use client";

import { useEffect, useState } from "react";
import { LanguagePrompt } from "@/components/ui/LanguagePrompt";

export function LanguageGate() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("imv-locale") : null;
    setShow(!stored);
  }, []);

  if (!show) return null;
  return <LanguagePrompt />;
}
