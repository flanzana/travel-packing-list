import React from 'react';
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Card, {CardHeader, CardSection} from "@kiwicom/orbit-components/lib/Card";
import Wallet from "@kiwicom/orbit-components/lib/icons/Wallet";
import Suitcase from "@kiwicom/orbit-components/lib/icons/Suitcase";
import Spa from "@kiwicom/orbit-components/lib/icons/Spa";
import Map from "@kiwicom/orbit-components/lib/icons/Map";

function Main() {
  return (
    <Stack direction="column" dataTest="Main">
      <Card>
        <CardHeader title="Basics" icon={<Wallet />} />
        <CardSection>
          HELLO WORLD
        </CardSection>
      </Card>
      <Card>
        <CardHeader title="Clothes" icon={<Suitcase />} />
        <CardSection>
          HELLO WORLD
        </CardSection>
      </Card>
      <Card>
        <CardHeader title="Toiletries" icon={<Spa />} />
        <CardSection>
          HELLO WORLD
        </CardSection>
      </Card>
      <Card>
        <CardHeader title="Other" icon={<Map />} />
        <CardSection>
          HELLO WORLD
        </CardSection>
      </Card>
    </Stack>
  );
}

export default Main;
