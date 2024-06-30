import React, { useState, useEffect }from 'react';
import axios from 'axios';
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
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

//言葉の定義
interface Word {
  original: string;
  translation: string;
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

  

const Quicktransfer = () => {
  


  //クイックトランスファーと文字の定義
  const [checked, setChecked] = React.useState<readonly number[]>([]);
  const [left, setLeft] = React.useState<readonly number[]>([1,2,3,4]);
  const [right, setRight] = React.useState<readonly number[]>([]);
  const [words, setWords] = useState<Word[]>([]);
  const [textFields, setTextFields] = React.useState<{ [key: number]: string }>({});

  
  //ここだけクイックトランスファーの仕組み外　入力した文字をjson形式で格納
  useEffect(() => {
    const storedWords = localStorage.getItem('flashcards');
    if (storedWords) {
      setWords(JSON.parse(storedWords));
    }
  }, []);

  //textとtextField[value]の統合しなければならない
  const translateWord = async (text: string) => {
    try {
    const url = 'https://libretranslate.de/translate';
    const response = await axios.post(
      url,
     {
      q: text,
      source: 'ja', // 翻訳元の言語コード（ここでは日本語）
      target: 'en', // 翻訳先の言語コード（ここでは英語）
      format: 'text'
      }, 
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
    return response.data.translatedText;
  } catch (error: any) {
    console.error('Error translating word:', error.response ? error.response.data : error.message);
    return '';
    }
  };

  const addword = async (key: number) => {
    if (textFields[key].trim() === '') return;
    const translation = await translateWord(textFields[key]);
    const newWord: Word= {original: textFields[key], translation };
    const updatedWords = [...words, newWord];
    setWords(updatedWords);
    localStorage.setItem('flashcards', JSON.stringify(updatedWords));
    setTextFields((prevTextFields) => ({ ...prevTextFields, [key]: '' }));
  };

 //keyに問題あり


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
    setTextFields((prevTextFields) => ({
      ...prevTextFields,
      [key]: event.target.value,
    }));
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
                label="単語"
                variant="outlined"
                size="small"
                value={textFields[value] || ''}
                onChange={handleTextFieldChange(value)}
                onBlur={() => addword(value)} //カーソルが離れたときに機能する
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
    //リストを１個減らするための関数
    const removeList = () => {
      //　新しい配列を作成して状態を更新
      setLeft(left.slice(0, -1));
    };

    


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
                      
                      
                      <Box position={'absolute'} top={220} right={1} left={1} bottom={1}>
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
                      
                      
                      <Box position={'absolute'} top={270} right={1} left={1} bottom={1}>
                        <Button
                        size='large' 
                        color='primary'
                        sx={{ 
                          boxShadow: 'none',
                          border: 'none',
                          outline: 'none'
                        }}
                        onClick={removeList}
                        >
                         <RemoveCircleIcon fontSize="large"/>
                        </Button>
                      </Box>
    </>
  )
}

export default Quicktransfer