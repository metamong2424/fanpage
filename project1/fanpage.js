document.addEventListener("DOMContentLoaded", () => {
  const postForm = document.getElementById("postForm");
  const postList = document.getElementById("postList");

  // 로컬 스토리지에서 게시글 불러오기
  loadPosts();

  postForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    if (title && content) {
      addPost(title, content);
      savePost(title, content);
      postForm.reset();
    }
  });

  function addPost(title, content) {
    const postItem = document.createElement("li");
    postItem.classList.add("post");

    const postTitle = document.createElement("div");
    postTitle.classList.add("post-title");
    postTitle.textContent = title;

    const postContent = document.createElement("div");
    postContent.classList.add("post-content");
    postContent.textContent = content;

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "삭제";
    deleteButton.addEventListener("click", () => {
      deletePost(postItem, title);
    });

    postItem.appendChild(postTitle);
    postItem.appendChild(postContent);
    postItem.appendChild(deleteButton);

    postList.appendChild(postItem);
  }

  function savePost(title, content) {
    let posts = localStorage.getItem("posts");
    posts = posts ? JSON.parse(posts) : [];

    posts.push({ title, content });
    localStorage.setItem("posts", JSON.stringify(posts));
  }

  function deletePost(postElement, title) {
    postList.removeChild(postElement);
    let posts = localStorage.getItem("posts");
    posts = posts ? JSON.parse(posts) : [];

    posts = posts.filter((post) => post.title !== title);
    localStorage.setItem("posts", JSON.stringify(posts));
  }

  function loadPosts() {
    let posts = localStorage.getItem("posts");
    posts = posts ? JSON.parse(posts) : [];

    posts.forEach((post) => {
      addPost(post.title, post.content);
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.getElementById("hamburguricon");
  const menuContents = document.getElementById("menuOpen");

  menuIcon.addEventListener("click", () => {
    menuContents.classList.toggle("show");
  });
});
