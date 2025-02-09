import { Component, input, output, signal } from '@angular/core';
import { Compound } from '../../model/compound.type';

@Component({
  selector: 'app-compound-item',
  imports: [],
  templateUrl: './compound-item.component.html',
  styleUrl: './compound-item.component.css',
})
export class CompoundItemComponent {
  compound = input.required<Compound>();
  showFullDescription = signal(false);
  viewDetails = output<Compound>();

  get trimmedDescription(): string {
    const words = this.compound().description.split(' ');
    return words.length > 20
      ? words.slice(0, 20).join(' ') + '...'
      : this.compound().description;
  }

  toggleDescription(event: Event) {
    event.stopPropagation();
    this.showFullDescription.update((v) => !v);
  }

  onCardClick() {
    this.viewDetails.emit(this.compound()); // Emit event with compound name
  }
}
