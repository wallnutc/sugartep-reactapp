import React ,{Component, useState, useEffect} from 'react';
import FusionCharts from "fusioncharts";
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import ReactFC from 'react-fusioncharts';
ReactFC.fcRoot(FusionCharts, TimeSeries);

function TimelineModuleComponent(props){
  const [response,setResponse] = useState({});
  useEffect(() => {
    var url = 'https://mvroso.pythonanywhere.com/timelineByModule' + props.moduleID;
    //console.log(url);
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
    const data = response.byActivity;
    const schema = response.schema;
    const binning = response.bin;
    const dataSource = {
        navigator: {
          enabled: 0
        },
        legend: {
          enabled: 0,
          position: "right"
        },
        chart: {
        },
        caption: {
        text: "Total Hours Over Year"
        },
        subcaption: {
        text: props.label
        },
        series: "Activity",
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
          binning: {
            "day": [1,6],
            "month": [1]
          }
        }
    };

    const timeseriesDs = {
        type: "timeseries",
        width: "95%",
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

export default TimelineModuleComponent;
