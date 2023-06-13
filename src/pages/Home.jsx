import React from "react";
import { AppBar, Avatar, Toolbar, Menu, MenuItem, Typography, Box, Button, Container, Grid } from "@mui/material";
import Carousel from "../components/Carousel";
import { useNavigate } from "react-router-dom";
const items = [
    {
        title: "Item 1",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
        title: "Item 2",
        content: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
        title: "Item 3",
        content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    },
];





function HeroSection() {
    const navigate = useNavigate()
    const  goToIdentify = () =>{
        navigate("/identify")
    }
    return (
        <Box
            sx={{
                bgcolor: "background.paper",
                pt: 8,
                pb: 6,
            }}
        >
            <Container maxWidth="sm" onClick={() => navigate("/")} >
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    Welcome to Cats AI
                </Typography>
                <Typography
                    variant="h5"
                    align="center"
                    color="text.secondary"
                    paragraph
                >
                    We use advanced AI algorithms to identify different breeds of cats.
                </Typography>

                <Box sx={{ pt: 4 }}>
                    <Button onClick={goToIdentify} variant="contained" size="large">
                        Get Started
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}

function FeaturesSection() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h4" gutterBottom>
                        Key Features
                    </Typography>
                    <Typography gutterBottom>
                        Our AI algorithm uses advanced machine learning techniques to identify
                        different breeds of cats based on their physical characteristics. With
                        our app, you can easily upload a picture of a cat and get accurate
                        results in seconds. Whether you're a cat lover, breeder, or just
                        curious, our app is the perfect tool for you.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    {/* Add an image or video to showcase the app */}
                </Grid>
            </Grid>
        </Box>
    );
}


export default function Home() {
    return (
        <>
            <HeroSection />

            <Container>
                <FeaturesSection />
            </Container>

            <Carousel items={items} />
        </>
    )
}