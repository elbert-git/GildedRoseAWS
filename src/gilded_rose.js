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

      //process itesm
      if(currentItem.name === 'Sulfuras, Hand of Ragnaros'){
        //make sure sulfuras quality=80 and sellIn = -1
        currentItem.quality = 80;
        currentItem.sellIn = -1;
      }
      //handle aged brie
      else if(currentItem.name === 'Aged Brie'){
        this.iterateItemQualityBy(1, currentItem);
        this.clampQuality(currentItem)
        this.decreaseSellIn(currentItem);
      }
      //handle backstage passes
      else if(currentItem.name.includes('Backstage')){
        //handle quality
        if(currentItem.sellIn >= 11){
          this.iterateItemQualityBy(1, currentItem);
        }else if(currentItem.sellIn <= 10 && currentItem.sellIn >= 6){
          this.iterateItemQualityBy(2, currentItem);
        }else if(currentItem.sellIn <= 5 && currentItem.sellIn >= 1){
          this.iterateItemQualityBy(3, currentItem);
        }else{
          currentItem.quality = 0
        }

        this.clampQuality(currentItem);

        //handle sellIn
        this.decreaseSellIn(currentItem);
      }
      //handle normal item
      else{
        if(currentItem.sellIn > 0){
          this.iterateItemQualityBy(-1, currentItem);
        }else{
          this.iterateItemQualityBy(-2, currentItem);
        }
        this.clampQuality(currentItem);
        this.decreaseSellIn(currentItem);
      }
    }
    return this.items;
  }
   
  clampQuality(item){
    if(item.quality > 50){
      item.quality = 50
    }
    if(item.quality < 0){
      item.quality = 0
    }
  }
   
  iterateItemQualityBy(num, item){
    item.quality += num
  }

  decreaseSellIn(item){
    item.sellIn -= 1;
  }
   
  oldUpdateItem(i){
       const currentItem = this.items[i];

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
       
      //handle sulfuras
      if (currentItem.name === 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn = -1;
        this.items[i].quality = 80;
      }
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
