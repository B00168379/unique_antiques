export async function GET(req, res) {

  // Make a note we are on the api
  console.log("in the weather api page")

  const res2 = await fetch(
    "http://api.weatherapi.com/v1/current.json?key=da17e6185a134348a37111239262504&q=Cork&aqi=no"
  );

  const data = await res2.json();

  console.log(data.current.temp_c);

  let currentTemp = data.current.temp_c;

  // return the temperature
  return Response.json({ "temp": currentTemp });
}