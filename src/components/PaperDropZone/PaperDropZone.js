import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import {Grid} from "@mui/material";
import {FilePresent, UploadFile} from "@mui/icons-material";

function PaperDropzone(props) {
    const [selectedFiles, setSelectedFiles] = useState([])
    const resetFiles = ()=> {
        setSelectedFiles([])
    }

    const onDrop = useCallback(acceptedFiles => {
        let validFiles = acceptedFiles.filter(file=>file.name.split('.')[1] === 'rep')
        if(validFiles.length !== acceptedFiles.length) { alert("Please only submit '.rep' files") }
        setSelectedFiles(validFiles)
        if((typeof props.onChange) === 'function' && validFiles.length > 0){
            props.onChange(validFiles, resetFiles)
        }
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    return(
    <Grid container >
            <section>
                <Grid {...getRootProps()} container style={{border: (isDragActive ? '1px red solid' : 'none')}}>
                    <input {...getInputProps()} />
                    {
                        selectedFiles.length < 1 ? <>
                            <Grid container justifyContent={'center'}><UploadFile fontSize={'large'} color={'black'}/></Grid>
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </> :
                        <>
                            <Grid container justifyContent={'center'}><FilePresent fontSize={'large'} color={'red'}/></Grid>
                            {
                                selectedFiles.map(file=><Grid style={{wordWrap:'break'}} key={file.name}>
                                    {file.name}</Grid>)
                            }
                        </>
                    }
                </Grid>
            </section>
    </Grid>)
}

export default PaperDropzone