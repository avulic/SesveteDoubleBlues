

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

export function parseElement(content) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    if (doc) {
        return doc;
    }
}

export function parseTemplateElement(content) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const template = doc.querySelector('template');
    if (template) {
        return template;
    }
}



function makeElement() {
    // Array of image sources
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

window.addEventListener('load', function () {
    setTimeout(removeLoader, 500); // wait for page load PLUS two seconds.
    makeElement();
});

function removeLoader() {
    const loadingDiv = document.getElementById("loadingDiv");
    if (loadingDiv) {
        loadingDiv.style.transition = "opacity 0.5s";
        loadingDiv.style.opacity = "0";
        setTimeout(() => {
            loadingDiv.remove(); // remove the loading div after the fade out
        }, 500);
    }
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
// $(window).scroll(function () {
//     $("#section01").css("opacity", 1 - $(window).scrollTop() / 1100);
// });



function parallax() {
    // Get the element with class 'fixme'
    var fixme = document.querySelector('.fixme');

    // Get the initial top position of the 'fixme' element
    var fixmeTop = fixme.getBoundingClientRect().top;

    // Add a scroll event listener to the window
    window.addEventListener('scroll', function () {
        // Get the current scroll position
        var currentScroll = window.scrollY;

        // Check if the current scroll position is greater than or equal to the initial top position of 'fixme'
        if (currentScroll >= fixmeTop) {
            // If true, set the position of 'fixme' to 'fixed'
            fixme.style.position = 'fixed';
            fixme.style.top = '0';
            fixme.style.left = '0';
        } else {
            // If false, set the position of 'fixme' to 'static'
            fixme.style.position = 'static';
        }
    });

}




