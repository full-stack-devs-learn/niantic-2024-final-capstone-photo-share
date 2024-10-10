import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from "../../store/store";


interface Comment {
  id: number;
  content: string;
  user: {
    id: number;
    username: string;
  };
  createdAt: string;
}

export default function CommentsPage() {
  const { postId } = useParams<{ postId: string }>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");

  const { isAuthenticated, user } = useSelector((state: RootState) => state.authentication);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/comments/photo/${postId}`).then(response => {
      setComments(response.data);
    });
  }, [postId]);

  const handleAddComment = () => {
    if (!isAuthenticated) {
      alert("You need to be logged in to post a comment.");
      return;
    }

    const userId = user?.id;
    const commentData = {
      content: newComment,
      post: { postId: Number(postId) },
      user: { id: userId },
    };

    axios.post("http://localhost:8080/api/comments", commentData).then(response => {
      setComments([...comments, response.data]);
      setNewComment("");
    }).catch(error => {
      console.error("Error posting comment:", error);
    });
  };

  return (
    <div className="container mt-5 comments-page">
      <h2>Comments for Post {postId}</h2>

      <div>
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          <ul>
            {comments.map((comment) => (
              <li key={comment.id}>
                <strong>{comment.user.username}</strong>: {comment.content}
                <br />
                <small>{new Date(comment.createdAt).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        )}
      </div>

      {isAuthenticated && 
            <Form>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Add a comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </Form.Group>
            <Button className="mt-3" variant="primary" onClick={handleAddComment} disabled={!newComment}>
              Post Comment
            </Button>
          </Form>
      }

    </div>
  );
}