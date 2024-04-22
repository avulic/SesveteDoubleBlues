const { google } = require('googleapis');
const fs = require('fs');

const credentials = require('./credentials.json');

const scopes = [
    'https://www.googleapis.com/auth/drive'
];

const auth = new google.auth.JWT(
    credentials.client_email, null,
    credentials.private_key, scopes
);

const drive = google.drive({ version: 'v3', auth });

function extractImageId(link) {
    const pattern = /\/d\/(.*?)\/view/;
    const match = link.match(pattern);
    if (match) {
        return match[1];
    } else {
        return null;
    }
}

function constructNewLink(imageId) {
    return `https://drive.google.com/uc?export=view&id=${imageId}`;
}

function driveImageExtract(imageId) {
    //const link = "https://drive.google.com/file/d/1c4jJYg2q6q7K3b6zW3Q8z8x7fYJ2sF2b/view";
    //const imageId = extractImageId(link);
    const modifiedLink = constructNewLink(imageId);
    console.log(modifiedLink);
}

async function listFilesInFolder(folderId) {
    try {
        const res = await drive.files.list({
            q: `'${folderId}' in parents`,
            fields: 'files(name)'
        });

        const files = res.data.files;
        if (files.length) {
            console.log('Files in the folder:');
            files.forEach((file) => {
                console.log(file.name);
            });
        } else {
            console.log('No files found in the folder.');
        }
    } catch (err) {
        console.error('Error listing files:', err);
    }
}

async function listFilesAndFolders(folder) {
    try {
        var picturesUrls = []

        console.log(`Folder Name: ${folder.name}, Folder ID: ${folder.id}`);

        const foldersResponse = await drive.files.list({
            q: `'${folder.id}' in parents and mimeType='application/vnd.google-apps.folder'`,
            fields: 'files(id, name)'
        });

        const picturesResponse = await drive.files.list({
            q: `'${folder.id}' in parents and mimeType='image/jpeg'`,
            fields: 'files(id,name)'
        });

        if (foldersResponse.data.files.length) {
            console.error('Folders');
            const folderPromises = foldersResponse.data.files.map(async (folder) => {
                const pictures = await listFilesAndFolders(folder);
            });
            await Promise.all(folderPromises);
        } else {
            if (picturesResponse.data.files.length) {
                console.error('Samo slike');
                picturesResponse.data.files.forEach((Pictures) => {
                    //console.log(`Pictures Name: ${Pictures.name}, Pictures ID: ${Pictures.id}`);
                    console.log(constructNewLink(Pictures.id))
                });
            } else {
                console.error('Prazno');
            }
        }

        return picturesUrls
    } catch (error) {
        console.error('Error listing files and folders:', error);
    }
}

const folderId = '1TZvUKGv6BzNJhxm0vb5qw7SRwfNqrb3W';
const folder = {
    id: folderId,
    name: "2023"
};


//listFilesAndFolders(folder)




// Recursive function to get files
function getFileNames(dir, files = []) {
    // Get an array of all files and directories in the passed directory using fs.readdirSync
    const fileList = fs.readdirSync(dir)
    // Create the full path of the file/directory by concatenating the passed directory and file/directory name
    for (const file of fileList) {
        const name = `${dir}/${file}`
        // Check if the current file/directory is a directory using fs.statSync
        if (fs.statSync(name).isDirectory()) {
            // If it is a directory, recursively call the getFiles function with the directory path and the files array
            getFiles(name, files)
        } else {
            // If it is a file, push the full path to the files array
            console.log(file)
        }
    }
    return files
}

getFileNames('../../images//kolo_1')