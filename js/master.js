// Check if there's color_option in local storage get it not skip
let mainColor = localStorage.getItem("color_option");

// Random background option
let backgroundOption = true;

// Variable to control the interval
let backgroundInterval;

if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);

  // Loop on all li
  document.querySelectorAll(".color-list li").forEach((el) => {
    // Remove active class
    el.classList.remove("active");

    // Check if the dataset.color == mainColor to add class active
    if (el.dataset.color == mainColor) {
      el.classList.add("active");
    }
  });
}

let backgroundLocalItem = localStorage.getItem("background_option");
if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }

  document.querySelectorAll(".option-box span").forEach((el) => {
    el.classList.remove("active");
  });

  if (backgroundLocalItem === "true") {
    document.querySelector(".yes").classList.add("active");
  } else {
    document.querySelector(".no").classList.add("active");
  }
}

// Select the icon and make toggle on it
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  // add class to make the icon spin
  this.classList.toggle("fa-spin");

  // add class to toggle open the setting-box
  document.querySelector(".setting-box").classList.toggle("open");
};

// switch colors
const colorsLi = document.querySelectorAll(".color-list li");

// loop on ever li
colorsLi.forEach((li) => {
  // add click event
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty("--main-color", e.target.dataset.color);

    // Set color_option in local storage
    localStorage.setItem("color_option", e.target.dataset.color);

    // Remove class active from all lis
    handleActive(e);
  });
});

// switch random background option
const randomBackEl = document.querySelectorAll(".option-box span");

// loop on every span
randomBackEl.forEach((span) => {
  // add click event
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.background == "yes") {
      backgroundOption = true;

      localStorage.setItem("background_option", true);

      radnomizeImgs();
    } else {
      backgroundOption = false;

      localStorage.setItem("background_option", false);

      clearInterval(backgroundInterval);
    }
  });
});

// Select the landing page
landingPage = document.querySelector(".landing-page");

// Array of imgs
const imgsArray = ["image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg", "image5.jpg"];

// Function to randomize imgs
function radnomizeImgs() {
  if (backgroundOption == true) {
    backgroundInterval = setInterval(() => {
      // Get random number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);

      // Change background image url
      landingPage.style.backgroundImage = 'url("imgs/' + imgsArray[randomNumber] + '")';
      // url in js want '' in the first to begin
    }, 1000);
  }
}
radnomizeImgs();

// Select the skills section
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  // Skills offsetTop
  let skillsOffsetTop = ourSkills.offsetTop;

  // Skills offsetHeight
  let skillsOffsetHeight = ourSkills.offsetHeight;

  // Window height
  let windowHeight = this.innerHeight;

  // Window scroll top
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop >= skillsOffsetTop + skillsOffsetHeight - windowHeight) {
    let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// Select All Images In Gallery
imagesInGallery = document.querySelectorAll(".images-box img");

imagesInGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create overlay
    let overlay = document.createElement("div");

    // Add class to overlay
    overlay.className = "popup-overlay";

    // Apeend overlay to the body
    document.body.appendChild(overlay);

    // Create popup box
    let popupBox = document.createElement("div");

    // Add class to popup box
    popupBox.className = "popupBox";

    if (img.alt != null) {
      // Create heading
      let heading = document.createElement("h3");

      // Create heading text
      let headingText = document.createTextNode(img.alt);

      // Apeend the heading text to heading
      heading.appendChild(headingText);

      // Append heading to popup box
      popupBox.appendChild(heading);
    }

    // Create the image
    let popupImage = document.createElement("img");

    // Put the src for the image
    popupImage.src = img.src;

    // Append  popup image to popup Box
    popupBox.appendChild(popupImage);

    // Append popup box overlay
    overlay.appendChild(popupBox);

    // Create close button
    let closeButton = document.createElement("div");

    // Create text for close button
    let closeText = document.createTextNode("X");

    // Add class to close button
    closeButton.className = "close-button";

    // Append close text to close button
    closeButton.appendChild(closeText);

    // Append close button to popub Box
    popupBox.appendChild(closeButton);
  });
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("close-button") || e.target.classList.contains("popup-overlay")) {
    // One popup if you like
    // e.target.parentElement.remove()

    // Remove the overlay
    document.querySelector(".popup-overlay").remove();
  }
});

// Select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
// Select all Links
const allLinks = document.querySelectorAll(".links li a");

function scrollToSomeWhere(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();

      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrollToSomeWhere(allBullets);
scrollToSomeWhere(allLinks);

// Handle active state
function handleActive(ele) {
  ele.target.parentElement.querySelectorAll(".active").forEach((el) => {
    el.classList.remove("active");
  });

  // Add class active for all spans
  ele.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");

if (localStorage.getItem("bullets_option") !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (localStorage.getItem("bullets_option") == "block") {
    document.querySelector(".bullets-option .yes").classList.add("active");
    bulletsContainer.style.display = "block";
  } else {
    document.querySelector(".bullets-option .no").classList.add("active");
    bulletsContainer.style.display = "none";
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display == "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }
    handleActive(e);
  });
});

// Select the reset options button
document.querySelector(".reset-options").onclick = () => {
  localStorage.clear();
  // localStorage.removeItem("color_option")
  // localStorage.removeItem("background_option")
  // localStorage.removeItem("bullets_option")

  window.location.reload();
};

let toggleBtn = document.querySelector(".toggle-menu");
let tlinks = document.querySelector(".header-area .links");

toggleBtn.onclick = function (e) {
  e.stopPropagation();

  this.classList.toggle("menu-active");

  tlinks.classList.toggle("open");
};

document.addEventListener("click", (e) => {
  if (e.target != tlinks && e.target != toggleBtn) {
    if (tlinks.classList.contains("open")) {
      tlinks.classList.toggle("open");

      toggleBtn.classList.toggle("menu-active");
    }
  }
});

tlinks.onclick = function (e) {
  e.stopPropagation();
};
