import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const Testpage = () => {
  return (
    <>
      <Box
      height={500}
      width={1000}
      my={4}
      display="flex"
      alignItems="center"
      gap={4}
      p={2}
      sx={{ border: '2px solid grey' }}
      position={'absolute'}
      top={100}
      left={80}
      right={1}
      bottom={1}
      >
        リストを表示させる
        <Stack spacing={2} direction="column" position={'absolute'} top={450} left={880} bottom={1}>
          <Button variant="contained">テストする</Button>
        </Stack>
      </Box>

    </>
  )
}

export default Testpage