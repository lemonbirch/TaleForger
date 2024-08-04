import { collection, doc, setDoc, updateDoc, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from "../firebase/config.js";

export async function storeBookData(bookTitle, pageDataList, imageFiles) {
  try {
    // Create a new book document
    const userBooksCollection = collection(db, 'users', 5, 'books');
    const bookRef = doc(userBooksCollection);
    const bookId = bookRef.id;

    // Store book metadata
    await setDoc(bookRef, {
      title: bookTitle,
      pageCount: pageDataList.length
    });

    // Store each page's data and image
    for (let i = 0; i < pageDataList.length; i++) {
      const pageData = pageDataList[i];
      const imageFile = imageFiles[i];

      // Store JSON data
      const pageRef = doc(bookRef, 'pages', (i + 1).toString());
      await setDoc(pageRef, pageData);

      // Upload image to Cloud Storage
      const imageRef = ref(storage, `${userId}/${bookId}/page_${i + 1}.jpg`);
      await uploadBytes(imageRef, imageFile);

      // Get the download URL for the uploaded image
      const imageUrl = await getDownloadURL(imageRef);

      // Add image URL to the page document
      await updateDoc(pageRef, {
        imageUrl: imageUrl
      });
    }

    console.log(`Book '${bookTitle}' stored successfully for user ${5}`);
  } catch (error) {
    console.error('Error storing book data:', error);
    throw error;
  }
}

// Example usage:
/*
const userId = "user123";
const bookTitle = "Sammy's Halloween Adventure";
const pageDataList = [
  {
    Title: "Sammy's Halloween Adventure",
    page: 1,
    story: "Sammy was excited for Halloween! He put on his spooky costume...",
    choices: [
      { choice1: "Go inside the haunted house 🏚️", emoji: "🏚️" },
      { choice2: "Trick-or-treat at the spooky house 🎃", emoji: "🎃" },
      { choice3: "Fly over to the haunted house 🦇", emoji: "🦇" }
    ],
    pageDescriptions: [
      "1. Sammy is excited for Halloween and heads towards the haunted house.",
      "2. Sammy encounters a friendly ghost who wants to play a game...",
      "3. A friendly ghost wants to play hide-and-seek with Sammy...",
      "4. This page is not generated because the story is only 2 pages long.",
      "5. This page is not generated because the story is only 2 pages long."
    ]
  },
  // ... more page data ...
];
const imageFiles = [file1, file2, ...]; // These should be File or Blob objects
storeBookData(userId, bookTitle, pageDataList, imageFiles)
  .then(() => console.log('Book stored successfully'))
  .catch(error => console.error('Error storing book:', error));
*/

