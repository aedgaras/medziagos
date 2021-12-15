import {Box, Center, Container} from "@chakra-ui/layout";
import React, {useEffect, useState} from "react";
import {FormControl, FormLabel} from "@chakra-ui/form-control";
import {Input} from "@chakra-ui/input";
import materialData from "../data/Data";
import {Button, Grid, GridItem, Select} from "@chakra-ui/react";
import {
    Chart,
    ChartSeries,
    ChartSeriesItem,
    ChartCategoryAxis,
    ChartCategoryAxisItem, ChartCategoryAxisTitle, ChartValueAxisTitle, ChartValueAxisItem, ChartValueAxis
} from "@progress/kendo-react-charts";
import '@progress/kendo-theme-default/dist/all.css';
const Big = require('big-js');

export const Home = () => {
    document.title = "Pagrindinis";

    const [temperatureStep, setTemperatureStep] = useState(5);
    const [initialLength, setInitialLength] = useState(363);
    const [materialCoefficient, setMaterialCoefficient] = useState(1.3);
    const [initialTemperature, setInitialTemperature] = useState(26);
    const [currentHeatedTemperature, setCurrentHeatedTemperature] = useState(initialTemperature);
    const [goalTemperature, setGoalTemperature] = useState(70);
    const [heating, setHeating] = useState(false);
    const [lengths, setLengths] = useState([]);
    const [deltaL, setDeltaL] = useState(0);

    useEffect(() => {
        if (heating && currentHeatedTemperature < goalTemperature) {
            setTimeout(() => {
                let newTemperature = currentHeatedTemperature + temperatureStep;
                let deltaL = calculateDeltaT(newTemperature);
                setDeltaL(deltaL);
                setLengths([...lengths, {temperature: newTemperature, length: deltaL}]);
                setCurrentHeatedTemperature(newTemperature);
            }, 500);
        }

        if (heating && currentHeatedTemperature >= goalTemperature) {
            setHeating(false);
        }
    }, [heating, currentHeatedTemperature])

    const startHeating = () => {
        setCurrentHeatedTemperature(initialTemperature);
        setLengths([]);
        setHeating(true);
    }

    const calculateDeltaT = (heatedTemperature) => {

        let temperaturesDiff = heatedTemperature - initialTemperature;
        let result = Big(initialLength).times(materialCoefficient).times(Big(10).pow(-6)).times(temperaturesDiff);
        console.log(result.toFixed(5));

        return result.toFixed(5);
    }

    return (
        <Grid templateRows='repeat(2, 1fr)' templateColumns='repeat(10, 1fr)' gap={2}>
            <GridItem colSpan={5} h='10'>
                <Center>
                    <Container align="center">
                        <FormControl>
                            <FormLabel>Pradinė temperatūra °C</FormLabel>
                            <Input
                                value={initialTemperature}
                                disabled={heating && ('disabled')}
                                type="number"
                                onChange={(event) => setInitialTemperature(Number(event.target.value))}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Galutinė temperatūra °C</FormLabel>
                            <Input
                                value={goalTemperature}
                                disabled={heating && ('disabled')}
                                type="number"
                                onChange={(event) => setGoalTemperature(Number(event.target.value))}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Temperatūros žingsnis °C</FormLabel>
                            <Input
                                value={temperatureStep}
                                disabled={heating && ('disabled')}
                                type="number"
                                onChange={(event) => setTemperatureStep(Number(event.target.value))}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Pradinis vamzdelio ilgis (mm)</FormLabel>
                            <Input
                                value={initialLength}
                                disabled={heating && ('disabled')}
                                type="number"
                                onChange={(event) => setInitialLength(event.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Vamzdelio medžiaga</FormLabel>
                            <Select
                                disabled={heating && ('disabled')}
                                onChange={(event) => setMaterialCoefficient(event.target.value)}
                            >
                                {materialData.map((material, index) => {
                                    return (<option key={index} value={material.tempK}>{material.name}</option>);
                                })}
                            </Select>
                        </FormControl>
                        <FormControl marginBottom="10px" marginTop="10px">
                            <Button disabled={heating && ('disabled')}
                                    onClick={() => startHeating()}>Start</Button>
                        </FormControl>

                        <Box>Strypo ilgis: {Big(initialLength).plus(deltaL).toFixed(5)} mm.</Box>
                        <Box borderWidth="2px" borderRadius="1g" width={Big(initialLength).plus(deltaL).toFixed(5) + "px"} bgColor="black">
                        </Box>
                    </Container>
                </Center>
            </GridItem>
            <GridItem colSpan={5}>
                <Chart>
                    <ChartValueAxis>
                        <ChartValueAxisItem>
                            <ChartValueAxisTitle text="Pailgėjimas, Δ mm"/>
                        </ChartValueAxisItem>
                    </ChartValueAxis>
                    <ChartCategoryAxis>
                        <ChartCategoryAxisItem categories={lengths.map((length) => length.temperature)}>
                            <ChartCategoryAxisTitle text="Temperatūra"/>
                        </ChartCategoryAxisItem>
                    </ChartCategoryAxis>
                    <ChartSeries>
                        <ChartSeriesItem type="line" tooltip={{visible: true}}
                                         data={lengths.map((length) => length.length)}/>
                    </ChartSeries>
                </Chart>
            </GridItem>
        </Grid>
    );
}
