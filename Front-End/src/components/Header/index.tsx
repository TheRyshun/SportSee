import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import { Box, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";

const header = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const isTablet = useMediaQuery("(max-width: 1024px)"); // Adaptez la résolution à celle d'une tablette

  return (
    <>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "black",
          paddingY: "22px",
        }}
      >
        <Box sx={{ marginLeft: "10px" }}>
          <img src="../src/assets/img/logo.png" alt="" height={"64px"} />
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: isTablet ? "100px" : "350px",
            color: "white",
            marginBottom: "3px",
            marginRight: isTablet ? "20px" : "92px",
          }}
        >
          <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
            <Typography variant="h5" sx={{ cursor: "pointer" }}>
              Accueil
            </Typography>
          </Link>

          <Typography variant="h5" sx={{ cursor: "pointer" }}>
            Profil
          </Typography>

          <Typography variant="h5" sx={{ cursor: "pointer" }}>
            Réglage
          </Typography>
          <Typography variant="h5" sx={{ cursor: "pointer" }}>
            Communauté
          </Typography>
        </Box>
      </Toolbar>
    </>
  );
};

export default header;
