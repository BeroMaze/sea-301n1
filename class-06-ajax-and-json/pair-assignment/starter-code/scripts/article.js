function Article (opts) {
  this.author = opts.author;
  this.authorUrl = opts.authorUrl;
  this.title = opts.title;
  this.category = opts.category;
  this.body = opts.body;
  this.publishedOn = opts.publishedOn;
}

Article.all = [];

Article.prototype.toHtml = function() {
  var template = Handlebars.compile($('#article-template').text());

  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
  this.body = marked(this.body);

  return template(this);
};

Article.loadAll = function(rawData) {
  rawData.sort(function(a,b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  });

  rawData.forEach(function(ele) {
    Article.all.push(new Article(ele));
  });
};

Article.fetchAll = function() {
  if (localStorage.rawData) {
    var xxxx = JSON.parse(localStorage.getItem('rawData'));
    var yyyy = JSON.parse(localStorage.getItem('rawaDataArticles'));
    Article.loadAll(xxxx);
    Article.loadAll(yyyy);
    Article.all.forEach(function (item){
      $('#articles').append(item.toHtml());
    });
  }
  else {
      $.getJSON('./data/hackerIpsum.json', function(data){
        $hackerIpsum = data;
        console.log($hackerIpsum);
        localStorage.setItem('rawData', JSON.stringify(data));
      });
      $.getJSON('./data/ipsumArticles.json', function(data){
        localStorage.setItem('rawaDataArticles', JSON.stringify(data));
      });
  }
};
