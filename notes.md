# understanding what the hell is going on
the requirement
    - it's an inventory manifests that updates the day's property as the day passes
    - need to add new feature: allow new categories of items

The system
    - has quality value
    - all items have a `sellIn` days value. like an expiry date
    - items have quality
    - at the end of each day the the system updates all item's sellIn value and quality

after sell date is passed
    - items depereciate twice as fast past the sell date
    - quality is never negative or more than 50

unique item
    - aged brie increases quality as it gets older
    - sulfuras, never has to be solde or decrease in quality.. quality is always at 80
    - backstage passes increases quality towards sellIn but is 0 after concert

The new feature: conjured items
    - degrade faster then normal items

dos and donts
    - you can change updateQuality() and add new code.
    - do not alter the item class or items property

# Testing plan
    - handling basic item
        - depreciates quality and sell in days correctly
        - after sell date is passed. quality depreciates twice as fast
        - quality clamped at 0 - 50
    - handling special items
        - aged brie increases quality regardless
        - sulfuras doesnt age or depreciate
        - backstage pass increases value
            - > 10 increase by 1
            - <= 10 increase by 2
            - <= 5 increase by 3
            - < 0 quality becomes 0
    - conjured items
        - quality decrease twice as fast

# what is given in the git repo
- in src is the class code
- text tes is.... exmaple of running the class

# so basically
- just fix the updateQuality()
- make sure in can add conjure items


# parsing the original code
.updateQuality(){
    for every item:
        **This handles normal item** 
        *if* not "aged brie" or "backstage pass":{ 
            if item quality > 0:
                if not sulfuras:
                    item quality -1
        }
        **else handle items quality past 50** 
        else{
            sdd            
        }

        **decreaase sell in for all items except sulfuras**
        *if* not sulfuras{
            decrease sell in item
        }

        **handle stuff pass sell in**
        *if* already past sell in code{

        }
}