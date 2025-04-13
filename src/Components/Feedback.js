import React, { useState, useEffect } from "react";
import {
  Rating,
  Box,
  Typography,
  Paper,
  Container,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// Import the JSON file from assets
import feedbackData from "../assets/feedbacks.json";

// Styled components
const FeedbackContainer = styled(Container)(({ theme }) => ({
  direction: "rtl",
  padding: theme.spacing(3),
  maxWidth: 800,
  margin: "0 auto",
  position: "relative",
}));

const FeedbackHeading = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem",
  fontWeight: 700,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(4),
  textAlign: "center",
  position: "relative",
  fontFamily: "'Heebo', sans-serif",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: -10,
    left: "50%",
    transform: "translateX(-50%)",
    width: 70,
    height: 3,
    backgroundColor: "#000",
    borderRadius: 2,
  },
}));

const SliderWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  marginBottom: theme.spacing(3),
}));

const TestimonialCard = styled(Paper)(({ theme }) => ({
  borderRadius: 12,
  height: "100%",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.06)",
  backgroundColor: "#fff",
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    boxShadow: "0 12px 25px rgba(0, 0, 0, 0.08)",
  },
  maxWidth: 320,
  margin: "0 auto",
  animation: "fadeIn 0.5s ease-in-out",
  "@keyframes fadeIn": {
    "0%": {
      opacity: 0,
      transform: "translateY(10px)",
    },
    "100%": {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
}));

const StyledRating = styled(Rating)(({ theme }) => ({
  marginBottom: theme.spacing(1.5),
  "& .MuiRating-iconFilled": {
    color: "#FFD700",
  },
  fontSize: "1.4rem",
}));

const TestimonialText = styled(Typography)(({ theme }) => ({
  fontSize: "0.9rem",
  lineHeight: 1.6,
  marginBottom: theme.spacing(2.5),
  textAlign: "center",
  padding: "0 8px",
  fontStyle: "italic",
  color: theme.palette.text.secondary,
  minHeight: 80,
  maxHeight: 120,
  overflow: "hidden",
  display: "-webkit-box",
  WebkitLineClamp: 5,
  WebkitBoxOrient: "vertical",
}));

const CustomerImage = styled(Box)(({ theme }) => ({
  width: "100%",
  height: 240,
  maxWidth: "60%",
  borderRadius: 10,
  marginBottom: theme.spacing(1.5),
  overflow: "hidden",
  boxShadow: "0 6px 16px rgba(0, 0, 0, 0.12)",
  border: "2px solid #7e7e7e",
  outline: `1px solid ${theme.palette.grey[200]}`,
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
}));

const CustomerName = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginTop: theme.spacing(0.5),
}));

const NavigationButton = styled(IconButton)(({ theme, direction }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  // Correct the positioning for RTL layout
  right: direction === "next" ? "-30px" : "auto",
  left: direction === "next" ? "auto" : "-30px",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  zIndex: 10,
  [theme.breakpoints.down("sm")]: {
    right: direction === "next" ? "-15px" : "auto",
    left: direction === "next" ? "auto" : "-15px",
  },
}));

const IndicatorsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
}));

const Indicator = styled(Box)(({ theme, active }) => ({
  width: 8,
  height: 8,
  borderRadius: "50%",
  backgroundColor: active
    ? theme.palette.primary.main
    : theme.palette.grey[300],
  transition: "background-color 0.3s ease",
  cursor: "pointer",
}));

// Main FeedbackSlider Component
const FeedbackSlider = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [heading, setHeading] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    // Load data from the imported JSON file
    setFeedbacks(feedbackData.feedbacks);
    setHeading(feedbackData.heading);
  }, []);

  useEffect(() => {
    let interval;

    if (autoplay && feedbacks.length > 0) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % feedbacks.length);
      }, 6000); // Change slide every 2 seconds
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoplay, feedbacks.length]);

  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? feedbacks.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % feedbacks.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Render no slides if data isn't loaded yet
  if (feedbacks.length === 0) {
    return null;
  }

  const feedback = feedbacks[currentIndex];

  return (
    <FeedbackContainer>
      <FeedbackHeading variant="h4">{heading}</FeedbackHeading>

      <SliderWrapper
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Corrected arrow placement for RTL layout */}
        <NavigationButton
          direction="prev"
          onClick={goToPrevious}
          aria-label="הקודם"
          size="small"
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </NavigationButton>

        <TestimonialCard elevation={2} key={feedback.id}>
          <StyledRating
            name={`feedback-rating-${feedback.id}`}
            value={feedback.rating}
            readOnly
            precision={0.5}
          />
          <TestimonialText>"{feedback.text}"</TestimonialText>

          <CustomerImage>
            <img
              src={require(`../assets/images/${feedback.image}`)}
              alt={`תמונת לקוח - ${feedback.name}`}
              loading="lazy"
            />
          </CustomerImage>

          <CustomerName>{feedback.name}</CustomerName>
        </TestimonialCard>

        <NavigationButton
          direction="next"
          onClick={goToNext}
          aria-label="הבא"
          size="small"
        >
          <ArrowForwardIosIcon fontSize="small" />
        </NavigationButton>
      </SliderWrapper>

      <IndicatorsContainer>
        {feedbacks.map((_, index) => (
          <Indicator
            key={index}
            active={currentIndex === index}
            onClick={() => goToSlide(index)}
          />
        ))}
      </IndicatorsContainer>
    </FeedbackContainer>
  );
};

export default FeedbackSlider;
