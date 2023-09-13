interface Country {
  name: string;
  native: string;
  capital: string;
  emoji: string;
  currency: string;
  size: string;
  languages: {
    code: string;
    name: string;
  }[];
}

export default Country;
