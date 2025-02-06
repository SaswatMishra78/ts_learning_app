import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { register } from "swiper/element/bundle";
register();
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import { Container, TextField, Button, Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import Grid from '@mui/material/Grid2';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "./Carousel.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const slides = [
  {
    title: "Schedule automation through FinAlyzer",
    text: "Automate your financial schedules with ease.",
    image: "https://picsum.photos/600/400?random=1",

  },
  {
    title: "Financial Insights in Real-Time",
    text: "Get instant insights into your finances.",
    image: "https://picsum.photos/600/400?random=2",
  },
];

export default function AuthPage() {

  return (

    <Box
      sx={{
        height: "100vh",
        backgroundColor: "primary.main",
      }}
      >
      <Grid container spacing={4}>

        <Grid size={8}>
          <Swiper
            modules={[Navigation, Pagination, EffectCoverflow]}
            navigation
            loop={true}
            className="sample-slider"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <Box className="carousel-card">
                  <img src={slide.image} alt="Slide" className="slide-image" />
                  <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
                    {slide.title}
                  </Typography>
                  <Typography variant="body2">{slide.text}</Typography>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid>


        <Grid size={4}>
          <Box className="login-box"
            sx={{
              backgroundColor: "#fff",
              padding: 4,
              height: "90%",
              margin : '1rem',
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
              Login
            </Typography>
            <TextField fullWidth label="Email" variant="outlined" margin="normal" />
            <TextField fullWidth label="Password" type="password" variant="outlined" margin="normal" />
            <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
              Login
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
