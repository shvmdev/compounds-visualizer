import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Compound } from '../model/compound.type';
import { CompoundsService } from '../services/compounds.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-compound-details',
  imports: [CommonModule, FormsModule],
  templateUrl: './compound-details.component.html',
  styleUrl: './compound-details.component.css',
})
export class CompoundDetailsComponent implements OnInit {
  compound = signal<Compound | null>(null);
  compoundService = inject(CompoundsService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  editCompound: Compound = {
    id: 0,
    name: '',
    description: '',
    imageSource: '',
    imageAttribute: '',
    dateModified: new Date(),
  };
  isEditing = false;
  isSaving = false;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const compoundId = params.get('id'); // Get the ID from URL
      if (compoundId) {
        this.loadCompoundDetails(parseInt(compoundId, 10)); // Convert to number and fetch data
      }
    });
  }

  loadCompoundDetails(id: number) {
    this.compoundService.getCompoundById(id).subscribe((compound) => {
      this.compound.set(compound);
      this.editCompound = { ...compound };
      console.log(compound);
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveChanges() {
    if (!this.editCompound.name || !this.editCompound.description) {
      console.error('Name and description are required');
      return;
    }
    if (
      this.editCompound.name === this.compound()?.name &&
      this.editCompound.description === this.compound()?.description &&
      this.editCompound.imageSource === this.compound()?.imageSource
    ) {
      // No changes, exit early
      this.toggleEdit();
      return;
    }

    if (this.compound()) {
      // Set isSaving to true before sending the request
      this.isSaving = true;

      // Send the edited compound to the backend
      this.compoundService
        .updateCompoundById(this.editCompound)
        .pipe(
          catchError((error) => {
            // Handle the error here
            console.error('Error updating compound:', error);
            this.isSaving = false; // Stop saving indicator
            this.toggleEdit(); // Close the edit mode

            // Optionally, show a message or notification to the user
            alert('Failed to update compound. Please try again.');

            // Return an empty observable to prevent further subscription actions
            return of(null);
          })
        )
        .subscribe((response) => {
          if (response) {
            // Update the compound in the UI
            this.compound.set(this.editCompound);
            this.isSaving = false; // Stop saving indicator
            this.toggleEdit(); // Close the edit mode

            // Redirect to the updated compound's page using the new name
            this.router.navigate([
              `/compound/${this.editCompound.name}/${this.editCompound.id}`,
            ]);
          }
        });
    }
    // if (this.compound()) {
    //   // Send the edited compound to the backend
    //   this.compoundService
    //     .updateCompoundById(this.editCompound)
    //     .subscribe((response) => {
    //       this.compound.set(this.editCompound);
    //       this.isSaving = false; //
    //       this.toggleEdit();

    //       // Redirect to the updated compound's page using the new name
    //       this.router.navigate([
    //         `/compound/${this.editCompound.name}/${this.editCompound.name}`,
    //       ]);
    //     });
    // }
    // this.compoundService.updateCompoundById(this.editCompound).subscribe({
    //   next: (updatedCompound) => {
    //     this.compound.set(updatedCompound); // Update compound data with the saved compound
    //     this.isSaving = false; // Set saving flag to false
    //     this.toggleEdit(); // Toggle back to view mode
    //     // Redirect to the updated compound's route after saving
    //     this.router.navigate([`/compound-details/${updatedCompound.id}`]);
    //   },
    //   error: (error) => {
    //     console.error('Save error:', error); // Log the error for debugging
    //     this.isSaving = false; // Stop loading spinner if there was an error
    //   },
    // });
  }

  get compoundData(): Compound | null {
    return this.compound();
  }
}
