import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import {AllListingsCollection} from './models.js'
import {ListingModel} from './models.js'

import {Body} from './views.js'
import {AllListingsView} from './views.js'
import Views from './views.js'


const app = function() {

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
		console.log(allColl)
		
		//Add jsonP for bypassing restrictions, as well as a data query to bring back our default search value.
		allColl.fetch({
			dataType: 'jsonP',
			data: {
				includes: 'Images, Shop',
				api_key: allColl._key,
				keywords: 'rock music'
			}
		}) 
			// Somethings broke.
			console.log(allColl, "<<< Data fetched.")
			ReactDOM.render(<Body allColl={allColl}/>,document.querySelector('.container'))
			console.log("render qued.")
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

	var rtr = new Router()
}

// document.querySelector(".searchBar").addEventListener('keydown', searchEnter)



app()