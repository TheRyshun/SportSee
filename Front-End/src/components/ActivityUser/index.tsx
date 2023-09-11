import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { getUserActivity } from "../../api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import isScreenSmall from "../../isScreenSmall";

type UserData = {
  data: {
    sessions: {
      day: string;
      kilogram: number;
      calories: number;
    }[];
  };
};

const ActivityUser = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    // Check if id exists before making the API call
    if (id) {
      getUserActivity(id).then((data: UserData) => {
        setUserData(data);
      });
    }
  }, [id]);

  /**
   * FR : Récupère le jour à partir d'une chaîne de date au format "AAAA-MM-JJ".
   * EN : Retrieves the day from a date string in "YYYY-MM-DD" format.
   *
   * @param {string} day - La chaîne de date au format "AAAA-MM-JJ".
   *                     - The date string in "YYYY-MM-DD" format.
   *
   * @returns {string} - Le jour extrait de la chaîne de date.
   *                   - The day extracted from the date string
   */

  const formatDay = (day: string) => {
    return day.split("-")[2];
  };

  let minKilos = 0;
  let maxKilos = 0;
  let minCalories = 0;
  let maxCalories = 0;

  if (userData) {
    // Extraction des poids (kilogrammes) de chaque session
    const kilos = userData.data.sessions.map((session) => session.kilogram);

    // Extraction des calories de chaque session
    const calories = userData.data.sessions.map((session) => session.calories);

    // Calcul des valeurs minimales et maximales pour les poids (kilogrammes)
    minKilos = Math.min(...kilos);
    maxKilos = Math.max(...kilos);

    // Calcul des valeurs minimales et maximales pour les calories
    minCalories = Math.min(...calories);
    maxCalories = Math.max(...calories);
  }

  return (
    <>
      <Box
        sx={{ background: "#FBFBFB", padding: "32px", borderRadius: "12px" }}
      >
        <Box sx={{ display: "flex", marginBottom: "62px" }}>
          <Box>
            <Typography
              variant="body1"
              color="initial"
              sx={{ fontWeight: "bold" }}
            >
              Activité quotidienne
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              marginLeft: "auto",
              alignItems: "center",
              gap: "62px",
            }}
          >
            <Typography
              variant="body1"
              color="initial"
              sx={{ display: "flex", alignItems: "center", gap: "4px" }}
            >
              <span>&#9899;</span>
              Poids (kg)
            </Typography>
            <Typography variant="body1" color="initial">
              <span>&#128308;</span>
              Calories brûlées (kCal)
            </Typography>
          </Box>
        </Box>
        {userData && (
          <BarChart
            width={isScreenSmall() ? 740 : 880}
            height={250}
            data={userData.data.sessions}
          >
            <CartesianGrid strokeDasharray="2" vertical={false} />
            <XAxis
              dataKey="day"
              tickFormatter={formatDay}
              axisLine={{ stroke: "#DEDEDE", strokeWidth: 2 }}
              tick={{ fill: "#9B9EAC" }}
              tickLine={false}
              tickMargin={12}
            />
            <YAxis
              yAxisId="kilogram"
              orientation="right"
              tick={{ fill: "#9B9EAC" }}
              tickMargin={32}
              tickLine={false}
              axisLine={false}
              tickCount={3}
              domain={[minKilos - 1, maxKilos]}
            />
            <YAxis
              yAxisId="calories"
              orientation="left"
              hide={true}
              domain={[minCalories - 100, maxCalories]}
            />
            <Tooltip
              wrapperStyle={{
                backgroundColor: "red",
                paddingLeft: "12px",
                paddingRight: "12px",
                paddingTop: "22px",
                paddingBottom: "22px",
              }}
              content={({ payload }) => {
                if (payload && payload.length > 0) {
                  const { calories, kilogram } = payload[0].payload;
                  return (
                    <div>
                      <Typography
                        variant="body1"
                        sx={{ color: "white", fontSize: "14px" }}
                      >{`${kilogram}kg`}</Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: "white",
                          fontSize: "14px",
                          marginTop: "22px",
                        }}
                      >{`${calories} Kcal`}</Typography>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar
              yAxisId="kilogram"
              dataKey="kilogram"
              barSize={10}
              radius={[20, 20, 0, 0]}
              fill="#282D30"
              name=" "
            />
            <Bar
              yAxisId="calories"
              dataKey="calories"
              barSize={10}
              radius={[20, 20, 0, 0]}
              fill="#E60000"
              name=" "
            />
          </BarChart>
        )}
      </Box>
    </>
  );
};

export default ActivityUser;
