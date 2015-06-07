var app = angular.module('myapp', []);
var base_url = 'http://booksstore.herokuapp.com';
var books = [];
var months = [];
app.controller('appCtrl', function($scope){

    var selected = '';
    all_books($scope);
    $scope.book_by_name = function(){
        $('#month').fadeOut(function(){
            $('#book-name').fadeIn();
        });
    };

    $scope.books_by_month = function(){
        $('#book-name').fadeOut(function(){
            $('#month').fadeIn();
        });
    };

    $('#book-name').change(function(){
        selected = $(this).val();
        if(selected != 'choose id') book_by_id(selected, $scope);
    });

    $('#month').change(function(){
        selected = $(this).val();
        if(selected != 'choose month') books_by_month(selected, $scope);
    });

});

function all_books($scope){
    var url = base_url + '/all-books';
    $.ajax({
        url: url,
        type: 'POST'
    }).done(function(res){
        books = JSON.parse(res);
        $scope.books = books;
        $scope.$apply();
        for(var i = 0; i < 36; i += 3){
            months.push(books[i].published);
        }
        $scope.months = months;
        $scope.$apply();
    });
}

function book_by_id(book_id, $scope){
    var url = base_url + '/book-name&book_id='+book_id;
    $.ajax({
        url: url,
        type: 'POST'
    }).done(function(res){
        $scope.book_name = JSON.parse(res);
        $scope.$apply();
        $('.book-cont').css('display', 'none');
        $('#book-by-name').css('display', 'block');
    });
}

function books_by_month(month, $scope){
    var url = base_url + '/books-by-month&month='+month;
    $.ajax({
        url: url,
        type: 'POST'
    }).done(function(res){
        $scope.rel_books= JSON.parse(res);
        $scope.$apply();
        $('.book-cont').css('display', 'none');
        $('.books-by-month').css('display', 'block');
    });
}