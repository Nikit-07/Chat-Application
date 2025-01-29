import { storageBucket } from "../config/appwrite";
import { ID } from "appwrite";

const upload = async (file) => {
  try {
    const uniqueId = ID.unique(); // Generate a  unique id for the file

    // upload file to appwrite storage bucket

    const response = await storageBucket.createFile(
      "676911070024a34c038f",
      uniqueId,
      file
    );

    // console.log("File Uploaded Successfully: ", response);

    const fileURL = storageBucket.getFileView(
      "676911070024a34c038f",
      response.$id
    );

    // the url of the file
    // console.log(fileURL);

    return fileURL;
  } catch (error) {
    console.error("Error uploading file:", error);

    // Throw the error to let the caller handle it
    throw error;
  }
};

export default upload;


