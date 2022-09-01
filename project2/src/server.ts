import express from "express";
import bodyParser from "body-parser";
import { filterImageFromURL, deleteLocalFiles } from "./util/util";

(async () => {
  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // Root Endpoint
  // Displays a simple message to the user
  app.get("/", async (req, res) => {
    res.send("try GET /filteredimage?image_url={{}}");
  });

  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT
  //    1. validates the image_url query
  //    2. calls filterImageFromURL(image_url) to filter the image
  //    3. sends the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file
  app.get("/filteredimage", async (req, res) => {
    const URL = req.query.image_url;

    if (!URL) {
      res.status(400).json({
        status: "error",
        error: "Missing image url",
      });
    }

    try {
      const image = await filterImageFromURL(URL);

      setTimeout(async () => await deleteLocalFiles([image]), 200);

      res.status(200).sendFile(image);
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Unable to process image or image not found",
      });
    }
  });

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();

