import React ,{useState, useEffect} from 'react';
import FusionCharts from "fusioncharts";
import ReactFC from 'react-fusioncharts';
import Widgets from 'fusioncharts/fusioncharts.widgets';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Widgets, FusionTheme);
// Resolves charts dependancy

function FeedbackDialByQuestion(props){
    const [response,setResponse] = useState({});
    useEffect(() => {
      var url = 'https://mvroso.pythonanywhere.com/feedbackBarChartsByModule' + props.moduleID.toString()
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
    var i, q, dataType, data = null
    if(response.byActivity != undefined){
        data = response;
        if(props.type == "activity"){
            dataType = data.byActivity;
        }
        if(props.type == "class"){
            dataType = data.byClass;
        }
        if(props.type == "module"){
            dataType = data.byModule;
        }
    
        for (i=0; i< dataType.length; i++){
            if(dataType[i].question == props.questionName){
            q = dataType[i];
            }
        }
        const chartConfigs = {
            type: 'angulargauge',// The chart type
            width: '100%', // Width of the chart
            height: '100%', // Height of the chart
            dataFormat: 'json', // Data type
            dataSource: {
                "chart": {
                    caption: "Average score for " + props.questionName + " by " + props.type,
                    lowerlimit: "0",
                    upperlimit: "10",
                    showvalue: "1",
                    theme: "fusion",
                    showtooltip: "0"
                },
                "colorRange": {
                    color: [{minvalue: "0",maxvalue: "3.33",code: "#F2726F"},{minvalue: "3.33",maxvalue: "6.66",code: "#FFC533"},{minvalue: "6.66",maxvalue: "10",code: "#62B58F"}]
                },
                "dials":  { dial: [{value: q.dialvalue.toString()}]}
            }
        }
        return (
            <ReactFC
                {...chartConfigs}/>
            );
    }
    else {
        //console.log("Failed Dial Render");
        return <div></div>
    }
}

export default FeedbackDialByQuestion;