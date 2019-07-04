import React, { useState } from 'react';
import Card, { CardHeader, CardSection } from "@kiwicom/orbit-components/lib/Card";
import Button from "@kiwicom/orbit-components/lib/Button";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Wallet from "@kiwicom/orbit-components/lib/icons/Wallet";
import Suitcase from "@kiwicom/orbit-components/lib/icons/Suitcase";
import Spa from "@kiwicom/orbit-components/lib/icons/Spa";
import Map from "@kiwicom/orbit-components/lib/icons/Map";
import Remove from "@kiwicom/orbit-components/lib/icons/Remove";

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

function TravelCard({ title, data }) {
  const [ resetAll, setResetAll ] = useState(false);

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
            onClick={() => setResetAll(true)}
            iconLeft={<Remove />}
            title={`Reset the list ${title}`}
          />
        }
      />
      <CardSection>
        <Stack direction="column" spacing="natural" tablet={{ spacing: "condensed" }}>
          {data.map((item, index) => (
            <TravelItem
              key={index}
              item={item}
              shouldResetAll={resetAll}
              handleUnreset={() => setResetAll(false)}
            />
          ))}
        </Stack>
      </CardSection>
    </Card>
  );
}

export default TravelCard;
