class YodaTranslationRepo {
  async getTranslation(text: string) {
    const response = await fetch(
      "https://api.funtranslations.com/translate/pirate.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ text }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Error ${response.status}: ${
          errorData.error?.message || response.statusText
        }`
      );
    }

    const data = await response.json();
    return data;
  }
}

export default YodaTranslationRepo;
