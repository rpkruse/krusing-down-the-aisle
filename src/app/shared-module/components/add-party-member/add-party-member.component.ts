import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PartyMember, PlusOne, Food } from '../../models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-party-member',
  templateUrl: './add-party-member.component.html',
  styleUrls: ['./add-party-member.component.scss']
})
export class AddPartyMemberComponent implements OnInit {
  @Input() foods: Food[];
  @Input() partyMembers: PartyMember[];
  @Output() sendPartyMembers: EventEmitter<PartyMember[]> = new EventEmitter<PartyMember[]>();

  // partyMembers: PartyMember[] = [];
  plusOnePayload: PlusOne;
  canAdd: boolean = false;

  selectedPmIndex: number = -1;

  constructor(private modal: NgbModal) { }

  ngOnInit() {
    // this.partyMembers = [];
    this.plusOnePayload = this.createEmptyPlusOne();
  }

  addPartyMember(): void {
    const pm: PartyMember = {
      allergy: this.plusOnePayload.allergy,
      firstName: this.plusOnePayload.firstName,
      food: this.plusOnePayload.food,
      foodId: this.plusOnePayload.foodId,
      hasAllergy: this.plusOnePayload.hasAllergy,
      id: this.plusOnePayload.id,
      lastName: this.plusOnePayload.lastName,
      person: this.plusOnePayload.person,
      personId: this.plusOnePayload.personId
    };

    if (this.selectedPmIndex < 0) {
      this.partyMembers.push(pm);
    } else {
      this.partyMembers[this.selectedPmIndex] = pm;
    }

    this.plusOnePayload = this.createEmptyPlusOne();
    this.sendPartyMembers.emit(this.partyMembers);
  }

  deletePartyMember(index: number): void {
    this.partyMembers.splice(index, 1);
    this.sendPartyMembers.emit(this.partyMembers);
    // this.partyMembers.splice(this.selectedPmIndex, 1);
    // this.addNewPartyMemberListButtonSelected();
    // this.sendPartyMembers.emit(this.partyMembers);
  }

  addNewPartyMemberListButtonSelected(): void {
    this.plusOnePayload = this.createEmptyPlusOne();
    this.selectedPmIndex = -1;
  }

  currentPartyMemberClicked(index: number, modal): void {
    this.selectedPmIndex = index;
    this.plusOnePayload = {
      allergy: this.partyMembers[index].allergy,
      firstName: this.partyMembers[index].firstName,
      food: this.partyMembers[index].food,
      foodId: this.partyMembers[index].foodId,
      hasAllergy: this.partyMembers[index].hasAllergy,
      id: this.partyMembers[index].id,
      lastName: this.partyMembers[index].lastName,
      person: this.partyMembers[index].person,
      personId: this.partyMembers[index].personId
    };

    this.openNewPersonModal(modal);
  }

  handlePlusOneOutput(plusOne: PlusOne): void {
    if (plusOne === undefined || plusOne === null)
      return;

    this.plusOnePayload = plusOne;
    this.canAdd = true;
  }

  changePlusOneFoodSelection(foodIndex: string): void {
    this.plusOnePayload.foodId = this.foods[foodIndex].id;
    this.plusOnePayload.food = this.foods[foodIndex];
  }

  openNewPersonModal(modal): void {
    this.modal.open(modal, { windowClass: 'xl-modal', centered: true}).result.then(
      (save) => {
        this.addPartyMember();
      }, (dismiss) => {

      });
  }

  get modalHeader(): string {
    if (this.selectedPmIndex >= 0)
      return 'Edit Party Member';

    return 'Add Party Member';
  }

  private createEmptyPlusOne(): PlusOne {
    this.canAdd = false;

    return {
      allergy: '',
      firstName: '',
      food: this.foods[0],
      foodId: 1,
      hasAllergy: false,
      id: 0,
      lastName: '',
      person: null,
      personId: 0
    };
  }

}
