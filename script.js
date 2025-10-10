// Preload umbrella images for faster switching
const preloadColors = ["pink", "yellow", "blue"];
preloadColors.forEach((color) => {
  const img = new Image();
  img.src = `images/${color}_umbrella.png`;
});

let logoUploaded = false;

const colors = [
  { code: "#e64475", colorName: "pink" },
  { code: "#facc15", colorName: "yellow" },
  { code: "#68d3ee", colorName: "blue" },
];

const umbrella = document.getElementById("umbrella");
const logo = document.getElementById("logo");
const logoInput = document.getElementById("logoInput");
const uploadBtn = document.getElementById("uploadBtn");
const colorCircles = document.querySelectorAll(".color-circle");
const loader = document.getElementById("loader");
const uploadIcon = document.getElementById("uploadIcon");
const uploadText = document.getElementById("uploadText");

// ✅ Fix: target the body correctly
const body = document.body;

// 🎨 Ripple + color change on click
colorCircles.forEach((circle) => {
  circle.addEventListener("click", (e) => {
    const hexCode = circle.getAttribute("data-color");

    // Update umbrella color
    const colorObj = colors.find(
      (c) => c.code.toLowerCase() === hexCode.toLowerCase()
    );
    const color = colorObj ? colorObj.colorName : "blue";

    // Hide umbrella & logo → show loader
    umbrella.style.display = "none";
    logo.style.display = "none";
    loader.style.display = "block";
    uploadBtn.style.backgroundColor = hexCode;

    // Change body background smoothly
    body.style.transition = "background-color 0.6s ease";
    body.style.backgroundColor = hexCode + "20"; // adds transparency effect

    // Simulate color change delay
    setTimeout(() => {
      umbrella.src = `images/${color}_umbrella.png`;
      loader.style.display = "none";
      umbrella.style.display = "block";

      if (logoUploaded) logo.style.display = "block";
    }, 800);
  });
});

//  File upload button click
uploadBtn.addEventListener("click", () => logoInput.click());

//  File validation & upload preview
logoInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // Validate file type
  const validTypes = ["image/png", "image/jpeg"];
  if (!validTypes.includes(file.type)) {
    alert("❌ Only .png and .jpg files are allowed!");
    logoInput.value = "";
    return;
  }

  // Validate file size (max 5 MB)
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    alert("⚠️ File too large! Max allowed size is 5 MB.");
    logoInput.value = "";
    return;
  }

  // Show loading animation on button
  uploadIcon.src = "images/loader_icon.svg";
  uploadIcon.classList.add("spin");

  const reader = new FileReader();
  reader.onload = function (event) {
    logo.src = event.target.result;
    logo.style.display = "block";
    logoUploaded = true;

    // Restore upload icon & update text after short delay
    setTimeout(() => {
      uploadIcon.src = "images/upload_icon.svg";
      uploadIcon.classList.remove("spin");
      uploadText.textContent =
        file.name.length > 15 ? file.name.slice(0, 15) + "..." : file.name;
    }, 800);
  };

  reader.readAsDataURL(file);
});
