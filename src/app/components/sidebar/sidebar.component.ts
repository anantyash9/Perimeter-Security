import { Component, OnInit } from '@angular/core';
import { scan } from 'rxjs';
import { OdmService } from 'src/app/services/odm.service';
import { Scan } from 'src/app/models/scan.model';
import { Pipeline } from 'src/app/models/pipeline.model';
import { Results } from 'src/app/models/results.model';
import { GeoJsonObject } from 'geojson';
import { Alert } from 'src/app/models/alert.model';
export interface Defect {
  defect: string;
  line: any;
  length: number;
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
  pipeline_types=["Vegetation","construction","road","Mining","Security","Custom"];
  scans_list: Scan[] = [];
  pipeline_list: Pipeline[] = [];
  pipeline_selected =new Pipeline();
  isScanSelected=false;
  isPipelineSelected=false;
  isNewPipelineSelected=false;
  scan_selected=new Scan();
  results:any[]=[];
  new_pipeline= new Pipeline() ;
  modelName:string="";
  create_pipeline=false;
  annotations:any[]=[]
  panelOpenState = false;
  defects:Defect[]=[];
  alerts:Alert[]=[];
  load_scan=false;
  constructor(private odmservice: OdmService) {
    this.defects=this.odmservice.getBoundryDefects();
    this.alerts=this.odmservice.getSecurityAlerts();
}

  ngOnInit(): void {
    setTimeout(() => {
      this.get_scans()
  }, 1000);
    
    
  }
  selectScan(i: any): void {
    // send message to subscribers via observable subject
    this.scan_selected = i;
    this.odmservice.sendScan(i);
    this.pipeline_list=[];
    this.odmservice.getPipelines(i).subscribe((pipelines) => {
    for(let i=0;i<pipelines.length;i++){
      this.odmservice.getPipelineDetails(pipelines[i]).subscribe((pipeline) => {
        this.pipeline_list.push(pipeline);
      }
      )
    }
            
    });
    this.isScanSelected = true;

  }

  get_scans() {
      this.scans_list = [this.odmservice.getScans()];
      console.log(this.scans_list);
      this.odmservice.sendScan(this.scans_list[0])
    }
  
  load_pipeline(i: Pipeline) {
    console.log(i);
    this.pipeline_selected = i;
    this.odmservice.sendPipeline(i);
    this.isPipelineSelected = true;
    this.odmservice.getResults(i).subscribe((results) => {
      this.results = results;
      console.log("detections",this.results);
      this.odmservice.sendResultsList(results);
    })
  }
  newPipeline() {
    this.pipeline_selected=new Pipeline();
    this.odmservice.sendPipeline(this.pipeline_selected);
    this.isNewPipelineSelected=true;
    this.isPipelineSelected=false;
    this.odmservice.sendDrawState({show_draw_tools: true});
  }
  createPipeline() {
    console.log(this.scan_selected)
    this.new_pipeline.project_id = this.scan_selected.project_id;
    this.new_pipeline.task_id = this.scan_selected.task_id;
    var examples:any=[]
    this.annotations.forEach(element => {
      examples.push(element.geometry.coordinates[0])
    })
    console.log("this is what we send",examples)
    console.log("this is what we have",this.annotations)
    this.odmservice.createPipeline(this.new_pipeline,this.modelName,examples).subscribe((pipeline) => {
      // this.pipeline_list.push(<Pipeline>pipeline);
      console.log("return",pipeline);
      this.new_pipeline=new Pipeline();
      this.backToPipelines()
      this.odmservice.sendDrawState({show_draw_tools: false});
    })
  }

  showPipelines() {
    return this.isPipelineSelected==false && this.isScanSelected==true && this.isNewPipelineSelected==false;
  }
  showScans(){
    return this.isScanSelected==false;

  }
  showPipelineDetails(){
    return this.isPipelineSelected==true;
  }
  showNewPipeline(){
    return this.isNewPipelineSelected==true;
  }
  backToPipelines(){
    this.pipeline_selected=new Pipeline();
    this.odmservice.sendResultsList([]);
    this.odmservice.sendPipeline(this.pipeline_selected);
    this.odmservice.sendScan(this.scan_selected);
    this.isPipelineSelected=false;
    this.isNewPipelineSelected=false;
    this.odmservice.sendDrawState({show_draw_tools: false});
    this.new_pipeline=new Pipeline();
  }
  backToScans(){
    this.scan_selected=new Scan();
    this.odmservice.sendScan(this.scan_selected);
    this.isScanSelected=false;
  }
  customCheck(){
    if (this.new_pipeline.detection_type=="Custom")
    {
      this.odmservice.sendDrawState({show_draw_tools: true,save_to_annotations: true});
    }
    else{
      this.odmservice.sendDrawState({show_draw_tools: true,save_to_annotations: false});
    }
  }
  zoomTo(defect:any){
    if (this.load_scan==true)
    {
      this.get_scans()
      this.load_scan=false;
    }
    this.odmservice.sendDrawState({show_draw_tools: false,save_to_annotations: false,zoom_to: defect.line});
    
    
  }
  viewAlert(alert:any){
    this.odmservice.sendAlert(alert)
    this.load_scan=true;
  }
  
}
