import type { Engine } from "./Engine";

export type PastTranslation = {
  text: string;
  translation: string;
  engine: string;
  date: string;
};

type Translation = {
  text: string;
  engine: Engine;
};

export type { Translation };
