import { Component, OnInit, inject, signal } from '@angular/core';
import { CompoundItemComponent } from '../components/compound-item/compound-item.component';
import { CompoundsService } from '../services/compounds.service';
import { Compound } from '../model/compound.type';
import { catchError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compounds',
  imports: [CommonModule, CompoundItemComponent],
  templateUrl: './compounds.component.html',
  styleUrl: './compounds.component.css',
})
export class CompoundsComponent implements OnInit {
  compoundService = inject(CompoundsService);
  router = inject(Router);
  compoundItems = signal<Array<Compound>>([]);
  page = signal(1); // Signal for current page
  totalPages = signal(3); // Max limit of 3 pages

  ngOnInit(): void {
    this.fetchCompounds();
  }

  fetchCompounds() {
    this.compoundService
      .getCompoundsFromApi(this.page())
      .pipe(
        catchError((err) => {
          console.log(err);
          throw err;
        })
      )
      .subscribe((compounds) => {
        this.compoundItems.set(compounds);
      });
  }

  viewDetails(compound: Compound) {
    this.router.navigate(['/compound', compound.name, compound.id]); // Navigate with `name`
  }

  nextPage() {
    if (this.page() < this.totalPages()) {
      this.page.update((p) => p + 1); // Increment page
      this.fetchCompounds();
    }
  }

  prevPage() {
    if (this.page() > 1) {
      this.page.update((p) => p - 1); // Decrement page
      this.fetchCompounds();
    }
  }
}
