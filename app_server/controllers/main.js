
/*get homepage*/

module.exports.index = function(req, res){
 res.render('index', {title: 'Olympikesoft'});
};

module.exports.about = function(req, res){
    res.render('about', {title: 'olympikesoft', about: 'Start-up page'});
};