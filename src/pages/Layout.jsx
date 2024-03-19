import { ChakraProvider } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

function Layout () {
    return (
        <ChakraProvider>
            <Outlet></Outlet>
        </ChakraProvider>
    )
}

export default Layout;