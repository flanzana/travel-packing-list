import React from 'react';
import Card, {CardHeader, CardSection} from "@kiwicom/orbit-components/lib/Card";
import Stack from "@kiwicom/orbit-components/lib/Stack";
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

function TravelCard({ title, data }) {
  return (
    <Card>
      <CardHeader title={title} icon={renderCardIcon(title)} />
      <CardSection>
        <Stack direction="column" spacing="condensed">
          {data.map((item, index) => (
            <TravelItem key={index} item={item} />
          ))}
        </Stack>
      </CardSection>
    </Card>
  );
}

export default TravelCard;
