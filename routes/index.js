var request = require('request')
    , cheerio = require('cheerio')
/*
 * GET home page.
 */

exports.index = function(req, res){

    var result = []
  //res.render('index', { title: 'Express' });
  request('http://www.dickssportinggoods.com/family/index.jsp?categoryId=13299870&pg=1&ppp=150', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(body)
    , products = $('#productLoopUL .prodloopProduct .prodloopText').toArray()

    products.forEach(function(_pro){
        var pro = $(_pro)
        , title = pro.children().first().text().trim()
        , href  = pro.children().first().children().first().attr('href')
        , price = pro.children().eq(1).text()
    
        var product = {
            title:title,
            href:href,
            price:price
        }
        result.push(product)
        })
    }
    res.json(result)
    })
};

