import * as React from 'react'
import { styled, useTheme } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Checkbox from '@mui/material/Checkbox';
import ChecklistRtlRoundedIcon from '@mui/icons-material/ChecklistRtlRounded';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Grid from '@mui/material/Grid';
import HelpIcon from '@mui/icons-material/Help';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import Paper from '@mui/material/Paper';
import SettingsIcon from '@mui/icons-material/Settings';
import Toolbar from '@mui/material/Toolbar';
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


//Drawerの仕組み
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

//投稿欄の仕組み
function refreshMessages(): MessageExample[] {
  const getRandomInt = (max: number) => Math.floor(Math.random() * Math.floor(max));

  return Array.from(new Array(50)).map(
    () => messageExamples[getRandomInt(messageExamples.length)],
  );
}

//クイックトランスファーの仕組み
  function not(a: readonly number[], b: readonly number[]) {
    return a.filter((value) => b.indexOf(value) === -1);
  }
  
  function intersection(a: readonly number[], b: readonly number[]) {
    return a.filter((value) => b.indexOf(value) !== -1);
  }
  
  function union(a: readonly number[], b: readonly number[]) {
    return [...a, ...not(b, a)];
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


const App = () => {

  //Drawerの中の値の定義
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  //Listのiconを配列化
  const icons = ['home', 'test', 'list', 'reminder'];
  const othericons = ['account', 'setting','HowToUse'];

  //投稿欄の定義
  const [value, setValue] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const [messages, setMessages] = React.useState(() => refreshMessages());

  React.useEffect(() => {
    (ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;
    setMessages(refreshMessages());
  }, [value, setMessages]);


  //クイックトランスファーの定義
  const [checked, setChecked] = React.useState<readonly number[]>([]);
  const [left, setLeft] = React.useState<readonly number[]>([0, 1, 2, 3]);
  const [right, setRight] = React.useState<readonly number[]>([4, 5, 6, 7]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items: readonly number[]) =>
    intersection(checked, items).length;

  const handleToggleAll = (items: readonly number[]) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title: React.ReactNode, items: readonly number[]) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={
              numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              'aria-label': 'all items selected',
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List
        sx={{
          width: 200,
          height: 230,
          bgcolor: 'background.paper',
          overflow: 'auto',
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value: number) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItemButton
              key={value}
              role="listitem"
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`List item ${value + 1}`} />
            </ListItemButton>
          );
        })}
      </List>
    </Card>
  );


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
    <React.Fragment>
      <Box sx={{ flexGrow:1 }}>
      { /*アップバー */}
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h3" noWrap component="div" position='relative' left='737px' >
            Wordlist App
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
        {['ホーム','テストする', 'My単語リスト', 'リマインダー'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton >
                <ListItemIcon>
                {icons[index] === 'home' && <HomeOutlinedIcon />}
                {icons[index] === 'test' && <EditRoundedIcon />}
                {icons[index] === 'list' && <ChecklistRtlRoundedIcon />}
                {icons[index] === 'reminder' && <NotificationsActiveRoundedIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['アカウント', '設定', '使い方'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {othericons[index] === 'account' && <AccountCircleIcon />}
                  {othericons[index] === 'setting' && <SettingsIcon />}
                  {othericons[index] === 'HowToUse' && <HelpIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
        <Main open={open}>
          <DrawerHeader />
        </Main>
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

              
             
              
              { /* クイックトランスファー */}
              <Grid>
                <Box
                height={340}
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
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item>{customList('Choices', left)}</Grid>
                        <Grid item>
                          <Grid container direction="column" alignItems="center">
                            <Button
                              sx={{ my: 0.5 }}
                              variant="outlined"
                              size="small"
                              onClick={handleCheckedRight}
                              disabled={leftChecked.length === 0}
                              aria-label="move selected right"
                            >
                              &gt;
                            </Button>
                            <Button
                            sx={{ my: 0.5 }}
                            variant="outlined"
                            size="small"
                            onClick={handleCheckedLeft}
                            disabled={rightChecked.length === 0}
                            aria-label="move selected left"
                              >
                              &lt;
                              </Button>
                          </Grid>
                        </Grid>
                        <Grid item>{customList('Chosen', right)}</Grid>
                      </Grid>
                  </Box>
                </Grid>
          </Grid>
      </Box>
    </React.Fragment>
  );
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

export default App