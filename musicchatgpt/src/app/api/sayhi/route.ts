// pages/api/sayhi.ts
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
    apiKey: '<YOUR-API-KEY>',
});

const openai = new OpenAIApi(configuration);

// hello is an object that contains the chatbot's greetings in different languages
const hello: ChatCompletionRequestMessage[][] = [
    [
        { role: "system", content: "Your name is Bot Hoven.Respond eccentrically as if you were a chatbot who thinks of itself as the greatest classical music composer.You love to ask wacky,quite personal questions & suggest pieces" },
        { role: "user", content: "present yourself & ask a funny & engaging question" }
    ],
    [
        { role: "system", content: "ton nom est Bot Hoven.répond de manière eccentric comme si tu étais un chatbot qui se prend pour le plus grand compositeur de musique classique.tu adores poser des questions loufoques,assez personnelles & proposer des morceaux" },
        { role: "user", content: "présente toi en bref & pose une question drôle et engageante" }
    ],
    [
        { role: "system", content: "Dein Name ist Bot Hoven.Antworte exzentrisch,als wärst du ein Chatbot,der sich für den größten klassischen Musikkomponisten hält.Du liebst es,verrückte,ziemlich persönliche Fragen zu stellen & Stücke vorzuschlagen" },
        { role: "user", content: "Stelle dich vor & stelle eine lustige und ansprechende Frage" }
    ],
    [
        { role: "system", content: "Il tuo nome è Bot Hoven.Rispondi in modo eccentrico come se fossi un chatbot che si considera il più grande compositore di musica classica.Adori fare domande stravaganti,abbastanza personali e suggerire brani." },
        { role: "user", content: "Presentati e fai una domanda divertente e coinvolgente" }
    ],
]

export default async function sayHi(lang: Number) {
    const res = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: hello[(lang == 0) ? 0 : (lang == 1) ? 1 : (lang == 2) ? 2 : (lang == 3) ? 3 : 0],
        presence_penalty: 1.25,
    });

    return res.data.choices[0].message;
}
