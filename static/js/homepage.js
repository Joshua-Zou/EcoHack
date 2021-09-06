  const date = new Date;

  let map, heatmap;

async function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: await getIp(),
    mapId: "c26b52ebbe6fd50c"
    //mapTypeId: "satellite",
  });
  heatmap = new google.maps.visualization.HeatmapLayer({
    data: await getPoints(),
    map: map,
  });
    changeGradient()
}

function toggleHeatmap() {
  heatmap.setMap(heatmap.getMap() ? null : map);
}

function changeGradient() {
  const gradient = [
    "rgba(0, 255, 255, 0)",
    "rgba(0, 255, 255, 1)",
    "rgba(0, 191, 255, 1)",
    "rgba(0, 127, 255, 1)",
    "rgba(0, 63, 255, 1)",
    "rgba(0, 0, 255, 1)",
    "rgba(0, 0, 223, 1)",
    "rgba(0, 0, 191, 1)",
    "rgba(0, 0, 159, 1)",
    "rgba(0, 0, 127, 1)",
    "rgba(63, 0, 91, 1)",
    "rgba(127, 0, 63, 1)",
    "rgba(191, 0, 31, 1)",
    "rgba(255, 0, 0, 1)",
  ];
  heatmap.set("gradient", heatmap.get("gradient") ? null : gradient);
}

function changeRadius() {
  heatmap.set("radius", heatmap.get("radius") ? null : 20);
}

function changeOpacity() {
  heatmap.set("opacity", heatmap.get("opacity") ? null : 0.2);
}

async function getPoints() {
  let newData = await fetch("/api/chartData?year="+window.currentYearlookup.toString());
  newData = await newData.json();
  var dataTable = [];
  for (var i = 0; i<newData.data.length; i++){
    console.log(newData.data[i].db)
      dataTable.push({
        location: new google.maps.LatLng(newData.data[i].x, newData.data[i].y,),
        weight: newData.data[i].db/10
      })
  }
  return dataTable;
}

async function getIp(){
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