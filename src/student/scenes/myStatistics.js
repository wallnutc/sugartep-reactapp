import React ,{Components} from 'react';
import FilterSelector from '../components/FilterSelector';
import Header from "../components/header";
import TimelineComponent from "../components/timelineComponent";
import PieCourseComponent from "../components/pieCourseComponent";

function MyStatistics (props) {

  const headerContent = {title:"My Statistics", imgPath: require("../images/icons/myStatistics.svg")};
    return (
      <div >
        <div className="header">
          <Header imgPath = {headerContent.imgPath}  title = {headerContent.title}/>
        </div>

        <div className="main">
          <div style = {{position: 'relative', height: 1000}}>
          <TimelineComponent courseID = {props.student.course_ID} label = {props.student.label}/></div>
        
          <div style = {{position: 'relative',height: 700}}>
          <PieCourseComponent courseID = {props.student.course_ID} label = {props.student.label} type = "module"/></div>

          <div style = {{position: 'relative',height: 700}}>
          <PieCourseComponent courseID = {props.student.course_ID} label = {props.student.label} type = "activity"/></div>

          <div style = {{position: 'relative',height: 700}}>
          <PieCourseComponent courseID = {props.student.courseID} label = {props.student.label} type = "grade"/></div>
        </div>

      </div>
    );
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
