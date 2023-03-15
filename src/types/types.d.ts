export interface PageLinkType {
  next: string | null;
  previous: string | null;
}

export interface PokemonDetailsType {
  name: string;
  abilities: string[];
  height: number | string;
  weight: number | string;
  types: string[];
  image: string
}
