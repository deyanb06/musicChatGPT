require('util').TextDecoder
import { promisify } from 'util';
import * as xml2js from 'xml2js';

interface tracks {
    playlist: {
        singles: {
            title: string;
            id: string;
        }[];
    };
}

// pas possible de faire une recherche avec l'api mx3
// le format xml est pas compliquer à parser for use.
export default async function mx3(input: string) {
  const res = await fetch('https://api.srgssr.ch/mx3/v2/singles/popular', {
    headers: {
      'Content-Type': 'xml',
      'Authorization': 'Bearer gPF0bmoqBhFJbTrzovkfVnvXALnQ'
    },
  });
  console.log(res.body);
  const data = await streamToJson(res.body);

  async function streamToJson(stream: ReadableStream | null): Promise<object> {
    if (!stream) return {} as tracks;
    const reader = stream.getReader();
    const decoder = new TextDecoder();
    let result = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      result += decoder.decode(value);
    }
    const parser = new xml2js.Parser();
    const parseString = promisify(parser.parseString);
    const obj = await parseString();
    return JSON.parse(obj);
  }

  
  function filter(e: string) {
    return input[input.split(' ').indexOf(e)];
  }

  const singles = data.playlist.singles.map((single: { title: any; id: any; }) => {
    return single.title;
  }).filter(filter);

  console.log(singles);

  return singles[0];
}