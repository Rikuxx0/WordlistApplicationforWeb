import React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import AddCircleIcon from '@mui/icons-material/AddCircle';



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

  

const Quicktransfer = () => {
  
   

  //クイックトランスファーの定義
  const [checked, setChecked] = React.useState<readonly number[]>([]);
  const [left, setLeft] = React.useState<readonly number[]>([1,2,3,4]);
  const [right, setRight] = React.useState<readonly number[]>([]);
  const [textFields, setTextFields] = React.useState<{ [key: number]: string }>({});



  const rightChecked = intersection(checked, right);
  const leftChecked = intersection(checked, left);
  

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

  const handleTextFieldChange = (key: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextFields({
      ...textFields,
      [key]: event.target.value,
    });
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
            <ListItemButton>
              <ListItemIcon
                key={value}
                role="listitem"
                onClick={handleToggle(value)}
              >
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }
                }
                />
              </ListItemIcon>
               <TextField 
                id={`outlined-basic-${value}`}
                label="元の単語"
                variant="outlined"
                size="small"
                value={textFields[value] || ''}
                onChange={handleTextFieldChange(value)}
               />
            </ListItemButton>
            
          );
        })}
      </List>
    </Card>
  );

  //リストを１個追加するための関数
    const addList = () => {
      // 新しい配列を作成して状態を更新
      setLeft([...left, left.length + 1]);
    };
    //リストを１個追加するための関数
    const removeList = () => {
      //　新しい配列を作成して状態を更新
      setLeft([...left, left.length - 1]);
    }

    return (
    <>
        { /* クイックトランスファー */}
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
                      <Box position={'absolute'} top={270} right={1} left={1} bottom={1}>
                        <Button
                        size='large' 
                        color='primary'
                        sx={{ 
                          boxShadow: 'none',
                          border: 'none',
                          outline: 'none'
                        }}
                        onClick={addList}
                        >
                          <AddCircleIcon fontSize="large"/>
                        </Button>
                      </Box>
    </>
  )
}

export default Quicktransfer