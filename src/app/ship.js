export class Ship {
  constructor(length, x, y, vertical = false) {
    this.length = length;
    this.hits = Array(length).fill(false);
    this.vertical = vertical;
    this.x = x;
    this.y = y;
    this.endX = (vertical) ? x : x + length - 1;
    this.endY = (vertical) ? y + length - 1 : y;
  }

  hit(index) {
    this.hits[index] = true;
  }

  isSunk() {
    return this.hits.every(cell => cell === true);
  }

  hasCell(x, y, around) {
    if (around) {
      return (this.x - 1 <= x) && (x <= this.endX + 1) && (this.y - 1 <= y) && (y <= this.endY + 1);
    } else {
      return (this.x <= x) && (x <= this.endX) && (this.y <= y) && (y <= this.endY);
    }
  }
}