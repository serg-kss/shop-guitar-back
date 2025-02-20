import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { PhotoService } from '../../Services/photo/photo.service';
import { PhotoController } from '../../Controllers/photo/photo.controller';

@Module({
    imports: [ConfigModule],
    controllers: [PhotoController],
    providers: [
        {
            provide: 'FIREBASE_APP',
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const firebaseConfig = {
                    type: configService.get<string>('TYPE'),
                    project_id: configService.get<string>('PROJECT_ID'),
                    private_key_id: configService.get<string>('PRIVATE_KEY_ID'),
                    private_key: configService.get<string>('PRIVATE_KEY').replace(/\\n/g, '\n'), // Replace newline characters
                    client_email: configService.get<string>('CLIENT_EMAIL'),
                    client_id: configService.get<string>('CLIENT_ID'),
                    auth_uri: configService.get<string>('AUTH_URI'),
                    token_uri: configService.get<string>('TOKEN_URI'),
                    auth_provider_x509_cert_url: configService.get<string>('AUTH_CERT_URL'),
                    client_x509_cert_url: configService.get<string>('CLIENT_CERT_URL'),
                    universe_domain: configService.get<string>('UNIVERSAL_DOMAIN'),
                } as admin.ServiceAccount;

                const app = admin.initializeApp({
                    credential: admin.credential.cert(firebaseConfig),
                    databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`,
                    storageBucket: `${firebaseConfig.projectId}.appspot.com`,
                });

                return app;
            },
        },
        {
            provide: 'FIREBASE_BUCKET',
            useFactory: async (app: admin.app.App) => {
                return app.storage().bucket();
            },
            inject: ['FIREBASE_APP'],
        },
        PhotoService,
    ],
    exports: ['FIREBASE_APP', 'FIREBASE_BUCKET'],
})
export class FirebaseModule { }
