import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import Card, { CardSection } from "@kiwicom/orbit-components/lib/Card";
import Button from "@kiwicom/orbit-components/lib/Button";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import Wallet from "@kiwicom/orbit-components/lib/icons/Wallet";
import Suitcase from "@kiwicom/orbit-components/lib/icons/Suitcase";
import Spa from "@kiwicom/orbit-components/lib/icons/Spa";
import Camera from "@kiwicom/orbit-components/lib/icons/Camera";
import Plus from "@kiwicom/orbit-components/lib/icons/Plus";

import { LIST } from "../services/consts";
import TravelItem from "./TravelItem";
import Settings from "./Settings";

function renderCardIcon(title) {
  switch (title) {
    case LIST.ESSENTIALS:
      return <Wallet />;
    case LIST.CLOTHES:
      return <Suitcase />;
    case LIST.TOILETRIES:
      return <Spa />;
    case LIST.OTHER:
      return <Camera />;
    default:
      return null
  }
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

function TravelCard({ heading, category, cardData }) {
  const { t } = useTranslation();
  const initialData = () => (JSON.parse(window.localStorage.getItem(`data-${category}`)) || cardData);

  const [ data, setData ] = useState(initialData);
  const [ resetAll, setResetAll ] = useState(false);
  const [ showSettingsPopover, setShowSettingsPopover ] = useState(false);
  const [ showInput, setShowInput ] = useState(false);
  const [ showDelete, setShowDelete ] = useState(false);
  const [ newItem, setNewItem ] = useState("");
  const [ error, setError ] = useState(false);

  useEffect(() => {
    // store data in local storage
    window.localStorage.setItem(`data-${category}`, JSON.stringify(data));
  }, [data, category]);

  const togglePopover = () => {
    setShowSettingsPopover(!showSettingsPopover);
  };

  const handleDeleteItem = (item) => {
    // update data
    setData(data.filter(i => i !== item));
    // remove item from local storage
    window.localStorage.removeItem(`${item}-checked`);
  };

  const handleReset = () => {
    setResetAll(true);
    // set data to default
    setData(cardData);
    setShowSettingsPopover(false);
  };

  const handleSubmitNewItem = e => {
    if (newItem !== "") {
      e.preventDefault();
      // update data
      setData(prevData => [...prevData, newItem]);

      // clear states
      setShowInput(false);
      setNewItem("");
    }
  };

  const handleInputChange = e => {
    const newValue = e.target.value;
    setError(false);
    setNewItem(capitalize(newValue));

    // show error if the new value already exists on the list
    if (data.find(item => t(item) === newValue)) {
        setError(true)
    }
  };

  const handleShowDelete = () => {
    setShowDelete(true);
    setShowSettingsPopover(false);
  }

  return (
    <Card
      dataTest={`TravelCard-${category}`}
      title={heading}
      icon={renderCardIcon(category)}
      actions={
        <Settings
          translatedCategory={heading}
          togglePopover={togglePopover}
          handleShowDelete={handleShowDelete}
          handleReset={handleReset}
          showDelete={showDelete}
          showInput={showInput}
          showSettingsPopover={showSettingsPopover}
        />
      }
    >
      <CardSection>
        <Stack direction="column" spacing="natural" tablet={{ spacing: "condensed" }}>
          {data.map(item => (
            <TravelItem
              key={item}
              item={item}
              shouldResetAll={resetAll}
              handleUnreset={() => setResetAll(false)}
              handleDeleteItem={() => handleDeleteItem(item)}
              showDelete={showDelete}
            />
          ))}
          {showInput ? (
            <Stack direction="row" spacing="condensed">
              <InputField
                name="New item"
                size="small"
                placeholder={t("placeholder.type_item")}
                value={newItem}
                onChange={handleInputChange}
                error={error && t("input.error")}
                ref={input => input && input.focus()}
              />
              <Button
                size="small"
                onClick={handleSubmitNewItem}
                disabled={newItem === "" || error}
              >
                {t("button.submit")}
              </Button>
            </Stack>
          ) : (
            <Stack direction="row" justify="between">
              <Button
                type="secondary"
                iconLeft={<Plus />}
                size="small"
                onClick={() => setShowInput(true)}
                disabled={showDelete}
              >
                {t("button.add_item")}
              </Button>
              {showDelete && (
                <Button
                  type="critical"
                  size="small"
                  onClick={() => setShowDelete(false)}
                >
                  {t("button.save")}
                </Button>
              )}
            </Stack>
          )}
        </Stack>
      </CardSection>
    </Card>
  );
}

export default TravelCard;
