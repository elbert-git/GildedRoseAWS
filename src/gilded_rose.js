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
      //handle conjured items
      else if(currentItem.name.includes('Conjured')){
        if(currentItem.sellIn > 0){
          this.iterateItemQualityBy(-2, currentItem);
        }else{
          this.iterateItemQualityBy(-4, currentItem);
        }
        this.clampQuality(currentItem);
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
}

module.exports = {
  Item,
  Shop
}
