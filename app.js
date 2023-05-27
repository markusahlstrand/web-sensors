if (window.DeviceOrientationEvent) {
  window.addEventListener("deviceorientation", function (event) {
    document.getElementById("alpha").textContent = "Alpha: " + event.alpha;
    document.getElementById("beta").textContent = "Beta: " + event.beta;
    document.getElementById("gamma").textContent = "Gamma: " + event.gamma;
  });
} else {
  alert("Sorry, your browser doesn't support Device Orientation'");
}

if (window.DeviceMotionEvent) {
  window.addEventListener("devicemotion", function (event) {
    document.getElementById("accelerationX").textContent =
      "X: " + event.acceleration.x;
    document.getElementById("accelerationY").textContent =
      "Y: " + event.acceleration.y;
    document.getElementById("accelerationZ").textContent =
      "Z: " + event.acceleration.z;
  });
} else {
  alert("Sorry, your browser doesn't support Device Motion");
}
