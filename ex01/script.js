// Chamo o meu servidor local (localhost:3000) e não o SOAP direto,
// porque o navegador bloqueia o SOAP por CORS (explicado no servidor.js).
// O XML da resposta é lido aqui com DOMParser.
async function converterNum(numero) {
    try {
        const result = await fetch(`http://localhost:3000/converter?numero=${numero}`)

        if (!result.ok) {
            return "Erro: o serviço não respondeu direito"
        }

        const textoResul = await result.text()
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(textoResul, "text/xml")

        // Procuro a tag da RESPOSTA (NumberToWordsResult), ignorando o prefixo "m:"
        const nos = xmlDoc.getElementsByTagNameNS("http://www.dataaccess.com/webservicesserver/", "NumberToWordsResult")

        // Se o serviço devolver um erro (soap:Fault), a tag não existe
        if (nos.length === 0) {
            return "Erro: a resposta veio sem resultado"
        }

        // O return precisa ser a última coisa: é ele que entrega o texto para fora da função
        return nos[0].textContent.trim()
    } catch (erro) {
        // Cai aqui se o servidor estiver desligado
        return "Erro: não foi possível conectar ao servidor"
    }
}


const button = document.querySelector(".botaoEnviar")
const resultado = document.querySelector(".numeroPorExtenso")

button.addEventListener("click", async (e) => {
    e.preventDefault()
    const valor = document.querySelector(".valorInput").value

    // Campo vazio vira 0 em Number(""), por isso testo o vazio separado
    if (valor === "" || !Number.isInteger(Number(valor)) || Number(valor) < 0) {
        resultado.textContent = "Digite um número inteiro positivo"
        return
    }

    const texto = await converterNum(valor)
    resultado.textContent = texto
    console.log(texto)
})





