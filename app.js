var orientation = { alpha: null, beta: null, gamma: null };
var motion = { x: null, y: null, z: null };

function init() {
  if (typeof DeviceOrientationEvent.requestPermission === "function") {
    DeviceOrientationEvent.requestPermission()
      .then((permissionState) => {
        if (permissionState === "granted") {
          window.addEventListener("deviceorientation", handleDeviceOrientation);
        }
      })
      .catch(console.error);
  } else {
    // handle regular non iOS 13+ devices
    window.addEventListener("deviceorientation", handleDeviceOrientation);
  }

  if (typeof DeviceMotionEvent.requestPermission === "function") {
    DeviceMotionEvent.requestPermission()
      .then((permissionState) => {
        if (permissionState === "granted") {
          window.addEventListener("devicemotion", handleDeviceMotion);
        }
      })
      .catch(console.error);
  } else {
    // handle regular non iOS 13+ devices
    window.addEventListener("devicemotion", handleDeviceMotion);
  }
}

function handleDeviceOrientation(event) {
  orientation.alpha = event.alpha;
  orientation.beta = event.beta;
  orientation.gamma = event.gamma;
}

function handleDeviceMotion(event) {
  motion.x = event.acceleration.x;
  motion.y = event.acceleration.y;
  motion.z = event.acceleration.z;
}

// Update display twice a second
setInterval(function () {
  document.getElementById("alpha").textContent = "Alpha: " + orientation.alpha;
  document.getElementById("beta").textContent = "Beta: " + orientation.beta;
  document.getElementById("gamma").textContent = "Gamma: " + orientation.gamma;

  document.getElementById("accelerationX").textContent = "X: " + motion.x;
  document.getElementById("accelerationY").textContent = "Y: " + motion.y;
  document.getElementById("accelerationZ").textContent = "Z: " + motion.z;
}, 500); // 500 milliseconds = 0.5 seconds

// Call the init function when the page has finished loading
window.onload = init;
