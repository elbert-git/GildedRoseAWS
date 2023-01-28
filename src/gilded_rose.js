class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const currentItem = this.items[i]


      if (currentItem.name != 'Aged Brie' && currentItem.name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (currentItem.quality > 0) {
          if (currentItem.name != 'Sulfuras, Hand of Ragnaros') {
            currentItem.quality = currentItem.quality - 1;
          }
        }
      } else {
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
      }
      if (currentItem.name != 'Sulfuras, Hand of Ragnaros') {
        currentItem.sellIn = currentItem.sellIn - 1;
      }
      if (currentItem.sellIn < 0) {
        if (currentItem.name != 'Aged Brie') {
          if (currentItem.name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (currentItem.quality > 0) {
              if (currentItem.name != 'Sulfuras, Hand of Ragnaros') {
                currentItem.quality = currentItem.quality - 1;
              }
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

      // handle sulfuras
      if(currentItem.name === 'Sulfuras, Hand of Ragnaros'){
        currentItem.quality = 80;
        currentItem.sellIn = -1;
      }
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
