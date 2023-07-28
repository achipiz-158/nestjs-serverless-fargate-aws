import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import config from 'src/config';
import { ConfigType } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { MetadataService } from 'src/complementary/services/metadata.service';

@Injectable()
export class EpaycoService {
  constructor(
    private readonly http: HttpService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    private readonly metadataService: MetadataService,
  ) {}

  @Cron(CronExpression.EVERY_30_MINUTES)
  async updateTokenEpayco() {
    const response = await firstValueFrom(
      this.http.post(
        '/login',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${Buffer.from(
              `${this.configService.epayco.publicKey}:${this.configService.epayco.privateKey}`,
            ).toString('base64')}`,
          },
        },
      ),
    );
    await this.metadataService.updateTokenEpayco(response.data.token);
  }
}
