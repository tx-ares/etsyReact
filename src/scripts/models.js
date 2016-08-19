import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'

//Step 1 - Load dependencies jQuery, Underscore, Backbone.

//Step 2 - Define Router and routes.

//Step 3 - Connect to api for 1st time via collection.

//Step 4 - Render Home View.

console.log("Hello wurld!")


export const AllListingsCollection = Backbone.Collection.extend({

	url: "https://openapi.etsy.com/v2/listings/active.js",
	_key: "k4v6u445o5n237im8b03002u",

	parse: function(rawJson){
		console.log(rawJson)
		return rawJson.results
	}
})

export const ListingModel = Backbone.Model.extend({

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



