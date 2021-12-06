import {Box, Center, Container, Stack, Text} from "@chakra-ui/layout";
import React from "react";
import "katex/dist/katex.min.css";
import {InlineMath, BlockMath} from "react-katex";
import {motion} from "framer-motion";

export const Equations = () => {
    document.title = "Formulės";

    const blockFormula = `\\frac{n!}{k!(n-k)!} = \\binom{n}{k}`;

    const vidutinisIlgejimoKoeficientoPaklaida =
        `\\frac{\\Delta\\alpha}{\\alpha_v}=` +
        `\\Bigg|\\frac{\\Delta{L} _0}{{L}_0}\\Bigg|` +
        `+\\Bigg|\\frac{\\Delta{L} _1}{{L}_1}\\Bigg|` +
        `+\\Bigg|\\frac{\\Delta{\\Big(t_1-t_0\\Big)}}{t_1-t_0}\\Bigg|`;

    const grafikas = `\\Delta{L}=f(t-t_0)`;

    const vidutinisIlgejimoKoeficientas =
        `\\Delta\\alpha\\cong\\alpha=` +
        `\\frac{L_1-L_0}{L_0\\Big(t_1-t_0\\Big)}=` +
        `\\frac{\\Delta{L}}{L_0\\Big(t_1-t_0\\Big)}`;

    return (
        <Container>
            <Stack borderWidth="1px" borderRadius="lg" p={4}>
                <motion.div
                    whileHover={{
                        scale: 1.2,
                        transition: {duration: 0.33},
                    }}
                >
                    <Box borderWidth="1px" borderRadius="lg" bgColor="#ffff">
                        <Text align="center">Vidutinė ilgėjimo koeficiento paklaida</Text>
                        <BlockMath math={vidutinisIlgejimoKoeficientoPaklaida}/>
                    </Box>
                </motion.div>
                <motion.div
                    whileHover={{
                        scale: 1.2,
                        transition: {duration: 0.33},
                    }}
                >
                    <Box borderWidth="1px" borderRadius="lg" bgColor="#ffff">
                        <Text align="center">Medžiagos pailgėjimas nuo temperatūros</Text>
                        <BlockMath math={grafikas}/>
                    </Box>
                </motion.div>
                <motion.div
                    whileHover={{
                        scale: 1.2,
                        transition: {duration: 0.33},
                    }}
                >
                    <Box borderWidth="1px" borderRadius="lg" bgColor="#ffff">
                        <Text align="center">Vidutinis ilgėjimo koeficientas</Text>
                        <BlockMath math={vidutinisIlgejimoKoeficientas}/>
                    </Box>
                </motion.div>
            </Stack>
        </Container>
    );
}
