import { Box, Center, Container, Text } from "@chakra-ui/layout";
import React from "react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import materialData from "../data/Data";

class Home extends React.Component {
  constructor(props) {
    super(props);

    document.title = "Pagrindinis";
    this.state = {
      tempInput: 0,
      deltaL: 100,
      data: materialData,
    };
  }

  handleTempChange(event) {
    const value = event.target.value;
    const tempInput = Number(value);

    console.log(tempInput);



    this.setState({
      tempInput: tempInput,
    });
  }

  changeSize() {
    return <Box borderWidth="1px" borderRadius="lg" width={this.state.deltaL + "px"} bgColor="red">Yooo</Box>;
  }

  render() {
    return (
      <Center>
        <Container align="center">
          <Text>Home Page</Text>
          <FormControl>
            <FormLabel>Temperatura</FormLabel>
            <Input
              type="text"
              onChange={(event) => this.handleTempChange(event)}
            />
          </FormControl>
          <Box>
            {this.changeSize()}
          </Box>
        </Container>
      </Center>
    );
  }
}

export default Home;
