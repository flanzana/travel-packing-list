import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Stack from "@kiwicom/orbit-components/lib/Stack";
import CountryFlag from "@kiwicom/orbit-components/lib/CountryFlag";
import ButtonLink from "@kiwicom/orbit-components/lib/ButtonLink";

import { ENGLISH, SLOVENIAN } from "../services/consts";

function LangPicker() {
  const initialLang = () => (window.localStorage.getItem("language") || ENGLISH);
  const [ lang, setLang ] = useState(initialLang);

  useEffect(() => {
    window.localStorage.setItem("language", lang);
  }, [lang]);

  const { i18n } = useTranslation();

  const changeLanguage = lang => {
    setLang(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <Stack direction="row" spacing="extraTight" tablet={{ spacing: "condensed" }}>
      <ButtonLink 
        iconLeft={<CountryFlag code="gb" name="English" />}
        onClick={() => changeLanguage(ENGLISH)}
        size="small"
        title="English"
      />
      <ButtonLink 
        iconLeft={<CountryFlag code="si" name="Slovenščina" />}
        onClick={() => changeLanguage(SLOVENIAN)}
        size="small"
        title="Slovenščina"
      />
    </Stack>
  );
}

export default LangPicker;
