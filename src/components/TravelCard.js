import React, { useState, useEffect } from 'react';
import Card, { CardHeader, CardSection } from "@kiwicom/orbit-components/lib/Card";
import Button from "@kiwicom/orbit-components/lib/Button";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import Wallet from "@kiwicom/orbit-components/lib/icons/Wallet";
import Suitcase from "@kiwicom/orbit-components/lib/icons/Suitcase";
import Spa from "@kiwicom/orbit-components/lib/icons/Spa";
import Map from "@kiwicom/orbit-components/lib/icons/Map";

import { LIST } from "../services/consts";
import TravelItem from "./TravelItem";

function renderCardIcon(title) {
  switch (title) {
    case LIST.ESSENTIALS:
      return <Wallet />;
    case LIST.CLOTHES:
      return <Suitcase />;
    case LIST.TOILETRIES:
      return <Spa />;
    case LIST.OTHER:
      return <Map />;
    default:
      return null
  }
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

function TravelCard({ title, cardData }) {
  const initialData = () => (JSON.parse(window.localStorage.getItem(`data-${title}`)) || cardData);

  const [ data, setData ] = useState(initialData);
  const [ resetAll, setResetAll ] = useState(false);
  const [ showInput, setShowInput ] = useState(false);
  const [ newItem, setNewItem ] = useState("");
  const [ error, setError ] = useState(false);

  useEffect(() => {
    // store data in local storage
    window.localStorage.setItem(`data-${title}`, JSON.stringify(data));
  }, [data, title]);

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
    if (data.find(item => item === newValue)) {
        setError(true)
    }
  };

  return (
    <Card dataTest={`TravelCard-${title}`}>
      <CardHeader
        title={title}
        icon={renderCardIcon(title)}
        actions={
          <Button
            type="critical"
            bordered
            size="small"
            onClick={handleReset}
            title={`Reset the list ${title}`}
          >
            Reset
          </Button>
        }
      />
      <CardSection>
        <Stack direction="column" spacing="natural" tablet={{ spacing: "condensed" }}>
          {data.map(item => (
            <TravelItem
              key={item}
              item={item}
              shouldResetAll={resetAll}
              handleUnreset={() => setResetAll(false)}
              handleDeleteItem={() => handleDeleteItem(item)}
            />
          ))}
          {showInput ?
            (
              <Stack direction="row" spacing="condensed">
                <InputField
                  name="New item"
                  size="small"
                  placeholder="Type item..."
                  value={newItem}
                  onChange={handleInputChange}
                  error={error && "Item already exists."}
                  ref={input => input && input.focus()}
                />
                <Button
                  size="small"
                  onClick={handleSubmitNewItem}
                  disabled={newItem === "" || error}
                  title="Submit new item"
                >
                  Submit
                </Button>
              </Stack>
            ) : (
              <Button
                size="small"
                onClick={() => setShowInput(true)}
                title="Add new item"
              >
                Add item
              </Button>
            )
          }
        </Stack>
      </CardSection>
    </Card>
  );
}

export default TravelCard;
