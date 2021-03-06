import React ,{Components} from 'react';
import Header from "../components/header";
import TimelineComponent from "../components/graph_components/timelineComponent";
import TimelineStudentComponent from "../components/graph_components/timelineStudentComponent";
import PieCourseComponent from "../components/graph_components/pieCourseComponent";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import BarIcon from '@material-ui/icons/Assessment';
import Button from '@material-ui/core/Button';
import StatisticsIcon from '../components/iconsSVG/statisticsIcon';

const mainBlue = "#0061D2";

function MyStatistics (props) {

  const [filterState, setFilterState] = React.useState(0);

  const renderGraph = (v)=>{
    switch (v) {
      case 0:
        return (<div style = {{display: 'inline-block', position: 'relative', height: 700, maxWidth: 500, width: '100%'}}>
          <PieCourseComponent courseID = {props.student.course_ID} label = {props.student.label} type = "module"/></div>);
      case 1:
        return(  <div style = {{display: 'inline-block', position: 'relative', height: 700, maxWidth: 500, width: '100%'}}>
          <PieCourseComponent courseID = {props.student.course_ID} label = {props.student.label} type = "activity"/></div>)
      case 2:
        return(<div style = {{display: 'inline-block', position: 'relative', height: 700, maxWidth: 500, width: '100%'}}>
        <PieCourseComponent courseID = {props.student.course_ID} label = {props.student.label} type = "grade"/></div>
        );
      case 3:
        return(
        <div>
        <div style = {{position: 'relative', height: 700, maxWidth: 500, width: '100%'}}>
        <TimelineComponent courseID = {props.student.course_ID} label = {props.student.label}/>
        </div>
        </div>
        );
      case 4:
        return(
        <div>
        <div style = {{position: 'relative', height: 600, width: "100%"}}>
        <TimelineStudentComponent studentID = {props.student.student_ID}/>
        </div>
        </div>
        );
    }
  }
  //console.log(props.student.label);
  const headerContent = {title:"My Statistics", imgPath: require("../images/icons/myStatistics.svg")};
  if(props.student != undefined){
    return (
      <div >
        <div className="header" style= {{width: '450px', margin: 'auto'}}>
          <div>
            <StatisticsIcon style={{height:'40px', width: '40px',float:'left', zIndex: 2, color:mainBlue}}/>
            <div style={{fontFamily: 'Rubik',fontStyle: 'normal',fontWeight: '500',fontSize: '20px',float:'left',lineHeight: '40px',marginLeft:'16px',color: mainBlue}}>My Statistics</div>
          </div>
        </div>
        <div className="main" style = {{textAlign: 'center', marginTop:'144px'}}>

          <div style = {{fontWeight: 300, width:'90%', height: '100%', textAlign: 'justify', display: 'inline-block',color:'#414141', fontWeight: '300', fontSize: '14px', lineHeight: '17px'}}> Overview of the expected workload for your entire year, divided by module, activity type, hourly contribution and grade contribution.</div>
          <div style = {{margin:'12px 0 0 16px ', fontWeight: 300, color:'#AFAFAF',textAlign: 'justify' }}> breakdown by </div>
          <div style={{margin:'0 0 16px 8px'}}>

          <Button variant="contained" color="primary" aria-controls="fade-menu" aria-haspopup="true" onClick = {()=>setFilterState(4)}
          style={{margin:'8px',lineHeight:0, height: '24px',borderRadius:'12px',textTransform: 'none', padding:0, backgroundColor: filterState==4? "#0153B4":'#F6F7FA',}}
          children ={<div style={{margin:'0 10px',lineHeight:'0',color:filterState==4? "#FFFFFF":'#0061D2'}}> Student Progress  </div>}></Button>

          <Button variant="contained" color="primary" aria-controls="fade-menu" aria-haspopup="true" onClick = {()=>setFilterState(0)}
          style={{margin:'8px',lineHeight:0, height: '24px',borderRadius:'12px',textTransform: 'none', padding:0, backgroundColor: filterState==0? "#0153B4":'#F6F7FA',}}
          children ={<span style={{margin:'0 10px',lineHeight:'0',color:filterState==0? "#FFFFFF":'#0061D2'}}> Modules (Hours)  </span>}></Button>
          <Button variant="contained" color="primary" aria-controls="fade-menu" aria-haspopup="true" onClick = {()=>setFilterState(3)}
          style={{margin:'8px',lineHeight:0, height: '24px',borderRadius:'12px',textTransform: 'none', padding:0, backgroundColor: filterState==3? "#0153B4":'#F6F7FA',}}
          children ={<span style={{margin:'0 10px',lineHeight:'0',color:filterState==3? "#FFFFFF":'#0061D2'}}> Modules (Time Series)  </span>}></Button>
          <Button variant="contained" color="primary" aria-controls="fade-menu" aria-haspopup="true" onClick = {()=>setFilterState(1)}
          style={{margin:'8px',lineHeight:0, height: '24px',borderRadius:'12px',textTransform: 'none', padding:0, backgroundColor: filterState==1? "#0153B4":'#F6F7FA',}}
          children ={<span style={{margin:'0 10px',lineHeight:'0',color:filterState==1? "#FFFFFF":'#0061D2'}}> Activity Type (Hours)  </span>}></Button>


          <Button variant="contained" color="primary" aria-controls="fade-menu" aria-haspopup="true" onClick = {()=>setFilterState(2)}
          style={{margin:'8px',lineHeight:0, height: '24px',borderRadius:'12px',textTransform: 'none', padding:0, backgroundColor: filterState==2? "#0153B4":'#F6F7FA',}}
          children ={<span style={{margin:'0 10px',lineHeight:'0',color:filterState==2? "#FFFFFF":'#0061D2'}}> Activity Type (Grade) </span>}></Button>

          </div>
          {renderGraph(filterState)}
        </div>

      </div>
    );
  }
  else return <h4 style={{textAlign: "center"}}>Loading...</h4>
}

export default MyStatistics;
{/*//<TimelineComponent courseID = "1" label = "Engineering year 2"/>
<canvas ref='canvas2' className="canvas2" style= {{position: 'fixed',top:'150px',width: '100%'}} ></canvas>
  <div className="filter">
    <div style={{}}>
      <FilterSelector />
    </div>
  </div>
  <div className="main" >
    <Items_list/>
  </div>
*/}
