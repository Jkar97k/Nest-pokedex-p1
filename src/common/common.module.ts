import { Module } from '@nestjs/common';
import { AxiosAdapter } from './Adapters/Axios.adapter';
import e from 'express';
import { EncrypAdapter } from './Adapters/encryp.adapter';
import { ConfigService } from '@nestjs/config';

@Module({
    providers: [
        AxiosAdapter,
        EncrypAdapter,
        ConfigService
    ],
    exports: [
        AxiosAdapter, 
        EncrypAdapter
    ],

})
export class CommonModule {}
