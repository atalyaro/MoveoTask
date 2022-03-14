import React, { useRef, useState, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import Checkbox from '@mui/material/Checkbox';
import VolumeOffOutlinedIcon from '@mui/icons-material/VolumeOffOutlined';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default function Waveform({ src, color, isPlaying, isLoop, setisPlaying, time, settime, index }) {

    let waveformRef = React.createRef()
    let [wavesurfer, setwavesurfer] = useState(null)
    let [mute, setmute] = useState(false)

    useEffect(() => {
        let wave = WaveSurfer.create({
            container: waveformRef.current,
            interact: false
        })

        wave.load(src)
        setwavesurfer(wave)

    }, [])

    const isInitialMount = useRef(true)

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false
        } else {
            wavesurfer.on('finish', () => {
                if (isLoop) {
                    wavesurfer.play()
                    setisPlaying(true)
                    settime(0)
                } else {
                    wavesurfer.stop()
                    setisPlaying(false)
                    settime(0)
                }
            })
            if (isPlaying && !mute) {
                wavesurfer.play()
            }
            if (!isPlaying) {
                wavesurfer.stop()
                settime(0)
            }
            if (wavesurfer.getMute()) {
                wavesurfer.stop()
            }
        }
    })

    useEffect(
        () => {
            let x = time
            if (isPlaying) {
                let Interval = setInterval(() => {
                    if (x < wavesurfer.getDuration()) {
                        x = wavesurfer.getCurrentTime()
                        settime(x)
                    }
                }, 300)
                return () => clearInterval(Interval)
            }
        },
        [isPlaying]
    )

    const changeMute = (e) => {
        if (e.target.checked == false) {
            wavesurfer.skipForward(time)
        }
        wavesurfer.setMute(!mute)
        setmute(!mute)
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Grid container columnSpacing={{ xs: 1 }}>
                <Grid item xs={1}>
                    <Checkbox icon={<VolumeUpOutlinedIcon fontSize="large" />} color="default"
                        checkedIcon={<VolumeOffOutlinedIcon fontSize="large" />} onChange={(e) => changeMute(e)} />
                </Grid>
                <Grid item xs={11} sx={{ overflow: 'hidden' }}>
                    <div style={{ background: color }}>
                        <div ref={waveformRef} />
                    </div>
                </Grid>
            </Grid>
        </Box >
    )
}

Waveform.defaultProps = {
    src: ""
}
