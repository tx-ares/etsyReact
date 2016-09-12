//Dependencies
import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import $ from 'jquery'

//Collections
import {AllListingsCollection} from './models.js'
import {ListingModel} from './models.js'

//Main Views
import {Body} from './views.js'
import {AllListingsView} from './views.js'
import {SingleListingView} from './views.js'
import {SearchView} from './views.js'


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
		console.log("ROUTER: Routed to showAllListings")
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
		}).then(function() {
			//This is the first route that will trigger.  Here our collection will remain the same , and using .then we will trigger our React render. 
			console.log(allColl, "<<< ROUTER: Data fetched.")
			//Important to note, once our collection is fetched, we must then pass that data to our React component in the form of props.  
			ReactDOM.render(<AllListingsView allColl={allColl}/>,document.querySelector('.container'))
			console.log("ROUTER : AllListingsView render qued.")
			})

	},

	showItemListing: function(listingId) {
		console.log("ROUTER: Single item route fired!")
		var listingMod = new ListingModel(listingId)
		listingMod.fetch({
			dataType: 'jsonP',
			data: {
				includes: 'Images, Shop',
				api_key: listingMod._key,
				listing_id: listingId
			}

		}).then(function(){
			console.log(listingMod, "<<<< ROUTER: listingMod data fetched.")
			ReactDOM.render(<SingleListingView listingMod={listingMod} />,document.querySelector('.container'))
			console.log("ROUTER: SingleListingView render qued!")
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
			console.log(searchColl, "<<<< ROUTER: searchColl data fetched.")
			ReactDOM.render(<SearchView searchColl={searchColl}/>, document.querySelector('.container'))
			console.log("ROUTER: SearchView render qued!")
		})

	},

	initialize: function() {

		Backbone.history.start()
	}

})

	var rtr = new Router()
}


app()