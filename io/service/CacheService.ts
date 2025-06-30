import { Engine } from "../../src/domain/types/Engine";

export interface TranslationService {
  getTranslation(text: string, engine: Engine): Promise<any>;
}

export class CacheService implements TranslationService {
  private service: TranslationService;
  private storage: Storage;
  constructor(service: TranslationService) {
    this.service = service;
    // Check if window is defined (browser environment)
    this.storage =
      typeof window !== "undefined"
        ? window.localStorage
        : ({
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
            clear: () => {},
            key: () => null,
            length: 0,
          } as Storage);
  }

  private makeKey(text: string, engine: Engine): string {
    return `${engine}:${text}`;
  }

  async getTranslation(text: string, engine: Engine): Promise<any> {
    const key = this.makeKey(text, engine);
    const cached = this.storage.getItem(key);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        this.storage.removeItem(key);
      }
    }
    const result = await this.service.getTranslation(text, engine);
    this.storage.setItem(key, JSON.stringify(result));
    return result;
  }
}
