const {Shop, Item} = require("../src/gilded_rose");

function passTheDay(shop, days){
  for(let index = 0; index < days; index++) {
    shop.updateQuality();
  }
}

describe('Testing normal items',()=>{
  //setup shop and item
  let items;
  let gildedRose;
  beforeEach(()=>{
    items = [
      new Item("Item", 5, 10),
    ]
    gildedRose = new Shop(items);
  })

  it('Should add items in correctly', ()=>{
    let pass = true
    for (let index = 0; index < gildedRose.items.length; index++) {
      if(gildedRose.items[index] !== items[index]){
        pass = false
      }
    }
    expect(pass).toEqual(true);
  })
  it('Items should decrease in quality', ()=>{
    passTheDay(gildedRose, 3)
    expect(gildedRose.items[0].quality).toEqual(7)
  });
  it('Items sellIn days should decrease', ()=>{
    passTheDay(gildedRose, 3)
    expect(gildedRose.items[0].sellIn).toEqual(2)
  });
  it('Past the sell date items depreciate twice as fast', ()=>{
    passTheDay(gildedRose, 7)
    expect(gildedRose.items[0].quality).toEqual(1)
  });
  it('Item quality are clamped at 0', ()=>{
    passTheDay(gildedRose, 100)
    expect(gildedRose.items[0].quality).toEqual(0)
  });
})
 
describe('Testing aged brie', ()=>{
  //setup shop and item
  let items;
  let gildedRose;
  beforeEach(()=>{
    items = [
      new Item("Aged Brie", 10, 0),
    ]
    gildedRose = new Shop(items);
  })

  it('Aged brie increase quality as days go by', ()=>{
    passTheDay(gildedRose, 10);
    expect(gildedRose.items[0].quality).toEqual(10)
  });
  it('Aged brie sellIn number goes down as days go by', ()=>{
    passTheDay(gildedRose, 10);
    expect(gildedRose.items[0].sellIn).toEqual(0)
  });
  it('Aged brie quality is capped at 50', ()=>{
    passTheDay(gildedRose, 100);
    expect(gildedRose.items[0].quality).toEqual(50)
  });
})

describe('Testing sulfuras', ()=>{
  //setup shop and item
  let items;
  let gildedRose;
  beforeEach(()=>{
    items = [
      new Item("Sulfuras, Hand of Ragnaros", 0, 880),
    ]
    gildedRose = new Shop(items);
  })

  it('Sulfuras quality is always 80', ()=>{
    passTheDay(gildedRose, 10);
    expect(gildedRose.items[0].quality).toEqual(80)
  });
  it('Sulfuras quality is always -1', ()=>{
    passTheDay(gildedRose, 10);
    expect(gildedRose.items[0].sellIn).toEqual(-1)
  });
})

describe('Testing backstage concert', ()=>{
  //setup shop and item
  let items;
  let gildedRose;
  beforeEach(()=>{
    items = [
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
    ]
    gildedRose = new Shop(items);
  })

  it('Quality increases by 1 as days go by', ()=>{
    passTheDay(gildedRose, 5);
    expect(gildedRose.items[0].quality).toEqual(25)
  });
  it('Quality increases by 2 when <11 days to sell date', ()=>{
    passTheDay(gildedRose, 7);
    expect(gildedRose.items[0].quality).toEqual(29)
  });
  it('Quality increases by 3 when <6 days to sell date', ()=>{
    passTheDay(gildedRose, 14);
    expect(gildedRose.items[0].quality).toEqual(47)
  });
  it('Past the selling date, the quality is zero', ()=>{
    passTheDay(gildedRose, 140);
    expect(gildedRose.items[0].quality).toEqual(0)
  });
})

describe('Testing conjured items', ()=>{
  //setup shop and item
  let items;
  let gildedRose;
  beforeEach(()=>{
    items = [
      new Item("Conjured Item", 5, 40),
    ]
    gildedRose = new Shop(items);
  })

  it('Conjured items should decrease in quality by 2 each day', ()=>{
    passTheDay(gildedRose, 2);
    expect(gildedRose.items[0].quality).toEqual(36)
  });
  it('Conjured items should decrease in quality by 4 each day, past sell date', ()=>{
    passTheDay(gildedRose, 10);
    expect(gildedRose.items[0].quality).toEqual(10)
  });
  it('Item quality are clamped at 0-50', ()=>{
    passTheDay(gildedRose, 200);
    expect(gildedRose.items[0].quality).toEqual(0)
  });
})