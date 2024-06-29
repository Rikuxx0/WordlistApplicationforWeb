import React, { useState, useEffect } from 'react';
import { Button, Grid, Card, CardContent, Typography, Box, Paper, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

// 単語の型定義
interface Word {
  original: string;
  translation: string;
}

const Exampage = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [shuffledWords, setShuffledWords] = useState<Word[]>([]);
  const [currentWords, setCurrentWords] = useState<Word[]>([]);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });

  // ローカルストレージから単語を取得
  useEffect(() => {
    const storedWords = localStorage.getItem('flashcards');
    if (storedWords) {
      setWords(JSON.parse(storedWords));
    }
  }, []);

  // 単語をシャッフルする関数
  const shuffleWords = (words: Word[]) => {
    const shuffled = [...words];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // 単語を4枚表示する関数
  const displayNextWords = () => {
    if (shuffledWords.length < 4) {
      setShuffledWords(shuffleWords(words));
    }
    setCurrentWords(shuffledWords.slice(0, 4));
    setShuffledWords(shuffledWords.slice(4));
  };

  // 単語の正解・不正解をカウントする関数
  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore({ ...score, correct: score.correct + 1 });
    } else {
      setScore({ ...score, incorrect: score.incorrect + 1 });
    }
    displayNextWords();
  };

  useEffect(() => {
    if (words.length > 0) {
      displayNextWords();
    }
  }, [words]);

  //カードのスタイル
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  
  return (
    <Box
      height={700}
      width={1900}
      my={4}
      display="flex"
      alignItems="center"
      gap={4}
      p={2}
      sx={{ border: '2px solid grey' }}
    >
      <Box
            height={700}
            width={500}
            my={4}
            display="flex"
            alignItems="center"
            gap={4}
            p={2}
      >
        <Typography variant="h4" gutterBottom>
          単語帳アプリ
        </Typography>
      </Box>
      <Box
            height={700}
            width={500}
            my={4}
            display="flex"
            alignItems="center"
            gap={4}
            p={2}
      >
        <Typography variant="h6">
          正解: {score.correct} 不正解: {score.incorrect}
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {currentWords.map((word, index) => (
          <Grid item xs={6} sm={3} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h5">{word.original}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAnswer(true)}
                >
                  正解
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleAnswer(false)}
                >
                  不正解
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Box sx={{ width: '80%' }}>
          <Stack spacing={4}>
            <Item>
              <Button>button 1</Button>
            </Item>
            <Item>
              <Button>button 2</Button>
            </Item>
            <Item>
              <Button >button 3</Button>
            </Item>
            <Item>
              <Button>button 4</Button>
            </Item>
          </Stack>
        </Box>

      </Grid>
      <Box
            height={700}
            width={500}
            my={4}
            display="flex"
            alignItems="center"
            gap={4}
            p={2}
      >
        <Button variant="contained" color="primary" onClick={displayNextWords}>
          次の4枚
        </Button>
      </Box>
      <Box
            height={20}
            width={500}
            my={4}
            display="flex"
            alignItems="center"
            gap={4}
            p={2}
            position='absolute'
            top={800}
            right={1}
            left={1800}
            
      >
        <Button variant="contained" color="primary" href='./Testpage'>
          終了
        </Button>
      </Box>
    </Box>
  )
}

export default Exampage;