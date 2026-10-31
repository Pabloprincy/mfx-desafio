

function handleDateOperations(dados){

    let dataUm = new Date(dados.date1)
    let dataDois = new Date(dados.date2)

    if (
    Number.isNaN(dataUm.getTime()) ||
    Number.isNaN(dataDois.getTime())
) {
    return {
        error: "Data inicial ou final inválida."
    };
}
    let diferenca = dataUm.getTime() - dataDois.getTime()
    //console.log(diferenca, `A diferença entre dataUm: ${dataUm.getTime()} e dataDois: ${dataDois.getTime()}`)
    let dias = Math.floor(Math.abs(diferenca)/86400000)
    //console.log(`Os dias são de diferença são ${dias}`)




    let novoDia = new Date(dados.date)
    //console.log(novoDia.getUTCDate())
    novoDia.setUTCDate(novoDia.getUTCDate() + dados.daysToAdd)
    //console.log(novoDia.toISOString());

    if (
    Number.isNaN(novoDia.getTime()) ||
    !Number.isInteger(dados.daysToAdd)
) {
    return { error: "Data ou quantidade de dias inválida." };
}
let dataHorario = new Date(dados.dateTime);

if (Number.isNaN(dataHorario.getTime())) {
    return { error: "Data e horário inválidos." };
}

let horaFormatada;

try {
    let formatador = new Intl.DateTimeFormat("pt-BR", {
        timeZone: dados.timeZone,
        dateStyle: "short",
        timeStyle: "medium"
    });

    horaFormatada = formatador.format(dataHorario);

} catch (erro) {
    return { error: "Fuso horário inválido." };
}


    let dataFormatar = new Date(dados.dateToFormat)

    if (Number.isNaN(dataFormatar.getTime())) {
    return { error: "Data para formatação inválida." };
}
    let formatadorData = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "UTC",
    dateStyle: "short"

});
    let dataFormatada = formatadorData.format(dataFormatar)
    // console.log(dataFormatada, dados.dateToFormat)


    return{
    daysBetween: dias,
    newDate: novoDia.toISOString().slice(0,10),
    convertedTimeZone: horaFormatada,
    formattedDate: dataFormatada
}

}


const dados = {
    date1: "2026-12-30",
    date2: "2026-12-25",

    date: "2026-12-31",
    daysToAdd: 5,

    dateTime: "2026-12-31T15:30:00-03:00",
    timeZone: "America/New_York",

    dateToFormat: "2026-12-31"
};

// handleDateOperations(dados);

console.log(handleDateOperations(dados))


