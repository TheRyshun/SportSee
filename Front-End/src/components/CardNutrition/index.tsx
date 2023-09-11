import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserData } from "../../api";
import isScreenSmall from "../../isScreenSmall";


const CardNutrition = () => {

  interface UserData {
    data: {
      keyData: {
        calorieCount: number;
        proteinCount: number;
        carbohydrateCount: number;
        lipidCount: number;
      };
    };
  }
  
  const { id } = useParams();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (id) {
      getUserData(id).then((data) => {
        setUserData(data);
      });
    }
  }, [id]);


  interface DataItem {
    id: string;
    source: string;
    quantity: number;
    valeur: string;
    type: string;
  }
  const Data: DataItem[] = [
    {
      id: "1",
      source: "../src/assets/img/calories-icon.png",
      quantity: userData?.data?.keyData?.calorieCount || 0,
      valeur: "kCal",
      type: "Calories",
    },
    {
      id: "2",
      source: "../src/assets/img/protein-icon.png",
      quantity: userData?.data?.keyData?.proteinCount || 0,
      valeur: "g",
      type: "Protéines",
    },
    {
      id: "3",
      source: "../src/assets/img/carbs-icon.png",
      quantity: userData?.data?.keyData?.carbohydrateCount || 0,
      valeur: "g",
      type: "Glucides",
    },
    {
      id: "4",
      source: "../src/assets/img/fat-icon.png",
      quantity: userData?.data?.keyData?.lipidCount || 0,
      valeur: "g",
      type: "Lipides",
    },
  ];

  const Card: React.FC<DataItem> = ({ id, source, quantity, valeur, type }) => {
    return (
      <Box
        key={id}
        sx={{
          background: "#FBFBFB",
          paddingX: isScreenSmall() ? "16px" : "42px",
          paddingY: isScreenSmall() ? "16px" : "0px",

          display: "flex",
          justifyContent:"space-evenly",
          alignItems: "center",
          borderRadius: "12px",
          gap: "16px",
          height: isScreenSmall() ? "60%" : "100%",
        }}
      >
        <img src={source} height={isScreenSmall() ? "50px" : "60px"} alt="" />
        <Box>
          <Typography
            variant="body1"
            color="initial"
            sx={{ fontWeight: "bold", fontSize: "20px" }}
          >
            {quantity + valeur}
          </Typography>
          <Typography
            variant="body1"
            color="initial"
            sx={{ color: "#74798C", fontSize: "14px" }}
          >
            {type}
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <>
      {Data.map((item) => (
        <Card key={item.id} source={item.source} quantity={item.quantity} valeur={item.valeur} type={item.type} id={item.id} />
      ))}
    </>
  );
  
};

export default CardNutrition;
