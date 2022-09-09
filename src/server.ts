import express from 'express';


const app = express();
const port = 3000;


app.get('/' , (_req, res) => {
    res.send("Home Page..");
})

app.listen(port , () => {
    console.log(`listening on port ${port}`);
});