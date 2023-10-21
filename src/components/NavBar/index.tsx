import {
  Box,
  Button,
  Center,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Player } from "@lottiefiles/react-lottie-player";
import { FiMoon, FiSun, FiUser } from "react-icons/fi";
import packageAnimation from "../../assets/package-animation.json";

export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box bg={useColorModeValue("blackAlpha.50", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <Player
              autoplay
              src={packageAnimation}
              keepLastFrame
              style={{ width: 40 }}
            />
          </Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode} variant="unstyled">
                {colorMode === "light" ? (
                  <FiSun size="25px" />
                ) : (
                  <FiMoon size="25px" />
                )}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <FiUser size="25px" />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <FiUser size="50px" />
                  </Center>
                  <br />
                  <Center>
                    <p>Usuario</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Configurações da conta</MenuItem>
                  <MenuItem>Sair</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
