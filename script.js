function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
sleep(1000);
let map;

    const frameCount = 10; // total intervals
    const startMinutes = -300; // start time offset relative to now, where negative means past
    const endMinutes = 0;

    const AERIS_ID = 'Gtz8cfNMUwkPXQtAzQQRv';
    const AERIS_KEY = 'IxgZG72j3Uo1NlWoKGjLeS2eyBCUlGiub3xo0crT';
    const NUM_COLORS = '256'; // set to empty string for true color png

    const layers = [
        // add more layers!
        'radar',
    ];

    function getTileServer(stepNumber, layers, opacity = 0) {
        const interval = (endMinutes - startMinutes) / frameCount;
        const timeOffset = startMinutes + interval * stepNumber;
        const layerStr = layers.join(",");

        const url = `https://maps{s}.aerisapi.com/${AERIS_ID}_${AERIS_KEY}/${layerStr}/{z}/{x}/{y}/${timeOffset}min.png${NUM_COLORS}`;

        return L.tileLayer(url, {
            subdomains : '1234',
            attribution: '&copy;AerisWeather',
            opacity: opacity
        });
    }
window.addEventListener('load', () => {
 
  document.all["loadScreen"].style.visibility = "visible";
  document.all["mapScreen"].style.visibility = "hidden";
  sleep(2000);
  document.all["mapScreen"].style.visibility = "visible";
  document.all["loadScreen"].style.visibility = "hidden";

  map = L.map('map').setView([43.0362, -76.1363], 15);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  const frames = [];
  for (let i = 0; i < frameCount; i+= 1) {
      const opacity = (i === 0 ) ? 1 : 0;
      frames.push(getTileServer(i, layers, opacity).addTo(map));
  }

  const waitTime = 5000;

  const stepTime = 1000;

  let currentOffset = 0;
  let previousOffset = currentOffset;

  setTimeout(() => {
      setInterval(() => {
          previousOffset = currentOffset;
          currentOffset += 1;
          if (currentOffset === frames.length - 1) {
              currentOffset = 0;
          }
          frames[previousOffset].setOpacity(0)
          frames[currentOffset].setOpacity(1)

      }, stepTime)
  }, waitTime)

})
