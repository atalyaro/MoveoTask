import React, { useState } from "react";
import Waveform from "./WaveForm";
import LoopIcon from '@mui/icons-material/Loop';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';
import KeyboardTabOutlinedIcon from '@mui/icons-material/KeyboardTabOutlined';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export default function Main() {
    const loops = ["_tambourine_shake_higher.mp3", "B_VOC.mp3", "DRUMS.mp3",
        "HE_HE_VOC.mp3", "HIGH_VOC.mp3", "JIBRISH.mp3", "LEAD_1.mp3", "UUHO_VOC.mp3"]
    const colors = ["#7FFFD4", "#00CED1", "#00BFFF", "#F0E68C", "#FFF0F5", "#FFFACD",
        "#90EE90", "#FFA07A"]

    let [isPlaying, setisPlaying] = useState(false)
    let [isLoop, setisLoop] = useState(false)
    let [time, settime] = useState(0)

    const togglePlay = () => {
        if (!isLoop) {
            setisPlaying(false)
        }
        setisPlaying(true)
    }

    const toggleStop = () => {
        setisPlaying(false)
        settime(0)
    }

    const toggleLoop = () => {
        setisLoop(!isLoop)
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Grid container columnSpacing={{ xs: 1 }}>
                <Grid align="center" item xs={2}>
                    <Typography align="center" variant="h5" display="block" gutterBottom>
                        {Math.floor(time)}
                    </Typography>
                    <IconButton onClick={togglePlay}>
                        <PlayCircleOutlinedIcon fontSize="large" />
                    </IconButton>
                    <IconButton onClick={toggleStop}>
                        <StopCircleOutlinedIcon fontSize="large" />
                    </IconButton>
                    <Checkbox icon={<KeyboardTabOutlinedIcon fontSize="large" />} color="default"
                        checkedIcon={<LoopIcon fontSize="large" />} onChange={(e) => toggleLoop(e)} />
                </Grid>
                <Grid item xs={9}>
                    {loops.map((x, index) => (
                        <Waveform
                            key={index}
                            index={index}
                            src={process.env.PUBLIC_URL + 'loops/' + x}
                            isPlaying={isPlaying}
                            isLoop={isLoop}
                            color={colors[index]}
                            setisPlaying={setisPlaying}
                            time={time}
                            settime={settime} />))}
                </Grid>
            </Grid>
        </Box>
    )
}
