import { Component, OnInit } from '@angular/core';
import { SignLibModule } from '@qbs-origin/sign-lib';
import { TokenService } from './services/token.service';
import { environment } from '../environments/environment';

interface SignConfig {
  AppDataId: string;
  PhoneNumber: string;
  StepId: string;
  Token: string;
  BaseUrl: string;
  SignMode: string | null;
  ShowConfirm?: boolean | null;
  SignQualified?: boolean | null;
  AutoSign: boolean;
  Labels?: Record<string, string>;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SignLibModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  signConfig: SignConfig | undefined;

  constructor(private tokenService: TokenService) {}

  ngOnInit(): void {
    this.tokenService.getToken().subscribe({
      next: (token) => this.initConfig(token),
      error: (err) => console.error('Failed to fetch token:', err),
    });
  }

  private initConfig(token: string): void {
    const params = new URLSearchParams(window.location.search);

    this.signConfig = {
      AppDataId: params.get('AppDataId') ?? '',
      PhoneNumber: params.get('PhoneNumber') ?? '',
      StepId: '',
      Token: token,
      BaseUrl: environment.signBaseUrl,
      SignMode: 'both',
      ShowConfirm: false,
      SignQualified: true,
      AutoSign: false,
      Labels: {
        agreement:
          'Imi exprim acordul cu informarea precontractuala si solicit semnarea documentelor.',
        checkCode: 'Verificare cod',
        confirm: 'Confirm',
        documentOf: 'Documentul {0} din {1}',
        insertCode: 'Introduceti codul:',
        noSignedDocs: 'Nu exista documente de semnat.',
        phoneNumber: 'Numar de telefon:',
        sendCode: 'Trimitere cod',
        sign: 'Vreau sa semnez',
        signDocuments: 'Semneaza documentele',
        invalidCode: 'Cod OTP invalid',
        success: 'Documentele au fost semnate',
        signingDocuments: 'Se semneaza documentele',
        retry: 'Reincearca',
        documentIsSigned: 'Documentul este semnat',
        signDocument: 'Semneaza documentul',
        invalidPhoneNumber: 'Numar telefon invalid',
        signing: 'Se semneaza',
        sending: 'Se trimite',
      },
    };
  }

  onSignEvent(event: any): void {
    console.log('EVENT:', event);
  }
}
