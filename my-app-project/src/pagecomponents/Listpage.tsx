import Box from '@mui/material/Box';
import Tablelist from '../components/Tablelist';
import Typography from '@mui/material/Typography';
import Listdrawer from '../components/Listdrawer';

const Listpage = () => {
  return (
    <>
     <Box
       height={750}
       width={1400}
       sx={{ border: '2px solid grey' }}
       position={'relative'}
       top={1}
       left={260}
       right={1}
       bottom={1}
     
    >
      <Typography variant='h1'  position={'relative'} top={1} right={1} left={450} bottom={1}>Word Setting</Typography>
      <Box
        height={530}
        width={900}
        my={4}
        display="flex"
        alignItems="center"
        gap={4}
        p={2}
        
        position={'relative'}
        top={1}
        right={1}
        left={60}
        bottom={100}

      >
        <Tablelist />
        <Listdrawer />
      </Box>
    </Box>
          
    </>
  )
}

export default Listpage