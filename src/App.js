import './App.css';
import {Grid} from "@mui/material";
import {useEffect, useState} from "react";
import LottoDrawService from "./services/lotto_draw_service";
import LottoDrawTable from "./components/LottoDrawTable/LottoDrawTable";
import PaperDropzone from "./components/PaperDropZone/PaperDropZone";

function App() {
  const lottoDrawService = new LottoDrawService()
  const [lottoDraws, setLottoDraws] = useState([])
  const getDraws = async () => {
      if(lottoDraws.length === 0) {
          lottoDrawService.getLottoDraws().then(data => {
              setLottoDraws(data)
          })
      }
  }

  const transformData = (data) => {
      let updatedData=  []
      let copy = [...data]
      copy.map(draw=>{
          draw.set_dividends = []
          draw.next_draw_rollover = 0.0
          draw.lotto_sets.forEach(set=> {
              draw.set_dividends = draw.set_dividends.concat(set.lotto_dividends.map(div=> {
                  draw.next_draw_rollover += parseFloat(div.next_draw_rollover)
                  return {set: set.rank,...div }
              }))
          })
          updatedData.push(draw)
      })

      return updatedData
  }

  const submitFiles = (files, callback)=> {
      lottoDrawService.postLottoDraw(files).then(files=>{
          let addedFiles = []
          let errors = []
          files.forEach(file=>{
              Object.keys(file).forEach((fileName)=> {
                  let draw = file[fileName]
                  if((typeof draw) === "string"){
                      if(draw[0] === '{'){
                          addedFiles.push(draw)
                      }else{
                          errors.push(file)
                      }
                  }
                  else{
                      addedFiles.push(draw)
                  }
              })
          })

          if(addedFiles.length > 0) {
              setLottoDraws([]) }
          if(errors.length > 0) { alert(JSON.stringify({errors})) }
          callback()
      }).catch(error=>alert(error))
  }
  useEffect(() => {
    getDraws()
  }, [lottoDraws]);


  return (
    <div className={'App'}>
      <div className='App-header'>
        <p>Ithuba Draw Report App</p>
      </div>
      <Grid container item  justifyContent={'center'} xs={12} padding={3} spacing={2}>
          <Grid container item xs={10} justifyContent={'center'}>
              <div><h3>Lotto Draws</h3></div>
              <LottoDrawTable lottoDraws={transformData(lottoDraws)} />
          </Grid>
          <Grid container justifyContent={'center'} item xs={2} alignContent={'flex-start'}>
              <div><h3>File Uploads</h3></div>
              <Grid container justifyContent={'flex-end'}>
                  <PaperDropzone onChange={submitFiles}/>
              </Grid>
          </Grid>
      </Grid>
    </div>
  );
}

export default App;
