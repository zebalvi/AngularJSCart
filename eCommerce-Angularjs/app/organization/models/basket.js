//----------------------------------------------------------------
// create basket
//
function basket(basketName) {
    this.basketName = basketName;
    this.emptyBasket = false;
    this.items = [];

    // get items from local storage when initializing
    this.get();

    // save items to local storage when unloading
    var self = this;
    $(window).unload(function () {
        if (self.emptyBasket) {
            self.clearBasket();
        }
        self.save(); // Save products/items
        self.emptyBasket = false;
    });

    // re-load items when the local storage changes
    $(window).on('storage', function (e) {
        if (e.originalEvent.key == self.basketName + '_items' && !self.savingItems) {
            self.get();
        }
    });
}

// get items from local storage
basket.prototype.get = function () {

    // empty list
    this.items.splice(0, this.items.length);

    // load from local storage
    var items = localStorage != null ? localStorage[this.basketName + "_items"] : null;
    if (items != null && JSON != null) {
        try {
            var items = JSON.parse(items);
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (item.id != null && item.name != null && item.price != null && item.quantity != null) {
                    item = new cartDetail(item.id, item.name, item.price, item.quantity);
                    this.items.push(item);
                }
            }
        }
        catch (err) {
            // ignore errors while loading...
        }
    }

    // notify listeners of change
    if (this.itemsChanged) {
        this.itemsChanged();
    }
}

// save items to local storage
basket.prototype.save = function () {
    if (localStorage != null && JSON != null) {
        localStorage[this.basketName + "_items"] = JSON.stringify(this.items);
    }
}

// adds an item to the cart
basket.prototype.add = function (id, name, price, quantity) {
    quantity = this.toNumber(quantity);
    if (quantity != 0) {

        // update units or quantity inside of Cart
        var qtyFound = false;
        for (var i = 0; i < this.items.length && !qtyFound; i++) {
            var item = this.items[i];
            if (item.id == id) {
                qtyFound = true;
                item.quantity = this.toNumber(item.quantity + quantity);
                if (item.quantity <= 0) {
                    this.items.splice(i, 1);
                }
            }
        }

        // new item, add now
        if (!qtyFound) {
            var item = new cartDetail(id, name, price, quantity);
            this.items.push(item);
        }

        // save changes
        this.save();
    }
}

// get the total price for all items currently in the cart
basket.prototype.getPrice = function (id) {
    var total = 0;
    for (var i = 0; i < this.items.length; i++) {
        var item = this.items[i];
        if (id == null || item.id == id) {
            total += this.toNumber(item.quantity * item.price);
        }
    }
    return total;
}

// get the total price for all items currently in the cart
basket.prototype.getCount = function (id) {
    var count = 0;
    for (var i = 0; i < this.items.length; i++) {
        var item = this.items[i];
        if (id == null || item.id == id) {
            count += this.toNumber(item.quantity);
        }
    }
    $("#cartCount").html(count);
    return count;
}

// clear the cart
basket.prototype.clearBasket = function () {
    this.items = [];
    this.save();
}

basket.prototype.toNumber = function (value) {
    value = value * 1;
    return isNaN(value) ? 0 : value;
}

//----------------------------------------------------------------
// items in the cart
//
function cartDetail(id, name, price, quantity) {
    this.id = id;
    this.name = name;
    this.price = price * 1;
    this.quantity = quantity * 1;
}

