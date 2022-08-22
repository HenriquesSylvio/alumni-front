import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import ResponsiveAppBar from './ResponsiveAppBar/ResponsiveAppBar';
import {Box} from "@mui/system";
import ButtonSearch from "./Header/Search/ButtonSearch";
import IconProfilePicture from "./Header/IconProfilePicture";
import SignInButton from "./Header/LoginRegister/SignInButton";
class Layout extends React.Component {
    render() {
        return (
            <>
                <Header />
                <main>{this.props.children}</main>
                <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                    <ResponsiveAppBar />
                </Box>

                {/*<Footer />*/}
            </>
        );
    }
}
export default Layout;
