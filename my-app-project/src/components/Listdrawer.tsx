import React from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';


const Listdrawer = () => {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 700 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)} >
      
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