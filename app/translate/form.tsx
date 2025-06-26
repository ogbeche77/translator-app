import React, { useState } from "react";
import Button from "../../view/components/Button";
import Input from "../../view/components/Input";

export function TranslateForm({ onResult }: { onResult: (result: any) => void }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://api.funtranslations.com/translate/pirate.json", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ text }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error?.message || response.statusText);
      }
      onResult(data);
    } catch (err: any) {
      setError(err.message || "Unknown error");
      onResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="contents" onSubmit={handleSubmit}>
      <fieldset className="flex flex-col items-start gap-6" disabled={loading}>
        <Input
          placeholder="Enter the text to translate here"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
        />
        <Button type="submit" className="">
          {loading ? "Translating..." : "Translate"}
        </Button>
        {error && <div className="text-red-500 text-xs mt-2">{error}</div>}
      </fieldset>
    </form>
  );
}
