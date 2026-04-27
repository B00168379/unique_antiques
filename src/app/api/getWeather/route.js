//api/getWeather

export async function GET(req, res) {

  // show message in terminal when API runs
  console.log("in the weather api page")

  // call external weather API for Cork location
  const res2 = await fetch(
    "http://api.weatherapi.com/v1/current.json?key=da17e6185a134348a37111239262504&q=Cork&aqi=no"
  );
  
  // response to JSON
  const data = await res2.json();

  //get actual temperature from API
  console.log(data.current.temp_c);
  
  let currentTemp = data.current.temp_c;

  // return the temperature
  return Response.json({ "temp": currentTemp });
}