import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { RadialBar, RadialBarChart, PolarAngleAxis } from "recharts";
import { getUserData } from "../../api";
import { Box, Typography } from "@mui/material";
import isScreenSmall from "../../isScreenSmall";
import { MockGET_UserMainDAta } from "../../getMock";
import { APIMODEMOCK } from "../../App";

type UserData = {
  data: {
    score: number;
    todayScore: number;
  };
};

const ScoreUser = () => {
  const { id } = useParams();

  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (id) {
      if (APIMODEMOCK) {
        const userId = parseInt(id);
        const MockuserData = MockGET_UserMainDAta(userId);
        if (MockuserData) {
          setUserData(MockuserData);
        } else {
          console.log("Utilisateur non trouvé (ScoreUser)");
        }
      } else {
        getUserData(id).then((data) => {
          setUserData(data);          
        });
      }
    }
  }, [id]);

  /**
   * Cette section de code détermine le score de l'utilisateur en fonction des données fournies.
   * Si `userData` est défini, il vérifie si `userData.data.score` est défini.
   * Si oui, il utilise `userData.data.score` comme score. Sinon, il utilise `userData.data.todayScore`.
   *
   * This code section determines the user's score based on the data provided.
   * If `userData` is defined, it checks whether `userData.data.score` is defined.
   * If so, it uses `userData.data.score` as the score. If not, it uses `userData.data.todayScore`.
   */

  let score = 0;

  if (userData) {
    score =
      userData.data.score !== undefined
        ? userData.data.score
        : userData.data.todayScore;
  }

  /**
   * Cette section de code crée un objet `userScoreData` basé sur le score de l'utilisateur.
   * Si `userData` est défini, il crée un objet contenant le score multiplié par 100 et une couleur de remplissage.
   * Sinon, il initialise `userScoreData` comme un tableau vide.
   *
   * This code section creates a `userScoreData` object based on the user's score.
   * If `userData` is defined, it creates an object containing the score multiplied by 100 and a fill color.
   * Otherwise, it initializes `userScoreData` as an empty array.
   *
   * @param {Object} userData - Les données de l'utilisateur pouvant contenir le score / User data can contain the score
   * @param {number} score - Le score de l'utilisateur utilisé pour créer `userScoreData` / The user score used to create `userScoreData`
   * @returns {Array} - Un tableau contenant un objet avec le score multiplié par 100 et une couleur de remplissage
   *                  - An array containing an object with the score multiplied by 100 and a fill color
   */

  const userScoreData = userData
    ? [
        {
          score: score * 100,
          fill: "#FF0101",
        },
      ]
    : [];

  return (
    <>
      {userData && (
        <Box
          sx={{ background: "#FBFBFB", padding: "12px", borderRadius: "12px" }}
        >
          <Typography
            variant="body1"
            color="initial"
            sx={{ fontWeight: "bold" }}
          >
            Score
          </Typography>
          <RadialBarChart
            width={isScreenSmall() ? 180 : 260}
            height={200}
            data={userScoreData}
            startAngle={90}
            endAngle={450}
            innerRadius="100%"
            barSize={12}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar cornerRadius={20} dataKey="score" />
            <circle cx="50%" cy="50%" r={isScreenSmall() ? "62" : "70"} fill="white" />
            <text y="43%" textAnchor="middle" fontSize={16}>
              <tspan
                x="50%"
                fontSize="24px"
                fontFamily="arial"
                fontWeight="bold"
              >
                {`${score * 100}%`}
              </tspan>
              <tspan
                x="50%"
                dy="25px"
                fontSize="18px"
                fontFamily="arial"
                fill="#74798C"
              >
                de votre
              </tspan>
              <tspan
                x="50%"
                dy="20px"
                fontSize="18px"
                fontFamily="arial"
                fill="#74798C"
              >
                objectif
              </tspan>
            </text>
          </RadialBarChart>
        </Box>
      )}
    </>
  );
};

export default ScoreUser;
