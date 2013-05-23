var request = require('request')
    , cheerio = require('cheerio')
/*
 * GET home page.
 */

exports.index = function(req, res){

    var result = []
  //res.render('index', { title: 'Express' });
  request('http://www.walmart.com/browse/computers/desktop-computers/3944_3951_132982/?;ic=48_0&;ref=+428236&amp;catNavId=3951&browsein=true&povid=P1171-C1110.2784+1455.2776+1115.2956-L16', function (error, response, body) {
    console.log(response.statusCode)
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(body)
    , products = $('.item').toArray()
    products.forEach(function(_pro){
        var pro = $(_pro)
        , title = pro.find('.prodInfoBox').children().eq(1).text().trim()
        , href  = pro.find('a').attr('href')
        , modelNo = pro.find('.prodInfoBox').find('.ModelNo').text()
        , price = pro.find('.prodInfo').find('.prefixPriceText2').text() + pro.find('.prodInfo').find('.bigPriceText2').text() + pro.find('.prodInfo').find('.smallPriceText2').text()
        , description = pro.find('.ProdDescContainer').find('.ProdDesc').text()
        , image = pro.find('img').attr('src')
        , rating = pro.find('.wmStars').find('div').attr('title')
        , reviews = pro.find('.BodyS').find('a').text()

        var product = {
            title: title,
            href: href,
            modelNo: modelNo,
            price: price,
            description: description,
            image: image,
            rating: rating,
            reviews: reviews
        }
        result.push(product)
        })
    }
    res.json(result)
    })
};

