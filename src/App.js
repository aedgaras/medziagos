import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Box } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/button";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link, Switch, Route } from "react-router-dom";
import Materials from "./pages/Materials";
import Home from "./pages/Home";
import Equations from "./pages/Equations";
import { AnimatePresence } from "framer-motion";

function App() {
  return (
    <Box pt={3} px={3}>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          variant="outline"
        />
        <MenuList>
          <Link to="/">
            <MenuItem>Pagrindinis</MenuItem>
          </Link>
          <Link to="/medziagos">
            <MenuItem>Medziagu Lentele</MenuItem>
          </Link>
          <Link to="/formules">
            <MenuItem>Formules</MenuItem>
          </Link>
        </MenuList>
      </Menu>

      <AnimatePresence exitBeforeEnter initial={false}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/medziagos">
            <Materials />
          </Route>
          <Route exact path="/formules">
            <Equations />
          </Route>
        </Switch>
      </AnimatePresence>
    </Box>
  );
}

export default App;
