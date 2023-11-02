// Create web server
// 1. Create web server
// 2. Create router
// 3. Create router handler
// 4. Connect router to web server
// 5. Start web server
// 6. Test web server
// 7. Add comment form
// 8. Add form handler
// 9. Add comment list
// 10. Add comment list handler
// 11. Add comment delete handler
// 12. Add comment update handler
// 13. Add comment view handler

// 1. Create web server
const express = require('express');
const app = express();
const port = 3000;

// 2. Create router
const router = express.Router();

// 3. Create router handler
const commentService = require('./comment-service');
const Comment = commentService.Comment;

// 4. Connect router to web server
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

// 5. Start web server
app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});

// 6. Test web server
router.get('/', (req, res) => {
  res.send('Hello World!');
});

// 7. Add comment form
router.get('/comments/new', (req, res) => {
  res.send(`
    <h1>New Comment</h1>
    <form method="POST" action="/comments">
      <input type="text" name="comment" placeholder="comment" />
      <input type="submit" />
    </form>
  `);
});

// 8. Add form handler
router.post('/comments', (req, res) => {
  const comment = req.body.comment;
  commentService.add(comment);
  res.redirect('/comments');
});

// 9. Add comment list
router.get('/comments', (req, res) => {
  const comments = commentService.getAll();
  let html = '<h1>Comments</h1>';
  html += '<ul>';
  comments.forEach((comment) => {
    html += `<li>${comment}</li>`;
  });
  html += '</ul>';
  html += '<a href="/comments/new">Add Comment</a>';
  res.send(html);
});

// 10. Add comment list handler
router.get('/api/comments', (req, res) => {
  const comments = commentService