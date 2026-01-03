const chicken = document.getElementById("chicken")
const multipliers = document.querySelectorAll(".multiplier-circle")
const winPopup = document.getElementById("winPopup")
const multiplierValue = document.getElementById("multiplierValue")
const playButton = document.querySelector(".play-btn")
const jumpSound = document.getElementById("jumpSound")
const timerDisplay = document.getElementById("timerDisplay")

const scannerModal = document.getElementById("scannerModal")
const video = document.getElementById("video")
const canvas = document.getElementById("canvas")
const cameraView = document.getElementById("cameraView")
const scanningAnimation = document.getElementById("scanningAnimation")
const scanResult = document.getElementById("scanResult")

let stream = null

// Platform multipliers array
const platformMultipliers = [
  1.03, 1.07, 1.12, 1.17, 1.23, 1.29, 1.36, 1.44, 1.53, 1.63, 1.75, 1.88, 2.04, 2.22, 2.45, 2.72, 3.06, 3.5, 4.08, 4.9,
  6.13, 9.81, 19.44,
]

// Game state
let gameInProgress = false
let canPlay = true

function openScannerModal() {
  if (gameInProgress || !canPlay) {
    console.log("Wait 10 seconds")
    return
  }

  scannerModal.style.display = "flex"
  cameraView.style.display = "block"
  scanningAnimation.style.display = "none"
  scanResult.style.display = "none"

  // Start camera
  startCamera()
}

function closeScannerModal() {
  scannerModal.style.display = "none"
  stopCamera()
}

async function startCamera() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
    })
    video.srcObject = stream
  } catch (err) {
    console.error("Error accessing camera:", err)
    alert("Cannot access camera. Please allow camera permissions.")
  }
}

function stopCamera() {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop())
    stream = null
  }
}

function captureFromCamera() {
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight
  const context = canvas.getContext("2d")
  context.drawImage(video, 0, 0, canvas.width, canvas.height)

  // Start scanning animation
  processScan()
}

function handleFileSelect(event) {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        const context = canvas.getContext("2d")
        context.drawImage(img, 0, 0)

        // Start scanning animation
        processScan()
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

function processScan() {
  // Hide camera view, show scanning animation
  cameraView.style.display = "none"
  scanningAnimation.style.display = "flex"

  // Simulate scanning process
  setTimeout(() => {
    // Hide scanning animation, show success result
    scanningAnimation.style.display = "none"
    scanResult.style.display = "flex"

    // After showing success, start the actual game
    setTimeout(() => {
      closeScannerModal()
      startGame()
    }, 2000)
  }, 3000)
}

// Start game function
function startGame() {
  if (gameInProgress || !canPlay) {
    console.log("Wait 10 seconds")
    return
  }

  canPlay = false
  gameInProgress = true
  playButton.disabled = true
  playButton.style.opacity = "0.6"

  // Timer countdown
  let timeLeft = 10
  timerDisplay.textContent = "Wait: " + timeLeft + " seconds"

  const timerInterval = setInterval(() => {
    timeLeft--
    if (timeLeft > 0) {
      timerDisplay.textContent = "Wait: " + timeLeft + " seconds"
    } else {
      clearInterval(timerInterval)
      timerDisplay.textContent = ""
      playButton.disabled = false
      playButton.style.opacity = "1"
      canPlay = true
    }
  }, 1000)

  // Select random multiplier
  const randomIndex = Math.floor(Math.random() * multipliers.length)
  const selectedMultiplier = multipliers[randomIndex]
  const multiplierAmount = platformMultipliers[randomIndex]

  // Reset all multipliers appearance
  multipliers.forEach((multiplier) => {
    multiplier.style.backgroundColor = "rgba(255, 255, 255, 0.2)"
  })

  // Highlight selected multiplier
  selectedMultiplier.style.backgroundColor = "rgba(255, 255, 255, 0.5)"

  // Move chicken to selected position
  chicken.style.left = selectedMultiplier.offsetLeft + "px"
  chicken.style.transform = "translateY(-100px)"

  // Play jump sound
  jumpSound.play()

  // Chicken lands after animation
  setTimeout(() => {
    chicken.style.transform = "translateY(0)"
    showWinPopup(multiplierAmount)
  }, 500)

  // Scroll container to show selected multiplier
  const scrollContainer = document.querySelector(".scroll-container")
  scrollContainer.scrollTo({
    left: selectedMultiplier.offsetLeft - 200,
    behavior: "smooth",
  })
}

// Show win popup with multiplier
function showWinPopup(multiplierAmount) {
  const popup = document.querySelector(".win-popup")
  const winSound = document.getElementById("winSound")

  popup.querySelector("p").textContent = "x" + multiplierAmount
  popup.classList.add("shake")
  popup.style.display = "block"

  winSound.currentTime = 0
  winSound.play()

  setTimeout(() => {
    popup.style.display = "none"
    popup.classList.remove("shake")
    gameInProgress = false
  }, 13000)
}

// Close popup function
function closePopup() {
  winPopup.style.display = "none"
  gameInProgress = false
}
