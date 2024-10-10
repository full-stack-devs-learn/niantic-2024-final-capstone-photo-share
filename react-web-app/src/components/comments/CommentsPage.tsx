import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

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

  const { isAuthenticated, user } = useSelector((state: RootState) => state.authentication);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/comments/photo/${postId}`).then(response => {
      setComments(response.data);
    });
  }, [postId]);

  const handleAddComment = () => {
    const commentData = {
      content: newComment,
      post: { postId: Number(postId) },
      user: { id: user?.id },
    };

    axios.post("http://localhost:8080/api/comments", commentData).then(response => {
      setComments([...comments, response.data]);
      setNewComment("");
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
                {comment.content} - <small>{new Date(comment.createdAt).toLocaleString()}</small>
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