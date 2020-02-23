import { Injectable } from '@angular/core';
import { AdherentInterface } from './AdherentInterface';
import { AdherentDAO } from './AdherentDAO';
import { Adherent } from 'src/app/entities/adherent.model';

@Injectable({
  providedIn: 'root'
})
export class AdherentService implements AdherentInterface {

  getAllSponsors() {
    return this.adherentDao.getSponsorsDocuments();
  }

  getAllFacturations() {
    return this.adherentDao.getFacturationsDocuments();
  }

  getAllFacturationsOfAdherent(adherentId: string) {
    return this.adherentDao.getFacturationsDocumentForAdherent(adherentId);
  }
  getAllBeneficiaresOfAdherent(adherentId: string) {
    return this.adherentDao.getBeneficiaresDocumentForAdherent(adherentId);
  }

  getAdherentByPhoneNumber(adherentPhoneNumber: string) {
    return this.adherentDao.getAdherentDocumentByPhoneNumber(adherentPhoneNumber);
  }

  getAllAdherent() {
    return this.adherentDao.getAdherentsDocuments();
  }

  creatAdherent(adherent: Adherent) {
    return this.adherentDao.addAdherentDocument(adherent);
  }

  updateAdherent(adherent: Adherent) {
    return this.adherentDao.updateAdherentDocument(adherent);
  }

  deleteAdherent(adherentPhoneNumber: string) {
    return this.adherentDao.deleteAdherentDocument(adherentPhoneNumber);
  }

  constructor(private adherentDao: AdherentDAO) { }
}
