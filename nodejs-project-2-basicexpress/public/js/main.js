// Get and show posts
async function showPosts() {
  try {
    const res = await fetch("http://localhost:8000/api/posts/");
    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }
    const output = document.getElementById("output");
    const posts = await res.json();
    output.innerHTML = "";
    posts.forEach((post) => {
      const postEl = document.createElement("div");
      postEl.textContent = post.title;
      output.appendChild(postEl);
    });
  } catch (error) {
    console.log("Error fetching posts: ", error);
  }
}

// Event Listeneres

window.addEventListener("DOMContentLoaded", (event) => {
  const btn = document.getElementById("get-posts-btn");
  if (btn) {
    btn.addEventListener("click", showPosts);
  }
});
