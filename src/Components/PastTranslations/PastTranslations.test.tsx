import "@testing-library/jest-dom";
import React from "react";
import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PastTranslations } from "./PastTranslations";
import type { PastTranslation } from "../../domain/types/Translation";

describe("PastTranslations", () => {
  const items: PastTranslation[] = [
    {
      text: "hello",
      translation: "ahoy",
      engine: "pirate",
      date: new Date("2023-01-01T12:00:00Z").toISOString(),
    },
    {
      text: "goodbye",
      translation: "yo-ho-ho",
      engine: "pirate",
      date: new Date("2023-01-02T12:00:00Z").toISOString(),
    },
  ];

  it("renders empty state when no items", () => {
    render(
      <PastTranslations items={[]} onClear={vi.fn()} />
    );
    expect(screen.getByText(/no past translations/i)).toBeInTheDocument();
  });

  it("renders all past translations", () => {
    render(
      <PastTranslations items={items} onClear={vi.fn()} />
    );
    expect(screen.getByText("hello")).toBeInTheDocument();
    expect(screen.getByText("goodbye")).toBeInTheDocument();
    expect(screen.getAllByText(/pirate/i)).toHaveLength(2);
  });

  it("calls onClear when clear button is clicked", () => {
    const onClear = vi.fn();
    render(
      <PastTranslations items={items} onClear={onClear} />
    );
    fireEvent.click(screen.getByText(/clear/i));
    expect(onClear).toHaveBeenCalled();
  });

  it("calls onSelect when an item is clicked", () => {
    const onSelect = vi.fn();
    render(
      <PastTranslations items={items} onClear={vi.fn()} onSelect={onSelect} />
    );
    fireEvent.click(screen.getByText("hello"));
    expect(onSelect).toHaveBeenCalledWith(items[0]);
  });
});
