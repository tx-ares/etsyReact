console.log('hi')
location.hash = 'home'
// var KEY = 'vjvzvfjyg9jd3mim1gomdhq5'
// var BASEURL = 'https://openapi.etsy.com/v2/listings/active?'
var searchNode = document.querySelector('#search')

var ListCollection = Backbone.Collection.extend({
	url: 'https://openapi.etsy.com/v2/listings/active.js',
	_apikey: 'vjvzvfjyg9jd3mim1gomdhq5',
	parse: function(rawJSONP){
		console.log(rawJSONP)
		return rawJSONP.results
	}
})

var DetailModel = Backbone.Model.extend({
	url: 'https://openapi.etsy.com/v2/listings/',
	_apikey: 'vjvzvfjyg9jd3mim1gomdhq5',
	parse: function(rawJSONP){
		console.log(rawJSONP)
		return rawJSONP.results
	}

})

var NavigationModel = Backbone.Model.extend({
	url: 'https://openapi.etsy.com/v2/shops/',
	_apikey: 'vjvzvfjyg9jd3mim1gomdhq5',
	parse: function(rawJSONP){
		console.log(rawJSONP)
		return rawJSONP.results
	}
})


var ListView = Backbone.View.extend({
	el: document.querySelector('#container'),

	events: {
		'keydown input': '_handleSearch',
		'click .listing': '_goToListDetail'
	},

	_goToListDetail: function(eventObj){
		// console.log(eventObj.currentTarget.getAttribute('data-id'))
		location.hash = 'details/' + eventObj.currentTarget.getAttribute('data-id')
	},

	_handleSearch: function(eventObj){
		if(eventObj.keyCode === 13){
			location.hash = 'search/' + eventObj.target.value
		}
	},

	initialize: function(collection){
		this.coll = collection
		var thisView = this
		boundRender = this._render.bind(thisView)
		this.coll.on('sync', boundRender)
		
	},
	_render: function(){
		console.log('here comes this.coll',this.coll)
		var collArr= this.coll.models
		var htmlString = ''
			htmlString += '<div id="nav-bar">'
			htmlString += 	'<div id="menu">'
			htmlString +=		'<span>Clothing & Accesories</span>'
			htmlString +=		'<span>Jewelry</span>'
			htmlString +=		'<span>Crafts Supplies & Tools</span>'
			htmlString +=		'<span>Weddings</span>'
			htmlString +=		'<span>Entertainment</span>'
			htmlString +=		'<span>Home&Living</span>'
			htmlString +=		'<span>Kids & Baby</span>'
			htmlString +=		'<span>Vintage</span>'
			htmlString += 	'<input id="search" placeholder="Search for items"></input>'
			htmlString += '</div>'
			htmlString += '<div id="list-wrapper">'
		for(var i = 0; i < collArr.length; i++){
			var listing = collArr[i].attributes
			htmlString += '<div data-id="' + listing.listing_id + '" class="listing">'
			htmlString += 	'<img src="' + listing.Images[0].url_170x135 +'">'
			htmlString += 	'<div class="title">' + listing.title + '</div>'
			htmlString +=	'<div class="info">'
			htmlString +=		'<div class="shop-name">' + listing.Shop.shop_name + '</div>'
			htmlString += 		'<div class="price">$' + listing.price + '</div>'
			htmlString +=	'</div>'
			htmlString += '</div>'
		}
		htmlString += '</div>'
		this.el.innerHTML = htmlString
	}
})

var DetailView = Backbone.View.extend({
	el: document.querySelector('#container'),

	events:{
		'click #previous': '_findPreviousShopListing',
		'click #next': '_findNextShopListing'
	},

	_findPreviousShopListing: function(){
		location.hash = 'previous/' + this.product.attributes['0'].Shop.shop_id
	},

	initialize: function(product){
		var viewType = this
		this.product = product
		var boundRender = this._render.bind(viewType)
		product.on('sync', boundRender)
	},
	_render: function(){
		console.log('here comes this in detail_render', this.product)
		productObject = this.product.attributes['0']
		productImg = productObject.Images[0].url_570xN 
		var htmlString = ''
		htmlString += '<div id="previous">Left Arrow</div>'
		htmlString += '<div id="product-detail">'
		htmlString +=	'<div id="product-image"><img src="' + productImg + '"></div>'
		htmlString += '</div>'
		htmlString += '<div id="next">Right Arrow</div>'
		this.el.innerHTML =htmlString
	}
})

var PreviousView = Backbone.Model.extend({

})

var EtsyRouter = Backbone.Router.extend({
	routes:{
		'home': 'showHomePage',
		'search/:query': 'showSearchResults',
		'details/:id': 'showDetails',
		'*catchall': 'redirectToHome'
	},

	showHomePage: function(){
		var activeCollections = new ListCollection()
		activeCollections.fetch({
			dataType: 'jsonp',
			data: {
				api_key: activeCollections._apikey,
				includes: 'Images,Shop'
			}
		})
		new ListView(activeCollections)
	},

	showSearchResults: function(keyword){
		//create a new collection
		var searchedCollection = new ListCollection()
		//fetch search result
		searchedCollection.fetch({
			dataType: 'jsonp',
			data:{
				api_key: searchedCollection._apikey,
				includes: 'Images,Shop',
				keywords: keyword
			}
		})
		//create new view for the collection
		new ListView(searchedCollection)
	},

	// showDetails: function(listID){
	// 	//create new detail model
	// 	var listingDetailModel = new DetailModel()
	// 	//update fetch url
	// 	listingDetailModel.url += listID + '.js'
	// 	//fetch the listing model via API
	// 	listingDetailModel.fetch({
	// 		dataType: 'jsonp',
	// 		data:{
	// 			api_key: listingDetailModel._apikey,
	// 			includes: 'Images,Shop'
	// 		}
	// 	})
	// 	//create new detail view
	// 	new DetailView(listingDetailModel)
	// },

	showDetails: function(listID){
	//create new detail model
	var listingDetailModel = new DetailModel()
	//update fetch url
	listingDetailModel.url += listID + '.js'
	//fetch the listing model via API
	listingDetailModel.fetch({
		dataType: 'jsonp',
		data:{
			api_key: listingDetailModel._apikey,
			includes: 'Images,Shop'
		}
	})
	//create new detail view
	new DetailView(listingDetailModel)
},

	// navigator: function(shopId){
	// 	//create new navigation model
	// 	var navigateModel = new NavigationModel
	// 	//update fetch url
	// 	navigateModel.url += shopId + '/listings/active.js'
	// 	//fetch shop listings
	// 	navigateModel.fetch({
	// 		dataType: 'jsonp',
	// 		data: {
	// 			api_key: navigateModel._apikey,
	// 			includes: 'Images,Shop'
	// 		}
	// 	})
	// 	//create new detail view
	// 	new PreviousView(navigateModel)
	// },

	initialize: function(){
		Backbone.history.start()
	}
})



new EtsyRouter()
