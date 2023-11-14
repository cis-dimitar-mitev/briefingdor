"use client";

import React from 'react';
import {
    AppBar,
    Link,
    Container,
    Typography,
    Toolbar,
    Box,
} from '@mui/material';
import NextLink from "next/link";
import styles from '../page.module.css'

const Navbar = () => {
    return (
        <AppBar position="static" style={{ background: '#00607A'}}>
            <Container maxWidth="xl" style={{ paddingLeft: "0" }}>
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
                        <Link component={NextLink} href="/" className={styles.navLink}>
                            Home
                        </Link>
                        <Link component={NextLink} href="/history" className={styles.navLink}>
                            History
                        </Link>
                    </Box>

                    <Box>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'flex' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: '#fc5b08',
                                textDecoration: 'none',
                            }}
                        >
                            Briefingdor AI Proofreader
                        </Typography>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;