// POR QUE ESSE SERVIDOR EXISTE:
// Ao chamar o SOAP direto do navegador (fetch), deu erro de CORS:
// "Access to fetch at 'https://www.dataaccess.com/...' from origin 'null'
// has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header
// is present on the requested resource."
//
// CORS é uma regra dos navegadores: o servidor do SOAP não manda o cabeçalho
// que autoriza o meu site a ler a resposta, então o navegador bloqueia.
// Essa regra NÃO existe no Node, então este servidor chama o SOAP no meu lugar
// e devolve a resposta para o navegador com o cabeçalho liberado.
//
// Obs: o Express é usado só para criar a rota. O envio do SOAP e a leitura
//


import express from "express"

const app = express()

app.get("/converter", async (req, res) => {
    const numero = req.query.numero

    const xml = `
        <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
            <soap:Body>
                <NumberToWords xmlns="http://www.dataaccess.com/webservicesserver/">
                    <ubiNum>${numero}</ubiNum>
                </NumberToWords>
            </soap:Body>
        </soap:Envelope>
    `

    const url = "https://www.dataaccess.com/webservicesserver/NumberConversion.wso"

    const result = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "text/xml; charset=utf-8"},
        body: xml
    })

       const textoResul = await result.text()

    res.setHeader("Access-Control-Allow-Origin", "*")
    res.send(textoResul)
    

    
})

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000")
})


