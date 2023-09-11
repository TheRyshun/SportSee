import "./index.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from "recharts";
import { getUserPerf } from "../../api";
import { Box } from "@mui/material";

const PerformanceUser = () => {
  
  type UserData = {
    userId: number;
    kind: {
      [key: number]: string;
    };
    data: {
      data: {
        value: number;
        kind: number;
      }[];
    }
  };

  const { id } = useParams();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    // Check if id exists before making the API call
    if (id) {
      getUserPerf(id).then((data: UserData) => {
        setUserData(data);
      });
    }
  }, [id]);


/**
 * EN : Translates the session type into a corresponding string
 * FR : Traduit le type de séance en une chaîne de caractères correspondante.
 *
 * @param {string | number} kind - Le type de séance à traduire, représenté en tant que chaîne de caractères ou nombre.
 *                               - The type of session to be translated, represented as a string or number
 * 
 * @returns {string | undefined} - La traduction du type de séance, ou undefined si le type n'est pas reconnu.
 *                               - Translation of the session type, or undefined if the type is not recognized
 */

  const translateKind = (kind: string | number) => {
    const kindTranslations: Record<string | number, string> = {
      1: "Cardio",
      2: "Énergie",
      3: "Endurance",
      4: "Force",
      5: "Vitesse",
      6: "Intensité",
    };
    return kindTranslations[kind];
  };
  

  return (
    <>
      {userData && (
        <Box sx={{background: "#282D30", borderRadius: "12px", display: "flex", alignItems: "center"}}>

        <RadarChart
          width={320}
          height={250}
          data={userData.data.data}
        >
          <PolarGrid gridType="polygon" radialLines={false} stroke="white"/>
          <PolarAngleAxis
            dataKey="kind"
            tickFormatter={translateKind}
            tick={{ fontSize: 12, fontWeight: "bold", fontFamily: "Arial" }} 
            stroke="white"
            dy={3}
          />
          <PolarRadiusAxis tick={false} axisLine={false} />
          <Radar
            dataKey="value"
            stroke="#FF0000"
            fill="#FF0000"
            fillOpacity={0.6}
          />
        </RadarChart>
        </Box>
      )}
    </>
  );
};

export default PerformanceUser;
