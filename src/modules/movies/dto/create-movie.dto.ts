import { IsString } from 'class-validator';
export class CreateMovieDTO {
    @IsString()
    readonly title: string;
    @IsString()
    readonly director: string;
    @IsString()
    readonly description: string;
}