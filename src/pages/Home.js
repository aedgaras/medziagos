import {Center, Container} from "@chakra-ui/layout";
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
import {all, create} from "mathjs";

export const Home = () => {
    document.title = "Pagrindinis";

    const [temperatureStep, setTemperatureStep] = useState(5);
    const [initialLength, setInitialLength] = useState(3630);
    const [materialCoefficient, setMaterialCoefficient] = useState(0);
    const [initialTemperature, setInitialTemperature] = useState(26);
    const [currentHeatedTemperature, setCurrentHeatedTemperature] = useState(initialTemperature);
    const [goalTemperature, setGoalTemperature] = useState(70);
    const [heating, setHeating] = useState(false);
    const [lengths, setLengths] = useState([]);

    useEffect(() => {
        if (heating && currentHeatedTemperature < goalTemperature) {
            setTimeout(() => {
                let newTemperature = currentHeatedTemperature + temperatureStep;
                setLengths([...lengths, {temperature: newTemperature, length: calculateDeltaT(newTemperature)}]);
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
        // TODO suapvalina reiksmes, neina normaliai apskaiciuoti
        // 3630*(10^-3)*(1+16.5*(10^-6)*44 - pavyzdys pagal musu labora, kai temp. skirtumas 44 laipsniai

        const math = create(all, {
            number: 'BigNumber',
            precision: 20
        })

        let L0 = math.multiply(initialLength, math.pow(10, -3));
        let temperaturesDiff = math.subtract(heatedTemperature, initialTemperature);
        let exactCoefficient = math.multiply(materialCoefficient, math.pow(10, -6));
        let multiplicationInParentheses = math.multiply(exactCoefficient, temperaturesDiff);
        console.log(L0);
        console.log(temperaturesDiff);
        console.log(exactCoefficient);
        console.log(multiplicationInParentheses);

        let result = math.multiply(L0, math.sum(1, multiplicationInParentheses));
        console.log(result);
        return result;
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
                        <FormControl>
                            <Button disabled={heating && ('disabled')}
                                    onClick={() => startHeating()}>Start</Button>
                        </FormControl>
                    </Container>
                </Center>
            </GridItem>
            <GridItem colSpan={5}>
                <Chart>
                    <ChartValueAxis>
                        <ChartValueAxisItem>
                            <ChartValueAxisTitle text="Strypo ilgis mm"/>
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
