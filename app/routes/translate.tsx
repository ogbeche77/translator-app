import { useState } from "react";
import Content from "../../view/components/Content";
import Sidepane from "../../view/components/Sidepane";
import { TranslateForm } from "../translate/form";

export default function Translate() {
  const [translation, setTranslation] = useState<any>(null);

  return (
    <div className="flex h-full py-3">
      <Sidepane>It would be nice to see past translations here.</Sidepane>
      <Content>
        <TranslateForm onResult={setTranslation} />
        <div className="mt-4">
          {translation && translation.contents ? (
            <div className="text-green-700 text-lg">
              <strong>Translated:</strong> {translation.contents.translated}
            </div>
          ) : translation && translation.error ? (
            <div className="text-red-500">{translation.error.message}</div>
          ) : null}
        </div>
      </Content>
    </div>
  );
}
