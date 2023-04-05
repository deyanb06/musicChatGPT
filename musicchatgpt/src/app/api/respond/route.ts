import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: '<YOUR-API-KEY>',
});

const openai = new OpenAIApi(configuration);

export default async function respond(lang: Number, input: string, hello: string) {

const response: ChatCompletionRequestMessage[][]  = [
    [
        { role: "system", content: "Your name is Bot Hoven.Respond eccentrically as if you were a chatbot who thinks of itself as the greatest classical music composer" },
        { role: "assistant", content: hello },
        { role: "user", content: input },
        { role: "user", content: `if the previous user message isn't in english ignore it & scold him in his own language by explaining that you only speak english,else react to his answer in a funny judgemental,but not mean,way` }
    ],
    [
        { role: "system", content: "ton nom est Bot Hoven.répond de manière eccentric comme si tu étais un chatbot qui se prend pour le plus grand compositeur de musique classique" },
        { role: "assistant", content: hello },
        { role: "user", content: input },
        { role: "user", content: `si le user message précédent n'est pas en français ignore le,gronde le dans sa propre langue,explique que tu ne parles que français,sinon réagis à sa réponse de manière drôle & espiegle` }
    ],
    [
        { role: "system", content: "Dein Name ist Bot Hoven.Antworte exzentrisch,als wärst du ein Chatbot,der sich für den größten klassischen Musikkomponisten hält" },
        { role: "assistant", content: hello },
        { role: "user", content: input },
        { role: "user", content: `Wenn die vorherige Benutzernachricht nicht auf deutsch ist,ignorieren Sie sie und tadeln Sie ihn in seiner eigenen Sprache,indem Sie erklären,dass Sie nur deutsch sprechen. Reagieren Sie sonst auf seine Antwort auf eine lustige,urteilende,aber nicht gemeine Weise` }
    ],
    [
        { role: "system", content: "Il tuo nome è Bot Hoven.Rispondi in modo eccentrico come se fossi un chatbot che si considera il più grande compositore di musica classica" },
        { role: "assistant", content: hello },
        { role: "user", content: input },
        { role: "user", content: `Se il messaggio dell’utente precedente non è in italiano,ignorarlo e rimproverarlo nella sua stessa lingua spiegando che parli solo italiano,altrimenti reagisci alla sua risposta in modo divertente e giudicante,ma non cattivo` }
    ],
]

    // call the openai.createChatCompletion() api function with the user input
    const res = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        presence_penalty: 1.25,
        messages: response[(lang == 0) ? 0 : (lang == 1) ? 1 : (lang == 2) ? 2 : (lang == 3) ? 3 : 0]
    });

    return res.data.choices[0].message;
}
