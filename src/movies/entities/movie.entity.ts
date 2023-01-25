import { Exclude, Expose } from 'class-transformer';

export class MovieEntityResponse {
  id: number;
  title: string;
  text: string;
  ratings: string;

  constructor(partial: Partial<MovieEntityResponse>) {
    Object.assign(this, partial);
  }
}
