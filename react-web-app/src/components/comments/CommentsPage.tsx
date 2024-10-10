import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

interface Comment {
  id: number;
  content: string;
  userId: number;
  createdAt: string;
}

export default function CommentsPage() {
  const { postId } = useParams<{ postId: string }>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");

  useEffect(() => {
    axios.get(`http://localhost:8080/api/comments/photo/${postId}`).then(response => {
      setComments(response.data);
    });
  }, [postId]);

  const handleAddComment = () => {
    const commentData = {
      content: newComment,
      post: { postId: Number(postId) },
      user: { id: 1 },
    };

    axios.post("http://localhost:8080/api/comments", commentData).then(response => {
      setComments([...comments, response.data]);
      setNewComment("");
    });
  };

  return (
    <div className="comments-page">
      <h2>Comments for Post {postId}</h2>

      <div>
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          <ul>
            {comments.map((comment) => (
              <li key={comment.id}>
                {comment.content} - <small>{new Date(comment.createdAt).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Form>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Add a comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleAddComment} disabled={!newComment}>
          Post Comment
        </Button>
      </Form>
    </div>
  );
}