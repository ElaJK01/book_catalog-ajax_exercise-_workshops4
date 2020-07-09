$(function(){
  $.ajax({
    url: 'http://127.0.0.1:8000/book/',
    type: "GET",
    dataType: "json"
  }).done(function(results){
    let mainDiv = $('#GetBooks');
    $(results).each(function(index, element){
      let div = $('<div>');
      let titleLink = $(`<p>${element.title}</p>`);
      titleLink.data('bookId', element.id);
      titleLink.css('color', 'blue');
      titleLink.on('click', function(){
        let divD = $(this).next();
        if(divD.is(":hidden")){
          $.getJSON({
            url: `http://127.0.0.1:8000/book/${$(this).data('bookId')}`
          }).done(function(book) {
            let p1 = $(`<p>Author: ${book.author}</p>`);
            let i1 = $(`<input type="text" id="book_${book.id}_author" value="${book.author}"></input>`);
            let p2 = $(`<p>Genre: ${book.genre}</p>`);
            let p3 = $(`<p>Isbn: ${book.isbn}</p>`);
            let p4 = $(`<p>Publisher: ${book.publisher}</p>`);
            let i4 = $(`<input type="text" id="book_${book.id}_publisher" value="${book.publisher}"></input>`);
            divD.html('');
            divD.append(p1);
            divD.append(i1);
            divD.append(p2);
            divD.append(p3);
            divD.append(p4);
            divD.append(i4);
          })
          divD.fadeIn('slow');
        } else {
          divD.fadeOut('slow');
        }
      })
      div.append(titleLink);
      let divDetails = $('<div>');
      divDetails.fadeOut(1);
      div.append(divDetails);
      let deleteButton = $('<a>Usun</a>');
      deleteButton.data('bookId', element.id);
      deleteButton.on('click', function(){
        let parentDiv = $(this).parent();
        $.ajax({
          url: `http://127.0.0.1:8000/book/${$(this).data('bookId')}`,
          type: 'DELETE',
          dataType: 'json'
        }).done(function() {
          parentDiv.remove();
        });
      });
      div.append(deleteButton);
      let editButton = $('<a>Edytuj</a>');
      editButton.data('bookId', element.id);
      editButton.on('click', function() {
        $.ajax({
          url: `http://127.0.0.1:8000/book/${$(this).data('bookId')}`,
          type: 'PUT',
          dataType: 'json',
          data: JSON.stringify({
            author: $(this).parent().find(`book_${$(this).data('bookId')}_author`).prop('value'),
            publisher: $(this).parent().find(`book_${$(this).data('bookId')}_publisher`).prop('value'),
          })
        }).done(function(){        })
      });
      div.append(editButton);
      mainDiv.append(div);
    })
  });} )