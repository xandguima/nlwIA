import {transcriptionExample} from "./utils/transcription.js"
import{pipeline} from "@xenova/transformers"


export async function transcribe(audio){

  try {

    console.log("realizando a transcrição")
    const transcribe=await pipeline("automatic-speech-recognition",
    "Xenova/whisper-small")

    const transcription=await transcribe(audio,{
      chunk_length_s: 30,
      stride_lenght_s:5,
      languege:"portuguese",
      task:"transcribe",
    })

    console.log("transcrição finalizada com sucesso.")
    return transcription?.text.replace("[Música]","")
    
  } catch (error) {
    throw new Error(error)
    
  }

  //return transcriptionExample

}