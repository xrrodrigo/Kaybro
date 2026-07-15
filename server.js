const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: '*'
}));

app.use(express.json());

app.post('/client', async (req, res) => {

   console.log('server', req.body)

const params = new URLSearchParams();

params.append('phone_id', req.body.phone_id);
params.append('startchat_phone_number', req.body.phone_number);
params.append('startchat_dialog_id', '');
params.append('startchat_opening_message', '');
params.append('startchat_chat_name', req.body.chat_name);
        
  const response = await fetch('https://{SEU_SERVIDOR}.chatguru.app/startchat/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': req.body.session_id,
        },
        body: params.toString()
       });
       const data = await response
       console.log(params.toString())
       
    res.json({
        success: true
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
