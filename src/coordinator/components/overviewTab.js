import React,{useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import '../styles/lecturesTab.css';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import TextField from '@material-ui/core/TextField';
import StackedColumnChart from './stackedColumnChart';
import TodayIcon from '@material-ui/icons/Today';
import ScheduleIcon from '@material-ui/icons/Schedule';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AddBoxIcon from '@material-ui/icons/AddBox';
import TimelineModuleComponent from "../components/timelineModuleComponent";
import FeedbackBarComponent from "../components/feedbackBarComponent";
import FeedbackDialComponent from "../components/feedbackDialComponent";
import PieModuleComponent from '../components/pieModuleComponent';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import {LecturePanel,ActivityPanel,FeedbackPanel} from "./listRenderer";
import invert from 'invert-color';

const BootstrapButton = withStyles({
  root: {
    justifyContent: 'left',
    textAlign:'left',
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px ',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#F1F1F1',
    borderColor: 'transparent',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: '#b5b5b5',
      borderColor: '#b5b5b5',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: 'red',
      borderColor: 'transparent',
    },
    '&:focus': {
      backgroundColor: '#9A9A9A',

    },
  },
})(Button);








function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}


const AntTabs = withStyles({
  root: {
    borderBottom: '0px solid #e8e8e8',
  },
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > div': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: '#4A006E',
    },
  }
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontSize: '16px',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      opacity: 1,
    },
    '&$selected': {
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(3),
  },
  demo1: {
    backgroundColor: theme.palette.background.paper,
  }
}));

function SelectorBox(props) {
  //console.log(props.classes);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const colour = props.colour
  const nextClass=props.classes.find((lecture) => new Date(lecture.date+'T'+lecture.end_time)>= props.today);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div  className={classes.root} style = {{height:'400px'}}>

      <div className={classes.demo1}>
      </div>
      <div className = 'selectorBox' style={{margin:'8px', borderRadius:'8px'}} >
        <div style={{marginLeft:'16px',fontStyle:"normal", fontFamily:"Rubik"}}>
        Next Lecture
        </div>
        {
        <div style = {{margin:'8px 16px'}}>
          <LecturePanel changeTab={props.changeTab} item = {nextClass} />
        </div>
      }
      <div style={{marginLeft:'16px',fontStyle:"normal", fontFamily:"Rubik"}}>
      Next Activities
      </div>
      {props.activities.filter((activity) => new Date(activity.due_date)>= props.today).map((activity) =>
        <div style = {{margin:'8px 16px'}}>
        <ActivityPanel selectActivity={props.selectActivity} changeTab={props.changeTab} item={activity} />
              </div>)}
        </div>
    </div>
  );
}
function getClass(classes, date, specification){
  var i;
  for(i=0; i<classes.length;i++){
    if(new Date(classes[i].date+'T'+classes[i].end_time)>= date){
      switch (specification) {
        case "previous":
            if(i!=0) return(classes[i-1]);
            else return null;
          break;
        case "next":
          return(classes[i]);
          break;
      }
    }
  }
  return null;
}
function getActivity(activities, date, specification){
  var i;
  for(i=0; i<activities.length;i++){
    if(new Date(activities[i].due_date)>= date){
      switch (specification) {
        case "previous":
            if(i!=0) return(activities[i-1]);
            else return null;
          break;
        case "next":
          return(activities[i]);
          break;
      }
    }
  }
  return null;
}
function DetailBox(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [newNote, setNewNote] = useState(null);
  const [notes, setNotes] = useState(props.module_notes);
  const previousClass=getClass(props.classes, props.today,"previous");
  const previousActivity=getActivity(props.activities, props.today,"previous");
  //console.log(previousClass);
  //console.log(previousActivity);

  useEffect(() => {
    setNewNote("");
    setNotes(props.module_notes);
    },[props.module_notes]);

  //const previousActivity=props.classes.find((lecture) => new Date(lecture.date+'T'+lecture.end_time)>= props.today);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const deleteNotes= (text)=> {
    //console.log("notes");
    //console.log(notes);
    var index = -1
    var i;
    for (i=0;i<notes.length;i++){
      if(notes[i].text==text){
        index = i;
        break;
      }
    }
    var tempNotes=[];
    for(i=0;i<index;i++){
      tempNotes.push(notes[i])
    }
    for(i=index+1;i<notes.length;i++){
      tempNotes.push(notes[i])
    }
    setNotes(tempNotes);
    }

  const saveNote = () => {
      var allNotes = [];
      var x = document.getElementById("noteButton");
      x.style.display = "none";
      notes.map((note)=>allNotes.push(note.text));
      if(newNote!="") allNotes.push(newNote);
        var data = {
            moduleID: props.module_ID,
            notes: allNotes
              };
              //console.log("Save module note", data);
              fetch("https://mvroso.pythonanywhere.com/updateModuleNotes", {
                          method: "POST",
                          cache: "no-cache",
                          body: JSON.stringify(data),
                          headers: new Headers({"content-type": "application/json"})
                      }).then(res => {
                          //console.log("Request complete! response:", res);
                          props.setState();
                          x.style.display = "inline-block";
                      });
      }
  return (
    <div className={classes.root}>
    <div className={classes.demo1}>
      <AntTabs value={value} onChange={handleChange} aria-label="ant example" style={{marginLeft:'27px',}}>
                <AntTab label="General Breakdown" style= {{color: props.colour}} TabIndicatorProps={{style: {backgroundColor:props.colour}}}/>
                <AntTab label="Latest Feedback " style= {{color: props.colour}} TabIndicatorProps={{style: {backgroundColor:props.colour}}}/>
                </AntTabs>
              </div>

              <TabPanel  value={value} index={0}>
                <div className = 'detailBox' style = {{height: '1000'}}>

                  <div style = {{margin:'8px 0'}}>
                  <div style = {{position: 'relative', height:370,width:"100%"}}> <PieModuleComponent moduleID = {props.module_ID} label = {props.module_name} type = "hours"/> </div>
                  <div style = {{position: 'relative', height:370,width:"100%"}}> <PieModuleComponent moduleID = {props.module_ID} label = {props.module_name} type = "grade"/> </div>
                  </div>

                  <div style = {{margin:'10px 0'}}>
                      {notes.map((note,index) => <div><TextField
                                  multiline
                                  id="standard-read-only-input"
                                  key={note.text}
                                  defaultValue={note.text}
                                  style={{width:'85%', margin:'10px 0'}}
                                  variant="outlined"
                                  rows={5}
                                  InputProps={{
                                    readOnly: true,
                                  }}/>
                                  {     <IconButton aria-label="delete" onClick={()=>deleteNotes(note.text)}>
                                          <ClearRoundedIcon  />
                                        </IconButton>}
                                    </div>
                                )}
                    <TextField variant="outlined" fullWidth label="New Note" value={newNote} onChange={(e) => setNewNote(e.target.value)}/>
                    <Button id = "noteButton" onClick={() => saveNote()} type='submit' variant="contained" color="default" disableElevation fullWidth
                    style={{margin:'10px 0px', textTransform: 'none', backgroundColor: props.colour, color: invert(props.colour, true)}}> Save Notes </Button> </div>
                </div>
              </TabPanel>
              <TabPanel  value={value} index={1}>
                <div className = 'detailBox'>
                {previousClass!=null? <div>
                  <div style={{margin:'16px auto 8px 24px',color:props.colour}}>
                    Previous Class - {previousClass.title} - {previousClass.date.split("-")[2]+'/'+previousClass.date.split("-")[1] + ' | ' + previousClass.start_time.split(":")[0]+':'+previousClass.start_time.split(":")[1] +'- '+previousClass.end_time.split(":")[0]+':'+previousClass.end_time.split(":")[1] }
                  </div>
                  {previousClass.feedback.length==0 ? <div> No feedback for this class</div>:
                    previousClass.feedback.map((item)=> <FeedbackPanel colour={props.colour} activityID={previousClass.class_ID} questionName={item.feedback_title} type='Class'/>)}

                  </div>: <div>No classes taught yet.</div>}

                {previousActivity!=null? <div>
                  <div style={{margin:'16px auto 8px 24px',color:props.colour}}>
                    Previous Activity - {previousActivity.title } - {previousActivity.due_date.split('T')[0].split('-')[2]+'/'+previousActivity.due_date.split('T')[0].split('-')[1] + ' | ' + previousActivity.due_date.split('T')[1].split(':')[0] + ':' + previousActivity.due_date.split('T')[1].split(':')[1]}
                  </div>
                  {previousActivity.feedback.map((item)=> <FeedbackPanel colour={props.colour} activityID={previousActivity.activity_ID} questionName={item.feedback_title} type='Activity'/>)}
                   </div>:<div>No past activities yet.</div>}
                </div>
              </TabPanel>
    </div>
  );
}

const useStylesTextField = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(0),
      width: '100%',
      margin: '11px 0'
    },
  },
}));
function MultilineTextFields() {
  const classes = useStylesTextField();
  const [value, setValue] = React.useState('Controlled');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="outlined-textarea"
          label="New Note"
          placeholder=""
          multiline
          variant="outlined"
        />
      </div>
    </form>
  );
}





export default function OverviewTab(props) {


  const [focusID, setFocusID] = React.useState(props.classes[0].date+props.classes[0].start_time);
  const lectureInFocus = props.classes.find((lecture)=>lecture.date + lecture.start_time  == focusID);

    function handleChange(newValue) {
      //console.log("changed! : " + newValue);
      //setFocusID(newValue);
  }
  return (
    <div style = {{margin:0,padding:0, maxWidth:'906px'}}>
      <div  style = {{float:'left',height:'500px',width: 'calc(100% - 608px)',}}>

        <div style = {{position:'relative', top:'27px', left:'16px', fontFamily: 'Rubik', fontStyle: 'normal', fontWeight: '300', fontSize: '14px',
 lineHeight: '17px', display: 'flex', alignItems: 'center', color: '#414141'}} >Upcoming </div>

      <div style = {{ position:'relative', top:'87px',marginRight:'auto', marginLeft:'auto'}}>
        <SelectorBox selectActivity={props.selectActivity} changeTab={props.changeTab} today={props.today} inFocusID={focusID} colour={props.colour} activities={props.activities} classes={props.classes}　onClick = {handleChange} />
      </div>

      </div>
      <div className = 'detailBox' style = {{float:'left',height:'500px',width:'608px',borderRadius:'0 8px 8px 0' }}>
      <div style = {{position:'relative', top:'27px', left:'35px', fontFamily: 'Rubik', fontStyle: 'normal', fontWeight: '300', fontSize: '14px',
        lineHeight: '17px', display: 'flex', alignItems: 'center', color: '#414141'}} > Summaries </div>
        <div style = {{position:'relative', top:'30px',marginRight:'auto', marginLeft:'auto'}}>

          <DetailBox setState={props.setState} today={props.today} activities={props.activities} classes={props.classes} colour={props.colour} module_notes = {props.module_notes} module_ID = {props.module_ID} module_name = {props.module_name} />
        </div>
      </div>
    </div>
  );
}

{/*boxShadow: '0 0 0 0.2rem rgba(207,207,207,.5)',*/}
