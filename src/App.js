import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Box } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/button";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link, Switch, Route } from "react-router-dom";
import {Materials} from "./pages/Materials";
import {Equations} from "./pages/Equations";
import { AnimatePresence } from "framer-motion";
import {Home} from "./pages/Home";

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
            <MenuItem>Medžiagų lentelė</MenuItem>
          </Link>
          <Link to="/formules">
            <MenuItem>Formulės</MenuItem>
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
