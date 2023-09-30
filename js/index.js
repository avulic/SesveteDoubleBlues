// Function to load and display content
export async function fetchComponent(fileName) {
    return fetch(fileName)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error loading ${fileName}: ${response.status}`);
            }

            return response.text(); // Read the response body once
        })
        // .then((html) => {
        //     contentContainer.innerHTML = html;
        // })
        .catch((error) => {
            console.error(error);
        });
}


export function loadContent(pageName, containerName) {
    const contentContainer = document.getElementById(containerName);
    const fileName = `${pageName}.html`;

    fetchComponent(fileName).then((html) => {
        contentContainer.innerHTML = html;
    })
}

// Function to handle navigation links
function handleNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageName = link.getAttribute('href').substring(1);
            loadContent(pageName, 'content');
        });
    });
}

// Initialize the app
function init() {
    handleNavigation();
    // Load the initial page (e.g., home.html)
    loadContent('home');
}

// Call the init function when the DOM is ready
//document.addEventListener('DOMContentLoaded', init);


function makeElement() {
    //Array of image sources
    const imageSources = [
        "./images/tim.jpg",
        "./images/tim2.jpg",
        "./images/tim.jpg",
        "./images/tim.jpg",
        "./images/tim.jpg",
        "./images/tim.jpg",
        "./images/tim.jpg",
        "./images/tim.jpg",
        "./images/tim.jpg",
        "./images/tim.jpg",
        // Add more image sources as needed
    ];

    // Get the target container element
    const imageContainer = document.getElementById("imageContainer");

    // Loop through the image sources and create components
    imageSources.forEach((src) => {
        // Create a new column div
        const colDiv = document.createElement("div");
        colDiv.classList.add("col-lg-4", "mb-4", "mb-lg-0");

        // Create an image element
        const imgElement = document.createElement("img");
        imgElement.src = src;
        imgElement.classList.add("w-100", "shadow-1-strong", "rounded", "mb-4");
        imgElement.alt = "Image"; // You can set alt text as needed

        // Append the image element to the column div
        colDiv.appendChild(imgElement);

        // Append the column div to the image container
        imageContainer.appendChild(colDiv);
    });
}

$(window).on('load', function () {
    setTimeout(removeLoader, 500); //wait for page load PLUS two seconds.
    makeElement();
});

function removeLoader() {
    $("#loadingDiv").fadeOut(500, function () {
        // fadeOut complete. Remove the loading div
        $("#loadingDiv").remove(); //makes page more lightweight 
    });
}






function toggleGallery() {
    var galleryDiv = document.getElementById("insta-content");
    if (galleryDiv.style.display === "none") {
        galleryDiv.style.display = "block";
    } else {
        galleryDiv.style.display = "none";
    }
}

function toggleShop() {
    var galleryDiv = document.getElementById("navigation-inside");
    if (galleryDiv.style.display === "none") {
        galleryDiv.style.display = "block";
    } else {
        galleryDiv.style.display = "none";
    }
}
$(window).scroll(function () {
    $("#section01").css("opacity", 1 - $(window).scrollTop() / 1100);
});