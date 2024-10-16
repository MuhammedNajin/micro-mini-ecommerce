import { app } from "./store";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function uploadFile(file: Blob) {
    const storage = getStorage(app);
    const storageRef = ref(storage, 'files/' + file.name);
    let result = null
    // 5. Upload the file
    await uploadBytes(storageRef, file).then(async (snapshot) => {
      console.log('File uploaded successfully');
  
      // 6. Get the download URL (optional)
    await getDownloadURL(snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
         result = downloadURL
      });
    }).catch((error) => {
      console.error('Upload failed', error);
    });
    return result;
  }