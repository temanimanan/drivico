'use strict';

var ctxA, dataA, chartA, 
	ctxB, dataB, chartB;
var bootStrapChart = function(){

	//Chart.defaults.global.animation = false;

	ctxA = document.getElementById("chartA").getContext("2d");
	ctxB = document.getElementById("chartB").getContext("2d");

	dataA = {
		labels: ["January", "February", "March", "April", "May", "June", "July"],
		datasets: [{
			label: "My First dataset",
			fillColor: "rgba(220,220,220,0.2)",
			strokeColor: "rgba(220,220,220,1)",
			pointColor: "rgba(220,220,220,1)",
			pointStrokeColor: "#fff",
			pointHighlightFill: "#fff",
			pointHighlightStroke: "rgba(220,220,220,1)",
			data: [65, 59, 80, 81, 56, 55, 40]
		},{
			label: "My Second dataset",
			fillColor: "rgba(151,187,205,0.2)",
			strokeColor: "rgba(151,187,205,1)",
			pointColor: "rgba(151,187,205,1)",
			pointStrokeColor: "#fff",
			pointHighlightFill: "#fff",
			pointHighlightStroke: "rgba(151,187,205,1)",
			data: [28, 48, 40, 19, 86, 27, 90]
		}]
	};

	dataB = [
		{ value: 300, color:"#F7464A", highlight: "#FF5A5E", label: "Red" },
		{ value: 50, color: "#46BFBD", highlight: "#5AD3D1", label: "Green" },
		{ value: 100, color: "#FDB45C", highlight: "#FFC870", label: "Yellow" },
		{ value: 40, color: "#949FB1", highlight: "#A8B3C5", label: "Grey" },
		{ value: 120, color: "#4D5360", highlight: "#616774", label: "Dark Grey" }
	];

	chartA =  new Chart(ctxA);
	chartB =  new Chart(ctxB);
};


var app = angular.module('app', []);
app.controller('appController', ['$scope', function($scope){

	var selectedTab = 'homeTab';
	$scope[selectedTab] = true;

	$scope.changeTab = function( e ){
		var tab = e.target.getAttribute('data-tab') || e.target.parentNode.getAttribute('data-tab');		
		if( tab ){
			$scope[selectedTab] = false;
			selectedTab = tab + 'Tab';

			if( selectedTab === 'homeTab' ){
				$scope.renderGraph();
			}else{
				$scope.renderGraph(true );
			}

			$scope[selectedTab] = true;
		}
	
 	};

 	var clearNewVehicle = function(){
 		$scope.newVehicleForm.vin = '';
 		$scope.newVehicleForm.make = $scope.newVehicleForm.year = $scope.newVehicleForm.model = '-1';
 	};

 	$scope.toggleShowNewVehicle = function( hide ){
 		clearNewVehicle();
 		$scope.showNewVehicle = (hide !== false)?true:false;
 	};

 	$scope.makes = [ 'Honda', 'BMW', 'Toyota' ];
 	$scope.makesModels = [ ['Accord', 'Civic'], ['325'], ['Camry'] ];
	$scope.services = [ 
		{ type: 'Cleaning', vendor: 'Artur Auto Service', pickup: '123 Fox Corner road, 02818', date: 'November 23, 2015 (Friday)', active: true }, 
		{ type: 'Oil Change', vendor: 'Artur Auto Service', pickup: null, date: null, active: false }
	];

 	$scope.vehicles = [
 		{ vin: '1234', make: 'BMW', model: '325', year: 2009 }
 	];


	$scope.backToVehicles = function(){ $scope.vehicleSelected = false; };

 	$scope.handleVechicleClick = function( $event ){
 		var action = $event.target.getAttribute('data-vehicle-action');
 			action = action || $event.target.parentNode.getAttribute('data-vehicle-action');
 		var vehicleid = $event.target.getAttribute('data-vehicle-id');
 			vehicleid = vehicleid || $event.target.parentNode.getAttribute('data-vehicle-id');

 		var vehicleText;

 		switch( action ){
 			case 'delete':
		 		if( vehicleid ){ $scope.vehicles.splice( parseInt( vehicleid ), 1 ); }
 			break;
 			case 'selectVehicle':
 				if( vehicleid ){ 
 					$scope.vehicleSelected = true;
 					vehicleText = $scope.vehicles[vehicleid];
 					vehicleText = [ vehicleText.year, vehicleText.make, vehicleText.model, vehicleText.vin ];
 					$scope.selectedVehicleText = vehicleText.join('-');
 				}
 			break;
 		}
 	};

 	$scope.years = [];
 	for( var i = 2016; i >= 1980; i-- ){ $scope.years.push(i); }

	$scope.vendors = [ 
		{ name: 'Artur Auto Service', id: 123 },
		{ name: 'EG Cleaners', id: 1235 }
	];

	$scope.schedules = [ 'Once a Year', 'Every 6 Months', 'Once a Month'];

 	$scope.addVehicle = function(){
 		var _make = $scope.makes[ $scope.newVehicleForm.make ];
 		var _year = $scope.years[ $scope.newVehicleForm.year ];
 		var _model = $scope.makesModels[ $scope.newVehicleForm.make ];
 			_model = _model?_model[ $scope.newVehicleForm.model ]:0;
 		var _vin = $scope.newVehicleForm.vin;
 		if( _make && _year && _model ){
			$scope.vehicles.push( { year: _year, make: _make, model: _model, vin: _vin } );
			$scope.toggleShowNewVehicle( false );
 		}
 	};

	$scope.showEditService = function( service, bool ){
		$scope.showServiceEdit = (bool !== false)?true:false;
	}


 	$scope.renderGraph = function( destroy ){ 
 		if( destroy ){
 			chartA.lineobj.destroy();
 			chartB.lineobj.destroy();
 		}else{
			setTimeout(function(){
		 		chartA.lineobj = chartA.Line(dataA, { responsive: true });
		 		chartB.lineobj = chartB.PolarArea(dataB, { responsive: true });
			}, 0);
 		}
 	};

 	angular.element(document).ready(function(){
 		bootStrapChart();
 		chartA.lineobj = chartA.Line(dataA, { responsive: true, maintainAspectRatio: true });
 		chartB.lineobj = chartB.PolarArea(dataB, { responsive: true, maintainAspectRatio: true });
 	});

}]);


