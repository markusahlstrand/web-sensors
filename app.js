function handleOrientation(event) {
  updateFieldIfNotNull("Orientation_a", event.alpha);
  updateFieldIfNotNull("Orientation_b", event.beta);
  updateFieldIfNotNull("Orientation_g", event.gamma);
  incrementEventCount();

  data_a[0].value = event.alpha;
  data_b[0].value = event.beta;
  data_g[0].value = event.gamma;
  Plotly.redraw("orientation_a_gauge");
  Plotly.redraw("orientation_b_gauge");
  Plotly.redraw("orientation_g_gauge");
}

function incrementEventCount() {
  let counterElement = document.getElementById("num-observed-events");
  let eventCount = parseInt(counterElement.innerHTML);
  counterElement.innerHTML = eventCount + 1;
}

function updateFieldIfNotNull(fieldName, value, precision = 10) {
  if (value != null)
    document.getElementById(fieldName).innerHTML = value.toFixed(precision);
}

function handleMotion(event) {
  updateFieldIfNotNull(
    "Accelerometer_gx",
    event.accelerationIncludingGravity.x
  );
  updateFieldIfNotNull(
    "Accelerometer_gy",
    event.accelerationIncludingGravity.y
  );
  updateFieldIfNotNull(
    "Accelerometer_gz",
    event.accelerationIncludingGravity.z
  );

  updateFieldIfNotNull("Accelerometer_x", event.acceleration.x);
  updateFieldIfNotNull("Accelerometer_y", event.acceleration.y);
  updateFieldIfNotNull("Accelerometer_z", event.acceleration.z);

  updateFieldIfNotNull("Accelerometer_i", event.interval, 2);

  updateFieldIfNotNull("Gyroscope_z", event.rotationRate.alpha);
  updateFieldIfNotNull("Gyroscope_x", event.rotationRate.beta);
  updateFieldIfNotNull("Gyroscope_y", event.rotationRate.gamma);
  incrementEventCount();
}

let is_running = false;
let demo_button = document.getElementById("start_demo");
demo_button.onclick = function (e) {
  e.preventDefault();

  // Request permission for iOS 13+ devices
  if (
    DeviceMotionEvent &&
    typeof DeviceMotionEvent.requestPermission === "function"
  ) {
    DeviceMotionEvent.requestPermission();
  }

  if (is_running) {
    window.removeEventListener("devicemotion", handleMotion);
    window.removeEventListener("deviceorientation", handleOrientation);
    demo_button.innerHTML = "Start demo";
    demo_button.classList.add("btn-success");
    demo_button.classList.remove("btn-danger");
    is_running = false;
  } else {
    window.addEventListener("devicemotion", handleMotion);
    window.addEventListener("deviceorientation", handleOrientation);
    document.getElementById("start_demo").innerHTML = "Stop demo";
    demo_button.classList.remove("btn-success");
    demo_button.classList.add("btn-danger");
    is_running = true;
  }
};

const baseData = {
  domain: { x: [0, 1], y: [0, 1] },
  gauge: {
    axis: { range: [-90, 90] },
  },
  value: 0,
  type: "indicator",
  mode: "gauge+number",
};

const data_a = [
  {
    ...baseData,
    title: { text: "Orientation A" },
  },
];

const data_b = [
  {
    ...baseData,
    title: { text: "Orientation B" },
  },
];

const data_g = [
  {
    ...baseData,
    title: { text: "Orientation G" },
  },
];

const layout = { width: 300, height: 250, margin: { t: 0, b: 0 } };
Plotly.newPlot("orientation_g_gauge", data_b, layout);
Plotly.newPlot("orientation_b_gauge", data_b, layout);
Plotly.newPlot("orientation_a_gauge", data_b, layout);

/*
  Light and proximity are not supported anymore by mainstream browsers.
  window.addEventListener('devicelight', function(e) {
     document.getElementById("DeviceLight").innerHTML="AmbientLight current Value: "+e.value+" Max: "+e.max+" Min: "+e.min;
  });
  
  window.addEventListener('lightlevel', function(e) {
     document.getElementById("Lightlevel").innerHTML="Light level: "+e.value;
  });
  
  window.addEventListener('deviceproximity', function(e) {
     document.getElementById("DeviceProximity").innerHTML="DeviceProximity current Value: "+e.value+" Max: "+e.max+" Min: "+e.min;
  });
  
  window.addEventListener('userproximity', function(event) {
     document.getElementById("UserProximity").innerHTML="UserProximity: "+event.near;
  });
  */
