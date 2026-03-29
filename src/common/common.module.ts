import { Module } from '@nestjs/common';
import { AxiosAdapter } from './Adapters/Axios.adapter';

@Module({
    providers: [AxiosAdapter],
    exports: [AxiosAdapter],

})
export class CommonModule {}
