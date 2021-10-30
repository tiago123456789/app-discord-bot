import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { AuthorizationApiKeyGuard } from './security/authorization_apikey.guard';
import * as session from 'express-session';
import { flash } from 'express-flash-message';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');
  app.use(
    session({
      secret: 'abcabcabcappaplication159847623',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(flash({ sessionKeyName: 'flashMessage' }));
  // Set middleware make variable accessibles in all aplication.
  app.use((request, response, next) => {
    // @ts-ignore
    response.locals.isUserAuthenticated = () => (request.session.user || false);
    next();
  });
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
