import React ,{Component} from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions/CardActions";
import Card from "@material-ui/core/Card/Card";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from 'react-router-dom';
import './styles/mainFrame.css';
import TopmenuBar from './components/menu';
import ReactPlayer from 'react-player';
//import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
  } from "react-device-detect";
import StudentSVG from "./images/student.svg"

class App extends Component  {

    renderContent = () => {
        if (isMobile) {
        return (
            <div className="CourseApp">
                <div className='CourseBackground1'/><div className='CourseBackground2'/>
                <div className="CourseMenubar">
                    <TopmenuBar/>
                </div>
                {/*<div className="CourseLogo1" style={{width:'150px', height:'155px'}}>
                      <img src={require('./images/cc.png')} style={{width:'150px', height:'150px'}}/>
                    </div>
                  */}

                <p className="CourseName1" style={{margin:'80px auto 20px auto', fontSize:"24px"}}>Navigate <b style={{color:'#003EAA'}}>&nbsp;ModuleM&nbsp;</b> as a</p>

                <div>
                    <div style={{marginTop:'16px',addingTop:'2%',paddingBottom:'1%',maxWidth: 250, margin:'auto'}}><div><Link to={'/student'} style={{ textDecoration: 'none' }}>
                        <Card style={{ maxWidth: 250}}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    style={{ height: 300}}
                                    image={require('./images/student.svg')}
                                    title="Student"
                                />
                                <CardContent>
                                    <div className='main_button'  style={{background:'#FF6A6A',width:'220px'}}>
                                        Student
                                    </div>
                                    <div className='card_description' style={{height:'auto',width:'220px'}}>
                                        Take the lead of your own university experience by managing your time and helping lecturers to improve their modules.
                                    </div>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Link>
                    </div></div>
                    <div style={{paddingTop:'2%',paddingBottom:'1%',maxWidth: 250, margin:'auto'}}><div><Link to={'/lecturer'} style={{ textDecoration: 'none' }}>
                        <Card style={{ maxWidth: 250}}>
                            <CardActionArea>
                                <CardMedia
                                    style={{position:'relative',left:'35px', height:'227px',}}
                                    image={require('./images/lecturer.svg')}
                                    title="Lecturer"
                                />
                                <CardContent>
                                  <div className='main_button'  style={{background:'#00A2B1',width:'220px'}} >
                                      Lecturer
                                  </div>
                                  <div className='card_description' style={{height:'auto',width:'220px'}}>
                                    Save time and improve your quality work by planning classes and activities based on students’ experience data
                                  </div>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Link>
                    </div></div>
                    <div style={{paddingTop:'2%',paddingBottom:'1%',maxWidth: 250, margin:'auto'}}><div><Link to={'/coordinator'} style={{ textDecoration: 'none' }}>
                        <Card style={{ maxWidth: 250}}>
                            <CardActionArea>
                                <CardMedia
                                    style={{ height: "271px"}}
                                    image={require('./images/coordinator.svg')}
                                    title="Coordinators"
                                />
                                <CardContent>
                                  <div className='main_button'  style={{background:'#F28F00',width:'220px'}}>
                                      Coordinator
                                  </div>
                                  <div className='card_description' style={{height:'auto',width:'220px'}}>
                                    Change has never been so easy, manage your course based on a holistic view of the students’ university experience
                                  </div>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Link>
                    </div></div>

                </div>

                <div className="CourseInfoBox">
                  <box>
                      <p className="infoTitle">About <b style={{color: '#003EAA'}}>ModuleM</b></p>
                      <p className='info' style={{margin:'16px'}}> ModuleM is a planning and communication tool that allows easy management of information regarding classes, assignments and all aspects of student learning - strengthening the academic-student partnership and optimising the university experience for everyone.</p>
                  </box>
                </div>
            </div>
          );
        }
        return (
            <div className="CourseApp">
                <div className='CourseBackground1'/><div className='CourseBackground2'/>
                <div className="CourseMenubar">
                    <TopmenuBar/>
                </div>

                <p className="CourseName1" >Navigate <b style={{color:'#003EAA'}}>&nbsp;ModuleM&nbsp;</b> as a</p>

                <div  style={{ display: 'flex', justifyContent: 'center'}}>
                    <div style={{paddingTop:'2%',paddingBottom:'1%',maxWidth: "400px", margin:25, float:'left'}}><div><Link to={'/lecturer'} style={{ textDecoration: 'none' }}>
                        <Card style={{ maxWidth: "360px",boxShadow:'none'}}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    style={{position:'relative',left:'41px',height: '360px',width:'396px'}}
                                    image={require('./images/lecturer.svg')}
                                    title="Lecturer"
                                />
                                <CardContent>
                                    <div className='main_button'  style={{background:'#00A2B1'}} >
                                        Lecturer
                                    </div>
                                    <div className='card_description'>
                                      Save time and improve your quality work by planning classes and activities based on students’ experience data
                                    </div>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Link>
                    </div></div>
                    <div style={{paddingTop:'2%',paddingBottom:'1%',maxWidth: '400px', margin:25, float:'left', left:'50%'}}><div><Link to={'/student'} style={{ textDecoration: 'none' }}>
                        <Card style={{ marginTop:'50px',maxWidth: '360px', boxShadow:'none'}}>
                            <CardActionArea>
                                <CardMedia
                                    style={{height: '360px',width:'100%'}}
                                    image={require('./images/student.svg')}
                                    title="Student"
                                />


                                <CardContent>
                                    <div className='main_button'  style={{background:'#FF6A6A'}}>
                                        Student
                                    </div>
                                    <div className='card_description'>
                                        Take the lead of your own university experience by managing your time and helping lecturers to improve their modules.
                                    </div>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Link>
                    </div></div>
                    <div style={{paddingTop:'2%',paddingBottom:'1%',maxWidth: '400px', margin:25, float:'left', left:'50%'}}><div><Link to={'/coordinator'} style={{ textDecoration: 'none' }}>
                        <Card style={{width:'369px', maxWidth: '400px', boxShadow:'none'}}>
                            <CardActionArea>
                                <CardMedia
                                    style={{height: '360px',width:'88%'}}
                                    image={require('./images/coordinator.svg')}
                                    title="Coordinator"
                                />
                                <CardContent>
                                    <div className='main_button'  style={{background:'#F28F00'}}>
                                        Coordinator
                                    </div>
                                    <div className='card_description'>
                                      Change has never been so easy, manage your course based on a holistic view of the students’ university experience
                                    </div>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Link>
                    </div></div>

                </div>

                <div className="CourseInfoBox" style={{margin:'0 auto 26px auto'}}>
                    <box>
                        <p className="infoTitle">About <b style={{color: '#003EAA'}}>ModuleM</b></p>
                        <p className='info'> ModuleM is a planning and communication tool that allows easy management of information regarding classes, assignments and all aspects of student learning - strengthening the academic-student partnership and optimising the university experience for everyone.</p>
                    </box>
                </div>
                <div style={{margin:'0 auto 56px auto'}}>
                    <ReactPlayer url="https://www.youtube.com/embed/jlO8DQijGdc" style= {{margin:'auto'}}/>
                </div>
            </div>
          );
    }

    render(){
      return this.renderContent();
    }

}

export default App;


{/*
  state = {coreScene: 'myDay'};

  changeCoreScene = (coreSceneIndex)=>{
    switch(coreSceneIndex) {
      case 0:
        this.setState({coreScene:"lectures"});
        break;
      case 1:
        this.setState({coreScene:"myActivities"});
        break;
        case 2:
          this.setState({coreScene:"myDay"});
          break;
        case 3:
          this.setState({coreScene:"selfGuidedStudy"});
          break;
        case 4:
          this.setState({coreScene:"myStatistics"});
          break;
    }
  }

*/}
