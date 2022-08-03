import { Container, Grid } from "@chakra-ui/react";
import {
  Character,
  Explore,
  LifeBar,
  Rest,
  Stage,
  TrainAtack,
  TrainDefense,
} from "./components";
import { BossFight } from "./components/bossfight";

function App() {
  return (
    <Container justifyContent="center" maxWidth="xl" py={5}>
      <Stage />
      <LifeBar />
      <Character />

      <Grid
        pt={6}
        templateColumns={{
          base: "1fr",
          md: "1fr 1fr",
        }}
        columnGap={5}
        rowGap={5}
      >
        <TrainAtack />
        <TrainDefense />
        <Explore />
        <Rest />
      </Grid>

      <BossFight />
    </Container>
  );
}

export default App;
