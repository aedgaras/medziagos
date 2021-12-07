import {Box, Container} from "@chakra-ui/layout";
import React, {useEffect, useState} from "react";
import materialData from "../data/Data";
import {motion} from "framer-motion";

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

export const Materials = () => {
    const [data] = useState(materialData);
    const [results, setResults] = useState(data);
    const [loading, setLoading] = useState(true);
    const [searchKeyword, setSearchKeyword] = useState(null);
    const [ascending, setAscending] = useState(false);
    const MotionRow = motion(Tr)

    useEffect(() => {
      setLoading(true);
        results.sort((a, b) => {
            return ascending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        });
        setResults(results);
        setLoading(false);
    }, [ascending])

    useEffect(() => {
        if (!searchKeyword) {
            setResults(data);

            return;
        }
        setLoading(true);
        let result = data.filter((str) => {
            return str.tempK.toLowerCase().indexOf(searchKeyword) >= 0 || str.name.toLowerCase().indexOf(searchKeyword) >= 0;
        })
        setResults(result);
      setLoading(false);
    }, [searchKeyword]);

    return (
        <Container pb={3}>
            <Box pb={3}>
                <FormControl>
                    <FormLabel>Medžiaga</FormLabel>
                    <Input
                        type="text"
                        onChange={(event) => setSearchKeyword(event.target.value.toLowerCase())}
                    />
                    <FormLabel>Plėtimosi koeficientas</FormLabel>
                    <Input
                        type="number"
                        onChange={(event) => setSearchKeyword(event.target.value.toLowerCase())}
                    />
                </FormControl>
            </Box>
            <Box borderWidth="1px" borderRadius="lg">
                <Table>
                    <Thead>
                        <Tr>
                            <Th onClick={() => setAscending(!ascending)}>Medžiaga</Th>
                            <Th isNumeric>Alpha * 10⁻⁶K⁻¹</Th>
                        </Tr>
                    </Thead>
                    <Tbody>{!loading && results.map((item, index) => (
                        <MotionRow key={index} whileHover={{scale: 1.1}} bgColor="#ffff">
                            <Td>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</Td>
                            <Td isNumeric>{item.tempK}</Td>
                        </MotionRow>
                    ))}
                      {loading && (
                          <MotionRow>
                            <Td span="2">Loading..</Td>
                          </MotionRow>
                      )}</Tbody>
                </Table>
            </Box>
        </Container>
    );
}
