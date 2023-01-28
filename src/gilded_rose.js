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

      // handle aged brie
      if(currentItem.name === 'Aged Brie'){
        this.iterateItemQualityBy(1, currentItem);
        this.clampQuality(currentItem)

        this.decreaeItemSellIn(currentItem)
      }

      //handle backstage pass 
      else if (currentItem.name.includes('Backstage')) {
        this.iterateItemQualityBy(1, currentItem);
        if (currentItem.sellIn < 11) {
          this.iterateItemQualityBy(1, currentItem);
        }
        if (currentItem.sellIn < 6) {
          this.iterateItemQualityBy(1, currentItem);
        }
        if (currentItem.sellIn < 0) {
          currentItem.quality = 0
        }

        this.clampQuality(currentItem)
        this.decreaeItemSellIn(currentItem)
      }

      // handle sulfuras
      else if(currentItem.name === 'Sulfuras, Hand of Ragnaros'){
        currentItem.quality = 80;
        currentItem.sellIn = -1;
      }
       
      //handle conjured items
      else if(currentItem.name.includes("Conjured")){
        if(currentItem.sellIn > 0){
          this.iterateItemQualityBy(-2, currentItem);
        }else{
          this.iterateItemQualityBy(-4, currentItem);
        }

        this.clampQuality(currentItem)
        this.decreaeItemSellIn(currentItem)

      }
      
      //handle normal item quality
      else{
        if(currentItem.sellIn > 0){
          this.iterateItemQualityBy(-1, currentItem);
        }else{
          this.iterateItemQualityBy(-2, currentItem);
        }

        this.clampQuality(currentItem)
        this.decreaeItemSellIn(currentItem)
      }
    }

    return this.items;
  }
  
  iterateItemQualityBy(num, item){
    item.quality += num;
  }

  decreaeItemSellIn(item){
    item.sellIn -= 1;
  }

  clampQuality(item){
    if(item.quality > 50){
      item.quality = 50
    }
    if(item.quality < 0){
      item.quality = 0
    }
  }
}

module.exports = {
  Item,
  Shop
}
