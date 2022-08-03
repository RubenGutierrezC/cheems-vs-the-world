import {
  Flex,
  Icon,
  IconButton,
  Image,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  VStack,
} from "@chakra-ui/react";
import { GiPunchBlast, GiAbdominalArmor, GiInfo } from "react-icons/gi";
import { useCharacterState } from "../store";

export const Character = () => {
  const { attackPoints, defensePoints } = useCharacterState((state) => state);

  return (
    <Flex
      alignItems="start"
      flexDirection={{
        base: "column",
        md: "row",
      }}
    >
      <Image
        src="assets/cheems-base.png"
        alt="Character render"
        w={{
          base: "100%",
          md: "60%",
        }}
        objectFit="cover"
      />

      <VStack
        w={{
          base: "100%",
          md: "40%",
        }}
        pt={10}
        gap={5}
      >
        {/* attack points */}
        <Flex
          alignItems="center"
          gap={4}
          w="100%"
          borderWidth={3}
          borderColor="red.400"
          borderTopLeftRadius="2xl"
          borderBottomRightRadius="2xl"
          justifyContent="center"
          py={2}
        >
          <Icon as={GiPunchBlast} boxSize={10} color="red.500" />
          <Text fontSize={30}>{attackPoints}/15</Text>

          <Popover>
            <PopoverTrigger>
              <IconButton
                aria-label="Search database"
                variant="unstyled"
                fontSize={20}
                icon={<Icon as={GiInfo} />}
              />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverBody bgColor="red.200">
                Para subir este stat debes entrenar fuerza
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Flex>

        {/* defense points */}
        <Flex
          alignItems="center"
          gap={4}
          w="100%"
          borderWidth={3}
          borderColor="blue.400"
          borderTopLeftRadius="2xl"
          borderBottomRightRadius="2xl"
          justifyContent="center"
          py={2}
        >
          <Icon as={GiAbdominalArmor} boxSize={10} color="blue.500" />
          <Text fontSize={30}>{defensePoints}/15</Text>
          <Popover>
            <PopoverTrigger>
              <IconButton
                aria-label="Search database"
                variant="unstyled"
                fontSize={20}
                icon={<Icon as={GiInfo} />}
              />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverBody bgColor="blue.200">
                Para subir este stat debes entrenar defensa
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Flex>
      </VStack>
    </Flex>
  );
};
