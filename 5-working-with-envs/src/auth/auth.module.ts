import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import authConfig from './config/auth.config';
import { UsersModule } from 'src/users/users.module';
import { Logger } from '@nestjs/common'; // Import Logger

@Module({
  providers: [
    AuthService,
    Logger, // Add Logger as a provider explicitly
  ],
  controllers: [AuthController],
  exports: [AuthService],
  imports: [
    ConfigModule.forFeature(authConfig), // Partial registration of config
    forwardRef(() => UsersModule), // Forward reference for circular dependencies
  ],
})
export class AuthModule {}
