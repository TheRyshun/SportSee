import { Box, Typography } from "@mui/material";
import CardNutrition from "../components/CardNutrition";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserData } from "../api";
import ActivityUser from "../components/ActivityUser";
import ScoreUser from "../components/ScoreUser";
import PerformanceUser from "../components/PerformanceUser";
import DurationAverage from "../components/DurationAverage";
import isScreenSmall from "../isScreenSmall";

type UserData = {
  data: {
    userInfos: {
      firstName: string;
    };
  };
};

const DashBoard = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    // Check if id exists before making the API call
    if (id) {
      getUserData(id).then((data: UserData) => {
        setUserData(data);
      });
    }
  }, [id]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          paddingTop: "42px",
          paddingLeft: isScreenSmall() ? "32px" : "102px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "22px",
            marginBottom: "42px",
          }}
        >
          <Typography
            variant="body1"
            color="initial"
            sx={{ fontSize: "48px", fontWeight: "bold" }}
          >
            {userData && (
              <>
                Bonjour{" "}
                <span style={{ color: "red" }}>
                  {userData.data.userInfos.firstName}
                </span>
              </>
            )}
          </Typography>
          <Typography variant="body1" color="initial" sx={{ fontSize: "18px" }}>
            Félicitation ! Vous avez explosé vos objectifs hier 👏
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: "62px" }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "62px" }}>
            <ActivityUser />
            <Box sx={{ display: "flex", background: "", gap: "32px" }}>
              <DurationAverage />
              <PerformanceUser />
              <ScoreUser />
            </Box>
            {isScreenSmall() ? (
              <>
                <Box
                
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <CardNutrition />
                </Box>
              </>
            ) : (
              <></>
            )}
          </Box>
          {isScreenSmall() ? (
            <></>
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "32px",
                }}
              >
                <CardNutrition />
              </Box>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}

export default DashBoard;
