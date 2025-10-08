const umbrella = document.getElementById("umbrella");
const logo = document.getElementById("logo");
const logoInput = document.getElementById("logoInput");
const uploadBtn = document.getElementById("uploadBtn");
const colorCircles = document.querySelectorAll(".color-circle");
const loader = document.getElementById("loader");


colorCircles.forEach((circle) => {
  circle.addEventListener("click", () => {
    const color = circle.getAttribute("data-color");

    // Hide umbrella and logo, show loader
    umbrella.style.display = "none";
    logo.style.display = 'none';
    loader.style.display = "block";
    uploadBtn.style.backgroundColor = color

    // Simulate loading for 1 second
    setTimeout(() => {
      umbrella.src = `images/${color}_umbrella.png`;
      

      // Hide loader, show umbrella again
      loader.style.display = "none";
      umbrella.style.display = "block";

      //  Show logo again if previously uploaded
      if (logo.src) {
        logo.style.display = "block";
      }
    }, 1000);
  });
});

uploadBtn.addEventListener("click", () => {
  logoInput.click();
});

logoInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      logo.src = event.target.result;
      logo.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
});
