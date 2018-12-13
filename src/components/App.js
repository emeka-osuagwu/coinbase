import React, { Component } from 'react';

import axios from "../config/axios";
import Loader from 'react-loader-spinner'

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			products: [],
			loading: false,
			active_product: {},
			active_product_stats: null
		};
	}

	componentWillMount() {
		this.fetchAllProducts() 
	}

	fetchAllProducts(){

		this.setState({
			loading: true
		})

		axios.get("products")
		.then( data => {
			
			let top_product = data.data[0];

			axios.get("products/" + top_product.id + "/stats")
			.then( stats => {
				this.setState({
					products: data.data,
					loading: false,
					active_product: top_product,
					active_product_stats: stats.data,
				})
			})
		})
		.catch(error => {
			console.log(error)
		})
	}

	fetchProductStats(product){

		this.setState({
			loading: true
		})

		axios.get("products/" + product.id + "/stats")
		.then( data => {
			console.log(data)
			this.setState({
				loading: false,
				active_product: product,
				active_product_stats: data.data
			})
		})
		.catch(error => {
			console.log(error )
		})
	}

	renderLoader(){
		if (this.state.loading) {
			return (
				<div id="loader_con" className="loader_con">
					<Loader type="Oval" color="blue" height={80} width={80} />
				</div>
			)
		}
	}

	renderHeader(){
		return (
			<nav className="navbar navbar-light bg-light">
				<a className="navbar-brand" href="#">
					<img src="/docs/4.1/assets/brand/bootstrap-solid.svg" width="30" height="30" alt="" />
				</a>
			</nav>
		)
	}

	renderMainContent(){
		if (this.state.active_product_stats) {
			return (
				<div className="col-md-7">
					<div className="card" style={{marginBottom: 30}}>
						<div className="card-header">
							{this.state.active_product.display_name} Info
							<span className="badge badge-primary badge-pill">{this.state.active_product.status}</span>
						</div>
						<div className="card-body">
							<ul class="list-group">
								<li class="list-group-item">
									<a href="#" class="badge badge-primary">Max Market Funds</a> {this.state.active_product.max_market_funds}
								</li>
								<li class="list-group-item">
									<a href="#" class="badge badge-primary">Min Market Funds</a> {this.state.active_product.min_market_funds}
								</li>
								<li class="list-group-item">
									<a href="#" class="badge badge-primary">Quote Currency</a> {this.state.active_product.quote_currency}
								</li>
								<li class="list-group-item">
									<a href="#" class="badge badge-primary">Base Currency</a> {this.state.active_product.base_currency}
								</li>
								<li class="list-group-item">
									<a href="#" class="badge badge-primary">Base Max Size</a> {this.state.active_product.base_max_size}
								</li>
								<li class="list-group-item">
									<a href="#" class="badge badge-primary">Base Min Size</a> {this.state.active_product.base_min_size}
								</li>
							</ul>
						</div>
					</div>

					<div className="card">
						<div className="card-header">
							{this.state.active_product.display_name} Stats
						</div>
						<div className="card-body">
							<ul class="list-group">
								<li class="list-group-item">
									<a href="#" class="badge badge-primary">High</a> {this.state.active_product_stats.high}
								</li>
								<li class="list-group-item">
									<a href="#" class="badge badge-primary">Low</a> {this.state.active_product_stats.low}
								</li>
								<li class="list-group-item">
									<a href="#" class="badge badge-primary">Last</a> {this.state.active_product_stats.last}
								</li>
								<li class="list-group-item">
									<a href="#" class="badge badge-primary">Open</a> {this.state.active_product_stats.open}
								</li>
								<li class="list-group-item">
									<a href="#" class="badge badge-primary">Volume</a> {this.state.active_product_stats.volume}
								</li>
								<li class="list-group-item">
									<a href="#" class="badge badge-primary">Volume 30day</a> {this.state.active_product_stats.volume_30day}
								</li>
							</ul>
						</div>
					</div>
				</div>
			)
		}
	}

	renderSideNavContent(){
		return (
			<div className="col-md-5">
				<div className="side_nav_con">
					{
						this.state.products.map((product, i) => 
						<ul key={product.id} className="list-group">
							<li className="list-group-item d-flex justify-content-between align-items-center" onClick={()=>{this.fetchProductStats(product)}}>
								{product.display_name}
								<span className="badge badge-primary badge-pill">{product.quote_currency}</span>
							</li>
						</ul>
					)}
				</div>
			</div>
		)
	}

	render() {
		return (
			<div>
				{this.renderHeader()}
				<div className="container">
					<div className="row">
						<div className="col-md-8 offset-md-2 body_container">
							<div className="row">
								{this.renderLoader()}
								{this.renderSideNavContent()}
								{this.renderMainContent()}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;