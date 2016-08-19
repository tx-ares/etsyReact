import React from 'react'
import ReactDOM from 'react-dom'

//Step 1 - Load dependencies jQuery, Underscore, Backbone.

//Step 2 - Define Router and routes.

//Step 3 - Connect to api for 1st time via collection.

//Step 4 - Render Home View.

console.log("Hello wurld!")
console.log($)




var AllListingsCollection = Backbone.Collection.extend({

	url: "https://openapi.etsy.com/v2/listings/active.js",
	_key: "k4v6u445o5n237im8b03002u",

	parse: function(rawJson){
		console.log(rawJson)
		return rawJson.results
	}
})

var ListingModel = Backbone.Model.extend({

	url: function() {
		return "https://openapi.etsy.com/v2/listings/" + this.listingId + ".js"
	},

	_key: "k4v6u445o5n237im8b03002u",

	parse: function(rawJson){

		return rawJson.results[0]
	},

	initialize: function(listingId) {
		this.listingId = listingId
		console.log(this.listingId, "<<<< Listing Model fired!")
	}


})

var Router = Backbone.Router.extend({

	routes: {
		"home" : "showAllListings",
		"search/:inputSearch": "showSearchResults",
		"itemListing/:listing_id" : "showItemListing",
		"*default": "redirect"
	},

	redirect: function() {
		location.hash = 'home'
	},

	showAllListings: function() {
		console.log("Routed to showAllListings")
		var allColl = new AllListingsCollection()
		allColl.fetch({
			dataType: 'jsonP',
			data: {
				includes: 'Images, Shop',
				api_key: allColl._key,
				keywords: 'rock music'
			}

		}).then(function(jsonResp){
			var allView = new AllListingsView(allColl) 
			// this.render()
		})
	},

	showItemListing: function(listingId) {
		console.log(listingId, "<<<<< listingId is ")
		console.log("Single item route fired!")
		var listingMod = new ListingModel(listingId)
		listingMod.fetch({
			dataType: 'jsonP',
			data: {
				includes: 'Images, Shop',
				api_key: listingMod._key,
				listing_id: listingId
			}

		}).then(function(jsonResp){
			var singleView = new SingleView(listingMod)
			// this.render()
		})
	},

	showSearchResults: function(keywords) {
		var searchColl = new AllListingsCollection()
		searchColl.fetch({
			dataType: 'jsonp',
			data: {
				api_key: searchColl._key,
				includes: "Images,Shop",
				keywords: keywords
			}
		}).then(function() {
			var allView = new AllListingsView(searchColl)

		})

	},

	initialize: function() {
		console.log("Initialize fired!")
		Backbone.history.start()
	}

})

var searchEnter = function(eventObj){
	if(eventObj.keyCode === 13) {
		console.log(eventObj.target.value)
		location.hash = "search/" + eventObj.target.value
		eventObj.target.value = ''
	}
}

document.querySelector(".searchBar").addEventListener('keydown', searchEnter)

var rtr = new Router()

export default Models