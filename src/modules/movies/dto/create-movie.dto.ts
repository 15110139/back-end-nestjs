import { IsString, IsNumber, IsDefined, MinLength, MaxLength } from 'class-validator';
export class CreateMovieDTO {
    @IsNumber()
    @IsDefined()
    readonly title: string;

    @IsString()
    @IsDefined()
    readonly director: string;

    @IsString()
    @IsDefined()
    readonly description: string;
}