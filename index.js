const express = require('express');
const cors = require('cors'); // Importa il modulo cors
const fs = require('fs').promises;
const app = express();

// Utilizza il middleware cors
app.use(cors());

async function caricaDati(path) { //funzione asincrona per parserizzare il json corrispondente al path
  try {
    const data = await fs.readFile(path, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Errore durante il caricamento del file ${path}:`, error);
    return null;
  }
}


// homepage
app.get('/', (req, res) => {
  const homePage = '<div style="margin:auto;text-align:center"><h1>Benvenuto su mafieitaliane api di Volpi e Camanitti</h1><br><p>Ecco le rotte che puoi inserire:<br>/mafie  -->ottieni un json con le mafie<br>/dettagli  -->ottieni un json con i dettagli delle mafie<br>/attentati  -->ottieni un json con gli attentati delle mafie</p><div>'; // Tag HTML da restituire
  res.send(homePage);
});

// Rotte che richiamano i json
app.get('/mafie', async (req, res) => {
  const mafie = await caricaDati('./public/json/mafie.json');
  if (mafie) {
    res.json(mafie);
  } else {
    res.status(500).json({ error: 'Errore durante il caricamento dei dati delle mafie' });
  }
});

app.get('/dettagli', async (req, res) => {
  const dettagli = await caricaDati('./public/json/dettagli.json');
  if (dettagli) {
    res.json(dettagli);
  } else {
    res.status(500).json({ error: 'Errore durante il caricamento dei dettagli delle organizzazioni' });
  }
});

app.get('/attentati', async (req, res) => {
  const attentati = await caricaDati('./public/json/attentati.json');
  if (attentati) {
    res.json(attentati);
  } else {
    res.status(500).json({ error: 'Errore durante il caricamento dei dati degli attentati' });
  }
});

// Avvio del server
const port = 3000;
app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});
