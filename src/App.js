import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ReplayIcon from '@mui/icons-material/Replay';
import { HealthBar } from "./components/HealthBar";
import { useState } from "react";
import { generateHexes, hexValues } from "./scripts/hexGenerator.js";
import $ from 'jquery';


function App() {
  const [values, setValues] = useState({
    hex: ''
  });

  const [stats, setStats] = useState({
    score:0,
    lives:5,
    maxLives:5
  });

  const [hexList, setHexList] = useState(generateHexes(0,5));
  const [currentHexIndex, setCurrentHexIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const updateStat = (prop, value) => {
    setStats({ ...stats, [prop]: value });
  };

  const submitHex = (hex) => {
    if(stats.lives>0){
      if(hexList[currentHexIndex] === hex.toLowerCase()){
        updateStat("score", stats.score+1);
        setValues({ ...values, hex:"" });
        $("#correct").fadeToggle().delay(500).fadeToggle();
        setTimeout(() => {
          if(currentHexIndex >= hexList.length-1) {
            setCurrentHexIndex(0);
            setHexList(generateHexes(currentStep+1,(currentStep<4)?(5*(currentStep+2)):100));
            setCurrentStep(state=>state+1);
          }else{
            setCurrentHexIndex(state=>state+1);
          }
        }, 700);
      }else{
        $("#incorrect").fadeToggle().delay(500).fadeToggle();
        updateStat("lives", stats.lives-1);
      }
    }
  }

  return (
    <>
      <CssBaseline />
      <Grid
        id="main-grid"
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        width="fit-content"
        p={4}
        pt={1 }
        left="50%"
        top="50%"
        position={"absolute"}
        border={1}
        borderColor="grey.400"
        borderRadius={3}
        sx={{
          transform:"translateY(-50%) translateX(-50%)"
        }}
      >
        <Grid item mb={1} className="flex w-full justify-between">
          <div className='w-5 cursor-pointer' onClick={()=>{
            setValues({ ...values, hex:"" });
            setStats({
              score:0,
              lives:5,
              maxLives:5
            });
            setHexList(generateHexes(0,5));
            setCurrentHexIndex(0);
            setCurrentStep(0);
          }}><ReplayIcon /></div>
          <HealthBar totalLives={stats.maxLives} lives={stats.lives} />
          <div className='w-5 font-bold flex justify-center text-gray-500 cursor-pointer'>{stats.score}</div>
        </Grid> 
        <Grid item mb={1}>
          <Box sx={{ bgcolor: '#'+hexList[currentHexIndex], height:300, width:300, borderRadius:4 }} alignItems="center" justifyContent="center" display="flex">
            <CheckCircleOutlineIcon id="correct" sx={{fill:"#fff", width:"3em", height:"3em", display:"none"}} />
            <CancelOutlinedIcon id="incorrect" sx={{fill:"#fff", width:"3em", height:"3em", display:"none"}} />
          </Box>
        </Grid>
        <Grid item mb={1}>
          {(stats.lives>0)?"":('#'+hexList[currentHexIndex])}
        </Grid>
        <Grid item mb={2}>
          <form onSubmit={()=>{submitHex(values.hex);} }>
            <FormControl sx={{ m: 0, width:300 }}>
              <InputLabel htmlFor="outlined-adornment-hex">Hex Value</InputLabel>
              <OutlinedInput
                autoComplete='off'
                id="outlined-adornment-hex"
                value={values.hex}
                onChange={handleChange('hex')}
                startAdornment={<InputAdornment position="start">#</InputAdornment>}
                label="Hex Value"
              />
            </FormControl>
          </form>
        </Grid>
        <Grid item>
          <Stack spacing={2} direction="row" width={300}>
            <Button fullWidth variant="contained" disableElevation onClick={()=>{
              submitHex(values.hex);
            }} disabled={stats.lives<=0}>Submit</Button>
            {/* <Button fullWidth variant="outlined">Skip</Button> */}
          </Stack>
        </Grid>
      </Grid> 
    </>
  );
}

export default App;
