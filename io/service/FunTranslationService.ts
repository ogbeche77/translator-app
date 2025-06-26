import type { Translation } from "../../domain/types/Translation";
import YodaTranslationRepo from "../repo/YodaTranslationRepo";

interface FunTranslationService {
  getTranslation(text: string): Translation;
}

class DefaultFunTranslationService implements FunTranslationService {
  repo: YodaTranslationRepo;

  constructor(repo: YodaTranslationRepo) {
    this.repo = repo;
  }

  async getTranslation(text: string) {
    const payload = await this.repo.getTranslation(text);
    return payload as Translation;
  }
}

const createDefaultFunTranslationService = () => {
  const yodaRepo = new YodaTranslationRepo();
  const service = new DefaultFunTranslationService(yodaRepo);

  return service;
};

export { createDefaultFunTranslationService, DefaultFunTranslationService };
