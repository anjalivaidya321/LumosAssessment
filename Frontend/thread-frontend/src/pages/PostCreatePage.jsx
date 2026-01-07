import { useNavigate } from "react-router-dom";
import PostCreateForm from "../components/PostCreateForm.jsx";

export default function PostCreatePage() {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper center-page">
      <PostCreateForm
        onSuccess={(post) => navigate(`/posts/${post._id}`)}
      />
    </div>
  );
}