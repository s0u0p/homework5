const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3300;

app.use(bodyParser.urlencoded({ extended: true }));

let comments = [];

app.get('/', (req, res) => {
    const commentsHtml = comments.map(comment => `<p>${comment}</p>`).join('');
    res.send(`
        <h1>Comment Submission</h1>
        <form method="POST" action="/submit">
            <input type="text" name="comment" placeholder="Enter your comment" required>
            <button type="submit">Submit</button>
        </form>
        <h2>Comments</h2>
        <div id="comments">${commentsHtml}</div>
    `);
});

app.post('/submit', (req, res) => {
    const comment = req.body.comment;
    comments.push(comment);
    res.redirect('/');
});

const server = app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});

module.exports = server; // Export the server


