import {server} from "./server.js"

const form=document.getElementById("form")
const input = document.getElementById("url")
const content = document.getElementById("content")


form.addEventListener("submit", async (event)=>{
  event.preventDefault();
  content.classList.remove("finish")
  const videoURL= input.value

  if(!videoURL.includes("shorts")){
   return(content.textContent = "Esse vídeo não parece ser um short. Escolha outro!")
  }

  const [_, params]=videoURL.split("/shorts/")
  const[videoID]=params.split("?si")
  console.log(videoID)

  content.textContent="Obtendo texto do áudio..."

  const transcription= await server.get("/summary/" + videoID)

  content.textContent="Realizando o resumo..."

  const summary= await server.post("/summary",{
    text: transcription.data.result,
  }, {
    headers: {
      "Content-Type": "application/json"
    }
  })
  

  content.textContent=summary.data.result
  
  content.classList.add("finish")
})