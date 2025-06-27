export type Engine =
  | "pirate"
  | "valspeak"
  | "jive"
  | "cockney"
  | "brooklyn"
  | "minion"
  | "chef";

export const ENGINES: { value: Engine; label: string }[] = [
  { value: "pirate", label: "Pirate" },
  { value: "valspeak", label: "Valspeak" },
  { value: "jive", label: "Jive" },
  { value: "cockney", label: "Cockney" },
  { value: "brooklyn", label: "Brooklyn" },
  { value: "minion", label: "Minion" },
  { value: "chef", label: "Chef" },
];
