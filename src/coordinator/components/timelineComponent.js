import React ,{Component, useState, useEffect} from 'react';
import FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import ReactFC from 'react-fusioncharts';
ReactFC.fcRoot(FusionCharts, TimeSeries);

function TimelineComponent(props){
  const [response,setResponse] = useState({});
  useEffect(() => {
    var url = 'https://mvroso.pythonanywhere.com/timelineByCourse' + props.courseID;
    console.log(url);
    fetch(url)
       .then((response) => response.json())
       .then((responseJson) => {
         setResponse(responseJson);
       })
       .catch((error) => {
         console.error(error);
       });
  },[]);
  if(response.byActivity != undefined){
    var data = null;
    const schema = response.schema;
    var binning = null
    if(props.mode == "Module"){
      data = response.byModule;
    }
    if(props.mode == "Activity Type"){
      data = response.byActivity;
    }
    if (props.bin == "Month"){
      binning = {
        "year": [],
        "day": [],
        "month": [1]
      }
    }
    if (props.bin == "Week"){
      binning = {
        "year": [],
        "day": [6],
        "month": []
      }
    }
    if (props.bin == "Semester"){
      binning = {
        "day": [],
        "month": [],
        "year": [1]
      }
    }
    const dataSource = {
        chart: {
        },
        navigator: {
          enabled: 0
        },
        legend: {
          enabled: 0,
          position: "bottom"
        },
        chart: {
        },
        caption: {
        text: "Total Hours By " + props.mode + " (" + props.bin + " View)"
        },
        subcaption: {
        text: props.label
        },
        series: "Module",
        yaxis: [
        {
            plot: [
            {
                value: "Hours",
                type: "column",
                aggregation: "sum"
            }
            ],
            format: {
            suffix: "H"
            }
        }
        ],
        xAxis: {
          binning: binning
        }
    };

    const timeseriesDs = {
        type: "timeseries",
        width: "100%",
        height: "100%",
        dataSource: dataSource
    }
    const fusionTable = new FusionCharts.DataStore().createDataTable(data,schema);
    timeseriesDs.dataSource.data = fusionTable;
    return (
        <div>
          {dataSource.data ? (<ReactFC {...timeseriesDs} />) : ("loading")}
        </div>
      );

  }
  else return <div></div>
};

export default TimelineComponent;
