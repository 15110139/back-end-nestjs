import { IsString } from 'class-validator';
export class MovieDTO {
    @IsString()
    readonly movieId: string;
}