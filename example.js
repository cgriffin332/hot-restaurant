const express = require("express");
const fs = require("fs");
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/students", (req, res) => {
  fs.readFile("./students.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: true,
        data: null,
        message: "Unable to retrieve students.",
      });
    }
    res.json({
      error: false,
      data: JSON.parse(data),
      message: "Successfully retrieved students.",
    });
  });
});

app.post("/api/students", (req, res) => {
  console.log(req.body);
  if (!req.body.name || !req.body.grade) {
    return res.status(400).json({
      error: true,
      data: null,
      message: "Invalid student. Please reformat and try again.",
    });
  }
  fs.readFile("./students.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: true,
        data: null,
        message: "Unable to retrieve students.",
      });
    }
    const updatedData = JSON.parse(data);
    updatedData.push(req.body);
    fs.writeFile("./students.json", JSON.stringify(updatedData), (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          error: true,
          data: null,
          message: "Unable to save new student.",
        });
      }
      res.json({
        error: false,
        data: updatedData,
        message: "Successfully added new student.",
      });
    });
  });
});

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
