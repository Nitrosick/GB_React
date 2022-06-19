export interface Message {
  author: string;
  text: string;
  side: string;
}

export interface Messages {
  [key: string]: Message[];
}

export interface Chat {
  id: string;
  name: string;
}
