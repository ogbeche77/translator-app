import React from "react";
import type { PastTranslation } from "../../domain/types/Translation";

export function PastTranslations({
  items,
  onClear,
  onSelect,
}: {
  items: PastTranslation[];
  onClear: () => void;
  onSelect?: (item: PastTranslation) => void;
}) {
  return (
    <aside className="flex flex-col gap-3 h-full w-full">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-bold text-lg">Past Translations</h2>
        <button
          className="text-xs px-2 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200 transition cursor-pointer"
          onClick={onClear}
        >
          Clear
        </button>
      </div>
      <div className="overflow-y-auto flex-1 border-t border-zinc-200 pt-2">
        {items.length === 0 ? (
          <div className="text-zinc-400 text-sm">No past translations</div>
        ) : (
          <ul className="space-y-2">
            {items.map((item, idx) => (
              <li
                key={idx}
                className="p-2 bg-zinc-50 rounded hover:bg-zinc-100 cursor-pointer border border-zinc-100"
                onClick={() => onSelect && onSelect(item)}
              >
                <div className="text-xs text-zinc-400">
                  {item.engine} • {new Date(item.date).toLocaleString()}
                </div>
                <div className="font-semibold truncate">{item.text}</div>
                <div className="text-green-700 truncate">
                  {item.translation}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}
