import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ transports: ['websocket'] })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(AppGateway.name);

  // constructor(private authService: AuthService) {}

  afterInit() {
    this.logger.log('Gateway initialized');
  }

  async handleConnection() {
    try {
      // await this.authService.getUserFromSocket(socket);
    } catch (error) {
      // socket.emit('exception', error.message);
      // socket.disconnect(true);
    }
  }

  handleDisconnect(client: any) {
    this.logger.debug('Disconnect ::HYACHIPIZ::', client.id);
  }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() body: any) {
    this.server.emit('message', body);
  }
}
