import { Image, Text } from "@chakra-ui/react";
import { useCharacterState } from "../../store";
import { ModalContainer } from "../global/ModalContainer";

export const FightResult = () => {
  const { life } = useCharacterState((state) => state);

  const won = life > 0;

  return (
    <ModalContainer isOpen={true} onClose={() => null}>
      <Text textAlign="center" fontWeight="bold" mb={5} fontSize={30}>
        Cheems ha {won ? "Ganado" : "Perdido"}
      </Text>
      <Image
        width="100%"
        h="300px"
        src={won ? "assets/winning-image.jpg" : "assets/loose-image.jpg"}
        alt="Character render"
        objectFit="contain"
        mb={3}
      />
      <Text>
        {won
          ? "Desacanse joven guerrero, ganaste una batalla, pero no la guerra. Nuevos enemigos vendran para causarle amsiedad a cheems y hay que estrar preparado para la batalla"
          : "Cheems ha perdido y le ha dado amsiedad, puede ayudar a quitarle la amsiedad a cheems volviendolo a intentar"}
      </Text>
    </ModalContainer>
  );
};
