console.log("Bem-vindo ao jogo de corrida de kart!")

const player1 = {
    nome: "Mario",
    velocidade: 4,
    manobrabilidade: 3,
    poder: 3,
    pontos: 0,
};

const player2 = {
    nome: "Luigi",
    velocidade: 3,
    manobrabilidade: 4,
    poder: 4,
    pontos: 0,
};

async function RollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function GetRandonBlock() {
    let randon = Math.random()
    let resultado

    switch (true) {
        case randon <0.333:
            resultado = "Reta"
            break;
        case randon <0.66:
            resultado = "Curva"
            break
        default:
            resultado = "Confronto"
            break;
    }
    return resultado
}

async function LogRollResult(CharacterName, Block, DiceResult, Attribute) {
        console.log(`${CharacterName} 🎲 rolou um dado de ${Block} ${DiceResult} + ${Attribute} = ${DiceResult + Attribute}`)

}

async function PlayRaceEngine(character1, character2) {
    for(let round = 1; round <=5; round ++) {
        console.log(`🏁Rodada ${round}`)
        //Sortear bloco
        let block = await GetRandonBlock()
        console.log(`Bloco: ${block}`)
        //Rolar os dados
        let DiceResult1 = await RollDice()
        let DiceResult2 = await RollDice()

        //Teste de habilidade
        let TotalTestSkill1 = 0;
        let TotalTestSkill2 = 0; 

        if(block === "Reta"){
            TotalTestSkill1 = DiceResult1 + character1.velocidade
            TotalTestSkill2 = DiceResult2 + character2.velocidade
            await LogRollResult(character1.nome, "velocidade", DiceResult1, character1.velocidade);
            await LogRollResult(character2.nome, "velocidade", DiceResult2, character2.velocidade);
        }
        
        if(block === "Curva"){
            TotalTestSkill1 = DiceResult1 + character1.manobrabilidade
            TotalTestSkill2 = DiceResult2 + character2.manobrabilidade
            await LogRollResult(character1.nome, "manobrabilidade", DiceResult1, character1.manobrabilidade);
            await LogRollResult(character2.nome, "manobrabilidade", DiceResult2, character2.manobrabilidade);
        }


        
        if(block === "Confronto"){
            console.log(`${character1.nome} entrou em confronto com ${character2.nome}!`)

            let PowerResult1 = DiceResult1 + character1.poder
            let PowerResult2 = DiceResult2 + character2.poder
            await LogRollResult(character1.nome, "poder", DiceResult1, character1.poder);
            await LogRollResult(character2.nome, "poder", DiceResult2, character2.poder);

            if (PowerResult1 > PowerResult2) {
                console.log(`${character1.nome} venceu o confronto! ${character2.nome} perdeu 1 ponto 🐢`);
                if (character2.pontos > 0) {
                    character2.pontos--;
                }
            } else if (PowerResult2 > PowerResult1) {
                console.log(`${character2.nome} venceu o confronto! ${character1.nome} perdeu 1 ponto 🐢`);
                if (character1.pontos > 0) {
                    character1.pontos--;
                }
            } else {
                console.log("Confronto empatado! Nenhum ponto foi perdido.");
            }
        }

        //Verificando o Vencedor

        if(TotalTestSkill1 > TotalTestSkill2){
            console.log(`${character1.nome} marcou um ponto!`);
            character1.pontos++;
        }   

        if(TotalTestSkill2 > TotalTestSkill1){
            console.log(`${character2.nome} marcou um ponto!`);
            character2.pontos++
        }

        console.log("---------------------------------------------------");
}
}

async function DeclareWinner(character1, character2) {
    console.log("Resultado Final:")
    console.log(`${character1.nome} : ${character1.pontos} ponto(s)`)
    console.log(`${character2.nome} : ${character2.pontos} ponto(s)`)

    if(character1.pontos > character2.pontos)
        console.log(`\n🏆 ${character1.nome} venceu a corrida!!! Parabéns!!!🏆`);
    else if(character2.pontos > character1.pontos)
        console.log(`\n🏆 ${character2.nome} venceu a corrida!!! Parabéns!!!🏆`);
    else
        console.log(`\n🤝 A corrida terminou empatada!`);
    }

(async function main() {
    console.log(`🏁Corrida entre ${player1.nome} e ${player2.nome} está começando!🏁`);
    await PlayRaceEngine(player1, player2);
    await DeclareWinner(player1, player2);
})()
