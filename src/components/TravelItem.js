import React, { useState } from 'react';
import Checkbox from "@kiwicom/orbit-components/lib/Checkbox";

function TravelItem({ item }) {
  const [ active, setActive ] = useState(false);

  return (
    <Checkbox
      label={item}
      name={item}
      value={item}
      checked={active}
      onChange={() => setActive(!active)}
    />
  );
}

export default TravelItem;
