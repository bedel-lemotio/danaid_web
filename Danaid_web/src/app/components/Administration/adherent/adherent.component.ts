import { Component, OnInit, ViewChild } from '@angular/core';
import { AdherentService } from 'src/app/services/adherent/adherent.service';
import { Adherent } from 'src/app/entities/adherent.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbTableDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-adherent',
  templateUrl: './adherent.component.html',
  styleUrls: ['./adherent.component.scss']
})
export class AdherentComponent implements OnInit {

  adherentList: Adherent[] = [];

  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  searchText: string = '';
  previous: string;

  profileOption = 'profile';
  beneficiaireOption = 'beneficiaire'
  facturationOption = 'facturation';
  headElements = ['No', 'Matricule', 'Nom', 'Commune', 'Adresse', 'Telephone principal', 'Operations'];

  defaulImage = 'https://firebasestorage.googleapis.com/v0/b/danaidapp.appspot.com/o/user-profil.png?alt=media&token=10fc4c1d-7f22-48b8-897d-e5a973721628';
  constructor(private adherentService: AdherentService, private router: Router) { }
  validatingForm: FormGroup;
  ngOnInit() {
    this.validatingForm = new FormGroup({
      loginFormModalEmail: new FormControl('', Validators.email),
      loginFormModalPassword: new FormControl('', Validators.required)
    });
    this.loadData();
  }

  get loginFormModalEmail() {
    return this.validatingForm.get('loginFormModalEmail');
  }

  get loginFormModalPassword() {
    return this.validatingForm.get('loginFormModalPassword');
  }

  // chargement des donnees
  loadData() {
    this.adherentList = [];
    this.adherentService.getAllAdherent().subscribe(data => {
      this.adherentList = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Adherent)
        }
      });
    });
  }

  // enable/desable adherent
  enableOrdisacleAdherent(adherent: Adherent, operation: number) {
    if (operation === 1) {
      adherent.profilEnabled = true;
    } else {
      adherent.profilEnabled = false;
    }
    this.updateAdherent(adherent);
  }

  // creation d'un adherent
  createNewAdherent(adherent: Adherent) {
    this.adherentService.creatAdherent(adherent);
  }

  // modification d'un adherent
  updateAdherent(adherent: Adherent) {
    this.adherentService.updateAdherent(adherent);
  }

  // suppression d'un adherent
  deleteAdherent(adherent: Adherent) {
    //this.adherentService.deleteAdherent('' + adherent.id);
  }

  // a supprimer
  testCreateAdherent() {
    const ran = Math.random() * 10000;
    const aderent = new Adherent();
    aderent.adresse = 'adress' + ran;
    aderent.createdDate = new Date(Date.now());
    aderent.dateNaissance = new Date(Date.now());
    aderent.emailAdress = 'email' + ran;
    aderent.imageUrl = 'imageURL' + ran;
    aderent.isRecptionPaiementMobile = true;
    aderent.nombreEnfant = 0;
    aderent.profession = 'profession' + ran;
    aderent.profil = 'profile' + ran;
    aderent.profilEnabled = false;
    aderent.protectionLevel = 1;
    aderent.statuMatrimonialMarie = false;
    aderent.urlDocOficiel = 'urlDoc' + ran;
    aderent.nomFamille = 'a' + ran;
    aderent.id = '' + ran;

    // phone number
    aderent.phoneList = [{
      number: ran,
      operator: 'ORANGE',
      receptionPayement: true
    }];
    // [1, 2, 3, 4, 5, 6, 7, 8].forEach(element => {
    //  this.adherentList.push(aderent);
    // });
    this.createNewAdherent(aderent);
  }

  /* //afficher les beneficiaires d'un adherent
  afficherBeneficiaires(adherent: Adherent) {
    this.router.navigate(['/beneficiaire?adherent_id=' + adherent.id]);
  }

  //afficher les facturations d'un adherent
  afficherFacturations(adherent: Adherent) {

  }

  //afficher les info d'un adherent
  afficherInfos(adherent: Adherent) {

  } */

}
