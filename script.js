function init() {
    loadFromLocalStorage();
    render();
}

function loadFromLocalStorage() {
    const savedComments = localStorage.getItem('bookComments');
    const savedLikes = localStorage.getItem('bookLikes');
    
    if (savedComments) {
        const comments = JSON.parse(savedComments);
        if (comments && comments.length >= 0) {
            for (let i = 0; i < books.length && i < comments.length; i++) {
                if (comments[i]) {
                    books[i].comments = comments[i];
                }
            }
        }
    }

    if (savedLikes) {
        const likes = JSON.parse(savedLikes);
        if (likes && likes.length >= 0) {
            for (let i = 0; i < books.length && i < likes.length; i++) {
                if (likes[i]) {
                    if (likes[i].likes !== undefined) {
                        books[i].likes = likes[i].likes;
                    }
                    if (likes[i].liked !== undefined) {
                        books[i].liked = likes[i].liked;
                    }
                }
            }
        }
    }
}

function saveCommentsToLocalStorage() {
    const allComments = books.map(book => book.comments);
    
    localStorage.setItem('bookComments', JSON.stringify(allComments));
}

function saveLikesToLocalStorage() {
    const allLikes = books.map(book => ({
        likes: book.likes,
        liked: book.liked
    }));
    
    localStorage.setItem('bookLikes', JSON.stringify(allLikes));
}

function toggleLike(bookIndex) {
    const book = books[bookIndex];
    const heartIcon = document.getElementById(`heartIcon${bookIndex}`);
    const likeCount = document.getElementById(`likeCount${bookIndex}`);
    
    if (book.liked) {
        heartIcon.textContent = '♡';
        heartIcon.classList.remove('filled');
        book.likes--;
        book.liked = false;
    } else {
        heartIcon.textContent = '♥';
        heartIcon.classList.add('filled');
        book.likes++;
        book.liked = true;
    }
    
    likeCount.textContent = book.likes;

    saveLikesToLocalStorage();
}

function addComment(bookIndex) {
    const input = document.getElementById(`commentInput${bookIndex}`);
    const commentText = input.value.trim();
    
    if (commentText === '') return;
    
    const commentsList = document.getElementById(`commentsList${bookIndex}`);
    const newComment = document.createElement('div');
    newComment.className = 'comment';
    
    newComment.innerHTML = `
        <p class="comment_user">Du</p>
        <p class="comment_text">${commentText}</p>
    `;
    
    books[bookIndex].comments.push({
        name: "Du",
        comment: commentText
    });
    
    saveCommentsToLocalStorage();

    commentsList.appendChild(newComment);
    input.value = '';
}