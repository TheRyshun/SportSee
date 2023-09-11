import { useParams } from "react-router-dom";
import { getUserAverageSession } from "../../api";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Rectangle,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Box, Typography } from "@mui/material";
import isScreenSmall from "../../isScreenSmall";

const formatDayOfWeek = (day: number) => {
  const daysOfWeek = ["L", "M", "M", "J", "V", "S", "D"];
  return daysOfWeek[day - 1];
};

interface CustomCursorProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  points: any[];
  width: number;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ points, width }) => {
  return (
    <Rectangle
      fill="#000000"
      opacity={0.1}
      x={points[0]}
      width={width}
      height={288}
    />
  );
};

const DurationAverage = () => {

  type UserData = {
    data: {
      sessions: [] | undefined
      day: number;
      sessionLength: number;
    };
  };
  
  const { id } = useParams();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    // Check if id exists before making the API call
    if (id) {
      getUserAverageSession(id).then((data: UserData) => {
        setUserData(data);
      });
    }
  }, [id]);

  return (
    <>
      {userData && (
        <>
          <Box
            sx={{
              background: "#F90300",
              borderRadius: "12px",
            }}
          >
            <LineChart
              margin={{ top: 70, right: 10, left: 10, bottom: 0 }}
              width={isScreenSmall() ? 220 : 280}
              height={250}
              data={userData.data.sessions}
            >
              <CartesianGrid vertical={false} horizontal={false} />
              <XAxis
                dataKey="day"
                tickFormatter={formatDayOfWeek}
                axisLine={false}
                tickLine={false}
                stroke="white"
                fontFamily="Arial"
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                type="number"
                hide={true}
              />

              <Tooltip
                cursor={<CustomCursor points={[ ]} width={288} />}
                wrapperStyle={{
                  backgroundColor: "white",
                  paddingLeft: "12px",
                  paddingRight: "12px",
                  paddingTop: "18px",
                  paddingBottom: "18px",
                }}
                content={({ payload }) => {
                  if (payload && payload.length > 0) {
                    const { sessionLength } = payload[0].payload;
                    return (
                      <div>
                        <Typography
                          variant="body1"
                          sx={{ color: "black", fontSize: "14px" }}
                        >{`${sessionLength} min`}</Typography>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="sessionLength"
                stroke="white"
                strokeWidth={2}
                dot={false}
              />
              <text
                x={32}
                y={32}
                fontSize={15}
                textAnchor="start"
                fill="white"
                fontFamily="Arial"
              >
                <tspan x={isScreenSmall() ? 8 : 24} dy="0">
                  Durée moyenne
                </tspan>
                <tspan x={isScreenSmall() ? 8 : 24} dy="1.5em">
                  des sessions
                </tspan>
              </text>
            </LineChart>
          </Box>
        </>
      )}
    </>
  );


};
export default DurationAverage;
