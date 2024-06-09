import React from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Quicktransfer from './Quicktransfer';

const Listdrawer = () => {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 700 }} role="presentation" >
       <Box
      height={400}
      width={600}
      my={4}
      display="flex"
      alignItems="center"
      gap={4}
      p={2}
      sx={{ border: '2px solid grey' }}
      position={'relative'}
      top={200}
      left={50}
      right={1}
      bottom={1}
    >
      <Quicktransfer />
    </Box>
        
    </Box>
  );

    return (
    <div>
      <Button onClick={toggleDrawer(true)}>追加</Button>
      <Drawer anchor='right' open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  )
}

export default Listdrawer