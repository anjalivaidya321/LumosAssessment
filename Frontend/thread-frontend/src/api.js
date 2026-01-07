const BASE = import.meta.env.VITE_API_BASE_URL || "/api";

export async function fetchJSON(url, options = {}) {
  const res = await fetch(BASE + url, {
    headers: { "Content-Type": "application/json" },
    ...options
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `Request failed: ${res.status}`);
  }
  return res.json();
}

export const api = {
  getPosts() {
    return fetchJSON("/posts");
  },
  getPost(id) {
    return fetchJSON(`/posts/${id}`);
  },
  createPost(data) {
    return fetchJSON("/posts", {
      method: "POST",
      body: JSON.stringify(data)
    });
  },
  deletePost(id) {
    return fetchJSON(`/posts/${id}`, {
      method: "DELETE"
    });
  },
  getComments(postId) {
    return fetchJSON(`/posts/${postId}/comments`);
  },
  createComment(postId, data) {
    return fetchJSON(`/posts/${postId}/comments`, {
      method: "POST",
      body: JSON.stringify(data)
    });
  }
};