"use client";

import { useRef, useState } from "react";
import { bab2 } from "@/data/materi";
import { JenisPanel, JenisSelector } from "./JenisSelector";

export function JenisCyberbullying() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const total = bab2.jenis.length;

  function select(index: number, moveFocus = false) {
    setActiveIndex(index);
    if (moveFocus) tabRefs.current[index]?.focus();
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    const current = Math.max(tabRefs.current.indexOf(event.currentTarget), 0);
    const keys: Record<string, number> = {
      ArrowRight: current + 1,
      ArrowDown: current + 1,
      ArrowLeft: current - 1,
      ArrowUp: current - 1,
      Home: 0,
      End: total - 1,
    };

    const next = keys[event.key];
    if (next === undefined) return;

    event.preventDefault();
    select((next + total) % total, true);
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[15rem_minmax(0,1fr)] lg:items-start">
      <JenisSelector
        items={bab2.jenis}
        activeIndex={activeIndex}
        onSelect={(index) => select(index)}
        onKeyDown={onKeyDown}
        registerTab={(element, index) => {
          tabRefs.current[index] = element;
        }}
      />
      <JenisPanel item={bab2.jenis[activeIndex]} index={activeIndex} />
    </div>
  );
}
