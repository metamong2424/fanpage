// 게시글의 제목(title)과 내용(content)을 저장합니다
class Post {
  constructor(title, content) {
    this.title = title;
    this.content = content;
  }
  // 새로운 게시글 객체(post)를 로컬 스토리지에 저장합니다.
  static addToLocalStorage(post) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.push(post);
    localStorage.setItem("posts", JSON.stringify(posts));
  }
  // 특정 제목의 게시글을 로컬 스토리지에서 제거합니다.
  static removeFromLocalStorage(title) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts = posts.filter((post) => post.title !== title);
    localStorage.setItem("posts", JSON.stringify(posts));
  }
  // 로컬 스토리지에 저장된 모든 게시글을 가져옵니다.
  static loadPostsFromLocalStorage() {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    return posts;
  }
}
// 게시판 관리를 위한 초기 설정을 합니다.
// HTML 요소와 이벤트 리스너를 설정하여 게시글을 관리합니다.
class PostManager {
  constructor() {
    this.postList = document.getElementById("postList");
    this.postForm = document.getElementById("postForm");
    this.postForm.addEventListener("submit", this.handleFormSubmit.bind(this));
    this.loadPosts();
  }
  // 게시글 제출 양식을 처리합니다.
  // 새로운 게시글을 만들어 추가하고, 로컬 스토리지에 저장합니다.
  // >> 사용자가 제목과 내용을 입력하고
  //    제출 버튼을 클릭할 때 자동으로 호출됩니다.
  handleFormSubmit(event) {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    if (title && content) {
      const newPost = new Post(title, content);
      Post.addToLocalStorage(newPost);
      this.addPostToList(newPost);
      this.postForm.reset();
    }
  }
  // 화면에 새로운 게시글을 추가합니다.
  // HTML 요소를 생성하여 게시글의 제목과 내용을 표시합니다.
  // >> addPostToList 메서드는 새로운 게시글이 생성될 때 호출됩니다.
  addPostToList(post) {
    const postItem = document.createElement("li");
    postItem.classList.add("post");

    const postTitle = document.createElement("div");
    postTitle.classList.add("post-title");
    postTitle.textContent = post.title;

    const postContent = document.createElement("div");
    postContent.classList.add("post-content");
    postContent.innerHTML = post.content.replace(/\n/g, "<br>");

    const postButtons = document.createElement("div");
    postButtons.classList.add("post-buttons");

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "삭제";
    deleteButton.addEventListener("click", () => {
      this.deletePost(postItem, post.title);
    });

    const editButton = document.createElement("button");
    editButton.classList.add("edit-button");
    editButton.textContent = "수정";
    editButton.addEventListener("click", () => {
      this.editPost(postItem, post.title, post.content);
    });

    postButtons.appendChild(deleteButton);
    postButtons.appendChild(editButton);

    postItem.appendChild(postTitle);
    postItem.appendChild(postContent);
    postItem.appendChild(postButtons);

    this.postList.prepend(postItem);
  }
  // 특정 게시글을 삭제합니다.
  // 사용자가 삭제 버튼을 클릭하면 호출되어 해당 게시글을 삭제합니다.

  deletePost(postElement, title) {
    this.postList.removeChild(postElement);
    Post.removeFromLocalStorage(title);
  }
  // 로컬 스토리지에 저장된 모든 게시글을 불러와 화면에 표시합니다.
  // 페이지가 로드될 때마다 호출되어 저장된 모든 게시글을 화면에 표시합니다.
  loadPosts() {
    const posts = Post.loadPostsFromLocalStorage();
    posts.forEach((post) => {
      const formattedContent = post.content.replace(/\n/g, "<br>");
      const newPost = new Post(post.title, formattedContent);
      this.addPostToList(newPost);
    });
  }
  // 게시글 수정 폼을 생성하고, 기존 게시글의 내용을 편집할 수 있도록 합니다.
  // 사용자가 수정 버튼을 클릭하면 호출되어 해당 게시글을 수정할 수 있는 폼을 생성합니다.
  editPost(postElement, oldTitle, oldContent) {
    const postTitle = postElement.querySelector(".post-title");
    const postContent = postElement.querySelector(".post-content");
    const postButtons = postElement.querySelector(".post-buttons");

    const editForm = document.createElement("form");
    editForm.classList.add("edit-form");

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.value = oldTitle;
    titleInput.classList.add("edit-title");

    const contentTextarea = document.createElement("textarea");
    contentTextarea.classList.add("edit-content");
    contentTextarea.value = oldContent.replace(/<br>/g, "\n");

    // 저장버튼 생성 및 기능 활성화
    const saveButton = document.createElement("button");
    saveButton.textContent = "저장";
    saveButton.classList.add("save-button");
    saveButton.type = "button";

    saveButton.addEventListener("click", () => {
      const newTitle = titleInput.value;
      const newContent = contentTextarea.value;
      this.updatePost(postElement, oldTitle, newTitle, newContent);
    });
    // 취소버튼 생성 및 기능 활성화
    const cancelButton = document.createElement("button");
    cancelButton.classList.add("cancel-button");
    cancelButton.type = "button";
    cancelButton.textContent = "취소";
    cancelButton.addEventListener("click", () => {
      this.cancelEdit(postElement, oldTitle, oldContent);
    });

    editForm.appendChild(titleInput);
    editForm.appendChild(contentTextarea);
    editForm.appendChild(saveButton);
    editForm.appendChild(cancelButton);

    postTitle.style.display = "none";
    postContent.style.display = "none";
    postButtons.style.display = "none";

    postElement.appendChild(editForm);
  }
  // 수정된 게시글을 저장하고, 화면에 업데이트하여 보여줍니다.
  // 사용자가 수정 폼에서 변경을 저장하면 호출되어 해당 게시글을 업데이트합니다.
  updatePost(postElement, oldTitle, newTitle, newContent) {
    const posts = JSON.parse(localStorage.getItem("posts"));

    const updatedPosts = posts.map((post) => {
      if (post.title === oldTitle) {
        return { title: newTitle, content: newContent };
      }
      return post;
    });

    localStorage.setItem("posts", JSON.stringify(updatedPosts));

    const postTitle = postElement.querySelector(".post-title");
    const postContent = postElement.querySelector(".post-content");
    const postButtons = postElement.querySelector(".post-buttons");

    postTitle.textContent = newTitle;
    postContent.innerHTML = newContent.replace(/\n/g, "<br>");

    postTitle.style.display = "block";
    postContent.style.display = "block";
    postButtons.style.display = "block";

    postElement.removeChild(postElement.querySelector(".edit-form"));
    window.location.reload();
  }

  // 게시글 수정을 취소하고 이전 상태로 되돌립니다.
  // 사용자가 수정 폼에서 취소 버튼을 클릭하면 호출되어 수정을 취소하고 이전 내용을 다시 표시합니다.
  cancelEdit(postElement, oldTitle, oldContent) {
    const postTitle = postElement.querySelector(".post-title");
    const postContent = postElement.querySelector(".post-content");
    const postButtons = postElement.querySelector(".post-buttons");

    postTitle.textContent = oldTitle;
    postContent.innerHTML = oldContent.replace(/\n/g, "<br>");

    postTitle.style.display = "block";
    postContent.style.display = "block";
    postButtons.style.display = "block";

    postElement.removeChild(postElement.querySelector(".edit-form"));
    window.location.reload();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new PostManager();
});

// 이 위만 수정할것!!!!
//
//
//
//
//
//
//
//
//
//
//
// 이 아래는 건드리지 말것!!! 메뉴 숨김, 클릭시 열림 영역
document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.getElementById("hamburguricon");
  const menuContents = document.getElementById("menuOpen");

  menuIcon.addEventListener("click", () => {
    menuContents.classList.toggle("show");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.getElementById("tipClose");
  const menuContents = document.getElementById("tipOpen");

  menuIcon.addEventListener("click", () => {
    menuContents.classList.toggle("show");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const barogagiClose = document.getElementById("barogagiClose");
  const barogagiOpen = document.getElementById("barogagiOpen");

  barogagiClose.addEventListener("click", (event) => {
    event.stopPropagation(); // 이벤트 전파 멈춤
    barogagiOpen.classList.toggle("show");
  });

  barogagiOpen.addEventListener("click", (event) => {
    event.stopPropagation(); // 이벤트 전파 멈춤
  });

  const stadiumClose = document.getElementById("stadiumClose");
  const stadiumOpen = document.getElementById("stadiumOpen");

  stadiumClose.addEventListener("click", (event) => {
    event.stopPropagation(); // 이벤트 전파 멈춤
    stadiumOpen.classList.toggle("show");
  });

  stadiumOpen.addEventListener("click", (event) => {
    event.stopPropagation(); // 이벤트 전파 멈춤
  });
});

// 링크생성 및 클릭시 바로가기 영역
document.addEventListener("DOMContentLoaded", function () {
  // 링크1 생성 및 이벤트 추가
  var link1 = document.createElement("a");
  link1.href = "https://www.ticketlink.co.kr/sports/baseball";
  link1.target = "_blank";
  link1.textContent = "티켓링크 바로가기(두산/키움 외 전 구단)";
  link1.classList.add("linkAcss");
  document.getElementById("linkA").appendChild(link1);

  // 링크2 생성 및 이벤트 추가
  var link2 = document.createElement("a");
  link2.href = "https://ticket.interpark.com/Contents/Sports/Bridge/baseball";
  link2.target = "_blank";
  link2.textContent = "인터파크티켓 바로가기(두산/키움)";
  link2.classList.add("linkBcss");
  document.getElementById("linkB").appendChild(link2);

  // 링크2 생성 및 이벤트 추가
  var link3 = document.createElement("a");
  link3.href = "https://www.hanwhaeagles.co.kr/index.do";
  link3.target = "_blank";
  link3.textContent = "| 한화생명이글스파크";
  link3.classList.add("linkCcss");
  document.getElementById("linkC").appendChild(link3);
});
