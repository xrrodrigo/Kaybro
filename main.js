import * as XLSX from 'https://cdn.sheetjs.com/xlsx-latest/package/xlsx.mjs';

const input = document.getElementById('fileInput');
const consultor = document.getElementById('consultorName');
const consultorField = document.getElementById('consultor-field');
const addDataBtn = document.getElementById('addDataBtn');
const getNumberName = document.getElementById('telInput');
const getClientName = document.getElementById('clientName');
const sessionIdField = document.getElementById('sessionIdField');
const phoneIdSelect = document.getElementById('phoneIdSelect');


let clientes = [];
let firstClient = null;

function readExcel(file) {
  
    const reader = new FileReader();

    reader.onload = async function(e) {
        const data = new Uint8Array(e.target.result);
        const consultorColumn = consultorField.value;
        
        const workbook = XLSX.read(data, { type: 'array' });

        
        const sheetName = workbook.SheetNames[0];

        const sheet = workbook.Sheets[sheetName];

        
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        const filterConsultor = jsonData.filter(item =>
            item[consultorColumn] === consultor.value
        )

 
       const phoneIds = ['68f2ab563ac00563d3d89f3b', '68f2aa50a9adeacddcd788e7', '68f14a80b80cdbddfbcae72a', '68dec82104bb3a900d089d6d'];
       let currentIndex = 0;

         function getNextPhoneId() {
          const id = phoneIds[currentIndex];
          currentIndex = (currentIndex + 1) % phoneIds.length;
          return id;
        }


    for (let i = 0; i < filterConsultor.length; i++){


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const getTimeOutInput = document.getElementById('rangeInput').value * 1000;

       const numberField = getNumberName.value;
       const clientNameField = getClientName.value;
       const sessionId = "session=" + sessionIdField.value;
       const clientObject = filterConsultor[i]

        const payload = {
        phone_id: getNextPhoneId(),
        phone_number: clientObject[numberField],
        chat_name: clientObject[clientNameField],
        session_id: sessionId,
        }


       console.log('payload do front', payload);
       const response = await fetch('https://kaybro-api.onrender.com/client', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
       });
       
      const data = await response.json()
      console.log('retorno do front:', data)
      console.log(getTimeOutInput / 1000 + " Segundos de intervalo");
      
    await sleep(getTimeOutInput);
    }
         firstClient = filterConsultor[0];
    };
    reader.readAsArrayBuffer(file);
}

addDataBtn.addEventListener('click', () => {
    const file = input.files[0];

    if (!file) {
        alert('Selecione um arquivo primeiro');
        return;
    }
    
    readExcel(file);
});
