import { Component, OnInit } from '@angular/core';
import { data } from './properties.json';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
    public modules: any[] = [
      ClientSideRowModelModule,
      SetFilterModule,
      MenuModule,
      ColumnsToolPanelModule,
    ];
	public overlayLoadingTemplate : any;
	public overlayNoRowsTemplate : any;
	public columnDefs : object[];
    public rowData : object[] = [];
    public gridApi;
    public gridColumnApi;
    public defaultColDef;
	
	constructor() {
		this.columnDefs = [
			{headerName : 'Building Name', field: 'building_name', sortable : true, filter: 'agTextColumnFilter' },
			{headerName : 'Building Towers', field: 'building_towers', sortable : true, filter: 'agTextColumnFilter'},
			{headerName : 'Property Type', field: 'property_type', sortable : true, filter: 'agTextColumnFilter'},
			{headerName : 'Name', field: 'name', sortable : true, filter : true},
			{headerName : 'Min Price', field: 'min_price', sortable : true, filter : 'agNumberColumnFilter',
			filterParams: {
				filterOptions: [
					'greaterThanOrEqual'
				]
			}},
			{headerName : 'Bedroom', field: 'bedroom', sortable : true, filter : true},
			{headerName : 'Bathroom', field: 'bathroom', sortable : true, filter : true},
			{headerName : 'Halfroom', field: 'half_bathroom', sortable : true, filter : true},
		];
		
		data.forEach(function(value){
			this.rowData.push({ 
			  building_name : value.building.name,
			  building_towers : value.building_towers.tower_name,
			  property_type : value.property_type.name,
			  name : value.configuration.name,
			  // min_price : value.configuration.min_price,
			  min_price : 10,
			  bedroom : value.configuration.bedroom,
			  bathroom : value.configuration.bathroom,
			  half_bathroom : value.configuration.half_bathroom
			});
		}.bind(this));
		
		this.defaultColDef = {
			flex: 1,
			minWidth: 200,
			resizable: true,
			floatingFilter: true,
		};
		this.overlayLoadingTemplate =
		  '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
		this.overlayNoRowsTemplate =
		  "<span style=\"padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow;\">This is a custom 'no rows' overlay</span>";
	}
    
    ngOnInit() {
     
    }

    onGridReady(params){
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
      this.gridApi.setRowData(this.rowData);
    }

    globalSearch(event){
      this.gridApi.setQuickFilter(event.target.value);
    }
}