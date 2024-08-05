import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var titles = [];
var posts = [];

app.use(express.static("public"))

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/submit", (req, res) => {
    var title = req.body["title"];
    var post = req.body["post"];
    titles.splice(0, 0, title);
    posts.splice(0, 0, post);
    res.redirect("/submitted");
});

app.post('/delete-item', (req, res) => {
    const itemIndex = req.body.index;
    if (itemIndex >= 0 && itemIndex < titles.length) {
      titles.splice(itemIndex, 1);
      posts.splice(itemIndex, 1);
    }
    if(titles.length === 0){
        res.redirect("/");
    } else{
        res.redirect('/submitted');
    }  
});

app.post('/edit-item', (req, res) => {
    const itemIndex = req.body.index;
    res.render("edit.ejs", {
        title: titles[itemIndex],
        post: posts[itemIndex],
        itemIndex: itemIndex
    });
});
app.post("/edited-item", (req, res) => {
    const newTitle = req.body["newTitle"];
    const newPost = req.body["newPost"];
    const postIndex = req.body["itemIndex"];
    titles[postIndex] = newTitle;
    posts[postIndex] = newPost;
    res.redirect("/submitted");
});

app.get("/submitted", (req, res) => {
    res.render("index.ejs", {
        titles: titles,
        posts: posts
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})