function render() {
    let contentRef = document.getElementById("content");
    contentRef.innerHTML = '';

    for(let index = 0; index < books.length; index++) {
        contentRef.innerHTML +=  getBookTemplate(index);
    }
}

function getBookTemplate(index) {
    const book = books[index];

    let commentsHtml = '';
    for(let i = 0; i < book.comments.length; i++) {
        commentsHtml += `
            <div class="comment">
                <p class="comment_user">${book.comments[i].name}</p>
                <p class="comment_text">${book.comments[i].comment}</p>
            </div>
        `;
    }

    return `<div class="book_card">
    <h2 class="book_title">${book.name}</h2>

    <div class="book_img">
        <img src="assets/img/book_cover.png" alt="Cover ${book.name}">
    </div>

    <div class="book_info">
        <div class="price_heart">
            <p class="price">${book.price.toFixed(2).replace('.', ',')} €</p>
            <div class="likes" onclick="toggleLike(${index})">
                <span id="likeCount${index}">${book.likes}</span>
                <span class="heart ${book.liked ? 'filled' : ''}" id="heartIcon${index}">${book.liked ? '♥' : '♡'}</span>
            </div>
        </div>
    </div>

    <table>
        <tr>
            <td>Author:</td>
            <td>${book.author}</td>
        </tr>
        <tr>
            <td>Erscheinungsjahr:</td>
            <td>${book.publishedYear}</td>
        </tr>
        <tr>
            <td>Genre:</td>
            <td>${book.genre}</td>
        </tr>
    </table>

    <div class="comments">
        <h3>Kommentare:</h3>
        <div id="commentsList${index}">
            ${commentsHtml}
        </div>
    </div>

    <div class="comment_input">
        <input type="text" id="commentInput${index}" placeholder="Schreibe dein Kommentar ..." />
        <button onclick="addComment(${index})">➤</button>
    </div>
</div>
`
}