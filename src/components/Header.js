import React from 'react';
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import Illustration from "@kiwicom/orbit-components/lib/Illustration";

function Header() {
  return (
    <Stack direction="column" align="center" dataTest="Header">
      <Illustration name="Tours" size="small" />
      <Heading type="title1">Travel Packing List</Heading>
    </Stack>
  );
}

export default Header;
