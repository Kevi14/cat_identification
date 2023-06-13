import { useState, useRef, useEffect } from "react";
import {
  Box,
  IconButton,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

export default function Carousel({ items, itemsToShow = 1 }) {
  const [activeItem, setActiveItem] = useState(0);
  const [isAutoplaying, setIsAutoplaying] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isAutoplaying) {
      intervalRef.current = setInterval(
        () =>
          setActiveItem((prevItem) =>
            prevItem === items.length - 1 ? 0 : prevItem + 1
          ),
        5000
      );
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isAutoplaying, items]);

  const handlePrevClick = () => {
    setActiveItem((prevItem) =>
      prevItem === 0 ? items.length - 1 : prevItem - 1
    );
    setIsAutoplaying(false);
  };

  const handleNextClick = () => {
    setActiveItem((prevItem) =>
      prevItem === items.length - 1 ? 0 : prevItem + 1
    );
    setIsAutoplaying(false);
  };

  const handleMouseEnter = () => {
    setIsAutoplaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoplaying(true);
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "auto" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IconButton onClick={handlePrevClick} sx={{ display: "block" }}>
          <ArrowBack />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            overflow: "hidden",
            alignItems: "stretch",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {items.slice(activeItem, activeItem + itemsToShow).map((item,index) => (
            <Box
              key={index}
              sx={{
                flexShrink: 0,
                flexGrow: 0,
                width: `${100 / itemsToShow}%`,
              }}
            >
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {item.content}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
        <IconButton onClick={handleNextClick} sx={{ display: "block" }}>
          <ArrowForward />
        </IconButton>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        {items.map((item, index) => (
          <Box
            key={index}
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              bgcolor: index === activeItem ? "primary.main" : "grey.300",
              mx: 1,
              cursor: "pointer",
            }}
            onClick={() => {
              setActiveItem(index);
              setIsAutoplaying(false);
            }}
          />
        ))}
      </Box>
    </Box>
  )}
 
