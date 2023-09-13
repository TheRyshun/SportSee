import { USER_MAIN_DATA, USER_ACTIVITY, USER_PERFORMANCE, USER_AVERAGE_SESSIONS } from "../data";

export const MockGET_UserMainDAta = (userId: number) => {
    const user = USER_MAIN_DATA.find((userData: { id: number; }) => userData.id === userId);
    if (user) {
        return {
            data : {
                id: user.id,
                userInfos: user.userInfos,
                todayScore: user.todayScore,
                score: user.score,
                keyData: user.keyData,
            }
        };
    } else {
        return null;
    }
}

export const MockGET_User_Activity = (userId: number) => {
    const user = USER_ACTIVITY.find((userData: { userId: number; }) => userData.userId === userId);
    if (user) {
        return {
            data: {
                userId: user.userId,
                sessions: user.sessions,
            }
        };
    } else {
        return null;
    }
}

export const MockGET_User_Performance = (userId: number) => {
    const user = USER_PERFORMANCE.find((userData: { userId: number; }) => userData.userId === userId);
    if (user) {
        return {
            userId: user.userId,
            kind: user.kind,
            data: {
                data: user.data,
            },
        };
    } else {
        return null;
    } 
}

export const MockGET_User_Average_Sessions = (userId: number) => {
    const user = USER_AVERAGE_SESSIONS.find((userData: { userId: number; }) => userData.userId === userId);
    if (user) {
        return {
           data: {
            userId: user.userId,
            sessions: user.sessions,
            day: user.day,
            sessionLength: user.sessionLength,
            },
        };
    } else {
        return null;
    } 
}
