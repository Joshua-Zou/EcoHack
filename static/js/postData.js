async function postData(decibals) {
  let ip = await getIp();
  let level = 0;
  decibals = Number(decibals)
  if (decibals === 0) return "That wasn't a valid number!"
  if (decibals < 50) level = 1;
  else if (decibals < 60) level = 2;
  else if (decibals < 63) level = 3;
  else if (decibals < 65) level = 4
  else if (decibals < 68) level = 5;
  else if (decibals < 71) level = 6;
  else if (decibals < 74) level = 7;
  else if (decibals < 77) level = 8;
  else if (decibals < 80) level = 9;
  else if (decibals < 120) level = 10;
  else return "That wasn't a valid number!"


  if (decibals < 0) return "That wasn't a valid number!"

  let results = await fetch("/api/newData", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "location": {
        "x": ip.lat,
        "y": ip.lng
      },
      "db": level
    })
  });
  results = await results.text();
  return results;
}


async function getIp() {
  let ip = await fetch("https://jsonip.com/");
  ip = await ip.json();
  ip = ip.ip;
  let location = await fetch(`https://ipapi.co/${ip}/json/`);
  location = await location.json();
  let lat = location.latitude;
  let long = location.longitude;
  let data = {
    lat: lat,
    lng: long
  };
  return data;
}