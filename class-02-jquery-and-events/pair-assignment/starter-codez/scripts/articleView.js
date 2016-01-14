// Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
var articleView = {};

articleView.populateFilters = function() {
  $('article').each(function() {
    if (!$(this).hasClass('template')) {
      var val = $(this).find('address a').text();
      var optionTag = '<option value="' + val + '">' + val + '</option>';
      $('#author-filter').append(optionTag);
      val = $(this).attr('data-category');
      optionTag = '<option value="' + val + '">' + val + '</option>';
      if ($('#category-filter option[value="' + val + '"]').length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};

articleView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      console.log($(this).val());
      $('article').hide();
      $("article:contains('"+ $(this).val()+"')").show();
    }
    else {
      $('article').show();
      $('.template').hide();
    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      console.log($(this).val());
      $('article').hide();
      var test = $("article[data-category~='"+ $(this).val()+"']");
      console.log(test);
      test.show();
    }
    else {
      $('article').show();
      $('.template').hide();
    }
    $('#author-filter').val('');
  });
};

articleView.handleMainNav = function() {
  $('.main-nav .tab').on('click', function() {
    x = "#" + $(this).attr('data-content');
    $(x).show();
    $('.tab-content').not(x).hide();
  });
  $('.main-nav .tab:first').click();
};

articleView.setTeasers = function() {
  $('.article-body *:nth-of-type(n+2)').hide();
  $('.read-on').on('click', function(e) {
    e.preventDefault();
    var r =  $(this).parent().children('section').children('p').show();
    r.children('p').show();
    $(this).hide();
  });
};

$(document).ready(function() {
  articleView.populateFilters();
  articleView.handleAuthorFilter();
  articleView.handleCategoryFilter();
  articleView.handleMainNav();
  articleView.setTeasers();
});
