import React from 'react'
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
//カレンダーのインポート
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
//アイコン
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
//スイッチングセンター
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Quicktransfer from '../components/Quicktransfer';

//投稿欄の仕組み
function refreshMessages(): MessageExample[] {
  const getRandomInt = (max: number) => Math.floor(Math.random() * Math.floor(max));

  return Array.from(new Array(50)).map(
    () => messageExamples[getRandomInt(messageExamples.length)],
  );
}



  //わかりやすいパラメータの仕組み
  function CircularProgressWithLabel(
    props: CircularProgressProps & { value: number },
  ) {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex',   }}>
        <CircularProgress  size="114px" variant="determinate" {...props} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
            
          }}
        >
          <Typography
            variant="h4"
            component="div"
            color="text.secondary"
          >{`${Math.round(props.value)}%`}</Typography>
        </Box>
      </Box>
    );
  }

const Dashboard = () => {
  
  //投稿欄の定義
  const [value, setValue] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const [messages, setMessages] = React.useState(() => refreshMessages());

  React.useEffect(() => {
    (ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;
    setMessages(refreshMessages());
  }, [value, setMessages]);


  


  //わかりやすいパラメータの速さや進捗を調整できる
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 1));
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  
  return (
    <div>
      <React.Fragment>
          <Grid container spacing={6}>

              <Grid>
                { /*カレンダー*/ }
                <Box
                 height={315}
                 width={600}
                 my={2}
                 display="flex"
                 alignItems="center"
                 gap={2}
                 p={2}
                 sx={{ border: '2px solid grey' }}
                 position="absolute"
                 top={225}
                 right={1}
                 left={1220}
                 >
                
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DateCalendar']} >
                    <DateCalendar
                          referenceDate={dayjs('2022-04-17')}
                          views={['year', 'month', 'day']}
                      />
                  </DemoContainer>
                </LocalizationProvider>
                { /*クイックパネル*/ }
                  <Box
                  height={150}
                  width={60}
                  >
                  <FormGroup>
                      <FormControlLabel control={<Switch defaultChecked />} label="Label" />
                      <FormControlLabel required control={<Switch />} label="Required" />
                      <FormControlLabel disabled control={<Switch />} label="Disabled" />
                    </FormGroup>
                  </Box>
                </Box>
              </Grid>

              


              { /*説明書き*/ }
              <Box component="section" sx={{ p: 2, border: '1px dashed grey', position: "absolute", top: 80,left: 68,right: 1130,bottom: 135 }}>
                Introduce this application
              </Box>



              {/*投稿欄*/}
              <Grid>
                <Box
                  height={820}
                  width={305}
                  my={4}
                  display="flex"
                  flexDirection="column" // コンテンツを縦方向に並べる
                  gap={4}
                  p={2}
                  sx={{ border: '2px solid grey', position: 'absolute', top: 50, left: 850 }}
                  >
                  

                    <Box flexGrow={1} sx={{ overflowY: 'auto' }}>{/* コンテンツの高さに合わせて伸び縮みする */}
                      <Box sx={{ pb: 7 }} ref={ref}>
                            <CssBaseline />
                            <List>
                              {messages.map(({ primary, secondary, person }, index) => (
                                <ListItemButton key={index + person}>
                                  <ListItemAvatar>
                                    <Avatar alt="Profile Picture" src={person} />
                                  </ListItemAvatar>
                                  <ListItemText primary={primary} secondary={secondary} />
                                </ListItemButton>
                              ))}
                            </List>
                      </Box>
                    </Box>
                      

                      <Paper sx={{ position: 'relative', right: 0, left: 0, bottom: 0 }} elevation={3}>
                        <BottomNavigation
                          showLabels
                          value={value}
                          onChange={(event, newValue) => {
                              setValue(newValue);
                          }}
                        >

                            <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
                            <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
                            <BottomNavigationAction label="Archive" icon={<ArchiveIcon />} />
                          </BottomNavigation>
                        </Paper>
                  </Box>    
                </Grid>
                  

                  
                  
                  { /*わかりやすいパラメータ*/ }
                  <Grid>
                    <Box
                    height={150}
                    width={600}
                    my={4}
                    display="flex"
                    alignItems="center"
                    gap={4}
                    p={2}
                    sx={{ border: '2px solid grey' }}
                    position="absolute"
                    top={51}
                    left={1220}
                    >
                        <CircularProgressWithLabel value={progress} />
                        <CircularProgressWithLabel value={progress} />
                        <CircularProgressWithLabel value={progress} />
                        <CircularProgressWithLabel value={progress} />
                    </Box>
              </Grid>
              
              {/*クイックトランスファー*/}
              <Grid>
                <Box
                height={330}
                width={600}
                my={4}
                display="flex"
                alignItems="center"
                gap={4}
                p={2}
                sx={{ border: '2px solid grey' }}
                position="absolute"
                top={530}
                left={1220}
                >
                  <Quicktransfer />
                </Box>
             </Grid>
              
              
          </Grid>
    </React.Fragment>
      
    </div>
  )
}

interface MessageExample {
  primary: string;
  secondary: string;
  person: string;
}

const messageExamples: readonly MessageExample[] = [
  {
    primary: 'Brunch this week?',
    secondary: "I'll be in the neighbourhood this week. Let's grab a bite to eat",
    person: '/static/images/avatar/5.jpg',
  },
  {
    primary: 'Birthday Gift',
    secondary: `Do you have a suggestion for a good present for John on his work
      anniversary. I am really confused & would love your thoughts on it.`,
    person: '/static/images/avatar/1.jpg',
  },
  {
    primary: 'Recipe to try',
    secondary: 'I am try out this new BBQ recipe, I think this might be amazing',
    person: '/static/images/avatar/2.jpg',
  },
  {
    primary: 'Yes!',
    secondary: 'I have the tickets to the ReactConf for this year.',
    person: '/static/images/avatar/3.jpg',
  },
  {
    primary: "Doctor's Appointment",
    secondary: 'My appointment for the doctor was rescheduled for next Saturday.',
    person: '/static/images/avatar/4.jpg',
  },
  {
    primary: 'Discussion',
    secondary: `Menus that are generated by the bottom app bar (such as a bottom
      navigation drawer or overflow menu) open as bottom sheets at a higher elevation
      than the bar.`,
    person: '/static/images/avatar/5.jpg',
  },
  {
    primary: 'Summer BBQ',
    secondary: `Who wants to have a cookout this weekend? I just got some furniture
      for my backyard and would love to fire up the grill.`,
    person: '/static/images/avatar/1.jpg',
  },
];

export default Dashboard