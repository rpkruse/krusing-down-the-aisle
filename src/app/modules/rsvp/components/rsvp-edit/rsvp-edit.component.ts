import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Food, Person, PlusOne, PartyMember } from 'src/app/shared-module/models';
import { SharedDataService, RsvpService } from '../../services';
import { Subscription, Observable } from 'rxjs';
import { ToasterService } from 'src/app/core-module/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RsvpEditHandler } from './rsvp-edit.handler';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';

@Component({
  selector: 'app-rsvp-edit',
  templateUrl: './rsvp-edit.component.html',
  styleUrls: ['./rsvp-edit.component.scss']
})
export class RsvpEditComponent implements OnInit, OnDestroy {
  @Input() foods: Food[];

  private sharedDataSub: Subscription;
  private rsvpHandler: RsvpEditHandler;

  person: Person;
  plusOne: PlusOne;
  selectedPartyMember: PartyMember;

  canSavePlusOneChanges = false;

  constructor(private rsvpService: RsvpService, private sharedDataService: SharedDataService,
              private toasterService: ToasterService, private modal: NgbModal, private confirmService: ConfirmationService) { }

  ngOnInit() {
    this.sharedDataSub = this.sharedDataService.person.subscribe(res => this.setPerson(res));
    this.rsvpHandler = new RsvpEditHandler(this.rsvpService, this.sharedDataService, this.toasterService, this.confirmService);
  }

  openEditPersonFood(modal): void {
    this.modal.open(modal, { windowClass: 'xl-modal', centered: true}).result.then(
    (save) => {
      this.rsvpHandler.savePersonChanges(this.person);
    }, (dismiss) => {
      this.setPerson(this.sharedDataService.person.getValue());
    });
  }

  openEditPartyMemberFood(modal, pmIndex: number): void {
    this.selectedPartyMember = this.person.partyMembers[pmIndex];
    this.modal.open(modal, { windowClass: 'xl-modal', centered: true}).result.then(
      (save) => {
        this.rsvpHandler.savePartyMemberChanges(this.person.partyMembers[pmIndex]);
        this.selectedPartyMember = null;
      }, (dismiss) => {
        this.setPerson(this.sharedDataService.person.getValue());
        this.selectedPartyMember = null;
      });
  }

  openCreatePlusOneModal(modal): void {
    this.createEmptyPlusOne();
    this.modal.open(modal, { windowClass: 'xl-modal', centered: true}).result.then(
      (save) => {
        this.rsvpHandler.addPlusOne(this.person, this.plusOne);
      }, (dismiss) => {
        this.person.plusOne = null;
      });
  }

  openEditPlusOneModal(modal): void {
    this.plusOne = { ...this.person.plusOne };
    this.modal.open(modal, { windowClass: 'xl-modal', centered: true}).result.then(
      (save) => {
        this.rsvpHandler.savePlusOneChanges(this.person, this.plusOne);
      }, (dismiss) => {
        this.plusOne = null;
    });
  }

  deletePlusOne(): void {
    this.rsvpHandler.deletePlusOne(this.person);
  }

  handlePlusOneOutput(plusOne: PlusOne) {
    if (!plusOne) {
      this.canSavePlusOneChanges = false;
      return;
    }

    this.canSavePlusOneChanges = true;
    this.plusOne = plusOne;
  }

  changeFoodSelection(foodIndex: number): void {
    this.person.foodId = this.foods[foodIndex].id;
    this.person.food = this.foods[foodIndex];
  }

  public changePlusOneFoodSelection(foodIndex: number): void {
    this.plusOne.foodId = this.foods[foodIndex].id;
    this.plusOne.food = this.foods[foodIndex];
  }

  public changePartyMemberFoodSelection(foodIndex: number): void {
    this.selectedPartyMember.foodId = this.foods[foodIndex].id;
    this.selectedPartyMember.food = this.foods[foodIndex];
  }

  closeEditPage(): void {
    this.sharedDataService.changePerson(null);
  }

  private setPerson(person: Person): void {
    this.person = { ...person };
  }

  private createEmptyPlusOne(): void {
    this.plusOne = {
      id: 0,
      firstName: '',
      lastName: '',
      foodId: 1,
      food: this.foods[0],
      allergy: '',
      hasAllergy: false,
      personId: this.person.id,
      person: this.person
    };
  }

  ngOnDestroy() {
    this.sharedDataService.clearData();
    this.sharedDataSub.unsubscribe();
  }

}
