import { Box, Container } from "@chakra-ui/layout";
import React from "react";
import materialData from "../data/Data";
import { motion } from "framer-motion";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

class Materials extends React.Component {
  constructor(props) {
    super(props);
    document.title = "Medziagu lentele";

    this.state = {
      data: [],
      results: [],
      search: null,
      loading: true,
      nameSort: null,
    };

    this.sortByAscending = this.sortByAscending.bind(this);
    this.sortByDescending = this.sortByDescending.bind(this);
  }

  componentDidMount() {
    this.setState({
      data: materialData,
      results: materialData,
      loading: false,
    });
  }

  sortByAscending() {
    const names = this.state.data;

    names.sort((a, b) => a.name.localeCompare(b.title));

    this.setState({
      results: names,
    });
  }

  sortByDescending() {
    const names = this.state.data;

    names.sort((a, b) => b.name.localeCompare(a.title));

    this.setState({
      results: names,
    });
  }

  async handleNameSearch(event) {
    let value = event.target.value.toLowerCase();
    let names = this.state.data;

    var result = names.filter((str) => {
      return str.name.toLowerCase().indexOf(value.toLowerCase()) >= 0;
    });

    this.setState({
      results: result,
    });
  }

  async handleNumberSearch(event) {
    let value = event.target.value.toLowerCase();
    let numbers = this.state.data;

    var result = numbers.filter((str) => {
      return str.tempK.toLowerCase().indexOf(value.toLowerCase()) >= 0;
    });

    this.setState({
      results: result,
    });
  }

  nameSearchRows() {
    const MotionRow = motion(Tr);

    const result = this.state.results.map((item, index) => (
      <MotionRow key={index} whileHover={{ scale: 1.1 }} bgColor="#ffff">
        <Td>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</Td>
        <Td isNumeric>{item.tempK}</Td>
      </MotionRow>
    ));
    return result;
  }

  render() {
    const MotionBox = motion(Box);

    if (this.state.loading)
      return (
        <div className="container text-center pt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      );

    return (
      <Container pb={3}>
        <Box pb={3}>
          <FormControl>
            <FormLabel>Medziaga</FormLabel>
            <Input
              type="text"
              onChange={(event) => this.handleNameSearch(event)}
            />
            <FormLabel>Pletimosi koeficientas</FormLabel>
            <Input
              type="number"
              onChange={(event) => this.handleNumberSearch(event)}
            />
          </FormControl>
        </Box>
        <Box borderWidth="1px" borderRadius="lg">
          <Table>
            <Thead>
              <Tr>
                <Th onClick={this.sortByAscending()}>Medziaga</Th>
                <Th isNumeric>Alpha * 10⁻⁶K⁻¹</Th>
              </Tr>
            </Thead>
            <Tbody>{this.nameSearchRows()}</Tbody>
          </Table>
        </Box>
      </Container>
    );
  }
}

export default Materials;
