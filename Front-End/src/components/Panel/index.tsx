import React from "react";
import {
  Box,
  Button,
  Card,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import DashBoard from "../../pages/Dashboard";
import { useParams } from "react-router-dom";

const Panel: React.FC = () => {
  interface DataItem {
    id: string;
    source: string;
  }
  const Data: DataItem[] = [
    {
      id: "1",
      source: "../src/assets/img/nageur.png",
    },
    {
      id: "2",
      source: "../src/assets/img/yoga.png",
    },
    {
      id: "3",
      source: "../src/assets/img/velo.png",
    },
    {
      id: "4",
      source: "../src/assets/img/haltere.png",
    },
  ];

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const isTablet = useMediaQuery("(max-width: 1024px)");

  const SideBarCard: React.FC<DataItem> = ({ id, source }) => {
    return (
      <Card
        sx={{
          paddingX: isTablet ? "16px" : "22px",
          paddingY: isTablet ? "12px" : "18px",
        }}
      >
        <img src={source} key={id} alt="" width={40} />
      </Card>
    );
  };

  // Utilisez useParams pour extraire l'ID de l'URL
  const { id } = useParams<{ id: string }>();

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "black",
          width: isTablet ? "10%" : "7%",
          height: isTablet ? "115vh" : "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "32px",
            marginTop: "100%",
          }}
        >
          {Data.map((item) => (
            <SideBarCard key={item.id} source={item.source} id={item.id} />
          ))}
        </Box>
        <Box
          sx={{
            transform: "rotate(270deg)",
            marginTop: "auto",
            marginBottom: "auto",
            whiteSpace: "nowrap",
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: "white", marginRight: "62px", fontSize: "18px" }}
          >
            Copyright, SportSee 2020
          </Typography>
        </Box>
      </Box>
      {id ? (
        <DashBoard />
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <Box sx={{ marginTop: "123px" }}>
            <Box
              sx={{
                display: "flex",
                background: "rgb(251, 251, 251)",
                paddingBottom: "32px",
                paddingRight: "32px",
                paddingLeft: "32px",
              }}
            >
              <Box
                sx={{
                  background: "rgb(245, 245, 245)",
                  padding: "32px",
                  marginTop: "32px",
                  textAlign: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "14px",
                  }}
                >
                  <Typography
                    variant="body1"
                    color="initial"
                    sx={{ fontSize: "48px" }}
                  >
                    Bienvenue sur
                  </Typography>
                  <Typography
                    variant="body1"
                    color="initial"
                    sx={{ color: "red", fontSize: "48px" }}
                  >
                    SportSee
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  color="initial"
                  sx={{ marginTop: "20%", fontSize: "24px" }}
                >
                  Choisissez un utilisateur ci-dessous pour accéder au tableau
                  de bord
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "32px",
                    marginTop: "32px",
                  }}
                >
                  <Link to="/user/12">
                    <Button
                      variant="text"
                      color="primary"
                      sx={{
                        paddingRight: "42px",
                        paddingLeft: "42px",
                        border: "2px solid red",
                        borderRadius: "12px",
                        color: "black",
                        background: "rgb(250, 150, 150)",
                        "&:hover": {
                          background: "rgb(250, 150, 150)",
                          boxShadow: "1px 1px 12px rgba(0, 0, 0, 1)",
                        },
                      }}
                    >
                      Karl : 12
                    </Button>
                  </Link>
                  <Link to="/user/18">
                    <Button
                      variant="text"
                      color="primary"
                      sx={{
                        paddingRight: "42px",
                        paddingLeft: "42px",
                        border: "2px solid red",
                        borderRadius: "12px",
                        color: "black",
                        background: "rgb(250, 150, 150)",
                        "&:hover": {
                          background: "rgb(250, 150, 150)",
                          boxShadow: "1px 1px 12px rgba(0, 0, 0, 1)",
                        },
                      }}
                    >
                      Cecilia : 18
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Panel;
