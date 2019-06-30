import React from 'react';
import Stack from "@kiwicom/orbit-components/lib/Stack";

import TravelCard from "./TravelCard";

function Main({ data }) {
  return (
    <Stack direction="column" dataTest="Main">
      {Object.keys(data).map((list, index) => (
        <TravelCard
          key={index}
          title={list}
          data={data[list]}
        />
      ))}
    </Stack>
  );
}

export default Main;
