import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Engine } from "../../domain/types/Engine";
import {
  PastTranslation,
  PastTranslations,
} from "../PastTranslations/PastTranslations";
import { TranslateForm } from "./TranslationForm";

const STORAGE_KEY = "past_translations";

export function Translate() {
  const [translation, setTranslation] = useState<any>(null);
  const [past, setPast] = useState<PastTranslation[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setPast(JSON.parse(stored));
  }, []);

  const handleResult = (result: any, text: string, engine: Engine) => {
    setTranslation(result);
    if (result && result.contents && text) {
      const entry: PastTranslation = {
        text,
        translation: result.contents.translated,
        engine,
        date: new Date().toISOString(),
      };
      const updated = [entry, ...past].slice(0, 50);
      setPast(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  };

  const handleClear = () => {
    setPast([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className="flex flex-col md:flex-row h-full min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-zinc-900 dark:to-zinc-800">
      <aside className="w-full md:w-80 p-4 border-r border-zinc-200 bg-white/70 dark:bg-zinc-900/70 flex flex-col">
        <button
          className="mb-4 text-blue-600 hover:underline flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </button>
        <PastTranslations items={past} onClear={handleClear} />
      </aside>
      <main className="flex-1 flex flex-col items-center justify-start p-4 overflow-y-auto">
        <div className="w-full max-w-2xl">
          <TranslateForm onResult={handleResult} />
          <div className="mt-6">
            {translation && translation.contents ? (
              <div className="bg-green-50 border border-green-200 rounded p-4 text-green-800 text-lg shadow">
                <strong>Translated:</strong> {translation.contents.translated}
              </div>
            ) : translation && translation.error ? (
              <div className="bg-red-50 border border-red-200 rounded p-4 text-red-700 shadow">
                {translation.error.message}
              </div>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
}
