import React, { useState } from "react";
import Button from "../../view/components/Button";
import Input from "../../view/components/Input";

import { ENGINES, Engine } from "../../domain/types/Engine";

export function TranslateForm({
  onResult,
}: {
  onResult: (result: any, text: string, engine: Engine) => void;
}) {
  const [text, setText] = useState("");
  const [engine, setEngine] = useState<Engine>("pirate");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);
    if (!text.trim()) {
      setError("Please enter text to translate.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.funtranslations.com/translate/${engine}.json`,
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ text }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error?.message || response.statusText);
      }
      onResult(data, text, engine);
    } catch (err: any) {
      setError(err.message || "Unknown error");
      onResult(null, text, engine);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="w-full max-w-xl mx-auto bg-white rounded-lg shadow p-6 flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-2 w-full">
        <label className="font-medium text-sm text-zinc-700">
          Text to translate
        </label>
        <Input
          placeholder="Enter the text to translate here"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setText(e.target.value)
          }
          className="w-full"
        />
        {error && <div className="text-red-500 text-xs mt-2">{error}</div>}{" "}
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label className="font-medium text-sm text-zinc-700">
          Translation Engine
        </label>
        <select
          className="w-full p-3 border border-gray-400 rounded-md"
          value={engine}
          onChange={(e) => setEngine(e.target.value as Engine)}
        >
          {ENGINES.map((eng) => (
            <option key={eng.value} value={eng.value}>
              {eng.label}
            </option>
          ))}
        </select>
      </div>
      <Button type="submit" className="w-full mt-2 cursor-pointer">
        {loading ? "Translating..." : "Translate"}
      </Button>
    </form>
  );
}
