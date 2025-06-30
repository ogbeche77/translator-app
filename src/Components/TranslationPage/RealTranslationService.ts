import { TranslationService } from "../../../io/service/CacheService";
import type { Engine } from "../../domain/types/Engine";

export class RealTranslationService implements TranslationService {
  async getTranslation(text: string, engine: Engine): Promise<any> {
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
    return data;
  }
}
