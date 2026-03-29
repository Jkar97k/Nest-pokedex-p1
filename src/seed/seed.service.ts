import { Injectable } from '@nestjs/common';

import { PokeResponse } from './interfaces/poke-responce.interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/Adapters/Axios.adapter';



@Injectable()
export class SeedService {

 

  constructor(
        @InjectModel(Pokemon.name)
        private readonly pokemonModel: Model<Pokemon>,

        private readonly axios: AxiosAdapter,
  ) {}

  async executeSeed() {

    await this.pokemonModel.deleteMany({});

     const  data  = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=100');

    //  const insertPromises: { name: string, no: number }[] = [];
    const pokemonToInsert: { name: string, no: number }[] = [];

     data.results.forEach(async ({name, url}) => {
      const urlParts = url.split('/').filter(part => part);
      const id = +urlParts[urlParts.length - 1];
        console.log({name, url, id});


      //const pokemon = await this.pokemonModel.create({name, no: id});

      // insertPromises.push(await this.pokemonModel.create({ name, no: id }));
      pokemonToInsert.push({ name, no: id });
     });

     await this.pokemonModel.insertMany(pokemonToInsert);

      // await Promise.all(insertPromises);
    return 'Seed executed';
  }
}
