import { Component, OnInit } from '@angular/core';
import { GeoJsonObject } from 'geojson';
import * as L from 'leaflet';
import { circle, FitBoundsOptions, LatLng, latLng, Polygon,Polyline,polyline, polygon, tileLayer, Map, FeatureGroup, featureGroup, DrawEvents, Control } from 'leaflet';
import { Subscription } from 'rxjs';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { DrawState } from 'src/app/models/draw-state';
import { Pipeline } from 'src/app/models/pipeline.model';
import { Results } from 'src/app/models/results.model';
import { Scan } from 'src/app/models/scan.model';
import { OdmService } from 'src/app/services/odm.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  accessToken = "pk.eyJ1IjoiYW5hbnQ5IiwiYSI6ImNrenV5dW91dTNnZzMyb3FvemRrd3N6Y2EifQ.FoqZJnlaw1Dkrq3npDyVfQ"
  id = "mapbox/satellite-v9"
  showLayer = true
  pipeline_layers: Polyline[] = [];
  results_layers: Polygon[] = [];
  odm_layers:any[]=[];
  overlay_layers:any[]=[];
  show_pipeline=false;
  layers: Polygon[] = []
  options: any;
  tokenLoaded: boolean = true;
  zoom = 5
  map!: Map;
  rowspan=4;
  showResults=false;
  annotations: GeoJsonObject[]=[];
  

  mapFitToBoundsOptions: FitBoundsOptions = { maxZoom: 25, animate: true, duration: 1000 }

  layersControl = {
    baseLayers: {
      'DeapthMap': {}
    },
    overlays: {
      'Big Circle': circle([46.95, -122], { radius: 5000 }),
      'Big Square': polygon([[46.8, -121.55], [46.9, -121.55], [46.9, -121.7], [46.8, -121.7]])
    }
  }
  messageReceived: any;
  private scanSelection?: Subscription; //important to create a subscription
  private pipelineSelection?: Subscription;
  private resultsSelection?: Subscription;
  private drawStateSelection?: Subscription;
  private alertSelection?: Subscription;
  drawnItems: FeatureGroup = featureGroup();
  annotationItems: FeatureGroup = featureGroup();
  scan?:Scan;
  pipeline?:any;
  drawState: DrawState = new DrawState();

  drawOptions : Control.DrawConstructorOptions = {
    position: 'topright',
    draw: {
      circle: false,
      rectangle: false,
      marker: false,
      circlemarker: false,
    },
    edit: {
      featureGroup: this.drawnItems,
    },
  };
  drawOptions2 : Control.DrawConstructorOptions = {
    position: 'topright',
    draw: {
      polyline: false,
      circle: false,
      rectangle: false,
      marker: false,
      circlemarker: false,
      polygon:{
        shapeOptions: {
          color: 'red'
        }
      }
    },
    edit: {
      featureGroup: this.drawnItems,
    },
  };

  public onDrawCreated(e: DrawEvents.Created): void {
    this.drawnItems.addLayer((e as DrawEvents.Created).layer);
    if (!this.drawState.save_to_annotations) {
      
    
    this.map.fitBounds(L.geoJSON(e.layer.toGeoJSON()).getBounds());
    var newPipeline:Pipeline=new Pipeline()
    newPipeline.area=<number[][][]>e.layer.toGeoJSON().geometry.coordinates;
    this.odmService.sendNewPipeline(newPipeline);
    }
    else{
      this.drawnItems.addLayer((e as DrawEvents.Created).layer);
      this.annotations.push(e.layer.toGeoJSON());
      this.odmService.sendAnnotation(this.annotations);

    }
    console.log(this.drawState);
  }
  constructor(private odmService: OdmService) {

    this.options = {
      layers: [
        tileLayer('https://api.mapbox.com/styles/v1/' + this.id + '/tiles/{z}/{x}/{y}?access_token=' + this.accessToken, { maxZoom: 22 })
      ],
      zoom: this.zoom,
      center: latLng(22.585606, 78.230250)
    };
    this.drawStateSelection=this.odmService.getDrawState().subscribe(drawState=>{
      this.drawState=drawState;
      this.map.fitBounds(polygon(drawState.zoom_to).getBounds()) 
    })
    this.alertSelection=this.odmService.getAlert().subscribe(alert=>{
        odmService.getToken('paperless', 'Paperless@123').subscribe((data: any) => {
          console.log(data.token);
          var odmlayer = tileLayer("http://drone.vision.surveymaster.in/api/projects/"+alert.project_id+"/tasks/"+alert.task_id+"/orthophoto/tiles/{z}/{x}/{y}.png?jwt=" + data.token, { maxZoom: 25 });
          this.odm_layers=[odmlayer];
          var area =JSON.parse(JSON.stringify(alert.bbox));
          this.fixcoordinates(area);
          this.map.fitBounds(polygon(area).getBounds())
          this.results_layers.push(polygon(area,{color:'red'}).bindPopup('<video width="400px" controls><source src="https://forums-survey.s3.us-east-2.amazonaws.com/perimeter/'+alert.video+'" type="video/mp4"></video>',{maxWidth: 400}));
          this.showResults=true;
          this.show_pipeline=false;


    })})

    this.scanSelection = this.odmService.getScan().subscribe
      (scan => { //message contains the data sent from service
        this.scan=scan;
        if(scan.task_name!=undefined){
        this.map.fitBounds(L.latLngBounds(latLng(this.scan.task_gps[1],this.scan.task_gps[0]),latLng(this.scan.task_gps[3],this.scan.task_gps[2])),this.mapFitToBoundsOptions)
        odmService.getToken('paperless', 'Paperless@123').subscribe((data: any) => {
          console.log(data.token);
          var odmlayer = tileLayer("http://drone.vision.surveymaster.in/api/projects/"+scan.project_id+"/tasks/"+scan.task_id+"/orthophoto/tiles/{z}/{x}/{y}.png?jwt=" + data.token, { maxZoom: 22 });
          this.odm_layers=[odmlayer];
          this.tokenLoaded = true;
          this.drawnItems=featureGroup();
          this.pipeline=new Pipeline();
          this.pipeline.area=this.odmService.getBoundry();
          this.pipeline_layers=[]
          var area=JSON.parse(JSON.stringify(this.pipeline.area));
          this.fixcoordinates(area)
          console.log(area);
          this.pipeline_layers.push(L.polyline(area,{color:'blue',weight:5,opacity:0.5}));
          this.map.fitBounds(polygon(area).getBounds()) 
          console.log(this.messageReceived)
          this.show_pipeline=true;
          var defects =this.odmService.getBoundryDefects();
          defects.forEach((element: { defect: string; line: any }) => {
            var color="blue"
            if (element.defect=='temporary'){color="orange"}
            if (element.defect=='open'){color="yellow"}
            if (element.defect=='damage'){color="red"}
            this.pipeline_layers.push(L.polyline(element.line,{color:color,weight:15,opacity:0.6}));
            
          });
          
          
        });
        console.log(this.scan)
      }
      else{
        this.map.setView(latLng(latLng(22.585606, 78.230250)),5)
      }

      });

      this.pipelineSelection = this.odmService.getPipeline().subscribe
      (pipeline => { //message contains the data sent from service
        this.pipeline=pipeline;
        this.pipeline_layers=[]
        var area=JSON.parse(JSON.stringify(this.pipeline.area));
        this.fixcoordinates(area)
        this.pipeline_layers.push(polyline(area))
        this.map.fitBounds(polygon(area).getBounds()) 
        console.log(this.messageReceived)
        this.show_pipeline=true;

      });

      this.resultsSelection = this.odmService.getResultsList().subscribe(results => {
        this.results_layers=[]
        for (let i = 0; i < results.length; i++) {
          this.fixcoordinates(results[i].gps_bounding_box)
          console.log(results[i].gps_bounding_box)
          this.results_layers.push(this.createLayerWithPopup(results[i]))
          
        }
        this.showResults=true;
        
        
      })
  }

  fixcoordinates(data: number[][]) {
    data.map(e => e.reverse())
    console.log(data)

  }
  createLayerWithPopup(data: any) {
    var layer = polygon(data.gps_bounding_box,{color:"red"}).bindPopup("<b><h3>Probablity : " + data.extra_info.conf+ "</h3></b><br><b>Health</b> : " + Math.floor(Math.random() * 100 )+"%").openPopup();
    console.log(layer)
    return layer;
  }
  createLayerWithPopupVideo(data: any) {
    var layer = polygon(data.gps_bounding_box,{color:"red"}).bindPopup("<b><h3>Probablity : " + data.extra_info.conf+ "</h3></b><br><b>Health</b> : " + Math.floor(Math.random() * 100 )+"%").openPopup();
    console.log(layer)
    return layer;
  }
  ngOnInit(): void {
  }
  onMapReady(map: L.Map): void {
    this.map = map;
  }
}