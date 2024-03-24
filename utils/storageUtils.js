import { authentication, storage } from "../firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
  updateMetadata, // Import this module
} from "firebase/storage";
import { getBlobFromUri } from "./getBlobFromUri";
// import { writeImg } from "./realtimeUtils";

export const uploadImage = async (
  images,
  newImage,
  firstLocation,
  deletedLogo 
) => {
  const imageUpload = images[0];
  const authInstance = authentication;
  const currentUser = authInstance.currentUser;
  let finalUri;
  const fileName = new Date().getTime();
  try {
    if (newImage && deletedLogo) {
      console.log("is new image...started delete");
      // Create a reference to the file to delete
      const deletedRef = ref(storage, `images/${firstLocation}/${deletedLogo}`);

      // Delete the file
      deleteObject(deletedRef)
        .then(() => {
          // File deleted successfully
          console.log("File deleted successfully");
        })
        .catch((error) => {
          console.log(
            "Uh-oh, an error occurred! AT uploadImage DELETE...",
            error
          );
          // Uh-oh, an error occurred!
        });
    }

    if (!imageUpload ) {
      console.log("Please select an image");
      return;
    }

    if(imageUpload instanceof File){

    
    const imageRef = ref(storage, `images/${firstLocation}/${fileName}`);

    // Set the content type to image/jpeg
    const metadata = {
      contentType: "image/jpeg",
    };

    // Upload the image with metadata
    const snapshot = await uploadBytes(imageRef, imageUpload, metadata);

    // Get the download URL for the uploaded image
    finalUri = await getDownloadURL(snapshot.ref);

    console.log("Image uploaded successfully. Download URL:", finalUri);
  }else {
    return imageUpload;
  }
  } catch (error) {
    console.log("Error uploading image to storage:", error.message);
  }
  return { finalUri, fileName };
};
export const deleteImage = async (
  firstLocation,
  secondLocation,
  oldFileName
) => {
  try {
    console.log("started delete...");
    // Create a reference to the file to delete
    const deletedRef = ref(storage, `images/${firstLocation}/${oldFileName}`);

    // Delete the file
    deleteObject(deletedRef)
      .then(() => {
        // File deleted successfully
        console.log("File deleted successfully");
      })
      .catch((error) => {
        console.log("Uh-oh, an error occurred! AT image... DELETE...", error);
        // Uh-oh, an error occurred!
      });

    console.log("Image delete successfully...");
  } catch (error) {
    console.log("Error delete image from storage:");
  }
};

export const uploadMultipleImages = async (
  images, // Acesta va fi acum un array de imagini
  newImage,
  firstLocation,
  deletedImages
) => {
  const authInstance = authentication;
  const currentUser = authInstance.currentUser;
let imgs = []

  try {

    if (!images.length) {
      console.log("Please select an image");
      return;
    }


    if (newImage && deletedImages.length > 0) {
      console.log("is new image...started delete");
     // Presupunem că `images.fileNames` este un array cu numele fișierelor pe care vrei să le ștergi
// și că `firstLocation` este un string care reprezintă locația inițială a acestor fișiere în Firebase Storage

for (let i = 0; i < deletedImages.length; i++) {
  const fileName = deletedImages[i].fileName; // Obținem fiecare nume de fișier din array
  const deletedRef = ref(storage, `images/${firstLocation}/${fileName}`); // Creăm referința la fișier

  try {
    await deleteObject(deletedRef); // Încercăm să ștergem fișierul
    console.log(`${fileName} deleted successfully`); // Logăm succesul dacă fișierul a fost șters
  } catch (error) {
    console.error(`Error deleting ${fileName}:`, error); // Logăm eroarea în caz de eșec
  }
}

    }


    for (const imageUpload of images) {
      if(imageUpload instanceof File){
        console.log("file...")
      const fileName = new Date().getTime() + "_" + images.indexOf(imageUpload); // Asigură unicitate
      const imageRef = ref(storage, `images/${firstLocation}/${fileName}`);
      const metadata = {
        contentType: "image/jpeg",
      };

      const snapshot = await uploadBytes(imageRef, imageUpload, metadata);
      const finalUri = await getDownloadURL(snapshot.ref);
      console.log("Image uploaded successfully. Download URL:", finalUri);

      imgs.push( {finalUri, fileName});
    }else{

        imgs.push( {finalUri:imageUpload.finalUri, fileName:imageUpload.fileName});
    
    }
    }
  } catch (error) {
    console.log("Error uploading image to storage:", error.message);
  }
  console.log("imgs...", imgs)
  return {imgs}; // Returnează array-uri cu URI-urile și numele fișierelor
};

export const deleteMultipleImages = async (
  firstLocation,
  oldFileNames // Acesta va fi acum un array de nume de fișiere
) => {
  try {
    console.log("Started delete...");
    for (const fileName of oldFileNames) {
      const deletedRef = ref(storage, `images/${firstLocation}/${fileName}`);
      await deleteObject(deletedRef);
      console.log("File deleted successfully:", fileName);
    }
    console.log("All images delete successfully...");
  } catch (error) {
    console.log("Error delete image from storage:", error);
  }
};



// export async function getUrlImageApi() {
//   const imageRef = ref(storage, `images/PozaApi/apiimage.jpeg`);
//   try {
//     const url = await getDownloadURL(imageRef);
//     writeImg(url);
//     return url;
//   } catch (error) {
//     console.error(error);
//     return null; // sau gestionează eroarea după cum consideri necesar
//   }
// }
