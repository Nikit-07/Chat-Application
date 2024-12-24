import { Client, Storage } from "appwrite";

const client= new Client();
const storageBucket =  new Storage(client);

client
.setEndpoint("https://cloud.appwrite.io/v1")
.setProject("6769103f00391816c520");

export {client, storageBucket}