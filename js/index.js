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
