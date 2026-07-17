"use client";

import { useSyncExternalStore } from "react";
import { LanguagePrompt } from "@/components/ui/LanguagePrompt";

function subscribe() {
  // Local storage is only written by the user in this session;
  // no external subscription is needed for the first-visit prompt.
  return () => {};
}

function getSnapshot() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem("imv-locale") === null;
}

function getServerSnapshot() {
  return false;
}

export function LanguageGate() {
  const show = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!show) return null;
  return <LanguagePrompt />;
}
