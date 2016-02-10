  (function(module) {
  var repos = {};

  repos.all = [];

  repos.requestRepos = function(callback) {
    $.ajax({
      url: 'https://api.github.com/users/beromaze/repos',
      type: 'GET',
      dataType: 'json',
      // headers: { 'Authorization': 'token ' + githubToken },
      success: function(data, textStatus, jqXHR) {
        repos.all = data;
      }
    })
    .done(function() {
      callback();
      console.log("success");
    });
  };

  // DONE: Model method that filters the full collection for repos with a particular attribute.
  // You could use this to filter all repos that have a non-zero `forks_count`, `stargazers_count`, or `watchers_count`.
  repos.with = function(attr) {
    return repos.all.filter(function(repo) {
      return repo[attr];
    });
  };

  module.repos = repos;
})(window);
