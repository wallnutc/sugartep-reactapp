import React from "react";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import ScheduleIcon from '@material-ui/icons/Schedule';
import GradeIcon from '@material-ui/icons/Grade';
import icon_lecture_bold from '../images/icons/lectures.svg';
import icon_assignment_bold from '../images/icons/myActivities.svg';
import icon_study_bold from '../images/icons/lectures_disabled.png';
import IconLecture from '../images/icons/lectures.svg';
import AssignmentIcon from '@material-ui/icons/Assignment';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import LectureIcon from '../components/iconsSVG/lectureIcon';
import AcitvitiesIcon from '../components/iconsSVG/activitiesIcon';

const today = "2019-03-14";
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  img: {
    margin: 1,
    maxWidth: '100%',
    maxHeight: '100%',
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const ProgressBar = withStyles({
  root: {
    height:'12px'
  },
  barColorPrimary:{
    borderRadius:'6px',
    backgroundColor:'white'
  },
  colorPrimary:{
    borderRadius:'6px',
    backgroundColor:'transparent',
  }
})(LinearProgress);



export function LecturePanel(props) {
  const date = new Date(props.item.date);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  //
  const start = props.item.start_time.split(':');
  const end = props.item.end_time.split(':');
  return (
    <div style={{}}>
      <ExpansionPanel style={{border:'1px solid '+props.item.colour, backgroundColor:props.item.colour, color: 'white', opacity: new Date(props.item.date+'T00:00:00') < props.today? 0.5:1}} >
          <ExpansionPanelSummary  style = {{height:'58px',padding:0,alignItems:'normal'}}>
            <div style = {{width:'100%'}}>
              <div style = {{float:'left',position:'relative',left: 0,height:'100%', width:'58px',margin:0, borderRadius:'8px 0 0 8px',backgroundColor:'white'}}>
                <LectureIcon color='action' style={{fontSize:'41px', margin:'8.8px',color: props.item.colour}} />
              </div>
            <div style = {{overflow:'hidden',padding:'7px 16px', margin:'auto',fontFamily: 'Rubik', fontStyle: 'normal'}}>
              <div>
                <div style = {{fontWeight: 300, fontSize: '10px', lineHeight: '10px', whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}} >
                  {props.item.module_code} - {props.item.module_name} | Prof. {props.item.module_lecturer}
                </div>
                <div style = {{fontWeight: 'normal', fontSize: '16px', lineHeight: '16px', margin:'4px 0'}}>
                  {props.item.title}
                </div>
                <div style = {{fontWeight: 300, fontSize: '10px', lineHeight: '10px'}} >
                  <ScheduleIcon color='action' style={{verticalAlign:"middle",fontSize: '14px', color: 'white'}}/> <span style={{verticalAlign:"middle"}} >{start[0]+':'+start[1]} - {end[0]+':'+end[1]} </span>
                  <span style={{float:'right'}}><LocationOnOutlinedIcon color='action' style={{verticalAlign:"middle",fontSize:'14px',color: 'white'}}/> <span style={{verticalAlign:"middle"}}>{props.item.location}</span></span>
                </div>
              </div>
            </div>
          </div>
          </ExpansionPanelSummary>
      <ExpansionPanelDetails >
        <div style={{width:'100%'}} >
            <div style = {{margin:'8px auto 8px 0',fontWeight:'normal', fontSize: '15px', lineHeight: '15px'}}>
              Description
            </div>
            <div style = {{margin:'8px auto 16px 0',fontWeight: 300, fontSize: '13px', lineHeight: '15px'}}>
              {props.item.description}
            </div>
            <div>
            {new Date(props.item.date+'T00:00:00') > props.today ?<div>Survey Not Open</div>:
              <Button fullWidth onClick={()=>props.onClick(props.item)}
              style={{lineHeight:0,float:'right',height: '28px',borderRadius:'28px',textTransform: 'none', padding:0, backgroundColor:'white',}} children ={<span style={{inlineHeight:'0',color:props.item.colour}}>Provide Feedback</span>}></Button>
            }
            </div>
        </div>
      </ExpansionPanelDetails >
      </ExpansionPanel>
    </div>
  );
}

export function ActivityPanel(props) {
  const dueDate = new Date(Date.parse(props.item.due_date));
  const dueDateDay = String(dueDate.getDate()).padStart(2, '0');
  const dueDateMonth = String(dueDate.getMonth() + 1).padStart(2, '0');
  const dueDateYear = dueDate.getFullYear();

  const startDate = new Date(Date.parse(props.item.start_date));
  const startDateDay = String(dueDate.getDate()).padStart(2, '0');
  const startDateMonth = String(dueDate.getMonth() + 1).padStart(2, '0');
  const startDateYear = dueDate.getFullYear();
  return (
    <div style={{}}>
      <ExpansionPanel style={{border:'1px solid '+props.item.colour  ,backgroundColor: props.item.colour, color: 'white', opacity: props.item.submitted == 1 ? 0.5:1}}>
          <ExpansionPanelSummary  style = {{height:'56px',padding:0,alignItems:'normal'}}>
            <div style={{width:'100%'}}>
            <div style = {{float:'left',position:'relative',left: 0,height:'100%', width:'58px',margin:'0', borderRadius:'8px 0 0 8px',backgroundColor:'white'}}>
              <AcitvitiesIcon style={{fontSize:'41px', margin:'8.5px',color: props.item.colour}}/>
            </div>

          <div style = {{overflow:'hidden', padding:'5px 16px', fontFamily: 'Rubik', fontStyle: 'normal'}}>
            <div style = {{fontWeight: 300, fontSize: '10px', lineHeight: '10px', whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}} >
              {props.item.module_code} - {props.item.module_name} | Prof. {props.item.module_lecturer}
            </div>
            <div style = {{fontWeight: 'normal', fontSize: '16px', lineHeight: '16px', margin:'4px 0'}}>
              {props.item.title}
            </div>
            <div style = {{fontWeight: 300, fontSize: '10px', lineHeight: '10px'}} >
              <ScheduleIcon color='action' style={{verticalAlign:"middle",fontSize: '14px', color: 'white'}}/> <span> Due date: {dueDateDay + '/' + dueDateMonth + '/' + dueDateYear} </span>
            </div>

          <div>
          </div>
          </div>
          </div>
          </ExpansionPanelSummary>
      <ExpansionPanelDetails >
        <div style = {{textAlign: 'justify', fontWeight: 'normal', fontSize: '14px', lineHeight: '17px',width: '100%'}}>
          <div style = {{fontWeight: 'normal'}}>
            Start date - {startDateDay + '/' + startDateMonth + '/' + startDateYear}
          </div>
          <div style = {{margin:'12px 0', fontWeight: 'normal'}}>
            Grade percentage - {props.item.grade_percentage}%
          </div>
          <div>
            Estimated worktime
          </div>
          <div style={{width:'100%',verticalAlign:'middle',display: 'inline-block' }}>
            <div style={{position:'relative',top:'5px',width:'80%', float:'left', verticalAlign:'middle'}}>
              <ProgressBar variant="determinate" value ={30} />
            </div>
            <div style={{float:'right'}}> {props.item.estimated_time} hours</div>
          </div>

          <div style={{marginTop:'10px'}}>
            Accumulated worktime
          </div>
          <div style={{width:'100%',verticalAlign:'middle',display: 'inline-block' }}>
            <div style={{position:'relative',top:'5px',width:'80%', float:'left', verticalAlign:'middle'}}>
              <ProgressBar variant="determinate" value={props.item.time_spent==null || props.item.estimated_time== null ? 5: 30*props.item.time_spent/props.item.estimated_time} />
            </div>
            <div style={{float:'right'}}> {props.item.time_spent==null? 0:props.item.time_spent} hours</div>
          </div>
          <div style={{margin:'17px 0'}}>
            {props.item.submitted == 1 ?<div>Activity Finished</div>:
              <Button fullWidth onClick={()=>props.onClick(props.item)}
              style={{lineHeight:0, height: '28px',borderRadius:'28px',textTransform: 'none', padding:0, backgroundColor:'white',}} children ={<span style={{inlineHeight:'0',color:props.item.colour}}>Update Progress</span>}></Button>

            }
            </div>

          <div style={{margin:'17px 0'}}>
            <span > Description </span>
            <div style = {{fontWeight: 300}}> {props.item.description} </div>
          </div>

          <div style={{margin:'17px 0'}}>
            <span > Marking Scheme </span>
            <div style = {{fontWeight: 300}}> {props.item.grading_description} </div>
          </div>
        </div>
      </ExpansionPanelDetails >
      </ExpansionPanel>
    </div>
  );
}
//export default ListSummary;
{/*

<LinearProgress style={{height:'12px',width:'70%',color:'black',backgroundColor: 'transparent',borderRadius: '6px', verticalAlign:'middle'}} variant="determinate" value={props.item.assignment_suggested} />
  <div>
    {props.renderContent.map((item)=>{
      switch (item.activityType) {
        case 'lecture':
          return <LectureRenderer item = {item}/>
        case 'assignment':
          return <AssignmentRenderer item = {item}/>
        case 'selfGuidedStudy':
          return <SelfGuidedStudyRenderer item = {item}/>

      }
    })
  }
  </div>

  */}
