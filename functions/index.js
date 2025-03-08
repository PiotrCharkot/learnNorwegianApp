/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */


const functions = require("firebase-functions");
const speech = require("@google-cloud/speech");
const axios = require("axios");
const fs = require("fs");
const os = require("os");
const path = require("path");

exports.transcribeSpeech = functions.https.onCall(async (data, context) => {
  // More detailed logging to understand what we're receiving
  console.log("Function received data type:", typeof data);

  // Check if data exists and handle potential empty values
  if (!data) {
    console.log("Data is null or undefined");
    throw new functions.https
        .HttpsError("invalid-argument", "No data provided");
  }

  // IMPORTANT: With the modular Firebase SDK,
  // the data might be nested differently
  // Try directly accessing the object properties
  let audioUrl;
  let language;

  if (typeof data === "object") {
    console.log("Data object keys:", Object.keys(data));
    audioUrl = data.audioUrl || (data.data && data.data.audioUrl);
    language = data.language || (data.data && data.data.language) || "en-US";
  }

  console.log("Extracted audioUrl exists:", !!audioUrl);
  console.log("Language:", language);

  if (!audioUrl) {
    console.log("Audio URL is missing from request data");
    throw new functions.https
        .HttpsError("invalid-argument", "Audio URL is required");
  }

  if (!audioUrl) {
    throw new functions.https
        .HttpsError("invalid-argument", "Audio URL is required");
  }

  try {
    console.log("Attempting to download audio from URL");
    // Download the audio file
    const response = await axios({
      method: "GET",
      url: audioUrl,
      responseType: "arraybuffer",
      maxContentLength: 10 * 1024 * 1024, // 10MB limit
      timeout: 30000, // 30 second timeout
    });

    console.log("Audio downloaded, size:", response.data.length);

    // Save to a temporary file
    const tempFilePath = path.join(os.tmpdir(), `audio-${Date.now()}.m4a`);
    fs.writeFileSync(tempFilePath, response.data);
    console.log("Audio saved to temp file:", tempFilePath);

    // Initialize Speech client
    const client = new speech.SpeechClient();

    // Read file into memory
    const audioBytes = fs.readFileSync(tempFilePath).toString("base64");
    console.log("Audio file read into memory, length:", audioBytes.length);

    // Configure the request with more format options to handle m4a files
    const audio = {
      content: audioBytes,
    };

    const config = {
      encoding: "AMR_WB",
      sampleRateHertz: 16000,
      languageCode: language,
      model: "default",
      enableAutomaticPunctuation: true,
    };

    console.log("Sending audio to Google Speech-to-Text API");
    const request = {
      audio: audio,
      config: config,
    };

    // Perform the transcription
    const [speechResponse] = await client.recognize(request);
    console.log("Received response from Google Speech-to-Text API");

    if (!speechResponse.results || speechResponse.results.length === 0) {
      console.log("No transcription results returned from API");
      return {transcription: "", message: "No speech detected."};
    }

    // Process the response
    const transcription = speechResponse.results
        .map((result) => result.alternatives[0].transcript)
        .join("\n");

    console.log("Transcription:", transcription);

    // Clean up the temp file
    fs.unlinkSync(tempFilePath);
    // Return the transcription
    return {transcription};
  } catch (error) {
    console.error("Error in transcribeSpeech function:", error);

    // Better error reporting
    let errorMessage = "Failed to transcribe audio";
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error("Response error data:", error.response.data);
      console.error("Response error status:", error.response.status);
      errorMessage = `Server error: ${error.response.status}`;
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received from request");
      errorMessage = "No response from audio server";
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error message:", error.message);
      errorMessage = error.message;
    }

    throw new functions.https.HttpsError("internal", errorMessage, error);
  }
});

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
