import { Container, Flex, HStack, Text, Button, Box } from "@chakra-ui/react";
import React from "react";
import { useColorMode } from "./ui/color-mode";
import { Link } from "react-router-dom";
import { PiPlusSquareFill } from "react-icons/pi";

import { Icon } from "@chakra-ui/react";
import { LuSun } from "react-icons/lu";
import { LuMoon } from "react-icons/lu";

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={"1140px"} p={"4px"}>
      <Flex
        h={16}
        flexDir={{ base: "column", sm: "row" }}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgClip={"text"}
          bgGradient="to-r"
          gradientFrom="cyan.400"
          gradientTo="blue.500"
        >
          <Link to={"/"}>Product Store</Link>
        </Text>

        <HStack spacing={1} alignItems={"center"}>
          <Link to={"/create"}>
            <Icon size="lg">
              <PiPlusSquareFill />
            </Icon>
          </Link>
          <Icon onClick={toggleColorMode}>
            {colorMode === "light" ? <LuMoon /> : <LuSun />}
          </Icon>
          {/* <ColorModeButton /> */}
        </HStack>
      </Flex>
    </Container>
  );
};

export default NavBar;
