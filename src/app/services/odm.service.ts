import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { polygon } from 'leaflet';
import { Observable, Subject } from 'rxjs';
import { Scan } from '../models/scan.model';
import { Pipeline } from '../models/pipeline.model';
import { Results } from '../models/results.model';
import { DrawState } from '../models/draw-state';
import { GeoJsonObject } from 'geojson';
import { Alert } from '../models/alert.model';

@Injectable({
  providedIn: 'root'
})
export class OdmService {
  getSecurityAlerts(): any {
    return [{
      type: "person", bbox: [
        [
          77.792576,
          12.843232
        ],
        [
          77.792584,
          12.843233
        ],
        [
          77.792585,
          12.843226
        ],
        [
          77.792577,
          12.843225
        ],
        [
          77.792576,
          12.843232
        ]
      ],
      task_id: "4dfad7d6-282c-4290-bdce-1aaa0fed6c73", project_id: "1", video: "DJI_0582_1.mp4"
    },
    {
      type: "person", bbox: [[
        77.791171,
        12.841873
      ],
      [
        77.791184,
        12.841874
      ],
      [
        77.791184,
        12.841861
      ],
      [
        77.791171,
        12.841861
      ],
      [
        77.791171,
        12.841873
      ]
      ],
      task_id: "97045a8e-d139-437d-8d29-056092741348", project_id: "1", video: "DJI_0582_2.mp4"
    },
    {
      type: "vehicle", bbox: [
        [
          77.787696,
          12.840861
        ],
        [
          77.787748,
          12.840864
        ],
        [
          77.787747,
          12.840825
        ],
        [
          77.787698,
          12.840824
        ],
        [
          77.787696,
          12.840861
        ]
      ], project_id: "1", task_id: "60116a94-2124-4802-be61-277a59914d17", video: "DJI_0582_4.mp4"
    },
    {
      type: "vehicle", bbox: [
        [
          77.78635,
          12.844015
        ],
        [
          77.786417,
          12.844014
        ],
        [
          77.786407,
          12.843969
        ],
        [
          77.786355,
          12.843967
        ],
        [
          77.78635,
          12.844015
        ]
      ], project_id: "1", task_id: "f89f7f4d-0af4-4049-b34b-820331eccedd", video: "DJI_0582_5.mp4"
    },
    {
      type: "vehicle", bbox: [[
        77.786225,
        12.843595
      ],
      [
        77.786267,
        12.843589
      ],
      [
        77.786256,
        12.843562
      ],
      [
        77.78622,
        12.843566
      ],
      [
        77.786225,
        12.843595
      ]
      ], project_id: "1", task_id: "f89f7f4d-0af4-4049-b34b-820331eccedd", video: "DJI_0582_5.mp4"
    },
    {
      type: "person", bbox: [
        [
          77.793007,
          12.84398
        ],
        [
          77.793037,
          12.843958
        ],
        [
          77.793021,
          12.843937
        ],
        [
          77.792991,
          12.843955
        ],
        [
          77.793007,
          12.84398
        ]
      ], project_id: "1", task_id: "f89f7f4d-0af4-4049-b34b-820331eccedd", video: "DJI_0582_8.mp4"
    },
    {
      type: "vehicle", bbox: [
        [
          77.793209,
          12.843824
        ],
        [
          77.793233,
          12.843806
        ],
        [
          77.793203,
          12.843775
        ],
        [
          77.793176,
          12.843794
        ],
        [
          77.793209,
          12.843824
        ]
      ], project_id: "1", task_id: "f89f7f4d-0af4-4049-b34b-820331eccedd", video: "DJI_0582_8.mp4"
    },
    ]
  }
  getBoundryDefects(): any {
    return [
      { line: [[12.843065, 77.791975], [12.842707, 77.792411]], defect: "temporary", length: 62.23 },
      { line: [[12.842707, 77.792411], [12.842680, 77.792478]], defect: "open", length: 7.60 },
      { line: [[12.842988, 77.791819], [12.843126, 77.791887], [12.843066, 77.791975]], defect: "open", length: 28.74 },
      { line: [[12.840721, 77.790570], [12.840891, 77.790549], [12.840984, 77.790403]], defect: "damage", length: 37.99 },
      { line: [[12.842435, 77.786059], [12.842716, 77.786164]], defect: "open", length: 34.51 },
      { line: [[12.844968, 77.783154], [12.844947, 77.783873], [12.845424, 77.783801], [12.845764, 77.783844], [12.845984, 77.783216]], defect: "temporary", length: 240.15 }
    ]
  }
  getBoundry(): any {
    return [
      [
        77.793186,
        12.843709
      ],
      [
        77.793028,
        12.843761
      ],
      [
        77.792876,
        12.843339
      ],
      [
        77.792641,
        12.843413
      ],
      [
        77.792478,
        12.842678
      ],
      [
        77.792403,
        12.842695
      ],
      [
        77.791893,
        12.843127
      ],
      [
        77.79174,
        12.842837
      ],
      [
        77.791386,
        12.841534
      ],
      [
        77.79173,
        12.841471
      ],
      [
        77.791609,
        12.840064
      ],
      [
        77.790646,
        12.839994
      ],
      [
        77.790541,
        12.840888
      ],
      [
        77.789815,
        12.841389
      ],
      [
        77.789357,
        12.841372
      ],
      [
        77.789093,
        12.841482
      ],
      [
        77.788664,
        12.841306
      ],
      [
        77.788669,
        12.841156
      ],
      [
        77.788033,
        12.840773
      ],
      [
        77.787947,
        12.841171
      ],
      [
        77.787649,
        12.841105
      ],
      [
        77.787746,
        12.840668
      ],
      [
        77.787894,
        12.8407
      ],
      [
        77.7881,
        12.840156
      ],
      [
        77.787719,
        12.84004
      ],
      [
        77.786957,
        12.840124
      ],
      [
        77.787001,
        12.840917
      ],
      [
        77.787106,
        12.840925
      ],
      [
        77.7871,
        12.840988
      ],
      [
        77.786918,
        12.84098
      ],
      [
        77.78691,
        12.840747
      ],
      [
        77.786781,
        12.84076
      ],
      [
        77.786679,
        12.840815
      ],
      [
        77.786684,
        12.840946
      ],
      [
        77.786553,
        12.840977
      ],
      [
        77.786652,
        12.841496
      ],
      [
        77.786835,
        12.841439
      ],
      [
        77.786825,
        12.841667
      ],
      [
        77.786429,
        12.841812
      ],
      [
        77.786514,
        12.842124
      ],
      [
        77.78645,
        12.842146
      ],
      [
        77.786513,
        12.842315
      ],
      [
        77.786057,
        12.842438
      ],
      [
        77.786026,
        12.842306
      ],
      [
        77.786447,
        12.84366
      ],
      [
        77.786548,
        12.844028
      ],
      [
        77.786662,
        12.84423
      ],
      [
        77.786652,
        12.844359
      ],
      [
        77.786725,
        12.84496
      ],
      [
        77.785973,
        12.845057
      ],
      [
        77.785923,
        12.844777
      ],
      [
        77.785642,
        12.844753
      ],
      [
        77.785603,
        12.844894
      ],
      [
        77.784916,
        12.844881
      ],
      [
        77.784849,
        12.844423
      ],
      [
        77.7832,
        12.844714
      ],
      [
        77.783149,
        12.844968
      ],
      [
        77.783865,
        12.844942
      ],
      [
        77.783804,
        12.845394
      ],
      [
        77.783841,
        12.845771
      ],
      [
        77.783165,
        12.846003
      ]
    ]
  }
  createPipeline(new_pipeline: any, model: String = "", geoJSONs: GeoJsonObject[] = []) {
    console.log(geoJSONs);
    new_pipeline.area = new_pipeline.area[0]
    if (new_pipeline.detection_type != 'Custom') {
      console.log("new pipeline: ", new_pipeline);
      return this.http.post('http://localhost:5000/pipeline', { "pipeline": new_pipeline }, { responseType: 'json' });
    }
    else {
      return this.http.post('http://localhost:5000/pipeline', { "pipeline": new_pipeline, "model_name": model, "uploaded_geojsons": geoJSONs }, { responseType: 'json' });
    }
  }

  getPipelines(i: any): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:5000/pipelines', { responseType: 'json', params: { 'projectid': i.project_id, 'taskid': i.task_id } });
  }
  getPipelineDetails(pipelineid: string): Observable<Pipeline> {
    return this.http.get<Pipeline>('http://localhost:5000/pipeline', { responseType: 'json', params: { 'pipeline_id': pipelineid } });
  }
  data: any[] = []

  constructor(private http: HttpClient) { }

  getToken(username: string, password: string) {
    return this.http.post('https://drone.vision.surveymaster.in/api/token-auth/', { username, password }, { responseType: 'json' });
  }
  //   getUserData(){

  // return polygon([[13.090866,77.448569],
  //   [13.090853,77.448709],
  //   [13.090783,77.448698 ],
  //   [13.090796,77.448567],
  //   [13.090866,77.448569]]).bindPopup("<b><h2>Property of user 1001</h2></b><br><b>Tax</b> : Rs 13089.197362222223 <br><b>Built up Area</b>: 115.50375106209862 sq meters <br> <b>Volume</b>: 667.16 sq meters <br> <b>Area</b>: 115.50375106209862").openPopup();
  // }
  getScans(): Scan {

    var Scan =
    {
      "task_name": "vegetation",
      "project_id": "1",
      "task_id": "f89f7f4d-0af4-4049-b34b-820331eccedd",
      "task_gps": [
        77.78338,
        12.83921,
        77.7925,
        12.84599
      ]
    }
    return Scan;
  }
  getResults(pipeline: any): Observable<Results[]> {
    return this.http.get<Results[]>('http://localhost:5000/results', { responseType: 'json', params: { 'pipeline_id': pipeline.pipeline_id } });

  }

  private scan_topic = new Subject<any>(); //need to create a subject
  private pipeline_topic = new Subject<any>();
  private results_topic = new Subject<any>();
  private new_pipeline_topic = new Subject<any>();
  private drawState_topic = new Subject<any>();
  private annotation_topic = new Subject<any>();
  private aleart_topic = new Subject<any>();


  sendDrawState(drawState: DrawState) { //the component that wants to update something, calls this fn
    this.drawState_topic.next(drawState); //next() will feed the value in Subject
  }
  getDrawState(): Observable<DrawState> { //the receiver component calls this function
    return this.drawState_topic.asObservable(); //it returns as an observable to which the receiver funtion will subscribe
  }

  sendAlert(alert: Alert) { //the component that wants to update something, calls this fn
    this.aleart_topic.next(alert); //next() will feed the value in Subject
  }
  getAlert(): Observable<Alert> { //the receiver component calls this function
    return this.aleart_topic.asObservable(); //it returns as an observable to which the receiver funtion will subscribe
  }

  sendNewPipeline(pipeline: Pipeline) { //the component that wants to update something, calls this fn
    this.new_pipeline_topic.next(pipeline); //next() will feed the value in Subject
  }
  getNewPipeline(): Observable<Pipeline> { //the receiver component calls this function
    return this.new_pipeline_topic.asObservable(); //it returns as an observable to which the receiver funtion will subscribe
  }
  sendResultsList(results: any[]) { //the component that wants to update something, calls this fn
    this.results_topic.next(results); //next() will feed the value in Subject
  }

  getResultsList(): Observable<Results[]> { //the receiver component calls this function 
    return this.results_topic.asObservable(); //it returns as an observable to which the receiver funtion will subscribe
  }

  sendScan(scan: Scan) { //the component that wants to update something, calls this fn
    console.log("scan: ", scan);
    this.scan_topic.next(scan); //next() will feed the value in Subject
  }

  getScan(): Observable<Scan> { //the receiver component calls this function 
    console.log("get scan");
    return this.scan_topic.asObservable(); //it returns as an observable to which the receiver funtion will subscribe
  }
  sendPipeline(pipeline: Pipeline) { //the component that wants to update something, calls this fn
    this.pipeline_topic.next(pipeline); //next() will feed the value in Subject
  }
  getPipeline(): Observable<Pipeline> { //the receiver component calls this function
    return this.pipeline_topic.asObservable(); //it returns as an observable to which the receiver funtion will subscribe
  }
  sendAnnotation(geoJSON: GeoJsonObject[]) { //the component that wants to update something, calls this fn
    this.annotation_topic.next(geoJSON); //next() will feed the value in Subject
  }
  getAnnotation(): Observable<GeoJsonObject[]> { //the receiver component calls this function
    return this.annotation_topic.asObservable(); //it returns as an observable to which the receiver funtion will subscribe
  }
}