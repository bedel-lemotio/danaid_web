import { Component, OnInit } from '@angular/core';
import { Adherent } from 'src/app/entities/adherent.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AdherentService } from 'src/app/services/adherent/adherent.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail-adherent',
  templateUrl: './detail-adherent.component.html',
  styleUrls: ['./detail-adherent.component.scss']
})
export class DetailAdherentComponent implements OnInit {
  adherent: Adherent = new Adherent();
  //facturationList: Facturation[] = [];
  //beneficiaireList: Beneficiaire[] = [];

  defaulImage = 'https://firebasestorage.googleapis.com/v0/b/danaidapp.appspot.com/o/user-profil.png?alt=media&token=10fc4c1d-7f22-48b8-897d-e5a973721628';
  noImageDoc = 'https://firebasestorage.googleapis.com/v0/b/danaidapp.appspot.com/o/images-help.png?alt=media&token=059c1b9e-5a4c-4fd7-afa3-8c040de9f401'

  profileOption = 'profile';
  beneficiaireOption = 'beneficiaire';
  facturationOption = 'facturation';
  option = '';

  profileForm: FormGroup
  toasTime = 3000

  constructor(
    private route: ActivatedRoute,
    private adherentService: AdherentService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.initData();
  }


  // affichage des infos
  initData() {
    this.route.paramMap.subscribe(params => {
      this.adherentService.getAdherentByPhoneNumber(params.get('adherent_id')).subscribe(data => {
        this.adherent = data.data() as Adherent
        this.route.paramMap.subscribe(params => {
          this.updateUI(params.get('option'));
        });
      });
    });
  }

  getDateValid(data: any): any {
    if (data !== null) {
      return new Date((data.seconds) * 1000);
    }
    return '';
  }

  updateUI(option: string) {
    this.option = option;
    if (this.option === this.profileOption) {
      this.profileForm = new FormGroup({
        nomFamille: new FormControl(this.adherent.nomFamille),
        prenom: new FormControl(this.adherent.prenom),
        adresse: new FormControl(this.adherent.adresse),
        emailAdress: new FormControl(this.adherent.emailAdress),
        regionDorigione: new FormControl(this.adherent.regionDorigione),
        profession: new FormControl(this.adherent.profession),
        ville: new FormControl(this.adherent.ville),
        genre: new FormControl(this.adherent.genre),
        nombreEnfant: new FormControl(this.adherent.nombreEnfant),
        profil: new FormControl(this.adherent.profil),
        statuMatrimonialMarie: new FormControl(this.adherent.statuMatrimonialMarie),
        protectionLevel: new FormControl(this.adherent.protectionLevel),
        createdDate: new FormControl(this.getDateValid(this.adherent.createdDate)),
        dateNaissance: new FormControl(this.getDateValid(this.adherent.dateNaissance)),
        datFinvalidite: new FormControl(this.getDateValid(this.adherent.datFinvalidite))
      });
    }
  }

  convertDate(dateDate: any): Date {
    if (dateDate._d !== undefined) {
      return dateDate._d
    }
    return dateDate
  }

  getBoolean(data: any): boolean {
    if (('' + data) === 'true') {
      return true
    }
    return false
  }

  saveUpdate() {
    const aderent = this.adherent

    //date properties
    aderent.datFinvalidite = this.convertDate(this.profileForm.get('datFinvalidite').value)
    aderent.dateNaissance = this.convertDate(this.profileForm.get('dateNaissance').value)
    aderent.createdDate = this.convertDate(this.profileForm.get('createdDate').value)

    //boolean properties
    aderent.statuMatrimonialMarie = this.getBoolean(this.profileForm.get('statuMatrimonialMarie').value)



    aderent.protectionLevel = this.profileForm.get('protectionLevel').value
    aderent.profil = this.profileForm.get('profil').value
    aderent.nombreEnfant = this.profileForm.get('nombreEnfant').value
    aderent.genre = this.profileForm.get('genre').value
    aderent.ville = this.profileForm.get('ville').value
    aderent.profession = this.profileForm.get('profession').value
    aderent.regionDorigione = this.profileForm.get('regionDorigione').value
    aderent.emailAdress = this.profileForm.get('emailAdress').value
    aderent.adresse = this.profileForm.get('adresse').value
    aderent.prenom = this.profileForm.get('prenom').value
    aderent.nomFamille = this.profileForm.get('nomFamille').value

    this.updateAdherent(aderent)

  }

  get datFinvalidite() {
    return this.profileForm.get('datFinvalidite');
  }
  get dateNaissance() {
    return this.profileForm.get('dateNaissance');
  }
  get createdDate() {
    return this.profileForm.get('createdDate');
  }
  get protectionLevel() {
    return this.profileForm.get('protectionLevel');
  }
  get statuMatrimonialMarie() {
    return this.profileForm.get('statuMatrimonialMarie');
  }
  get profil() {
    return this.profileForm.get('profil');
  }
  get nombreEnfant() {
    return this.profileForm.get('nombreEnfant');
  }
  get genre() {
    return this.profileForm.get('genre');
  }
  get ville() {
    return this.profileForm.get('ville');
  }
  get profession() {
    return this.profileForm.get('profession');
  }
  get regionDorigione() {
    return this.profileForm.get('regionDorigione');
  }
  get emailAdress() {
    return this.profileForm.get('emailAdress');
  }
  get adresse() {
    return this.profileForm.get('adresse');
  }
  get prenom() {
    return this.profileForm.get('prenom');
  }
  get nomFamille() {
    return this.profileForm.get('nomFamille');
  }

  generateDescription(): string {
    return 'Description de ' + this.adherent.nomFamille
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

  // modification d'un adherent
  updateAdherent(adherent: Adherent) {
    this.adherentService.updateAdherent(adherent)
      .then(success => {
        this.toastr.success('Modification effectuée avec succes', 'Success', {
          timeOut: this.toasTime
        });
        this.router.navigate(['/dashboad', 3]);
      })
      .catch(success => {
        this.toastr.error('Erreur de modification', 'Error', {
          timeOut: this.toasTime
        });
      });
  }


  // modification d'un adherent
  formatDate(sec: number): string {
    const date = new Date(sec * 1000);
    const dateStr = '' + date.getUTCDay() + '-' + date.getUTCMonth() + '-' + date.getUTCFullYear()
    return dateStr;
  }

  // fonction permettant de changer llelement actif de la dashboard
  setStyle(option: string): string {
    if (option === this.option) {
      return 'nav-item active ';
    } else {
      return 'nav-item ';
    }
  }

}
