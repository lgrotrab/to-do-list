import app from "./public/app.js";

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Listening in port 3000");
});
