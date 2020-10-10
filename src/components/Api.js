export const Api = () => {
  return fetch('https://data.covid19.go.id/public/api/update.json')
    .then((response) => response.json())
    .then((json) => {
      return json.update;
    })
    .catch((error) => {
      console.error(error);
    });
};