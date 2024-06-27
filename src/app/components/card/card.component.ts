import { Component, Inject, OnInit, OnDestroy, PLATFORM_ID, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnDestroy {
  cards: { id: number, title: string, paragraph: string ,position: string}[] = [];
  isCustomizing: boolean = false;
  private readonly STORAGE_KEY = 'card_positions';

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private route: Router
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadCards();
    } else {
      console.warn('localStorage is not available in this environment.');
    }
  }

  ngOnDestroy() {
    // Optionally handle cleanup or saving state on component destruction
  }

  toggleCustomize() {
    this.isCustomizing = !this.isCustomizing;
  }

  loadCards() {
    const currentId = parseInt(localStorage.getItem('currentId') || '0', 10);

    for (let id = 1; id <= currentId; id++) {
      const formData = localStorage.getItem(`formData_${id}`);
      if (formData) {
        try {
          const card = JSON.parse(formData);
          if (card && card.title && card.paragraph) {
            this.cards.push({ id, ...card });
          }
        } catch (e) {
          console.error(`Error parsing JSON for formData_${id}:`, e);
        }
      }
    }

    // Load card positions from localStorage
    const storedPositions = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    if (storedPositions.length === this.cards.length) {
      // Apply stored positions to cards
      this.cards = this.cards.map((card, index) => ({
        ...card,
        position: storedPositions[index] // Assign stored position to each card
      }));
    }
  }

  saveCardPositions() {
    const positions = this.cards.map(card => card.position);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(positions));
  }

  editCard(cardId: number) {
    this.route.navigate(['/new-card', cardId]);
  }

  colors = ['#FFD700', '#ADFF2F', '#FF69B4', '#87CEEB', '#FF6347'];

  getColor(index: number): string {
    return this.colors[index % this.colors.length];
  }
  resizingCardIndex: number | null = null;
  startX: number = 0;
  startY: number = 0;
  startWidth: number = 0;
  startHeight: number = 0;
  isResizing = false;
  
  onResizeStart(event: MouseEvent, index: number): void {
    this.resizingCardIndex = index;
    this.isResizing = true;
    const cardElement = document.getElementsByClassName('card')[index] as HTMLElement;
    this.startX = event.clientX;
    this.startY = event.clientY;
    this.startWidth = cardElement.offsetWidth;
    this.startHeight = cardElement.offsetHeight;
    event.preventDefault();
    console.log(this.isResizing)
  }

  @HostListener('document:mousemove', ['$event'])
  onResize(event: MouseEvent): void {
    if (this.isResizing && this.resizingCardIndex !== null) {
      const cardElement = document.getElementsByClassName('card')[this.resizingCardIndex] as HTMLElement;
      const newWidth = this.startWidth + (event.clientX - this.startX);
      const newHeight = this.startHeight + (event.clientY - this.startY);
      cardElement.style.width = `${newWidth}px`;
      cardElement.style.height = `${newHeight}px`;
      console.log(this.isResizing)
    }
  }

  @HostListener('document:mouseup')
  onResizeEnd(): void {
    this.isResizing = false;
    this.resizingCardIndex = null;
    console.log(this.isResizing);
  }


}

