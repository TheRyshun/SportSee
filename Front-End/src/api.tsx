import axios from 'axios';

export const getUserData = (id: string) => {
  return axios.get(`http://localhost:3000/user/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Erreur lors de la récupération des données :', error);
      return null;
    });
};

export const getUserActivity = (id: string) => {
  return axios.get(`http://localhost:3000/user/${id}/activity`)
  .then(response => response.data)
  .catch(error => {
    console.error('Erreur lors de la récupération des données :', error);
    return null;
  })
}

export const getUserPerf = (id: string) => {
  return axios.get(`http://localhost:3000/user/${id}/performance`)
  .then(response => response.data)
  .catch(error => {
    console.error('Erreur lors de la récupération des données :', error);
    return null;
  })
}

export const getUserAverageSession = (id: string) => {
  return axios.get(`http://localhost:3000/user/${id}/average-sessions`)
  .then(response => response.data)
  .catch(error => {
    console.error('Erreur lors de la récupération des données :', error);
    return null;
  })
}