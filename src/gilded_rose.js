//feature toggle
const revertBackToOld = false;

class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    if(revertBackToOld){
      return new OldShop(items)
    }
    this.items = items;
  }
  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const currentItem = this.items[i];

      //handle sulfuras
      if (currentItem.name === 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn = -1;
        this.items[i].quality = 80;
      }else{
        if(currentItem.name === 'Aged Brie' || currentItem.name === 'Backstage passes to a TAFKAL80ETC concert'){
          if (currentItem.quality < 50) {
            currentItem.quality = currentItem.quality + 1;
            if (currentItem.name == 'Backstage passes to a TAFKAL80ETC concert') {
              if (currentItem.sellIn < 11) {
                if (currentItem.quality < 50) {
                  currentItem.quality = currentItem.quality + 1;
                }
              }
              if (currentItem.sellIn < 6) {
                if (currentItem.quality < 50) {
                  currentItem.quality = currentItem.quality + 1;
                }
              }
            }
          }
      }else{
          if (currentItem.quality > 0) {
            currentItem.quality = currentItem.quality - 1;
          }
        }
        currentItem.sellIn = currentItem.sellIn - 1;
        if (currentItem.sellIn < 0) {
          if (currentItem.name != 'Aged Brie') {
            if (currentItem.name != 'Backstage passes to a TAFKAL80ETC concert') {
              if (currentItem.quality > 0) {
                currentItem.quality = currentItem.quality - 1;
              }
            } else {
              currentItem.quality = currentItem.quality - currentItem.quality;
            }
          } else {
            if (currentItem.quality < 50) {
              currentItem.quality = currentItem.quality + 1;
            }
          }
        }
      }
    }

    return this.items;
  }
}
 
class OldShop{
   constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
          if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != 'Aged Brie') {
          if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
